import { computed } from 'vue'
import { useUserStore } from '@/entities/user/user'

// можно добавить яндекс в провайдеры, но supabase его по дефолту не поддерживает, так что понадобиться создавать свою функцию для него
export type AuthProvider = 'google' | 'discord' 

export const useLogin = (provider: AuthProvider) => {
  const userStore = useUserStore()

  const handleLogin = async () => {
    try {
      await userStore.loginWithProvider(provider)
    } catch (err: any) {
      console.error(`Ошибка авторизации через гугл:`, err)
    }
  }

  return {
    isLoading: computed(() => userStore.isLoading),
    handleLogin
  }
}