import { Info } from 'lucide-react'

export function DemoBanner() {
  return (
    <div className="no-print bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-sm font-semibold">
        <Info className="size-4 shrink-0" aria-hidden="true" />
        <span>Demonstration platform — all names, records and data shown are fictional.</span>
      </div>
    </div>
  )
}

export function DemoTag({ className }: { className?: string }) {
  return (
    <span
      className={
        'inline-flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-warning ' +
        (className ?? '')
      }
    >
      Demonstration data
    </span>
  )
}
