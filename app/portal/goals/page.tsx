"use client"

import { useState } from "react"
import { useDemo } from "@/lib/store"
import { STEP_STATUS_LABELS } from "@/lib/program"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/field"
import type { Goal, StepStatus } from "@/lib/types"
import { Target, Plus, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_ORDER: StepStatus[] = ["not-started", "thinking", "in-progress", "completed", "changed-mind"]

const statusStyle: Record<StepStatus, string> = {
  "not-started": "bg-muted text-foreground",
  thinking: "bg-pale-blue text-primary",
  "in-progress": "bg-teal-soft text-primary",
  completed: "bg-success/10 text-success",
  "changed-mind": "bg-warning/10 text-warning",
}

const QUESTIONS: { key: keyof Goal; label: string; hint?: string; long?: boolean }[] = [
  { key: "change", label: "What would I like to change or achieve?", long: true },
  { key: "why", label: "Why does this matter to me?", long: true },
  { key: "smallestStep", label: "What is the smallest step I could take?", long: true },
  { key: "help", label: "Who or what could help me?" },
  { key: "when", label: "When will I try it?" },
  { key: "howItWent", label: "How did it go?", hint: "Come back to this after you have tried.", long: true },
  { key: "next", label: "What will I do next?", long: true },
]

function emptyGoal(participantId: string, week: number): Goal {
  return {
    id: `goal-${Date.now()}`,
    participantId,
    week,
    change: "",
    why: "",
    smallestStep: "",
    help: "",
    when: "",
    howItWent: "",
    next: "",
    status: "not-started",
    updatedAt: new Date().toISOString().slice(0, 10),
  }
}

export default function GoalsPage() {
  const { myRecord, upsertGoal, setGoalStatus } = useDemo()
  const [editing, setEditing] = useState<Goal | null>(null)
  if (!myRecord) return null

  function startNew() {
    setEditing(emptyGoal(myRecord!.user.id, myRecord!.currentWeek))
  }

  function save(event: React.FormEvent) {
    event.preventDefault()
    if (!editing || !editing.change.trim()) return
    upsertGoal(myRecord!.user.id, { ...editing, updatedAt: new Date().toISOString().slice(0, 10) })
    setEditing(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Target className="size-7 text-teal" aria-hidden="true" />
          <h1 className="text-3xl font-extrabold text-primary">My goals and small steps</h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
          A goal is simply something you would like to work towards. Break it into the smallest step
          that feels manageable. Changing your mind is always a valid choice, not a failure.
        </p>
      </header>

      {!editing && (
        <div>
          <Button onClick={startNew} size="lg">
            <Plus className="size-5" />
            Start a new goal
          </Button>
        </div>
      )}

      {editing && (
        <Card className="flex flex-col gap-5 border-2 border-teal/30 p-6">
          <h2 className="text-xl font-bold text-foreground">My goal</h2>
          <form onSubmit={save} className="flex flex-col gap-5">
            {QUESTIONS.map((q) => (
              <div key={q.key} className="flex flex-col gap-2">
                <label htmlFor={`goal-${q.key}`} className="text-base font-semibold text-foreground">
                  {q.label}
                </label>
                {q.hint && <p className="text-sm text-muted-foreground">{q.hint}</p>}
                {q.long ? (
                  <Textarea
                    id={`goal-${q.key}`}
                    rows={2}
                    value={editing[q.key] as string}
                    onChange={(e) => setEditing({ ...editing, [q.key]: e.target.value })}
                  />
                ) : (
                  <Input
                    id={`goal-${q.key}`}
                    value={editing[q.key] as string}
                    onChange={(e) => setEditing({ ...editing, [q.key]: e.target.value })}
                  />
                )}
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <span className="text-base font-semibold text-foreground">How is this step going?</span>
              <div className="flex flex-wrap gap-2">
                {STATUS_ORDER.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={editing.status === s}
                    onClick={() => setEditing({ ...editing, status: s })}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      editing.status === s ? statusStyle[s] + " ring-2 ring-primary/40" : "bg-muted text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {STEP_STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save my goal</Button>
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Existing goals */}
      {!editing && (
        <div className="grid gap-4">
          {myRecord.goals.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              You have not set a goal yet. There is no rush — start one whenever you feel ready.
            </Card>
          ) : (
            myRecord.goals.map((g) => (
              <Card key={g.id} className="flex flex-col gap-4 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Week {g.week}</p>
                    <h3 className="text-xl font-bold text-foreground text-balance">{g.change}</h3>
                  </div>
                  <span className={cn("rounded-full px-3 py-1.5 text-sm font-semibold", statusStyle[g.status])}>
                    {STEP_STATUS_LABELS[g.status]}
                  </span>
                </div>
                {g.why && <p className="text-muted-foreground text-pretty"><span className="font-semibold text-foreground">Why: </span>{g.why}</p>}
                {g.smallestStep && (
                  <p className="rounded-xl bg-pale-blue p-3 text-foreground text-pretty">
                    <span className="font-semibold">Smallest step: </span>{g.smallestStep}
                  </p>
                )}
                {g.howItWent && <p className="text-muted-foreground text-pretty"><span className="font-semibold text-foreground">How it went: </span>{g.howItWent}</p>}

                <div className="flex flex-col gap-3 border-t border-border pt-4">
                  <span className="text-sm font-semibold text-foreground">Update how this step is going:</span>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_ORDER.map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={g.status === s}
                        onClick={() => setGoalStatus(myRecord.user.id, g.id, s)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          g.status === s ? statusStyle[s] + " ring-2 ring-primary/40" : "bg-muted text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {STEP_STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => setEditing(g)}>
                      <Pencil className="size-4" />
                      Edit this goal
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
