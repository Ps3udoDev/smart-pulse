"use client"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/utils/supabase/client"
import { useAuthStore } from "@/store/auth-store"

type Props = {
  name?: string
  email?: string
  avatarUrl?: string
}

export function UserMenu({ name, email, avatarUrl }: Props) {
  const [open, setOpen] = useState(false)
  const { profile } = useAuthStore()
  console.log(profile)

  async function onLogout() {
    const sb = createClient()
    await sb.auth.signOut()
    window.location.href = "/sign-in"
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{(name ?? email ?? "U").slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white p-2 shadow">
          <div className="px-2 py-1 text-sm font-medium">
            {(name ?? profile?.full_name) ?? (email ?? profile?.email) ?? "User"}
          </div>
          {((name ?? profile?.full_name) && (email ?? profile?.email)) && (
            <div className="px-2 text-xs text-neutral-600">{email ?? profile?.email}</div>
          )}
          <button onClick={onLogout} className="mt-1 w-full rounded-md px-2 py-1 text-left text-sm hover:bg-neutral-100">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
