<template>
  <div class="chat-page living-bg">
    <div class="chat-page__container">
      <ChatHeader/>
      <ChatList/>
      <ChatFooter/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatHeader } from '@/widgets/chat/chat-header'
import { ChatList } from '@/widgets/chat/chat-list'
import { ChatFooter } from '@/widgets/chat/chat-footer'
</script>

<style lang="scss" scoped>
.chat-page {
  max-height: calc(100dvh - 72px);
  @include center;
  @include lg {
    padding: 20px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    max-width: 600px;
    height: 100%; 
    background: var(--color-surface);
    
    box-shadow: var(--shadow-soft);
    overflow: hidden;

    @include lg {
      border-radius: var(--radius-lg);
    }
  }
}
</style>