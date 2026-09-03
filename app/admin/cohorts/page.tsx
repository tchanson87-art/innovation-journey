"use client"

import { useDemo } from "@/lib/store"
import { COHORT } from "@/lib/demo-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminCohorts() {
  const { state } = useDemo()
  const enrolled = state.participants.filter((p) => p.user.cohortId === COHORT.id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Programmes &amp; cohorts</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Create programmes, set up cohorts and allocate participants.
          </p>
        </div>
        <Button variant="teal" disabled>
          New cohort (demo)
        </Button>
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-primary">{COHORT.name}</h2>
          <Badge variant="teal">Active</Badge>
        </div>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Programme" value={COHORT.programme} />
          <Field label="Location" value={COHORT.location} />
          <Field label="Schedule" value={COHORT.dayTime} />
          <Field
            label="Start date"
            value={new Date(COHORT.startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
          <Field label="Referral route" value={COHORT.referralRoute} />
          <Field label="Partner" value={COHORT.partner} />
        </dl>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-primary">Allocated participants</h2>
        <ul className="mt-3 divide-y divide-border">
          {enrolled.map((p) => (
            <li key={p.user.id} className="flex items-center justify-between gap-3 py-3">
              <span className="font-semibold text-foreground">{p.user.preferredName}</span>
              <Badge variant="muted">Week {p.currentWeek} of 8</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  )
}
