import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user/user'

export const useLogout = () => {
  const router = useRouter()
  const userStore = useUserStore()

  const logout = async () => {
    try {
      await userStore.logout()
      await router.replace({ name: 'auth' })
    } catch (err: any) {
      console.error(`Ошибка при выходе из системы:`, err)
    }
  }

  return { logout }
}