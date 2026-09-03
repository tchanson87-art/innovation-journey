'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/founder-story', label: 'Founder’s Story' },
  { href: '/innovation-journey', label: 'My Innovation Journey' },
  { href: '/journey', label: 'Programme Journey' },
  { href: '/who-its-for', label: 'Who It Is For' },
  { href: '/for-organisations', label: 'For Organisations' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="no-print sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Social Innovation CIC home">
          <Image
            src="/images/social-innovation-cic-logo.png"
            alt="Social Innovation CIC logo"
            width={80}
            height={80}
            priority
            className="size-11 rounded-full bg-white object-contain ring-1 ring-border"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-heading text-lg font-extrabold text-primary">Social Innovation CIC</span>
            <span className="text-xs font-semibold text-teal">Think · Believe · Attract · Become</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-3 py-2 text-base font-semibold text-foreground transition-colors hover:bg-pale-blue',
                pathname === item.href && 'bg-pale-blue text-primary',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/refer-yourself">Refer yourself</Link>
          </Button>
          <button
            className="inline-flex size-11 items-center justify-center rounded-xl border-2 border-border text-primary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background px-4 pb-4 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-lg font-semibold hover:bg-pale-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2">
              <Button asChild variant="outline">
                <Link href="/sign-in" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button asChild>
                <Link href="/refer-yourself" onClick={() => setOpen(false)}>
                  Refer yourself
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
