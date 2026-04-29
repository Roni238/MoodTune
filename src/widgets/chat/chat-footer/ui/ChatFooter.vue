<template>
  <footer class="chat-footer">
    <AppTextarea class="chat-footer__textarea" v-model="userText" placeholder="Напиши..." @submit="handleSend"/>

    <AppButton class="chat-footer__send" @click="handleSend" :disabled="!userText || chatStore.isTyping"> 
      <img src="@/shared/assets/icons/send.svg" alt="send">  
    </AppButton>
  </footer>
</template>

<script setup lang="ts">
import { AppTextarea, AppButton } from '@/shared/ui'
import { useChatStore } from '@/entities/message/model/chat'
import { ref } from 'vue'
const chatStore = useChatStore()
const userText = ref('')

const handleSend = async () => {
  if (!userText.value.trim() || chatStore.isTyping) return
  
  chatStore.sendMessage(userText.value)
  userText.value = ''
}
</script>

<style scoped lang="scss">
.chat-footer {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 16px 20px;
  background: var(--color-surface);
  border-top: 1px solid var(--color-primary-soft);

  &__textarea {
    flex: 1;
  }

  &__send {
    width: 48px; height: 48px;
    border-radius: 50%;
  }
}
</style>