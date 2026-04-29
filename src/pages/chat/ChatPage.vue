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
  height: calc(100dvh - 72px); 
  box-sizing: border-box; 
  padding: 20px;
  @include center;

  &__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    max-width: 600px;
    height: 100%; 
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
  }
}
</style>