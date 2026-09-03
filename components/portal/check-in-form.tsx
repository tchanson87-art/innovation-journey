"use client"

import { useState } from "react"
import { useDemo } from "@/lib/store"
import { CHECK_IN_QUESTIONS } from "@/lib/program"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ConfidenceCheckIn } from "@/lib/types"

type Answers = Record<string, number | null>

export function CheckInForm({
  participantId,
  week,
  point,
  onDone,
}: {
  participantId: string
  week: number
  point: ConfidenceCheckIn["point"]
  onDone?: () => void
}) {
  const { addCheckIn } = useDemo()
  const [answers, setAnswers] = useState<Answers>(
    Object.fromEntries(CHECK_IN_QUESTIONS.map((q) => [q.key, null])),
  )
  const [reflection, setReflection] = useState("")
  const [saved, setSaved] = useState(false)

  function submit(event: React.FormEvent) {
    event.preventDefault()
    addCheckIn(participantId, {
      id: `ci-${Date.now()}`,
      participantId,
      point,
      week,
      date: new Date().toISOString().slice(0, 10),
      confident: answers.confident,
      connected: answers.connected,
      askForHelp: answers.askForHelp,
      decisions: answers.decisions,
      nextStep: answers.nextStep,
      reflection: reflection.trim() || undefined,
    })
    setSaved(true)
    onDone?.()
  }

  if (saved) {
    return (
      <div role="status" className="rounded-2xl border-2 border-success/30 bg-success/5 p-5 text-foreground">
        <p className="font-bold">Thank you for checking in.</p>
        <p className="text-muted-foreground">There are no right or wrong answers. Your responses have been saved.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <p className="rounded-xl bg-pale-blue p-4 text-foreground">
        There are no right or wrong answers. Choose the number that feels right today, or skip any
        question you would rather not answer.
      </p>

      {CHECK_IN_QUESTIONS.map((q) => (
        <fieldset key={q.key} className="flex flex-col gap-3">
          <legend className="text-base font-semibold text-foreground">{q.label}</legend>
          <div className="flex flex-wrap items-center gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
              const selected = answers[q.key] === n
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`${q.label} — ${n} out of 10`}
                  onClick={() => setAnswers((a) => ({ ...a, [q.key]: selected ? null : n }))}
                  className={cn(
                    "size-11 rounded-xl border-2 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                    selected
                      ? "border-teal bg-teal text-teal-foreground"
                      : "border-input bg-background text-foreground hover:border-teal/50",
                  )}
                >
                  {n}
                </button>
              )
            })}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Not at all</span>
            <button
              type="button"
              onClick={() => setAnswers((a) => ({ ...a, [q.key]: null }))}
              className="font-semibold text-teal underline underline-offset-2"
            >
              Skip this question
            </button>
            <span>Very much</span>
          </div>
        </fieldset>
      ))}

      <div className="flex flex-col gap-2">
        <label htmlFor="checkin-reflection" className="text-base font-semibold text-foreground">
          Anything you would like to add? (optional)
        </label>
        <textarea
          id="checkin-reflection"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          className="w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-base focus-visible:border-ring focus-visible:outline-none"
        />
      </div>

      <div>
        <Button type="submit" size="lg">
          Save my check-in
        </Button>
      </div>
    </form>
  )
}
