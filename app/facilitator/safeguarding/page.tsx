"use client"

import { useState } from "react"
import { useDemo } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, Input, Textarea } from "@/components/ui/field"
import { ShieldAlert, Lock } from "lucide-react"

export default function SafeguardingPage() {
  const { currentUser, state, addSafeguarding } = useDemo()
  const [form, setForm] = useState({
    participantLabel: "",
    concern: "",
    actionTaken: "",
    personNotified: "",
    followUp: "",
  })
  const [saved, setSaved] = useState(false)

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.concern.trim() || !form.participantLabel.trim()) return
    addSafeguarding({
      id: `sg-${Date.now()}`,
      date: new Date().toISOString(),
      participantLabel: form.participantLabel.trim(),
      concern: form.concern.trim(),
      actionTaken: form.actionTaken.trim(),
      personNotified: form.personNotified.trim(),
      followUp: form.followUp.trim(),
      restricted: true,
      author: currentUser?.name ?? "Facilitator",
    })
    setForm({ participantLabel: "", concern: "", actionTaken: "", personNotified: "", followUp: "" })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Safeguarding records</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Restricted access. These records never appear in cohort or impact reports.
        </p>
      </div>

      <Card className="border-2 border-warning/40 bg-warning/5">
        <p className="flex items-start gap-3 text-foreground">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
          <span>
            This platform is not a crisis service and is not monitored continuously. If someone is in
            immediate danger, call 999. Follow your organisation&apos;s safeguarding procedures for any
            urgent concern.
          </span>
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-primary">Record a concern</h2>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-4">
          <Field label="Participant reference" htmlFor="sg-label" hint="Use initials or a reference, not a full name.">
            <Input
              id="sg-label"
              value={form.participantLabel}
              onChange={(e) => update("participantLabel", e.target.value)}
              required
            />
          </Field>
          <Field label="Nature of concern" htmlFor="sg-concern">
            <Textarea
              id="sg-concern"
              rows={3}
              value={form.concern}
              onChange={(e) => update("concern", e.target.value)}
              required
            />
          </Field>
          <Field label="Immediate action taken" htmlFor="sg-action">
            <Textarea
              id="sg-action"
              rows={2}
              value={form.actionTaken}
              onChange={(e) => update("actionTaken", e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Person notified" htmlFor="sg-notified">
              <Input
                id="sg-notified"
                value={form.personNotified}
                onChange={(e) => update("personNotified", e.target.value)}
              />
            </Field>
            <Field label="Follow-up required" htmlFor="sg-follow">
              <Input
                id="sg-follow"
                value={form.followUp}
                onChange={(e) => update("followUp", e.target.value)}
              />
            </Field>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" variant="teal">
              Save restricted record
            </Button>
            {saved && (
              <span role="status" className="text-sm font-semibold text-success">
                Record saved securely
              </span>
            )}
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="flex items-center gap-2 text-xl font-bold text-primary">
          <Lock className="size-5 text-teal" aria-hidden="true" />
          Recorded concerns
        </h2>
        {state.safeguarding.length === 0 ? (
          <p className="mt-2 text-muted-foreground">No safeguarding records.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {state.safeguarding.map((r) => (
              <li key={r.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground">{r.participantLabel}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(r.date).toLocaleString("en-GB")}
                  </span>
                </div>
                <p className="mt-1 text-foreground">{r.concern}</p>
                {r.actionTaken && (
                  <p className="mt-1 text-sm text-muted-foreground">Action: {r.actionTaken}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
