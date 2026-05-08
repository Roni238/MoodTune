import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user/user'

export const useOnboarding = () => {
    const router = useRouter()
    const userStore = useUserStore()

    const profile = reactive({
        first_name: userStore.profile?.first_name || '',
        life_context: userStore.profile?.life_context || '',
        style_notes: userStore.profile?.style_notes || ''
    })

    const isFormValid = computed(() => profile.first_name.trim().length > 0)
    const isLoading = computed(() => userStore.isLoading)

    const submitOnboarding = async () => {
        if (!isFormValid.value) return

        try {
            await userStore.updateProfile(profile)
            router.push({ name: 'chat' })
        } catch (err) {
            console.error('Ошибка при обновлении профиля:', err)
        }
    }

    return {
        isLoading,
        isFormValid,
        submitOnboarding,
        profile
    }
}