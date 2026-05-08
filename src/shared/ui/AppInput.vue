<template>
  <div class="app-input" :class="{ 'app-input--focused': isFocused }">
    <input
      v-model="modelValue"
      class="app-input__field"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      v-bind="$attrs" 
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keydown.enter="$emit('submit')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  inheritAttrs: false
})

defineProps<{
  placeholder?: string;
  type?: string;
  required?: boolean;
}>();

const modelValue = defineModel<string>({ default: '' });
const isFocused = ref(false);
defineEmits(['submit']);
</script>

<style lang="scss" scoped>
.app-input {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  transition: all var(--transition-smooth);
  border: 1px solid transparent;
  box-shadow: var(--shadow-soft);

  &--focused {
    border-color: var(--color-primary-soft);
    box-shadow: 0 4px 20px rgba(142, 157, 126, 0.08);
  }

  &__field {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    font-family: inherit;
    font-size: 1rem;
    line-height: 24px;
    color: var(--color-text-main);
    display: block;
    padding: 0;

    &::placeholder {
      color: var(--color-text-muted);
      opacity: 0.7;
    }
  }
}
</style>