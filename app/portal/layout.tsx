"use client"

import { AppShell, type NavItem } from "@/components/app-shell"
import { useRequireRole } from "@/lib/use-require-role"
import { LayoutDashboard, Sparkles, Target, LineChart, BookOpen, Settings } from "lucide-react"

const nav: NavItem[] = [
  { href: "/portal", label: "My dashboard", icon: LayoutDashboard },
  { href: "/portal/strengths", label: "My strengths", icon: Sparkles },
  { href: "/portal/goals", label: "My goals", icon: Target },
  { href: "/portal/tracker", label: "Confidence tracker", icon: LineChart },
  { href: "/portal/resources", label: "Resources", icon: BookOpen },
  { href: "/portal/privacy", label: "Sharing & privacy", icon: Settings },
]

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { allowed, ready } = useRequireRole("participant")

  if (!ready || !allowed) {
    return (
      <div className="grid min-h-dvh place-items-center bg-muted/40 p-8 text-center">
        <p className="text-lg text-muted-foreground">Loading your space…</p>
      </div>
    )
  }

  return (
    <AppShell nav={nav} areaLabel="Participant">
      {children}
    </AppShell>
  )
}
