"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  Building2,
  LayoutDashboard,
  Users,
  FileText,
  Layers,
  BookOpen,
  Network,
  Package,
  UserPlus,
  UsersRound,
  BarChart3,
} from "lucide-react"
import { useAuthStore } from "@/store/auth-store"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon?: React.ElementType
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(href + "/")

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild
        className={[
          "hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]",
          active ? "bg-accent text-accent-foreground" : "",
        ].join(" ")}
      >
        <Link href={href}>
          {Icon && <Icon className="w-4 h-4" />}
          <span>{children}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}

function Section({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: {
  title: string
  icon: React.ElementType
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]">
            <Icon className="w-4 h-4" />
            <span>{title}</span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>{children}</SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export function ProtectedNav() {
  const { profile } = useAuthStore()
  const role = (profile?.role ?? "user") as "user" | "company_admin" | "global_admin"

  if (role === "user") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  const isGlobal = role === "global_admin"

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <Section title="Companies" icon={Building2} defaultOpen>
            <NavLink href="/companies" icon={Building2}>
              Companies
            </NavLink>
            <NavLink href="/companies/profile-types" icon={Users}>
              Profile types
            </NavLink>
            <NavLink href="/companies/areas" icon={Network}>
              Areas
            </NavLink>
          </Section>

          <Section title="DMIs" icon={Layers}>
            <NavLink href="/dmis" icon={Layers}>
              DMIs
            </NavLink>
            {isGlobal && (
              <>
                <NavLink href="/dmis/versions" icon={BookOpen}>
                  Versions
                </NavLink>
                <NavLink href="/dmis/pillars" icon={Package}>
                  Pillars
                </NavLink>
                <NavLink href="/dmis/modules" icon={Package}>
                  Modules
                </NavLink>
              </>
            )}
          </Section>

          <Section title="Users" icon={UsersRound}>
            <NavLink href="/users/create" icon={UserPlus}>
              Creation
            </NavLink>
          </Section>

          <Section title="Reports" icon={FileText}>
            <NavLink href="/reports/participants" icon={UsersRound}>
              Participants
            </NavLink>
            <NavLink href="/reports" icon={BarChart3}>
              Reports
            </NavLink>
          </Section>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}