"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useDemo } from "@/lib/store"
import { BrandMark } from "@/components/brand-mark"
import { UrgentHelpButton } from "@/components/urgent-help"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LogOut, Menu, X } from "lucide-react"

export interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export function AppShell({
  nav,
  areaLabel,
  children,
}: {
  nav: NavItem[]
  areaLabel: string
  children: React.ReactNode
}) {
  const { currentUser, signOut } = useDemo()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function handleSignOut() {
    signOut()
    router.push("/")
  }

  const navList = (
    <nav aria-label={`${areaLabel} navigation`} className="flex flex-col gap-1">
      {nav.map((item) => {
        const active = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors",
              active
                ? "bg-teal-soft text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-5 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-dvh bg-muted/40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-2 text-foreground hover:bg-muted lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <BrandMark className="size-9" />
          </Link>
          <span className="hidden rounded-full bg-pale-blue px-3 py-1 text-sm font-semibold text-primary sm:inline">
            {areaLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <UrgentHelpButton variant="inline" />
          {currentUser && (
            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-sm text-muted-foreground">
                Signed in as <span className="font-semibold text-foreground">{currentUser.preferredName}</span>
              </span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20">{navList}</div>
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} aria-hidden="true" />
            <div className="absolute left-0 top-0 h-full w-72 max-w-[80%] overflow-y-auto bg-background p-4 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold text-primary">{areaLabel}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 hover:bg-muted"
                >
                  <X className="size-6" />
                </button>
              </div>
              {navList}
            </div>
          </div>
        )}

        {/* Main */}
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
