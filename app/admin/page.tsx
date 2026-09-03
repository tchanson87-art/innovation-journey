"use client"

import Link from "next/link"
import { useDemo } from "@/lib/store"
import { COHORT } from "@/lib/demo-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Inbox, Layers, Users, BarChart3, ArrowRight } from "lucide-react"

export default function AdminOverview() {
  const { state } = useDemo()
  const newReferrals = state.referrals.filter((r) => r.status === "new").length

  const tiles = [
    {
      href: "/admin/referrals",
      icon: Inbox,
      label: "Review referrals",
      value: `${state.referrals.length} total`,
      note: `${newReferrals} awaiting review`,
    },
    {
      href: "/admin/cohorts",
      icon: Layers,
      label: "Programmes & cohorts",
      value: "1 active cohort",
      note: COHORT.name,
    },
    {
      href: "/admin/people",
      icon: Users,
      label: "People & permissions",
      value: `${state.participants.length} participants`,
      note: "1 facilitator",
    },
    {
      href: "/admin/outcomes",
      icon: BarChart3,
      label: "Organisation outcomes",
      value: "Anonymised",
      note: "Filter and export",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Administration</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Manage programmes, referrals, people and organisation-wide outcomes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tiles.map((t) => {
          const Icon = t.icon
          return (
            <Link key={t.href} href={t.href} className="group">
              <Card className="h-full transition-colors group-hover:border-teal">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-xl bg-pale-teal text-primary">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <ArrowRight
                    className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-teal"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="mt-4 text-lg font-bold text-foreground">{t.label}</h2>
                <p className="text-2xl font-extrabold text-primary">{t.value}</p>
                <p className="text-sm text-muted-foreground">{t.note}</p>
              </Card>
            </Link>
          )
        })}
      </div>

      <Card className="bg-pale-blue">
        <div className="flex items-center gap-3">
          <Badge variant="teal">Governance</Badge>
        </div>
        <p className="mt-3 text-primary">
          This platform is a demonstration. It should not be described as fully legally compliant
          until it has undergone proper governance, security and data-protection review.
        </p>
      </Card>
    </div>
  )
}
