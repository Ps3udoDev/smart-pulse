// src/app/(public)/auth/callback/page.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AuthShell from '@/components/auth/AuthShell'
import { createClient } from '@/utils/supabase/client'
import { useUIStore } from '@/store/ui-store'

type Mode = 'magic' | 'recovery' | 'loading' | 'unknown'

export default function AuthCallbackPage() {
  const router = useRouter()
  const params = useSearchParams()
  const supabase = createClient()
  const { notify } = useUIStore()
  const [mode, setMode] = useState<Mode>('loading')
  const [pwd, setPwd] = useState('')
  const initialized = useRef(false)

  // ✅ Leemos el parámetro type que agregamos en useAuth
  const typeFromQuery = params.get('type') // 'magic' | 'recovery'

  // 1) Manejo de errores en query
  useEffect(() => {
    const err = params.get('error')
    const code = params.get('error_code')
    const desc = params.get('error_description')
    
    if (err) {
      console.log('[auth/callback] query error:', { err, code, desc })
      notify.error(`Auth error: ${code ?? err}`, { 
        description: desc ?? 'Link inválido o expirado.' 
      })
      setMode('unknown')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 2) Inicialización: verificar sesión y determinar modo
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    async function initialize() {
      try {
        console.log('[auth/callback] Initializing, typeFromQuery:', typeFromQuery)
        
        // ✅ Verificar si ya hay una sesión activa
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        console.log('[auth/callback] Current session:', {
          hasSession: !!session,
          userId: session?.user?.id,
          error: sessionError
        })

        if (sessionError) {
          console.error('[auth/callback] Session error:', sessionError)
          notify.error('Auth error', { description: sessionError.message })
          setMode('unknown')
          return
        }

        // Si no hay sesión, algo salió mal
        if (!session) {
          console.log('[auth/callback] No session found')
          
          // Intentar leer del hash (legacy/fallback)
          const hash = window.location.hash.replace(/^#/, '')
          const hashParams = new URLSearchParams(hash)
          const hashType = hashParams.get('type')
          const accessToken = hashParams.get('access_token')
          
          console.log('[auth/callback] Hash params:', { hashType, hasToken: !!accessToken })
          
          if (!accessToken) {
            notify.error('Auth error', { 
              description: 'No valid session found. Please try again.' 
            })
            setMode('unknown')
            return
          }
        }

        // ✅ Determinar el modo basado en el parámetro type
        if (typeFromQuery === 'recovery') {
          console.log('[auth/callback] Mode: recovery (password reset)')
          setMode('recovery')
        } else if (typeFromQuery === 'magic') {
          console.log('[auth/callback] Mode: magic (magic link login)')
          setMode('magic')
        } else {
          // Fallback: intentar detectar desde el hash
          const hash = window.location.hash.replace(/^#/, '')
          const hashType = hash ? new URLSearchParams(hash).get('type') : null
          
          console.log('[auth/callback] No type param, checking hash:', hashType)
          
          if (hashType === 'recovery') {
            setMode('recovery')
          } else if (hashType === 'magiclink') {
            setMode('magic')
          } else {
            // Por defecto, si hay sesión asumimos magic link
            setMode('magic')
          }
        }
      } catch (e: any) {
        console.error('[auth/callback] Initialize error:', e)
        notify.error('Auth error', { 
          description: e?.message ?? 'Could not initialize auth.' 
        })
        setMode('unknown')
      }
    }

    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFromQuery])

  // 3) Escucha eventos de auth (respaldo adicional)
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[auth/callback] Auth event:', event, 'hasSession:', !!session)
      
      // Solo actualizamos si el modo todavía es loading
      if (mode === 'loading') {
        if (event === 'PASSWORD_RECOVERY') {
          console.log('[auth/callback] PASSWORD_RECOVERY event detected')
          setMode('recovery')
        } else if (event === 'SIGNED_IN' && typeFromQuery === 'magic') {
          console.log('[auth/callback] SIGNED_IN event with type=magic')
          setMode('magic')
        }
      }
    })
    return () => sub.subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, typeFromQuery])

  // 4) Si es magic y hay sesión -> redirige
  useEffect(() => {
    if (mode !== 'magic') return

    const redirect = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('[auth/callback] Magic mode redirect check, hasSession:', !!session)
      
      if (session) {
        const next = params.get('next') || '/dashboard'
        console.log('[auth/callback] Redirecting to:', next)
        
        // Pequeño delay para asegurar que la sesión está lista
        setTimeout(() => {
          router.replace(next)
        }, 100)
      }
    }

    redirect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  // 5) Guardar nueva contraseña
  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    
    if (!pwd || pwd.length < 6) {
      notify.warning('Password too short', { 
        description: 'Password must be at least 6 characters.' 
      })
      return
    }
    
    try {
      console.log('[auth/callback] Updating password...')
      
      const { error } = await supabase.auth.updateUser({ password: pwd })
      
      if (error) {
        console.error('[auth/callback] Update password error:', error)
        throw error
      }
      
      console.log('[auth/callback] Password updated successfully')
      
      notify.success('Password updated', { 
        description: 'You can now sign in with your new password.' 
      })
      
      setTimeout(() => {
        router.replace('/sign-in')
      }, 500)
    } catch (err: any) {
      console.error('[auth/callback] Update password exception:', err)
      notify.error('Could not update password', { 
        description: err?.message ?? 'Please try again.' 
      })
    }
  }

  if (mode === 'loading') {
    return (
      <AuthShell title="Authenticating…">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-zinc-600">Verifying your authentication, please wait…</p>
        </div>
      </AuthShell>
    )
  }

  if (mode === 'magic') {
    return (
      <AuthShell title="Logging you in…">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-zinc-600">Completing your sign-in, please wait…</p>
        </div>
      </AuthShell>
    )
  }

  if (mode === 'recovery') {
    return (
      <AuthShell title="Set a new password">
        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">New password</label>
            <Input 
              type="password" 
              value={pwd} 
              onChange={e => setPwd(e.target.value)} 
              placeholder="Enter at least 6 characters"
              required 
              minLength={6}
              autoFocus
            />
            {pwd && pwd.length < 6 && (
              <p className="mt-1 text-xs text-amber-600">
                Password must be at least 6 characters
              </p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!pwd || pwd.length < 6}
          >
            Save password
          </Button>
        </form>
      </AuthShell>
    )
  }

  // Mode unknown - error state
  return (
    <AuthShell title="Auth callback">
      <div className="space-y-4">
        <p className="text-sm text-zinc-600">
          No valid auth context was found. The link may have expired or is invalid.
        </p>
        <Button 
          onClick={() => router.push('/sign-in')} 
          variant="outline" 
          className="w-full"
        >
          Back to Sign In
        </Button>
      </div>
    </AuthShell>
  )
}