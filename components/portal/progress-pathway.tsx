"use client"

import Link from "next/link"
import type { WeekProgress } from "@/lib/types"
import { WEEKS } from "@/lib/program"
import { WeekIcon } from "@/components/week-icon"
import { cn } from "@/lib/utils"
import { Check, Lock } from "lucide-react"

const statusLabel: Record<WeekProgress["status"], string> = {
  complete: "Completed",
  "in-progress": "In progress",
  available: "Ready to begin",
  locked: "Coming soon",
}

export function ProgressPathway({ weekProgress }: { weekProgress: WeekProgress[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {WEEKS.map((week) => {
        const progress = weekProgress.find((w) => w.week === week.week)
        const status = progress?.status ?? "locked"
        const locked = status === "locked"
        const complete = status === "complete"

        const inner = (
          <div
            className={cn(
              "flex h-full items-start gap-4 rounded-2xl border-2 p-4 transition-colors",
              complete && "border-teal/40 bg-teal-soft",
              status === "in-progress" && "border-primary bg-pale-blue",
              status === "available" && "border-border bg-background hover:border-teal/50",
              locked && "border-dashed border-border bg-muted/50",
            )}
          >
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl",
                complete ? "bg-teal text-teal-foreground" : locked ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground",
              )}
            >
              {complete ? <Check className="size-6" /> : locked ? <Lock className="size-5" /> : <WeekIcon name={week.icon} className="size-6" />}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-muted-foreground">Week {week.week}</p>
              <p className="font-bold text-foreground text-balance">{week.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{statusLabel[status]}</p>
            </div>
          </div>
        )

        return (
          <li key={week.week}>
            {locked ? (
              <div aria-disabled className="cursor-not-allowed">
                {inner}
              </div>
            ) : (
              <Link
                href={`/portal/week/${week.week}`}
                className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {inner}
              </Link>
            )}
          </li>
        )
      })}
    </ol>
  )
}
