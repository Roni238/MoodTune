<template>
  <div class="app-loader">
    <div class="app-loader__container">

      <div class="app-loader__dots">
        <span class="app-loader__dot"></span>
        <span class="app-loader__dot"></span>
        <span class="app-loader__dot"></span>
      </div>
      
      <div class="app-loader__text">
        <slot>{{ label }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: 'Загрузка',
});
</script>

<style lang="scss" scoped>
.app-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  &__dots {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
  }

  &__dot {
    width: 12px;
    height: 12px;
    background: var(--color-primary);
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  &__text {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    letter-spacing: 0.05em;
  }
}

@keyframes bounce {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-12px);
    opacity: 1;
  }
}
</style>