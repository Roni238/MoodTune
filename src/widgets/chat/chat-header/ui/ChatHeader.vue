<template>
  <header class="chat-header">
    <div class="chat-header__avatar">🌿</div>
    <div class="chat-header__info">
      <div class="chat-header__name">Психолог</div>
      <div v-if="chatStore.isTyping" class="chat-header__status">
        печатает
        <span class="typing-dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </div>
      <div v-else class="chat-header__status chat-header__status--online">
        в сети
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useChatStore } from '@/entities/message/model/chat'
const chatStore = useChatStore()
</script>

<style scoped lang="scss">
.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-primary-soft);
  z-index: 10;

  &__avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: var(--color-primary-soft);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
  }

  &__name {
    font-weight: 500;
    color: var(--color-text-main);
  }

  &__status {
    font-size: 0.8rem;
    color: var(--color-primary);

    &--online {
      color: var(--color-text-muted);
    }
  }
}

.typing-dots {
  display: inline-flex;
  gap: 2px;
  margin-left: 2px;

  span {
    animation: bounce 1.4s infinite both;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-3px); opacity: 1; }
}
</style>