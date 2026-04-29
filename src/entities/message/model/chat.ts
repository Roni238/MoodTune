import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/shared/api/supabase'
import { api } from '@/shared/api/api-client'

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
        .order('created_at', { ascending: true })
      
      if (error) {
        console.error('Ошибка загрузки сообщений:', error)
        return
      }

      if (data) {
        messages.value = data.map(m => ({
          role: m.role as 'user' | 'model',
          content: m.content
        }))
        isMessagesLoaded.value = true
      }
    } finally {
      isLoading.value = false
    }
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return
    
    messages.value.push({ role: 'user', content: text })
    isTyping.value = true
    try {
      const data = await api.post('chat-process', { message: text })
      await addBotResponse(data.text)
    } catch (e) {
      messages.value.push({ role: 'model', content: 'извини, я немного отвлекся; попробуй еще раз;' })
    } finally {
      isTyping.value = false
    }
  }

  async function addBotResponse(fullText: string) {
    const segments = fullText.split(';').filter(s => s.trim().length > 0)
    for (const segment of segments) {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1000))
      messages.value.push({ role: 'model', content: segment.trim() + ';' })
    }
  }
  
  function clearChat() {
    messages.value = []
    isMessagesLoaded.value = false
    isLoading.value = false
    isTyping.value = false
  }

  return { 
    messages, 
    isTyping, 
    isLoading,
    isMessagesLoaded,
    sendMessage, 
    fetchMessages,
    clearChat
  }
})