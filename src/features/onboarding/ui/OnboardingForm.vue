<template>
  <div class="onboarding">
    <header class="onboarding__header">
      <h2 class="onboarding__title">Давай познакомимся 🌿</h2>
      <p class="onboarding__subtitle">Это поможет мне лучше понимать твое состояние и быть рядом в нужный момент.</p>
    </header>

    <form @submit.prevent="submitOnboarding" class="onboarding-form">
      <div class="onboarding-form__group">
        <label class="onboarding-form__label">Как мне к тебе обращаться? *</label>
        <AppInput v-model="profile.first_name" placeholder="Твое имя" required />
      </div>

      <div class="onboarding-form__group">
        <label class="onboarding-form__label">Расскажи немного о себе</label>
        <AppTextarea v-model="profile.life_context" placeholder="Чем занимаешься..." />
      </div>

      <div class="onboarding-form__group">
        <label class="onboarding-form__label">Твои пожелания к стилю общения</label>
        <AppTextarea v-model="profile.style_notes" placeholder="Например: 'используй больше метафор'" />
      </div>

      <div class="onboarding-form__actions">
        <AppCheck v-model="isAgreed">
          Я принимаю <a href="#" class="link">пользовательское соглашение</a> на обработку данных
        </AppCheck>

        <AppButton type="submit" variant="primary" :disabled="!isFormValid || !isAgreed || isLoading" :loading="isLoading">
          Начать общение
        </AppButton>
      </div>
      
    </form>
  </div>
</template>
<!-- очень похож на editProfile модель, но ui другой, сюда можно будет в будующем добавить логику для "знакомства", например указать поля которые позже изменить нельзя будет (пол, возраст и тд) -->
<script setup lang="ts">
import { ref } from 'vue'
import { AppInput, AppButton, AppTextarea, AppCheck } from '@/shared/ui'
import { useOnboarding } from '../model/useOnboarding'
const isAgreed = ref(false)
const { profile, isFormValid, submitOnboarding, isLoading } = useOnboarding() 
</script>

<style scoped lang="scss">
.onboarding {
  width: 100%;
  max-width: 600px;
  background: var(--color-surface);
  padding: 40px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);

  &__header {
    margin-bottom: 32px;
    text-align: center;
  }

  &__title {
    color: var(--color-text-main);
    margin-bottom: 8px;
  }
}

.onboarding-form {
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
    gap: 18px;
    margin-top: 24px;
  }
  
  a{
    font-size: 0.85rem;
    color: var(--color-primary);
  }
}
</style>