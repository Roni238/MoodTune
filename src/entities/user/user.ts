import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/shared/api/supabase'

export type AuthProvider = 'google' | 'discord'

interface ProfileData {
  first_name: string
  life_context: string
  style_notes: string
}

export const useUserStore = defineStore('user', () => {
  const session = ref<any>(null)
  const profile = ref<any>(null)
  const isInitialized = ref(false)
  const isLoading = ref(false)

  const isAuth = computed(() => !!session.value)
  const hasOnboarded = computed(() => profile.value?.has_onboarded === true)

  async function deleteUserData() {
    isLoading.value = true
    try {
      const { data, error } = await supabase.functions.invoke('delete-user-data', {
        method: 'POST',
      })

      if (error) throw error

      profile.value = {
        ...profile.value,
        life_context: null,
        style_notes: null,
        has_onboarded: false 
      }
      
      return data
    } catch (e) {
      console.error('Error deleting user data:', e)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(updates: Partial<ProfileData>) {
    isLoading.value = true
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
          has_onboarded: true
        })
        .eq('id', session.value.user.id)

      if (error) throw error
      
      profile.value = { ...profile.value, ...updates, has_onboarded: true }
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    
    profile.value = data
  }

  async function initialize() {
    if (isInitialized.value || isLoading.value) return

    isLoading.value = true
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      session.value = currentSession
      if (currentSession) await fetchProfile(currentSession.user.id)
    } finally {
      isInitialized.value = true
      isLoading.value = false
    }

    supabase.auth.onAuthStateChange(async (event, newSession) => {
      session.value = newSession
      if (newSession) await fetchProfile(newSession.user.id)
      else profile.value = null
    })
  }

  async function loginWithProvider(provider: AuthProvider) {
    isLoading.value = true
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: { redirectTo: window.location.origin }
      })
      if (error) throw error
    } catch (e) {
      console.error('Login error:', e)
      isLoading.value = false
    }
  }

  async function logout() {
    isLoading.value = true
    try {
      await supabase.auth.signOut()
      session.value = null
      profile.value = null
    } finally {
      isLoading.value = false
    }
  }

  return {
    session,
    profile,
    isInitialized,
    isLoading,
    isAuth,
    hasOnboarded,
    deleteUserData,
    updateProfile,
    initialize,
    fetchProfile,
    loginWithProvider,
    logout
  }
})