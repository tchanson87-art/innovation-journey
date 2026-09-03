'use client'

import { useState } from 'react'
import { Check, ListChecks, Target, Info } from 'lucide-react'
import { WEEKS } from '@/lib/program'
import { WeekIcon } from '@/components/week-icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function JourneyExplorer() {
  const [active, setActive] = useState(1)
  const week = WEEKS.find((w) => w.week === active)!

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Step selector */}
      <ol className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" aria-label="Programme weeks">
        {WEEKS.map((w) => {
          const isActive = w.week === active
          return (
            <li key={w.week} className="shrink-0 lg:shrink">
              <button
                onClick={() => setActive(w.week)}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'flex w-56 items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors lg:w-full',
                  isActive
                    ? 'border-teal bg-pale-teal'
                    : 'border-border bg-card hover:border-teal/40 hover:bg-pale-blue',
                )}
              >
                <span
                  className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-xl',
                    isActive ? 'bg-teal text-teal-foreground' : 'bg-pale-teal text-teal',
                  )}
                >
                  <WeekIcon name={w.icon} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-bold uppercase tracking-wide text-teal">
                    Week {w.week}
                  </span>
                  <span className="font-bold text-foreground">{w.title}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      {/* Detail panel */}
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <WeekIcon name={week.icon} className="size-7" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-teal">Week {week.week}</p>
            <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">{week.title}</h2>
          </div>
        </div>

        {week.note && (
          <p className="mt-6 flex items-start gap-2 rounded-2xl bg-pale-blue p-4 text-sm font-medium text-primary">
            <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {week.note}
          </p>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-primary">
              <ListChecks className="size-5 text-teal" aria-hidden="true" />
              Focus
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {week.focus.map((f) => (
                <li key={f} className="flex items-start gap-2 text-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-teal" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-6">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-primary">
                <Target className="size-5 text-teal" aria-hidden="true" />
                Activity
              </h3>
              <p className="mt-3 text-foreground">{week.activity}</p>
              {week.activityOptions && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {week.activityOptions.map((o) => (
                    <li key={o}>
                      <Badge variant="teal">{o}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">What you take away</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {week.outputs.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-2 rounded-xl bg-pale-teal px-3 py-2 font-medium text-secondary-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
