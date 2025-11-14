"use client"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { createClient } from "@/utils/supabase/client"

type Membership = {
  company_id: string
  company_name: string
  is_active: boolean
  area: string | null
  profile_type: string | null
  join_date: string | null
  generation: number | null
}

type MeProfile = {
  user_id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: string
  is_global_admin: boolean
  company_admin_of: string[]
  memberships: Membership[]
}

type AuthState = {
  token: string | null
  profile: MeProfile | null
  company: string | null
  setToken: (token: string | null) => void
  setProfile: (profile: MeProfile | null) => void
  hydrateFromSession: () => Promise<void>
  clear: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      profile: null,
      company: null,
      setToken: (token) => set({ token }),
      setProfile: (profile) =>
        set({
          profile,
          company:
            profile?.memberships?.find((m) => m.is_active)?.company_name ??
            profile?.memberships?.[0]?.company_name ?? null,
        }),
      hydrateFromSession: async () => {
        const sb = createClient()
        const { data: { session } } = await sb.auth.getSession()
        const token = session?.access_token ?? null
        const { data, error } = await sb.rpc("fn_me")
        if (error) throw error
        const profile = data as unknown as MeProfile
        set({ token })
        set({
          profile,
          company:
            profile?.memberships?.find((m) => m.is_active)?.company_name ??
            profile?.memberships?.[0]?.company_name ?? null,
        })
      },
      clear: () => set({ token: null, profile: null, company: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ token: s.token, profile: s.profile, company: s.company }),
    }
  )
)
