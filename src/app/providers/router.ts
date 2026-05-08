import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/pages/auth/AuthPage.vue'),
      meta: { requiresAuth: false, layout: 'Auth' }
    },
    {
      path: '/',
      name: 'chat',
      component: () => import('@/pages/chat/ChatPage.vue'),
      meta: { requiresAuth: true, layout: 'Default' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/profile/ProfilePage.vue'),
      meta: { requiresAuth: true, layout: 'Default' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/chat/ChatPage.vue'),
      meta: { requiresAuth: true, layout: 'Default' }
    },
  ]
})
import { useUserStore } from '@/entities/user/user'

router.beforeEach(async (to) => {
  const userStore = useUserStore()

  if (!userStore.isInitialized) {
    const initPromise = userStore.initialize()
    
    if (to.meta.requiresAuth || to.name === 'auth') {
      await initPromise
    } else {
      return true
    }
  }
  const isAuth = userStore.isAuth
  const hasOnboarded = userStore.hasOnboarded

  if (to.matched.length === 0) {
    return isAuth ? { name: 'chat' } : { name: 'auth' }
  }

  if (to.meta.requiresAuth && !isAuth) {
    return { name: 'auth' }
  }

  if (to.name === 'auth' && isAuth) {
    return { name: 'chat' }
  }

  if (isAuth && !hasOnboarded && to.name !== 'profile') {
    return { name: 'profile' }
  }
})
export default router