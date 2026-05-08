import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user/user'

export const useEditProfile = () => {
    const router = useRouter()
    const userStore = useUserStore()
    
    const profile = reactive({
        first_name: userStore.profile?.first_name || '',
        life_context: userStore.profile?.life_context || '',
        style_notes: userStore.profile?.style_notes || ''
    })

    const isFormValid = computed(() => profile.first_name.trim().length > 0)
    const isLoading = computed(() => userStore.isLoading)

    const updateProfile = async () => {
        if (!isFormValid.value) return

        try {
            await userStore.updateProfile(profile)
            router.push({ name: 'chat' })
        } catch (err) {
            console.error('Ошибка при обновлении профиля:', err)
        }
    }

    const deleteUserData = async () => {
        const confirmed = confirm('Ты уверен? Я забуду всё: наши разговоры, твои привычки и всё, чем ты делился.')
  
        if (confirmed) {
            try {
            await userStore.deleteUserData()
            alert('Данные стерты. Давай начнем с чистого листа.')
            } catch (e) {
            alert('Не удалось удалить данные. Попробуй позже.')
            }
        }
    }

    return {
        profile,
        isFormValid,
        isLoading,
        updateProfile,
        deleteUserData
    }
    
}