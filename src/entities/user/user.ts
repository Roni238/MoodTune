import { defineStore } from 'pinia'
import { supabase } from '@/shared/api/supabase'
export type AuthProvider = 'google' | 'discord'
interface ProfileData {
  first_name: string
  life_context: string
  style_notes: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    session: null as any,
    profile: null as any,
    isInitialized: false,
    isLoading: false,
  }),

  getters: {
    isAuth: (state) => !!state.session,
    hasOnboarded: (state) => state.profile?.has_onboarded === true,
  },

  actions: {
    async updateProfile(updates: Partial<ProfileData>) {
        this.isLoading = true
        try {
        const { error } = await supabase
            .from('user_profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
                has_onboarded: true
            })
            .eq('id', this.session.user.id)

        if (error) throw error
        
        this.profile = { ...this.profile, ...updates, has_onboarded: true }
        } finally {
        this.isLoading = false
        }
    },
    
    async initialize() {
      if (this.isInitialized || this.isLoading) return

      this.isLoading = true
      try {
        const { data: { session } } = await supabase.auth.getSession()
        this.session = session
        if (session) await this.fetchProfile(session.user.id)
      } finally {
        this.isInitialized = true
        this.isLoading = false
      }

      supabase.auth.onAuthStateChange(async (event, newSession) => {
        this.session = newSession
        if (newSession) await this.fetchProfile(newSession.user.id)
        else this.profile = null
      })
    },

    async fetchProfile(userId: string) {
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()
      
      this.profile = data
    },

    async loginWithProvider(provider: AuthProvider) {
      this.isLoading = true
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options: { redirectTo: window.location.origin }
        })
        if (error) throw error
      } catch (e) {
        console.error('Login error:', e)
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true
      try {
        await supabase.auth.signOut()
        this.session = null
        this.profile = null
      } finally {
        this.isLoading = false
      }
    }
  }
})