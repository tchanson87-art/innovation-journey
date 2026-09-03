"use client"

import { useState } from "react"
import { useDemo } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/field"
import { Sparkles, Star, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StrengthsPage() {
  const { myRecord, addStrength, toggleStrengthValued } = useDemo()
  const [label, setLabel] = useState("")
  const [source, setSource] = useState("")
  if (!myRecord) return null

  const valuedCount = myRecord.strengths.filter((s) => s.valued).length

  function add(event: React.FormEvent) {
    event.preventDefault()
    if (!label.trim()) return
    addStrength(myRecord!.user.id, {
      id: `str-${Date.now()}`,
      participantId: myRecord!.user.id,
      label: label.trim(),
      source: source.trim() || "Added by me",
      week: myRecord!.currentWeek,
      valued: false,
    })
    setLabel("")
    setSource("")
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-7 text-teal" aria-hidden="true" />
          <h1 className="text-3xl font-extrabold text-primary">My strengths profile</h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
          Your experience contains strengths. These are the qualities you have gathered through the
          programme and through your own life. Mark the ones you value most in yourself.
        </p>
      </header>

      <Card className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-foreground">My strengths</h2>
          <span className="text-sm text-muted-foreground">
            {valuedCount} highlighted as ones you value
          </span>
        </div>

        {myRecord.strengths.length === 0 ? (
          <p className="rounded-xl bg-muted p-4 text-muted-foreground">
            You have not added any strengths yet. Add your first one below, or they will be gathered as
            you move through the weeks.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {myRecord.strengths.map((s) => (
              <li
                key={s.id}
                className={cn(
                  "flex items-start justify-between gap-3 rounded-2xl border-2 p-4",
                  s.valued ? "border-teal/40 bg-teal-soft" : "border-border bg-background",
                )}
              >
                <div>
                  <p className="font-bold text-foreground">{s.label}</p>
                  <p className="text-sm text-muted-foreground text-pretty">From: {s.source}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleStrengthValued(myRecord.user.id, s.id)}
                  aria-pressed={s.valued}
                  className="shrink-0 rounded-full p-2 text-teal hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={s.valued ? `Remove ${s.label} from valued strengths` : `Mark ${s.label} as a strength you value`}
                >
                  <Star className={cn("size-6", s.valued && "fill-teal")} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="flex flex-col gap-4 p-6">
        <h2 className="text-xl font-bold text-foreground">Add a strength</h2>
        <form onSubmit={add} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div className="flex flex-col gap-2">
            <label htmlFor="strength-label" className="text-base font-semibold text-foreground">
              A quality or skill
            </label>
            <Input id="strength-label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="For example, kind" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="strength-source" className="text-base font-semibold text-foreground">
              Where does it come from? (optional)
            </label>
            <Input id="strength-source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="For example, caring for others" />
          </div>
          <Button type="submit">
            <Plus className="size-4" />
            Add
          </Button>
        </form>
      </Card>
    </div>
  )
}
