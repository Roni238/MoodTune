<template>
  <div class="app-textarea" :class="{ 'app-textarea--focused': isFocused }">
    <textarea
      ref="textareaRef"
      v-model="modelValue"
      class="app-textarea__field"
      :placeholder="placeholder"
      :rows="1"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keydown.enter.exact.prevent="$emit('submit')"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = withDefaults(defineProps<{
  placeholder?: string;
  maxRows?: number;
}>(), {
  maxRows: 5
});

const modelValue = defineModel<string>({ default: '' });
const emit = defineEmits(['submit']);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const isFocused = ref(false);

const LINE_HEIGHT = 24; 

const resize = () => {
  const el = textareaRef.value;
  if (!el) return;

  el.style.height = 'auto';
  
  const contentHeight = el.scrollHeight;
  const maxHeight = LINE_HEIGHT * props.maxRows;
  
  if (contentHeight > maxHeight) {
    el.style.height = `${maxHeight}px`;
    el.style.overflowY = 'auto';
  } else {
    el.style.height = `${contentHeight}px`;
    el.style.overflowY = 'hidden';
  }
};

const handleInput = () => resize();

watch(modelValue, () => {
  if (modelValue.value === '') {
    resize();
  }
});

onMounted(resize);
</script>

<style lang="scss" scoped>
.app-textarea {
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