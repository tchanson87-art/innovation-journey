"use client"

import Link from "next/link"
import { useDemo } from "@/lib/store"
import { COHORT } from "@/lib/demo-data"
import { WEEKS } from "@/lib/program"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Users, AlertCircle } from "lucide-react"

export default function FacilitatorOverview() {
  const { currentUser, state } = useDemo()

  // Facilitators only see cohorts they are assigned to.
  const myCohorts = currentUser?.facilitatorOf ?? []
  const participants = state.participants.filter(
    (p) => p.user.cohortId && myCohorts.includes(p.user.cohortId),
  )

  const currentWeek = Math.max(...participants.map((p) => p.currentWeek), 1)
  const week = WEEKS.find((w) => w.week === currentWeek)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Cohort overview</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          You are viewing only the cohorts assigned to you.
        </p>
      </div>

      {/* Cohort summary */}
      <Card className="bg-pale-blue">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-primary">{COHORT.name}</h2>
            <Badge variant="teal">Week {currentWeek} of 8</Badge>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-5 text-teal" aria-hidden="true" />
              <div>
                <dt className="text-sm text-muted-foreground">Sessions</dt>
                <dd className="font-semibold text-foreground">{COHORT.dayTime}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 text-teal" aria-hidden="true" />
              <div>
                <dt className="text-sm text-muted-foreground">Location</dt>
                <dd className="font-semibold text-foreground">{COHORT.location}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-5 text-teal" aria-hidden="true" />
              <div>
                <dt className="text-sm text-muted-foreground">Participants</dt>
                <dd className="font-semibold text-foreground">{participants.length} enrolled</dd>
              </div>
            </div>
          </dl>
          {week && (
            <p className="rounded-xl bg-background/70 px-4 py-3 text-foreground">
              <span className="font-semibold text-primary">This week:</span> {week.title} —{" "}
              {week.activity}
            </p>
          )}
        </div>
      </Card>

      {/* Participant cards — minimum information only */}
      <div>
        <h2 className="mb-3 text-xl font-bold text-primary">Participants</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {participants.map((p) => {
            const needsCheckIn = p.checkIns.some((c) => {
              const answered = [c.confident, c.connected, c.askForHelp, c.decisions, c.nextStep].filter(
                (n): n is number => typeof n === "number",
              )
              return answered.length > 0 && answered.some((n) => n <= 3)
            })
            return (
              <Card key={p.user.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg font-bold text-foreground">{p.user.preferredName}</span>
                  <Badge variant="muted">Week {p.currentWeek}</Badge>
                </div>

                {needsCheckIn && (
                  <p className="flex items-center gap-2 rounded-lg bg-warning/10 px-3 py-2 text-sm font-semibold text-warning">
                    <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                    May benefit from a private check-in
                  </p>
                )}

                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Reasonable adjustments</p>
                  <p>{adjustmentFor(p.user.id) ?? "None recorded"}</p>
                </div>

                <div className="text-sm">
                  <p className="font-semibold text-foreground">Goals shared with facilitator</p>
                  {p.shareGoalsWithFacilitator ? (
                    p.goals.length ? (
                      <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                        {p.goals.slice(0, 2).map((g) => (
                          <li key={g.id}>{g.change}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No goals recorded yet</p>
                    )
                  ) : (
                    <p className="italic text-muted-foreground">
                      Not shared — this participant has chosen to keep goals private
                    </p>
                  )}
                </div>

                <div className="mt-auto flex gap-2 pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/facilitator/participant/${p.user.id}`}>Open record</Link>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )

  function adjustmentFor(pid: string): string | null {
    const note = state.facilitatorNotes.find(
      (n) => n.participantId === pid && n.type === "adjustment",
    )
    return note?.text ?? null
  }
}
