'use client'
import { useState, useCallback, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useAuthStore } from '@/store/auth-store'

const getAppUrl = () => {
  if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_APP_URL) {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_APP_URL!
}

export function useAuth() {
  const supabase = useMemo(() => createClient(), [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    setLoading(true); setError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      await useAuthStore.getState().hydrateFromSession()
      return { ok: true as const }
    } catch (e: any) {
      setError(e?.message ?? 'Unable to sign in')
      throw e
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const sendMagicLink = useCallback(async (email: string, captchaToken?: string) => {
    setLoading(true); setError(null)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${getAppUrl()}/auth/callback?type=magic`,
          shouldCreateUser: false,
          captchaToken,
        },
      })
      if (error) throw error
      return { ok: true as const }
    } catch (e: any) {
      setError(e?.message ?? 'Unable to send magic link')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const sendPasswordReset = useCallback(async (email: string, captchaToken?: string) => {
    setLoading(true); setError(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getAppUrl()}/auth/callback?type=recovery`,
        captchaToken,
      })
      if (error) throw error
      return { ok: true as const }
    } catch (e: any) {
      setError(e?.message ?? 'Unable to send recovery email')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePassword = useCallback(async (newPassword: string) => {
    setLoading(true); setError(null)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      return { ok: true as const }
    } catch (e: any) {
      setError(e?.message ?? 'Unable to update password')
      throw e
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      useAuthStore.getState().clear()
      return { ok: true as const }
    } catch (e: any) {
      setError(e?.message ?? 'Unable to sign out')
      throw e
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const getSession = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }, [supabase])

  return {
    loading,
    error,
    signInWithPassword,
    sendMagicLink,
    sendPasswordReset,
    updatePassword,
    signOut,
    getSession,
  }
}
