<template>
  <div class="layout-default">
    <AppHeader />
    
    <main class="layout-default__content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { AppHeader } from '@/widgets/header'
</script>

<style lang="scss" scoped>
.layout-default {
  background-color: var(--color-bg);

  &__content {
    min-height: calc(100dvh - 72px);
    display: grid;
  }
}
</style>