<template>   
  <div class="chat-messages" ref="messagesRef">
    <TransitionGroup name="message-list">
      <AppLoader v-if="chatStore.isLoading"/>

      <ChatMessage v-else
        v-for="(msg, idx) in chatStore.messages" 
        :key="idx"
        :content="msg.content"
        :role="msg.role"
      />
    </TransitionGroup>

    <div v-if="chatStore.messages.length === 0 && !chatStore.isLoading" class="chat-messages__empty">
      <p>вдох, выдох</p>
      <p>я здесь, чтобы выслушать тебя.</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { ChatMessage } from '@/entities/message'
import { AppLoader } from '@/shared/ui'
import { onMounted } from 'vue'
import { useChatStore } from '@/entities/message/model/chat.ts'
const chatStore = useChatStore()

onMounted(() => chatStore.fetchMessages())

const messagesRef = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

 watch(() => chatStore.messages.length, scrollToBottom)
</script>

<style lang="scss" scoped>
.chat-messages {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  overflow-y: auto;
  padding: 24px;
  gap: 16px;
  
  &__empty { 
    height: 100%;
    color: var(--color-text-muted);
    text-align: center;
    font-size: 0.9rem;
    gap: 8px;
    @include center;
   }
}
</style>