<script setup lang="ts">
import AppButton from '@/shared/ui/AppButton.vue';
import { useLogout } from '../model/useLogout'
const { logout } = useLogout()
</script>

<template>
    <AppButton variant="outline" @click="logout" type="button">
        <img src="../assets/logout.svg" alt="Выход" aria-hidden="false"/>
        Выйти из системы
    </AppButton>
</template>