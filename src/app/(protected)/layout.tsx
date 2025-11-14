import Image from "next/image"
import { redirect } from "next/navigation"
import { getUser } from "@/features/auth/server/auth.service"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserMenu } from "@/components/header/UserMenu"
import { ProtectedNav } from "@/components/nav/ProtectedNav"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  if (!user) redirect("/sign-in")

  const displayName = (user.user_metadata as any)?.name ?? user.email ?? "User"
  const avatarUrl = (user.user_metadata as any)?.avatar_url ?? undefined

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="relative group-data-[side=left]:border-transparent after:absolute after:top-0 after:right-0 after:h-full after:w-px after:bg-gradient-to-b after:from-transparent after:via-neutral-200 after:to-transparent"
      >
        <SidebarRail />
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <Image src="/logo/smart-pulse.png" alt="Smart Pulse" width={180} height={28} />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <ProtectedNav />
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter />
      </Sidebar>

      <SidebarInset className="flex-1">
        <header className="relative flex h-[4.5rem] items-center gap-2 px-3 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-neutral-200 after:to-transparent">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto">
            <UserMenu name={displayName} email={user.email ?? undefined} avatarUrl={avatarUrl} />
          </div>
        </header>
        <div className="flex-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}