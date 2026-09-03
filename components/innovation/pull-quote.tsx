import { cn } from '@/lib/utils'

/** Short, elegant serif pull-quote. Only for brief quotes — never long body copy. */
export function PullQuote({
  children,
  tone = 'light',
  className,
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <blockquote
      className={cn(
        'font-serif text-xl italic leading-relaxed md:text-2xl',
        tone === 'dark' ? 'text-primary-foreground' : 'text-primary',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'mb-2 block text-4xl not-italic leading-none',
          tone === 'dark' ? 'text-gold-bright' : 'text-gold',
        )}
      >
        &ldquo;
      </span>
      {children}
    </blockquote>
  )
}
