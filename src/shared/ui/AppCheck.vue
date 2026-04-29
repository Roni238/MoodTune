<template>
  <div class="app-check">
    <input class="app-check__input" type="checkbox" v-model="modelValue" v-bind="$attrs"/>

    <span class="app-check__box">
      <img src="../assets/icons/check.svg" alt="check" class="app-check__icon">
    </span>

    <label v-if="$slots.default" class="app-check__label">
      <slot/>
    </label>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>({ default: false });

defineOptions({
  inheritAttrs: false
});
</script>

<style lang="scss" scoped>
.app-check {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  position: relative;
  height: 20px;

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 20px;
    height: 20px;
    z-index: 1;
  }

  &__input:checked + &__box {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
  &__input:checked + &__box &__icon {
    transform: scale(1);
  }
  &__input:focus-visible + &__box {
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  &__box {
    width: 20px;
    height: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-primary-soft);
    border-radius: 4px;
    transition: all var(--transition-smooth);
    flex-shrink: 0;
    @include center;
  }

  &__icon {
    width: 14px;
    height: 14px;
    transform: scale(0);
    transition: transform 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  }

  &__label {
    font-size: 0.85rem;
  }
}
</style>