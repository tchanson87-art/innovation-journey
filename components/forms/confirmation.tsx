import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Confirmation({
  title,
  message,
  reference,
}: {
  title: string
  message: string
  reference?: string
}) {
  return (
    <div
      role="status"
      className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-3xl border-2 border-success/30 bg-success/5 p-8 text-center"
    >
      <CheckCircle2 className="size-14 text-success" aria-hidden="true" />
      <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
      <p className="text-lg text-foreground">{message}</p>
      {reference && (
        <p className="rounded-xl bg-card px-4 py-2 font-mono text-sm font-semibold text-muted-foreground">
          Reference: {reference}
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/journey">Explore the journey</Link>
        </Button>
      </div>
    </div>
  )
}
