import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/shared/api/supabase'
// import { api } from '@/shared/api/api-client'

import { useUserStore } from '@/entities/user/user'
const userStore = useUserStore()


export const useChatStore = defineStore('chat', () => {
  const messages = ref<{ role: 'user' | 'model'; content: string }[]>([])
  const isTyping = ref(false)
  const isLoading = ref(false)
  const isMessagesLoaded = ref(false)
  
  async function fetchMessages() {
    if (isLoading.value || isMessagesLoaded.value) return
    isLoading.value = true
    
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('role, content')
        .eq('user_id', userStore.profile.id)
        .order('created_at', { ascending: false })
        .limit(20)
      
      if (error) {
        console.error('Ошибка загрузки сообщений:', error)
        return
      }

      if (data) {
        const formattedMessages: { role: 'user' | 'model'; content: string }[] = []
      
        for (const msg of data.reverse()) {
          if (msg.role === 'model' && msg.content.includes('\n')) {
            const segments = msg.content.split('\n') //чтобы после загрузки сообщения были не огромные пилим их по переносам
            for (const segment of segments) {
              formattedMessages.push({
                role: 'model',
                content: segment.trim() + '\n'
              })
            }
          } else {
            formattedMessages.push({
              role: msg.role as 'user' | 'model',
              content: msg.content
            })
          }
        }
        
        messages.value = formattedMessages
        isMessagesLoaded.value = true
      }
    } finally {
      isLoading.value = false
    }
  }
  // переделал на фетч вместо сдк супабейса, СБ js 2.x при быстрых запросах может отменить похожий запрос, иногда даже запрос не уходит, + edge function требует свежий токен,  внутрений рефреш очень долгий изза проксирования запроса с СБ (чтобы гемини работала пришлось делать проксирование, так что это делается дольше обычного но не вылезает "недоступно в вашей стране", но отработка запроса в СБ максимум 1 минута, далее он прерывается, так что легче отдельно получать сессию и использовать обычный фетс)
  async function sendMessage(text: string) {
    if (!text.trim()) return
    messages.value.push({ role: 'user', content: text })
    isTyping.value = true

    try {
      const token = userStore.session?.access_token
      
      if (!token) {
        throw new Error('Пользователь не авторизован')
      }
      const response = await fetch('https://humrhjxfwwfbhmzsfsuy.supabase.co/functions/v1/chat-process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: text })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
      await addBotResponse(data.text)
    }  
    catch (e) {
      console.error('Error:', e)
      messages.value.push({ role: 'model', content: 'извини, я немного отвлекся; попробуй еще раз;' })
    } finally {
      isTyping.value = false
    }
  }
  // async function sendMessage(text: string) {
  //   if (!text.trim()) return
    
  //   messages.value.push({ role: 'user', content: text })
  //   isTyping.value = true

  //   try {
      
  //     const data = await api.post('chat-process', { message: text })
  //     console.log(data)
  //     await addBotResponse(data.text)
  //   }  
  //   catch (e) {
  //     messages.value.push({ role: 'model', content: 'извини, я немного отвлекся; попробуй еще раз;' })
  //   } finally {
  //     isTyping.value = false
  //   }
  // }

  async function addBotResponse(fullText: string) {
    const segments = fullText.split('\n').filter(s => s.trim().length > 0)
    console.log(segments)
    for (const segment of segments) {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1000))         
      messages.value.push({ role: 'model', content: segment.trim() + '\n' })
    }
  }

  return { 
    messages, 
    isTyping, 
    isLoading,
    isMessagesLoaded,
    sendMessage, 
    fetchMessages
  }
})