<script setup lang="ts">
import AppButton from '@/shared/ui/AppButton.vue';
import { useLogin } from '../model/useLogin'
const { isLoading, handleLogin } = useLogin('google')
</script>

<template>
  <AppButton variant="outline" class="app-google-btn" @click="handleLogin"> 
    <img src="../assets/google.svg" alt="Google" aria-hidden="false"/>
    <span class="app-google-btn__text"> {{ isLoading ? 'Загрузка...' : `Продолжить через Google` }} </span>
  </AppButton>
</template>

<style lang="scss" scoped>
.app-google-btn {
  width: 100%;
}
</style>