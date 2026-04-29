<template>
    <div  class="health-overlay">
      <div class="health-overlay__content">
        <div class="health-overlay__icon-wrapper">
          <div class="health-overlay__icon">
            <span v-if="isError">☁️</span>
            <span v-else class="float">✨</span>
          </div>
        </div>

        <div class="health-overlay__text">
          <h2 v-if="!isError" class="health-overlay__title">
            {{ clientGreeting }}
          </h2>

          <div class="health-overlay__body">
            <p v-if="isLoading" class="health-overlay__loading">
              Настраиваемся на спокойную волну...
            </p>
            
            <p v-else-if="isError" class="health-overlay__error">
              Кажется, соединение немного затуманилось. <br />
              Мы скоро всё наладим.
            </p>
            
            <p v-else class="health-overlay__message">
              {{ welcomeMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useUserStore } from '@/entities/user/user'

const userStore = useUserStore()
const isVisible = ref(true)
const isError = ref(false)
const welcomeMessage = ref('')
const emit = defineEmits(['ready'])

const clientGreeting = computed<string>(() => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return "Доброе утро"
  if (hour >= 12 && hour < 18) return "Добрый день"
  if (hour >= 18 && hour < 23) return "Добрый вечер"
  return "Доброй ночи"
})

const warmMessages: string[] = [
  "Я здесь и готов тебя выслушать. Давай начнем этот путь вместе 🌿",
  "Твое ментальное благополучие — наш главный приоритет. Как ты сегодня? 💚",
  "Сделай глубокий вдох. Я помогу тебе разобраться в мыслях 🌿",
  "Рад, что ты заглянул. Давай создадим пространство для спокойствия 💚",
  "Каждое твое чувство важно. Я готов поддержать тебя во всем 🌿"
]

const isLoading = computed(() => !userStore.isInitialized)

const startSequence = () => {
  const unwatch = watch(() => userStore.isInitialized, (ready) => {
    // если загрузка сессии прошла, показывает приветствие и доп текст, емитим готовность в app чтобы скрыть оверлей через 2.3с
    if (ready) {
      const randomIndex = Math.floor(Math.random() * warmMessages.length)
      welcomeMessage.value = warmMessages[randomIndex] || "Я здесь, чтобы поддержать тебя 🌿"

      setTimeout(() => {
        isVisible.value = false
        emit('ready')
        unwatch()
      }, 2300)
    }
  }, { immediate: true })
}

onMounted(startSequence)
</script>

<style lang="scss" scoped>
.health-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;

  &__content {
    max-width: 440px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  &__icon-wrapper {
    width: 100px;
    height: 100px;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--color-primary-soft);
  }

  &__icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  &__title {
    font-family: 'Inter', sans-serif;
    font-size: 2.2rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--color-text-main);
    margin-bottom: 12px;
  }

  &__body {
    min-height: 60px;
  }

  &__message {
    font-size: 1.15rem;
    line-height: 1.6;
    color: var(--color-text-muted);
    max-width: 340px;
    margin: 0 auto;
  }

  &__loading {
    color: var(--color-primary);
    font-weight: 400;
    letter-spacing: 0.01em;
  }

  &__error {
    color: var(--color-error);
    font-size: 1rem;
    line-height: 1.5;
    padding: 16px;
    background: var(--color-surface);
    border-radius: var(--radius-md);
    border: 1px solid rgba(214, 159, 159, 0.3);
  }
}
</style>