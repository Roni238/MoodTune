<template>
    <section class="intro">
      <div class="intro__content">
        <AppLogo class="intro__logo"/>

        <h1 class="intro__title">
          Твой проводник к <br> 
          <span class="text-accent">внутреннему балансу</span>
        </h1>
        <p class="intro__description">
          Персональный ИИ-помощник, который умеет слушать, поддерживать и помогать разбираться в эмоциях без осуждения.
        </p>

        <ul class="intro__facts facts">
          <li class="facts__item">
            <img class="facts__icon" src="@/shared/assets/icons/lock.svg" width="20" height="20" alt="Конфиденциальность"/>
            <span class="facts__text">Полная конфиденциальность</span>
          </li>
          <li class="facts__item">
            <img class="facts__icon" src="@/shared/assets/icons/free.svg" width="20" height="20" alt="Цена" />
            <span class="facts__text">Абсолютно бесплатно</span>
          </li>
          <li class="facts__item">
            <img class="facts__icon" src="@/shared/assets/icons/time.svg" width="20" height="20" alt="Время"/>
            <span class="facts__text">Доступен 24/7</span>
          </li>
        </ul>

        <div class="intro__counter counter">
          <div class="counter__pulse"></div>
          <span class="counter__text">Помогаем <strong>428</strong> пользователям сегодня</span>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { AppLogo } from '@/shared/ui';
</script>

<style scoped lang="scss">
    .intro {
        padding: 20px;
        display: none;
        background-color: var(--color-primary); 
        color: var(--color-surface);
        position: relative;
        overflow: hidden;
        align-items: center;
        @include lg { 
            display: flex;
            padding-left: 40px;
        }

        &__content {
            max-width: 600px;
            z-index: 2;
        }

        &__logo {
            margin-bottom: 20px;
            color: var(--color-surface);
        }

        &__title {
            margin-bottom: 32px;
            color: var(--color-surface);
        }

        &__description {
            font-size: 1.2rem;
            line-height: 1.7;
            margin-bottom: 64px;
            color: var(--color-text-on-dark);
            opacity: 0.85;
        }
    }

    .facts {
        list-style: none;
        padding: 0;
        margin-bottom: 64px;

        &__item {
            display: flex;
            align-items: center;
            gap: 18px;
            font-size: 1.1rem;
            color: var(--color-surface);
            transition: var(--transition-smooth);
            
            &:hover { transform: translateX(10px); }
        }

        &__icon {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.15);
            width: 44px;
            height: 44px;
            border-radius: var(--radius-sm);
            padding: 12px;
            @include center;
        }
    }

    .counter {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 10px 20px;
        border-radius: 100px;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.9rem;

        &__pulse {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--color-active-bright);
            box-shadow: 0 0 10px var(--color-active-bright);
            animation: softPulse 2s infinite;
        }
    }
</style>