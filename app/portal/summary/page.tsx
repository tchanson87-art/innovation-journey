"use client"

import { useDemo } from "@/lib/store"
import { WEEKS, CHECK_IN_QUESTIONS, STEP_STATUS_LABELS, ORG } from "@/lib/program"
import { Button } from "@/components/ui/button"
import { BrandMark } from "@/components/brand-mark"
import { Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { ConfidenceCheckIn } from "@/lib/types"

function avg(c?: ConfidenceCheckIn): string {
  if (!c) return "—"
  const vals = CHECK_IN_QUESTIONS.map((q) => c[q.key as keyof ConfidenceCheckIn] as number | null).filter(
    (v): v is number => typeof v === "number",
  )
  if (!vals.length) return "—"
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) + " / 10"
}

export default function SummaryPage() {
  const { myRecord } = useDemo()
  if (!myRecord) return null

  const baseline = myRecord.checkIns.find((c) => c.point === "baseline")
  const latest = [...myRecord.checkIns].sort((a, b) => a.date.localeCompare(b.date)).at(-1)
  const completed = myRecord.weekProgress.filter((w) => w.status === "complete").length
  const valued = myRecord.strengths.filter((s) => s.valued)
  const goalsDone = myRecord.goals.filter((g) => g.status === "completed")

  return (
    <div className="flex flex-col gap-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/portal">
            <ArrowLeft className="size-4" />
            Back to my dashboard
          </Link>
        </Button>
        <Button onClick={() => window.print()}>
          <Printer className="size-4" />
          Print or save as PDF
        </Button>
      </div>

      <article className="print-sheet mx-auto w-full max-w-3xl rounded-3xl border border-border bg-background p-8 md:p-10">
        <header className="flex items-center gap-4 border-b-2 border-primary/15 pb-6">
          <BrandMark className="size-12" />
          <div>
            <p className="text-sm font-semibold text-teal">{ORG.name}</p>
            <h1 className="text-2xl font-extrabold text-primary">Personal progress summary</h1>
            <p className="text-muted-foreground">{ORG.programme}</p>
          </div>
        </header>

        <section className="grid gap-1 py-6">
          <h2 className="text-lg font-bold text-foreground">Prepared for {myRecord.user.preferredName}</h2>
          <p className="text-muted-foreground">
            Riverside Spring Cohort · Generated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Weeks completed", value: `${completed} of 8` },
            { label: "Confidence at start", value: avg(baseline) },
            { label: "Most recent confidence", value: avg(latest) },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-pale-blue p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-extrabold text-primary">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 flex flex-col gap-3">
          <h2 className="text-lg font-bold text-foreground">Strengths I value in myself</h2>
          {valued.length ? (
            <ul className="flex flex-wrap gap-2">
              {valued.map((s) => (
                <li key={s.id} className="rounded-full bg-teal-soft px-3 py-1.5 text-sm font-semibold text-primary">
                  {s.label}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">To be added as the programme continues.</p>
          )}
        </section>

        <section className="mt-6 flex flex-col gap-3">
          <h2 className="text-lg font-bold text-foreground">Goals and small steps</h2>
          {myRecord.goals.length ? (
            <ul className="grid gap-2">
              {myRecord.goals.map((g) => (
                <li key={g.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-foreground text-pretty">{g.change}</span>
                    <span className="shrink-0 text-sm text-muted-foreground">{STEP_STATUS_LABELS[g.status]}</span>
                  </div>
                  {g.smallestStep && <p className="text-sm text-muted-foreground text-pretty">Step: {g.smallestStep}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No goals recorded yet.</p>
          )}
        </section>

        <section className="mt-6 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-foreground">Weeks explored</h2>
          <p className="text-muted-foreground text-pretty">
            {WEEKS.filter((w) => myRecord.weekProgress.find((p) => p.week === w.week)?.status === "complete")
              .map((w) => `Week ${w.week}: ${w.title}`)
              .join(" · ") || "Your journey is just beginning."}
          </p>
        </section>

        <footer className="mt-8 border-t border-border pt-4 text-sm text-muted-foreground">
          <p>{goalsDone.length} goal{goalsDone.length === 1 ? "" : "s"} completed. Small steps create big changes.</p>
          <p className="mt-1">This summary reflects your own progress. Perfect attendance is not required for recognition.</p>
        </footer>
      </article>
    </div>
  )
}
