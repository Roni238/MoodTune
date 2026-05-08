<template>
  <Transition name="fade">
    <AppHealthOverlay 
      v-if="!isAppReady" 
      @ready="isAppReady = true" 
    />
  </Transition>

  <component :is="layout" v-if="isAppReady" >
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import AuthLayout from '@/app/layouts/AuthLayout.vue'
import { AppHealthOverlay} from '@/shared/ui'

const route = useRoute()
const isAppReady = ref(false)

const layouts = {
  Default: DefaultLayout,
  Auth: AuthLayout
}

const layout = computed(() => {
  const layoutName = (route.meta.layout as keyof typeof layouts) || 'Default'
  return layouts[layoutName]
})
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-leave-to {
  opacity: 0;
}
</style>