<template>
  <div class="profile-page">
    <OnboardingForm />
    <!-- <OnboardingForm v-if="!userStore.hasOnboarded"/>
    <EditProfileForm v-else/> -->
  </div>
</template>

<script setup lang="ts">
import { OnboardingForm } from '@/features/onboarding'
import { EditProfileForm } from '@/features/edit-profile'
import { useUserStore } from '@/entities/user/user'
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;

  @include lg{
    padding: 20px;
  }
}
</style>