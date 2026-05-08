<script setup lang="ts">
import { AppLogo } from '@/shared/ui';
</script>

<template>
  <header class="app-header">
    <div class="app-header__container">
      <AppLogo/>

      <div class="app-header__actions">
        <RouterLink to="/profile" class="app-header__profile-link profile-trigger">
          <div class="profile-trigger__avatar">
            <img src="@/shared/assets/icons/people.svg" alt="">
          </div>
        </RouterLink>
      </div>

    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  height: 72px;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-primary-soft);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: var(--shadow-soft);

  &__container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}


.profile-trigger {
  text-decoration: none;
  transition: var(--transition-smooth);

  &__avatar {
    width: 42px;
    height: 42px;
    background-color: var(--color-bg);
    border: 1px solid #8E9D7E;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: var(--color-primary);
    transition: var(--transition-smooth);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(142, 157, 126, 0.15);
      border-color: var(--color-primary);
    }
  }
}
</style>