import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('size-10', className)}
      role="img"
      aria-label="Small Steps Confidence Programme"
    >
      <rect width="64" height="64" rx="16" fill="var(--primary)" />
      <circle cx="22" cy="42" r="6" fill="var(--teal)" />
      <circle cx="33" cy="31" r="5" fill="#7bb5b0" />
      <circle cx="43" cy="22" r="4" fill="#ffffff" />
      <path
        d="M17 46 L30 34 L41 25 L49 18"
        stroke="#ffffff"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="1 6"
      />
    </svg>
  )
}
