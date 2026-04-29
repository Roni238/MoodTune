<template>
    <RouterLink to="/" class="logo">
          <span class="logo__icon">🌿</span>
          <span class="logo__name">MoodTune</span>
      </RouterLink>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &__icon {
    font-size: 1.5rem;
  }

  &__name {
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
}
</style>