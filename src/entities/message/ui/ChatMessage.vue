<template>
  <div :class="['message', `message--${role}`]">
    <div class="message__group">
      <div 
        v-for="(part, index) in formattedContent" 
        :key="index"
        class="message__bubble"
      >
        {{ part }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  content: string
  role: 'user' | 'model'
}>()

const formattedContent = computed(() => {
  return props.content
    .split(';')
    .map(p => p.trim())
    .filter(p => p.length > 0)
})
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  &--user { justify-content: flex-end; }
  &--model { justify-content: flex-start; }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 75%;
  }

  &__bubble {
    padding: 12px 18px;
    border-radius: var(--radius-md);
    line-height: 1.5;
    font-size: 0.95rem;

    .message--user & {
      background: var(--color-primary);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .message--model & {
      background: var(--color-surface);
      color: var(--color-text-main);
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
  }
}
</style>