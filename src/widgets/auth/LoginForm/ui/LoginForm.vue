<template>
    <section class="auth living-bg">
      <div class="auth-form">
        <header class="auth-form__header">
          <div class="auth-form__visual">
             <div class="auth-form__icon">🌿</div>
          </div>
          <h2 class="auth-form__title">Рады видеть</h2>
          <p class="auth-form__subtitle">Войди в свое безопасное пространство</p>
        </header>

        <div class="auth-form__actions">
          <GoogleLoginBtn />
        </div>

        <footer class="auth-form__footer">
          Нажимая «Войти», ты соглашаешься на <br> 
          <span class="auth-form__highlight">бережное отношение</span> к своим мыслям
        </footer>
      </div>
    </section>
</template>
<script setup lang="ts">
import { GoogleLoginBtn } from "@/features/auth/login"
</script>
<style scoped lang="scss">
    .auth{
        @include center;
    }

    .auth-form{
        background: var(--color-surface);
        padding: 60px 48px;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-soft);
        max-width: 440px;
        width: 100%;
        text-align: center;
        z-index: 2;

        &__visual {
            font-size: 3.5rem;
            margin-bottom: 24px;
        }

        &__icon{
            animation: float 5s ease-in-out infinite;
        }

        &__title {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: var(--color-text-main);
        }

        &__subtitle {
            color: var(--color-text-muted);
            margin-bottom: 48px;
            font-size: 1rem;
        }

        &__footer {
            margin-top: 48px;
            font-size: 0.85rem;
            color: var(--color-text-muted);
            line-height: 1.6;

            
        }
        
        &__highlight {
            color: var(--color-primary);
            font-weight: 600;
        }
    }
</style>