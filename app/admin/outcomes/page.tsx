"use client"

import { useState } from "react"
import { useDemo } from "@/lib/store"
import { computeOutcomes } from "@/lib/outcomes"
import { COHORT } from "@/lib/demo-data"
import { OutcomesGrid } from "@/components/outcomes-grid"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Download, Info } from "lucide-react"

export default function AdminOutcomes() {
  const { state } = useDemo()

  const [filters, setFilters] = useState({
    cohort: "all",
    from: "",
    to: "",
    location: "all",
    route: "all",
    partner: "all",
  })

  const outcomes = computeOutcomes(state.participants, state.referrals, state.onward)

  function update(key: keyof typeof filters, value: string) {
    setFilters((f) => ({ ...f, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Organisation outcomes</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Anonymised, aggregated results across cohorts.
          </p>
        </div>
        <Button
          variant="teal"
          onClick={() => window.print()}
          aria-label="Export anonymised outcomes report"
        >
          <Download className="size-5" aria-hidden="true" />
          Export report
        </Button>
      </div>

      <Card className="print:hidden">
        <h2 className="text-lg font-bold text-primary">Filters</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Cohort" htmlFor="f-cohort">
            <select
              id="f-cohort"
              value={filters.cohort}
              onChange={(e) => update("cohort", e.target.value)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            >
              <option value="all">All cohorts</option>
              <option value={COHORT.id}>{COHORT.name}</option>
            </select>
          </Field>
          <Field label="From date" htmlFor="f-from">
            <input
              id="f-from"
              type="date"
              value={filters.from}
              onChange={(e) => update("from", e.target.value)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            />
          </Field>
          <Field label="To date" htmlFor="f-to">
            <input
              id="f-to"
              type="date"
              value={filters.to}
              onChange={(e) => update("to", e.target.value)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            />
          </Field>
          <Field label="Delivery location" htmlFor="f-location">
            <select
              id="f-location"
              value={filters.location}
              onChange={(e) => update("location", e.target.value)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            >
              <option value="all">All locations</option>
              <option value={COHORT.location}>{COHORT.location}</option>
            </select>
          </Field>
          <Field label="Referral route" htmlFor="f-route">
            <select
              id="f-route"
              value={filters.route}
              onChange={(e) => update("route", e.target.value)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            >
              <option value="all">All routes</option>
              <option value={COHORT.referralRoute}>{COHORT.referralRoute}</option>
            </select>
          </Field>
          <Field label="Partner organisation" htmlFor="f-partner">
            <select
              id="f-partner"
              value={filters.partner}
              onChange={(e) => update("partner", e.target.value)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            >
              <option value="all">All partners</option>
              <option value={COHORT.partner}>{COHORT.partner}</option>
            </select>
          </Field>
        </div>
      </Card>

      <Card className="flex items-start gap-3 bg-pale-blue">
        <Info className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden="true" />
        <p className="text-sm text-primary">
          Exported reports contain anonymised, aggregated figures only. No identifiable participant
          information and no safeguarding records are ever included.
        </p>
      </Card>

      <OutcomesGrid o={outcomes} />
    </div>
  )
}
