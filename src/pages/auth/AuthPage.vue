<script setup lang="ts">
import { IntroApp } from "@/widgets/auth/intro"
import { LoginForm } from "@/widgets/auth/LoginForm"
</script>

<template>
  <main class="auth-page">
    <IntroApp/>
    <LoginForm/>
  </main>
</template>

<style lang="scss" scoped>
.auth-page {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  background-color: var(--color-bg);

  @include lg {
    grid-template-columns: 1fr 1fr;
  }
}

</style>