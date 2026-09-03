"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useDemo } from "@/lib/store"
import { WEEKS, STEP_STATUS_LABELS } from "@/lib/program"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, Textarea } from "@/components/ui/field"
import { ArrowLeft, Lock } from "lucide-react"

export default function ParticipantRecordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { currentUser, getParticipant, addNote, addOnward, state } = useDemo()
  const record = getParticipant(id)

  const [noteText, setNoteText] = useState("")
  const [noteType, setNoteType] = useState<"session" | "adjustment" | "check-in">("session")
  const [noteSaved, setNoteSaved] = useState(false)

  const [onwardDest, setOnwardDest] = useState("")
  const [onwardType, setOnwardType] = useState<"community" | "volunteering" | "education" | "employment" | "wellbeing">("community")
  const [onwardSaved, setOnwardSaved] = useState(false)

  // Access control: facilitator can only view participants in their assigned cohorts.
  const canAccess =
    record?.user.cohortId && (currentUser?.facilitatorOf ?? []).includes(record.user.cohortId)

  if (!record || !canAccess) {
    return (
      <div className="flex flex-col items-start gap-4">
        <BackLink />
        <Card>
          <p className="text-lg font-semibold text-foreground">Record not available</p>
          <p className="text-muted-foreground">
            You can only view participants in the cohorts assigned to you.
          </p>
        </Card>
      </div>
    )
  }

  function saveNote(e: React.FormEvent) {
    e.preventDefault()
    if (!noteText.trim()) return
    addNote({
      id: `note-${Date.now()}`,
      participantId: id,
      date: new Date().toISOString().slice(0, 10),
      type: noteType,
      text: noteText.trim(),
      author: currentUser?.name ?? "Facilitator",
    })
    setNoteText("")
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 2500)
  }

  function saveOnward(e: React.FormEvent) {
    e.preventDefault()
    if (!onwardDest.trim()) return
    addOnward({
      id: `onward-${Date.now()}`,
      participantId: id,
      date: new Date().toISOString().slice(0, 10),
      destination: onwardDest.trim(),
      type: onwardType,
      notes: "",
      agreed: true,
    })
    setOnwardDest("")
    setOnwardSaved(true)
    setTimeout(() => setOnwardSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      <BackLink />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold text-primary">{record.user.preferredName}</h1>
        <Badge variant="teal">Week {record.currentWeek} of 8</Badge>
      </div>

      {/* Goals — consent gated */}
      <Card>
        <h2 className="text-xl font-bold text-primary">Personal goals</h2>
        {record.shareGoalsWithFacilitator ? (
          record.goals.length ? (
            <ul className="mt-3 flex flex-col gap-3">
              {record.goals.map((g) => (
                <li key={g.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">{g.change}</p>
                    <Badge variant="muted">{STEP_STATUS_LABELS[g.status]}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Smallest step: {g.smallestStep}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-muted-foreground">No goals recorded yet.</p>
          )
        ) : (
          <p className="mt-2 flex items-center gap-2 rounded-lg bg-muted px-4 py-3 text-muted-foreground">
            <Lock className="size-4 shrink-0" aria-hidden="true" />
            This participant has chosen to keep their goals private. Please respect their choice.
          </p>
        )}
      </Card>

      {/* Supportive notes + reasonable adjustments */}
      <Card>
        <h2 className="text-xl font-bold text-primary">Session notes and reasonable adjustments</h2>
        <form onSubmit={saveNote} className="mt-3 flex flex-col gap-3">
          <Field label="Note type" htmlFor="note-type">
            <select
              id="note-type"
              value={noteType}
              onChange={(e) => setNoteType(e.target.value as typeof noteType)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            >
              <option value="session">Supportive session note</option>
              <option value="adjustment">Reasonable adjustment</option>
              <option value="check-in">Private check-in note</option>
            </select>
          </Field>
          <Field label="Note" htmlFor="note-text">
            <Textarea
              id="note-text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={3}
              placeholder="Record something supportive and factual about the session."
            />
          </Field>
          <div className="flex items-center gap-3">
            <Button type="submit" variant="teal" size="sm">
              Save note
            </Button>
            {noteSaved && (
              <span role="status" className="text-sm font-semibold text-success">
                Note saved
              </span>
            )}
          </div>
        </form>

        <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          {state.facilitatorNotes
            .filter((n) => n.participantId === id)
            .map((n) => (
              <li key={n.id} className="rounded-lg bg-muted/50 px-4 py-2 text-sm">
                <span className="font-semibold capitalize text-foreground">{n.type}</span>{" "}
                <span className="text-muted-foreground">· {n.date}</span>
                <p className="text-foreground">{n.text}</p>
              </li>
            ))}
        </ul>
      </Card>

      {/* Onward referral */}
      <Card>
        <h2 className="text-xl font-bold text-primary">Record an agreed onward referral</h2>
        <form onSubmit={saveOnward} className="mt-3 flex flex-col gap-3">
          <Field label="Where to" htmlFor="onward-dest">
            <input
              id="onward-dest"
              value={onwardDest}
              onChange={(e) => setOnwardDest(e.target.value)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
              placeholder="e.g. Riverside volunteering hub"
            />
          </Field>
          <Field label="Type of next step" htmlFor="onward-type">
            <select
              id="onward-type"
              value={onwardType}
              onChange={(e) => setOnwardType(e.target.value as typeof onwardType)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            >
              <option value="community">Community activity</option>
              <option value="volunteering">Volunteering</option>
              <option value="education">Education or training</option>
              <option value="employment">Employment</option>
              <option value="wellbeing">Wellbeing and independence</option>
            </select>
          </Field>
          <div className="flex items-center gap-3">
            <Button type="submit" variant="teal" size="sm">
              Record onward referral
            </Button>
            {onwardSaved && (
              <span role="status" className="text-sm font-semibold text-success">
                Referral recorded
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}

function BackLink() {
  return (
    <Link
      href="/facilitator"
      className="inline-flex items-center gap-2 text-base font-semibold text-teal hover:underline"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Back to cohort overview
    </Link>
  )
}
