<template>
  <div class="layout-auth">
    <main class="layout-auth__content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-auth {
  width: 100%;
  background-color: var(--color-surface);

  &__content{
    min-height: 100dvh;
    display: grid;
  }
}
</style>