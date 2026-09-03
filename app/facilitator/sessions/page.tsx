"use client"

import { useState } from "react"
import { WEEKS } from "@/lib/program"
import { COHORT } from "@/lib/demo-data"
import { WeekIcon } from "@/components/week-icon"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function SessionsPage() {
  const [open, setOpen] = useState<number>(1)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Session plans</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Prepare and manage each weekly session for {COHORT.name}.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {WEEKS.map((w) => {
          const expanded = open === w.week
          return (
            <Card key={w.week} className="p-0">
              <button
                type="button"
                onClick={() => setOpen(expanded ? -1 : w.week)}
                aria-expanded={expanded}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pale-teal text-primary">
                  <WeekIcon name={w.icon} className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-teal">Week {w.week}</span>
                  <span className="block text-lg font-bold text-foreground">{w.title}</span>
                </span>
                <ChevronDown
                  className={"size-5 text-muted-foreground transition-transform " + (expanded ? "rotate-180" : "")}
                  aria-hidden="true"
                />
              </button>

              {expanded && (
                <div className="grid gap-6 border-t border-border px-5 py-5 md:grid-cols-2">
                  <div>
                    <h3 className="font-bold text-primary">Focus for facilitators</h3>
                    <ul className="mt-2 flex flex-col gap-1.5 text-muted-foreground">
                      {w.focus.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-teal" aria-hidden="true">
                            •
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    {w.note && (
                      <p className="mt-3 rounded-lg bg-pale-blue px-3 py-2 text-sm text-primary">
                        {w.note}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Activity</h3>
                    <p className="mt-2 text-foreground">{w.activity}</p>
                    {w.activityOptions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {w.activityOptions.map((o) => (
                          <Badge key={o} variant="teal">
                            {o}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h3 className="mt-4 font-bold text-primary">Participant outputs</h3>
                    <ul className="mt-2 flex flex-col gap-1.5 text-muted-foreground">
                      {w.outputs.map((o) => (
                        <li key={o} className="flex gap-2">
                          <span className="text-teal" aria-hidden="true">
                            •
                          </span>
                          {o}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="mt-4" disabled>
                      Download session pack (demo)
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
