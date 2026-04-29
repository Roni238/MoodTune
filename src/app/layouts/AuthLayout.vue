<template>
  <div class="layout-auth">
    <main class="layout-auth__content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-auth {
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-surface);
}
</style>