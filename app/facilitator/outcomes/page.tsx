"use client"

import { useDemo } from "@/lib/store"
import { computeOutcomes } from "@/lib/outcomes"
import { COHORT } from "@/lib/demo-data"
import { OutcomesGrid } from "@/components/outcomes-grid"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Info, Printer } from "lucide-react"

export default function FacilitatorOutcomes() {
  const { currentUser, state } = useDemo()
  const myCohorts = currentUser?.facilitatorOf ?? []
  const participants = state.participants.filter(
    (p) => p.user.cohortId && myCohorts.includes(p.user.cohortId),
  )
  const onward = state.onward.filter((o) =>
    participants.some((p) => p.user.id === o.participantId),
  )
  const outcomes = computeOutcomes(participants, state.referrals, onward)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Cohort impact report</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {COHORT.name} — anonymised summary
          </p>
        </div>
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="size-5" aria-hidden="true" />
          Print or save as PDF
        </Button>
      </div>

      <Card className="flex items-start gap-3 bg-pale-blue">
        <Info className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden="true" />
        <p className="text-sm text-primary">
          This report contains anonymised, aggregated figures only. No identifiable participant
          information is shown, and safeguarding records are never included.
        </p>
      </Card>

      <OutcomesGrid o={outcomes} />
    </div>
  )
}
