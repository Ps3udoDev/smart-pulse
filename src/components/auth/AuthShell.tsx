'use client'
import { motion } from 'motion/react'

export default function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle?: string
}) {
  return (
    <div className="relative min-h-screen w-full bg-zinc-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(rgba(24,24,27,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1080px] items-center justify-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/30 bg-white/60 shadow-2xl backdrop-blur-xl md:grid-cols-2">
          <div className="relative hidden min-h-[480px] md:block">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg,#7210f2 0%,#381a66 100%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-10 text-white">
              <h1 className="text-3xl font-extrabold tracking-tight">SmartPulse</h1>
              <p className="mt-2 max-w-sm text-center text-white/90">
                Transforming data into smart decisions.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>
              {subtitle && (
                <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
              )}
              <div className="mt-6">{children}</div>
              <p className="mt-8 text-center text-xs text-zinc-400">
                © 2025 SmartPulse Consulting.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
