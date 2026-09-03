"use client"

import { AppShell, type NavItem } from "@/components/app-shell"
import { useRequireRole } from "@/lib/use-require-role"
import { LayoutDashboard, ClipboardCheck, CalendarDays, ShieldAlert, Award, BarChart3 } from "lucide-react"

const nav: NavItem[] = [
  { href: "/facilitator", label: "Cohort overview", icon: LayoutDashboard },
  { href: "/facilitator/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/facilitator/sessions", label: "Session plans", icon: CalendarDays },
  { href: "/facilitator/safeguarding", label: "Safeguarding", icon: ShieldAlert },
  { href: "/facilitator/certificates", label: "Certificates", icon: Award },
  { href: "/facilitator/outcomes", label: "Cohort impact", icon: BarChart3 },
]

export default function FacilitatorLayout({ children }: { children: React.ReactNode }) {
  const { ready, allowed } = useRequireRole("facilitator")

  if (!ready || !allowed) {
    return (
      <div className="grid min-h-dvh place-items-center bg-muted/40 p-8 text-center">
        <p className="text-lg text-muted-foreground">Loading your cohort…</p>
      </div>
    )
  }

  return (
    <AppShell nav={nav} areaLabel="Facilitator">
      {children}
    </AppShell>
  )
}
