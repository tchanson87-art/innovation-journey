import Link from 'next/link'
import { BrandMark } from '@/components/brand-mark'
import { ORG } from '@/lib/program'

const COLUMNS = [
  {
    heading: 'Programme',
    links: [
      { href: '/about', label: 'About' },
      { href: '/founder-story', label: 'Founder’s Story' },
      { href: '/innovation-journey', label: 'My Innovation Journey' },
      { href: '/journey', label: 'Programme Journey' },
      { href: '/who-its-for', label: 'Who It Is For' },
      { href: '/for-organisations', label: 'For Organisations' },
    ],
  },
  {
    heading: 'Get involved',
    links: [
      { href: '/refer-yourself', label: 'Refer Yourself' },
      { href: '/professional-referral', label: 'Professional Referral' },
      { href: '/contact', label: 'Contact' },
      { href: '/sign-in', label: 'Sign In' },
    ],
  },
  {
    heading: 'Support & policies',
    links: [
      { href: '/safeguarding', label: 'Safeguarding & Urgent Support' },
      { href: '/privacy', label: 'Privacy Notice' },
      { href: '/accessibility', label: 'Accessibility Statement' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-pale-blue">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <BrandMark className="size-10" />
            <div className="leading-tight">
              <p className="font-heading font-extrabold text-primary">Small Steps</p>
              <p className="text-sm font-semibold text-teal">Confidence Programme</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Created and delivered by {ORG.name}.
          </p>
          <p className="text-sm font-semibold text-primary">Prevention Is the Cure</p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-primary">{col.heading}</h2>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          This is a demonstration build using fictional data. It is not described as legally
          compliant until it has undergone proper governance, security and data-protection review.
        </div>
      </div>
    </footer>
  )
}
