<template>
  <button
    class="app-button"
    :class="[
      `app-button--${variant}`,
      { 'app-button--loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <div v-if="loading" class="app-button__loader">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
    <div class="app-button__content" :class="{ 'app-button__content--hidden': loading }">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false
});

defineEmits(['click']);
</script>

<style lang="scss" scoped>
.app-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: var(--radius-md);
  cursor: pointer;
  border: none;
  transition: all var(--transition-smooth);
  user-select: none;

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 500;
    transition: opacity 0.2s ease;
    &--hidden { opacity: 0; }
  }

  &--primary {
    background-color: var(--color-primary);
    color: white;
    &:hover:not(:disabled) { background-color: var(--color-surface-active); }
  }

  &--secondary {
    background-color: var(--color-primary-soft);
    color: var(--color-text-main);
    &:hover:not(:disabled) { background-color: var(--color-secondary); color: white; }
  }

  &--outline {
    background-color: transparent;
    border: 1px solid var(--color-primary-soft);
    color: var(--color-text-main);
    &:hover:not(:disabled) { background-color: var(--color-surface-active); }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:hover {
    box-shadow: var(--shadow-soft);
  }
  
  &__loader {
    position: absolute;
    display: flex;
    gap: 4px;
    .dot {
      width: 6px; height: 6px;
      background: currentColor;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
      &:nth-child(1) { animation-delay: -0.32s; }
      &:nth-child(2) { animation-delay: -0.16s; }
    }
  }
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}
</style>