<template>
  <div class="edit-profile">
    <header class="edit-profile__header">
      <h2 class="edit-profile__title">Настройки профиля</h2>
      <p class="edit-profile__subtitle"> Обнови свои данные, чтобы наше общение оставалось комфортным </p>
    </header>

    <form @submit.prevent="updateProfile" class="edit-form">
      <div class="edit-form__group">
        <label class="edit-form__label">Как мне к тебе обращаться?</label>
        <AppInput v-model="profile.first_name" placeholder="Твое имя" />
      </div>

      <div class="edit-form__group">
        <label class="edit-form__label">Чем занимаешься / Что тебя беспокоит?</label>
        <AppTextarea v-model="profile.life_context" placeholder="Твой контекст..." />
      </div>

      <div class="edit-form__group">
        <label class="edit-form__label">Стиль общения</label>
        <AppTextarea v-model="profile.style_notes" placeholder="Например: 'используй больше метафор'" />
      </div>


      <div class="edit-form__actions">
        <AppButton :disabled="!isFormValid" type="submit" variant="primary" :loading="isLoading">
          Обновить профиль
        </AppButton>

        <LogoutButton />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { AppInput, AppButton, AppTextarea } from '@/shared/ui'
import LogoutButton from '@/features/auth/logout/ui/LogoutButton.vue'
import { useEditProfile } from '../model/useEditProfile'

const { profile, isLoading, isFormValid, updateProfile } = useEditProfile()
</script>

<style lang="scss" scoped>
.edit-profile {
  padding: 20px;
  width: 100%;
  max-width: 600px;
  height: 100%;
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);

  @include lg{
    height: auto;
    padding: 40px;
    border-radius: var(--radius-lg);
  }

  &__header {
    margin-bottom: 32px;
    text-align: center;
  }

  &__title {
    color: var(--color-text-main);
    margin-bottom: 8px;
  }
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__group {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 6px;
    color: var(--color-text-muted);
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }
}
</style>