"use client"

import { useState } from "react"
import { useDemo } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/field"
import { Settings, Lock, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

function Toggle({
  id,
  checked,
  onChange,
  label,
  description,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border-2 border-border p-4">
      <div>
        <label htmlFor={id} className="text-base font-bold text-foreground">
          {label}
        </label>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-1 inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          checked ? "bg-teal" : "bg-muted-foreground/40",
        )}
      >
        <span className="sr-only">{label}</span>
        <span className={cn("inline-block size-6 transform rounded-full bg-background transition-transform", checked ? "translate-x-7" : "translate-x-1")} />
      </button>
    </div>
  )
}

export default function PrivacyControlsPage() {
  const { myRecord, setSharing, addReflection } = useDemo()
  const [text, setText] = useState("")
  if (!myRecord) return null

  function saveReflection(event: React.FormEvent) {
    event.preventDefault()
    if (!text.trim()) return
    addReflection(myRecord!.user.id, text.trim())
    setText("")
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Settings className="size-7 text-teal" aria-hidden="true" />
          <h1 className="text-3xl font-extrabold text-primary">Sharing and privacy</h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
          You are in control of what you share. You can change these choices at any time.
        </p>
      </header>

      <Card className="flex flex-col gap-4 p-6">
        <h2 className="text-xl font-bold text-foreground">What I choose to share with my facilitator</h2>
        <Toggle
          id="share-goals"
          checked={myRecord.shareGoalsWithFacilitator}
          onChange={(v) => setSharing(myRecord.user.id, "shareGoalsWithFacilitator", v)}
          label="Share my goals"
          description="Let your facilitator see your goals and small steps so they can support you. Turn this off to keep them private."
        />
        <Toggle
          id="share-reflections"
          checked={myRecord.shareReflections}
          onChange={(v) => setSharing(myRecord.user.id, "shareReflections", v)}
          label="Share reflections I mark as shared"
          description="Even with this on, only reflections you specifically choose to share are visible. Everything else stays private to you."
        />
      </Card>

      <Card className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2">
          <Lock className="size-5 text-teal" aria-hidden="true" />
          <h2 className="text-xl font-bold text-foreground">My private reflections</h2>
        </div>
        <p className="text-muted-foreground text-pretty">
          These are for you alone. They are visible only to you unless you actively choose to share a
          specific entry. They are never used to train AI systems.
        </p>

        <form onSubmit={saveReflection} className="flex flex-col gap-3">
          <label htmlFor="reflection" className="sr-only">
            Write a private reflection
          </label>
          <Textarea
            id="reflection"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write anything you would like to remember or think through…"
          />
          <div>
            <Button type="submit">
              <Plus className="size-4" />
              Save reflection
            </Button>
          </div>
        </form>

        {myRecord.privateReflections.length > 0 && (
          <ul className="grid gap-3">
            {myRecord.privateReflections.map((r) => (
              <li key={r.id} className="rounded-2xl bg-muted/50 p-4">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                    {r.shared ? "Shared" : "Private to me"}
                  </span>
                </div>
                <p className="text-foreground text-pretty">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="flex flex-col gap-3 p-6">
        <h2 className="text-xl font-bold text-foreground">Your data rights</h2>
        <p className="text-muted-foreground text-pretty">
          You can ask us to correct your information, or request that your account is deactivated or
          deleted. We follow UK GDPR principles and never sell your data.
        </p>
        <div>
          <Button asChild variant="outline" size="sm">
            <Link href="/privacy">Read the full privacy notice</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
