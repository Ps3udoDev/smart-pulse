'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AuthShell from '@/components/auth/AuthShell'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useAuth } from '@/features/auth/client/useAuth'
import { useUIStore } from '@/store/ui-store'

export default function SignInPage() {
  const router = useRouter()
  const { loading, signInWithPassword, sendMagicLink } = useAuth()
  const { notify, confirm } = useUIStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await signInWithPassword(email, password)
      notify.success('Welcome back!', { description: 'Redirecting to your dashboard…' })
      router.replace('/dashboard')
    } catch (err: any) {
      notify.error('Login failed', { description: err?.message ?? 'Please verify your credentials.' })
    }
  }

  async function onMagic() {
    if (!email) {
      notify.warning('Email required', { description: 'Please enter your email first.' })
      return
    }
    try {
      await sendMagicLink(email)
      notify.success('Magic link sent', { description: 'Check your inbox to continue.' })
    } catch (err: any) {
      notify.error('Could not send magic link', { description: err?.message })
    }
  }

  async function testConfirm() {
    const ok = await confirm({
      title: 'Use magic link?',
      description: 'We will send a one-time login link to your email.',
      confirmText: 'Send link',
      cancelText: 'Cancel',
    })
    if (ok) onMagic()
  }

  return (
    <AuthShell title="Login" subtitle="Access your DMIS account">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
         <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            showPasswordToggle
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-zinc-300" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-[hsl(var(--primary))] hover:underline">
            Did you forget your password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Login'}
        </Button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center text-sm">
          <button type="button" onClick={onMagic} className="btn-ghost">
            Sign-in with Magic Link
          </button>
        </motion.div>
      </form>
    </AuthShell>
  )
}
