<template>
  <div class="layout-default">
    <AppHeader />
    
    <main class="layout-main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { AppHeader } from '@/widgets/header'
</script>

<style lang="scss" scoped>
.layout-default {
  min-height: 100vh;
  background-color: var(--color-bg); // Твой мягкий шалфейный фон
  display: flex;
  flex-direction: column;
}

.layout-main-content {
  flex: 1;
  width: 100%;
}
</style>