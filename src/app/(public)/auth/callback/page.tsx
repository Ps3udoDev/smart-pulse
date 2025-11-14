'use client'

import { Suspense } from 'react'
import AuthShell from '@/components/auth/AuthShell'
import CallbackInner from './CallbackInner'

export const dynamic = 'force-dynamic'

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Authenticating…">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-zinc-600">
              Verifying your authentication, please wait…
            </p>
          </div>
        </AuthShell>
      }
    >
      <CallbackInner />
    </Suspense>
  )
}
