"use client"

import { useState } from "react"
import { useDemo } from "@/lib/store"
import { CHECK_IN_QUESTIONS } from "@/lib/program"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConfidenceChart } from "@/components/portal/confidence-chart"
import { CheckInForm } from "@/components/portal/check-in-form"
import { LineChart, Plus } from "lucide-react"
import type { ConfidenceCheckIn } from "@/lib/types"

function scoreText(c: ConfidenceCheckIn, key: string) {
  const v = c[key as keyof ConfidenceCheckIn]
  return typeof v === "number" ? `${v}/10` : "Skipped"
}

const pointLabels: Record<string, string> = {
  baseline: "Starting check-in",
  midpoint: "Midway check-in",
  final: "Final check-in",
  weekly: "Check-in",
}

export default function TrackerPage() {
  const { myRecord } = useDemo()
  const [adding, setAdding] = useState(false)
  if (!myRecord) return null

  const ordered = [...myRecord.checkIns].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <LineChart className="size-7 text-teal" aria-hidden="true" />
          <h1 className="text-3xl font-extrabold text-primary">My confidence tracker</h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
          Checking in helps you notice change over time. There are no right or wrong answers, and you
          can skip any question.
        </p>
      </header>

      <Card className="flex flex-col gap-4 p-6">
        <h2 className="text-xl font-bold text-foreground">Your confidence over time</h2>
        <ConfidenceChart checkIns={myRecord.checkIns} />
      </Card>

      <Card className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground">Your check-ins</h2>
          {!adding && (
            <Button onClick={() => setAdding(true)}>
              <Plus className="size-4" />
              New check-in
            </Button>
          )}
        </div>

        {adding ? (
          <CheckInForm
            participantId={myRecord.user.id}
            week={myRecord.currentWeek}
            point="weekly"
            onDone={() => setTimeout(() => setAdding(false), 1500)}
          />
        ) : ordered.length === 0 ? (
          <p className="rounded-xl bg-muted p-4 text-muted-foreground">
            You have not completed a check-in yet. Start one whenever you feel ready.
          </p>
        ) : (
          <div className="grid gap-3">
            {[...ordered].reverse().map((c) => (
              <div key={c.id} className="rounded-2xl border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-foreground">{pointLabels[c.point] ?? "Check-in"}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(c.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                  {CHECK_IN_QUESTIONS.map((q) => (
                    <div key={q.key} className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2">
                      <dt className="text-sm text-muted-foreground text-pretty">{q.label}</dt>
                      <dd className="shrink-0 font-bold text-foreground">{scoreText(c, q.key)}</dd>
                    </div>
                  ))}
                </dl>
                {c.reflection && (
                  <p className="mt-3 rounded-lg bg-pale-blue px-3 py-2 text-sm text-foreground text-pretty">{c.reflection}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
