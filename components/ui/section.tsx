import * as React from 'react'
import { cn } from '@/lib/utils'

const tones = {
  white: 'bg-background',
  'pale-blue': 'bg-pale-blue',
  blue: 'bg-pale-blue',
  'pale-teal': 'bg-pale-teal',
  teal: 'bg-pale-teal',
  navy: 'bg-primary text-primary-foreground',
}

const widths = {
  default: 'max-w-6xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-6xl',
}

export function Section({
  tone = 'white',
  width = 'default',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: keyof typeof tones; width?: keyof typeof widths }) {
  return (
    <section className={cn(tones[tone], 'py-14 md:py-20', className)} {...props}>
      <div className={cn('mx-auto w-full px-4 sm:px-6', widths[width])}>{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  centered,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  centered?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-3', centered && 'items-center text-center', className)}>
      {eyebrow && (
        <span className="text-sm font-bold uppercase tracking-wide text-teal">{eyebrow}</span>
      )}
      <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">{title}</h2>
      {description && (
        <p className={cn('max-w-2xl text-lg text-muted-foreground', centered && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
