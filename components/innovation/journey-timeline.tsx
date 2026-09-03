import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogoPlate } from '@/components/innovation/logo-plate'
import { PullQuote } from '@/components/innovation/pull-quote'
import { Reveal } from '@/components/innovation/reveal'
import { JOURNEY_STAGES } from '@/lib/innovations'
import { cn } from '@/lib/utils'

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
      {children}
    </span>
  )
}

function Chips({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-bold text-primary">{label}</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full bg-pale-teal px-3 py-1.5 text-sm font-semibold text-secondary-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function JourneyTimeline() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Central spine */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-4 top-0 w-0.5 bg-border lg:left-1/2 lg:-translate-x-1/2"
      />

      <ol className="flex flex-col gap-10 lg:gap-4">
        {JOURNEY_STAGES.map((stage, index) => {
          const isLeft = index % 2 === 0
          return (
            <li
              key={stage.number}
              id={`stage-${stage.number}`}
              className="relative scroll-mt-24"
            >
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute left-4 top-0 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary font-heading text-sm font-extrabold text-primary-foreground lg:left-1/2"
              >
                {stage.number}
              </span>

              <Reveal
                className={cn(
                  'ml-12 lg:ml-0 lg:w-1/2',
                  isLeft ? 'lg:mr-auto lg:pr-14' : 'lg:ml-auto lg:pl-14',
                )}
              >
                <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-7">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold uppercase tracking-wide text-teal">
                      Stage {stage.number}
                    </span>
                    <h3 className="text-pretty text-2xl font-extrabold text-primary">
                      {stage.title}
                    </h3>
                  </div>

                  {stage.logo && (
                    <LogoPlate
                      name={stage.logo.name}
                      descriptor={stage.logo.descriptor}
                      accent={stage.logo.accent}
                    />
                  )}

                  {stage.body.map((para, i) => (
                    <p key={i} className="text-left leading-relaxed text-foreground">
                      {para}
                    </p>
                  ))}

                  {stage.reflection && (
                    <PullQuote className="text-lg md:text-xl">{stage.reflection}</PullQuote>
                  )}

                  {stage.feature && (
                    <div className="rounded-xl border-l-4 border-teal bg-pale-teal p-4">
                      <PullQuote className="text-lg md:text-xl">{stage.feature}</PullQuote>
                    </div>
                  )}

                  {stage.principles && <Chips label="Core principles" items={stage.principles} />}
                  {stage.workstreams && (
                    <Chips label="Considered against" items={stage.workstreams} />
                  )}

                  {stage.note && (
                    <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                      {stage.note}
                    </p>
                  )}

                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    {stage.status && <StatusPill>{stage.status}</StatusPill>}
                    {stage.cta && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={stage.cta.href}>{stage.cta.label}</Link>
                      </Button>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
