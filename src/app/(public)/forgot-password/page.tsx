// src/app/(public)/forgot-password/page.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AuthShell from '@/components/auth/AuthShell'
import { useAuth } from '@/features/auth/client/useAuth'

export default function ForgotPasswordPage() {
  const { loading, sendPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await sendPasswordReset(email)
    setSent(true)
  }

  return (
    <AuthShell title="Reset password" subtitle="We’ll send you a recovery link">
      {sent ? (
        <p className="text-sm text-zinc-600">
          If the email exists, a recovery link has been sent. Please check your inbox.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>Send recovery email</Button>
          <p className="text-center text-sm mt-2">
            <Link href="/sign-in" className="text-[hsl(var(--primary))] hover:underline">Back to login</Link>
          </p>
        </form>
      )}
    </AuthShell>
  )
}
