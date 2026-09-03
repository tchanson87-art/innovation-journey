"use client"

import { AppShell, type NavItem } from "@/components/app-shell"
import { useRequireRole } from "@/lib/use-require-role"
import { LayoutDashboard, Inbox, Layers, Users, BarChart3, ScrollText } from "lucide-react"

const nav: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/referrals", label: "Referrals", icon: Inbox },
  { href: "/admin/cohorts", label: "Programmes & cohorts", icon: Layers },
  { href: "/admin/people", label: "People & permissions", icon: Users },
  { href: "/admin/outcomes", label: "Outcomes", icon: BarChart3 },
  { href: "/admin/audit", label: "Audit trail", icon: ScrollText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { ready, allowed } = useRequireRole("admin")

  if (!ready || !allowed) {
    return (
      <div className="grid min-h-dvh place-items-center bg-muted/40 p-8 text-center">
        <p className="text-lg text-muted-foreground">Loading administration…</p>
      </div>
    )
  }

  return (
    <AppShell nav={nav} areaLabel="Administrator">
      {children}
    </AppShell>
  )
}
