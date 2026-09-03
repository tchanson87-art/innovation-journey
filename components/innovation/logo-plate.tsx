import { cn } from '@/lib/utils'

export type PlateAccent = 'navy' | 'teal' | 'gold'

const accentBar: Record<PlateAccent, string> = {
  navy: 'bg-primary',
  teal: 'bg-teal',
  gold: 'bg-gold',
}

const accentText: Record<PlateAccent, string> = {
  navy: 'text-primary',
  teal: 'text-teal',
  gold: 'text-gold',
}

/**
 * A branded name-plate that stands in for a supplied programme/project logo.
 * When real logo artwork is provided it can replace this component 1:1 without
 * any other layout change. It never crops, distorts or recolours real logos —
 * it simply reserves a correctly-proportioned, on-brand slot for them.
 */
export function LogoPlate({
  name,
  descriptor,
  accent = 'teal',
  className,
}: {
  name: string
  descriptor?: string
  accent?: PlateAccent
  className?: string
}) {
  return (
    <div
      className={cn(
        'inline-flex flex-col items-start gap-2 rounded-xl border-2 border-border bg-card px-4 py-3 shadow-sm',
        className,
      )}
      role="img"
      aria-label={`${name} logo${descriptor ? ` — ${descriptor}` : ''}`}
    >
      <span className={cn('h-1.5 w-10 rounded-full', accentBar[accent])} aria-hidden="true" />
      <span className={cn('font-heading text-lg font-extrabold leading-tight', accentText[accent])}>
        {name}
      </span>
      {descriptor && (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {descriptor}
        </span>
      )}
    </div>
  )
}
