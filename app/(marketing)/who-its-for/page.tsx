import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section, SectionHeading } from '@/components/ui/section'
import { PageHero } from '@/components/page-hero'
import { SUPPORTS } from '@/lib/program'

export const metadata: Metadata = {
  title: 'Who It Is For',
  description:
    'Small Steps welcomes any adult who would like to rebuild confidence. No diagnosis, qualification or employment history is required.',
}

const WELCOME = [
  'Adults who feel isolated or lack confidence in groups',
  'People returning to work, learning or community life',
  'Parents and carers who have put themselves last',
  'Anyone rebuilding after a difficult period',
  'People who feel nervous about services or appointments',
  'Those who simply want a supportive place to start',
]

export default function WhoItsForPage() {
  return (
    <>
      <PageHero
        eyebrow="Who it is for"
        title="Everyone is welcome here"
        description="Small Steps is for any adult who would like to feel more confident in everyday life. You do not need to have any particular background."
      />

      <Section>
        <SectionHeading eyebrow="You might join if" title="This programme could be for you" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {WELCOME.map((w) => (
            <li key={w}>
              <Card className="h-full">
                <CardContent className="flex items-start gap-3 p-5">
                  <HeartHandshake className="mt-0.5 size-6 shrink-0 text-teal" aria-hidden="true" />
                  <span className="text-lg font-medium">{w}</span>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="pale-teal">
        <SectionHeading
          eyebrow="Common experiences"
          title="People often join while experiencing"
          description="You are welcome whatever your situation, and you never have to explain more than you wish to."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORTS.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl bg-card p-5">
              <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-pale-teal text-secondary-foreground">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <span className="text-base font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-3xl bg-pale-blue p-8">
          <h2 className="text-2xl font-bold text-primary">A gentle note</h2>
          <p className="text-lg text-foreground">
            Small Steps is a confidence and empowerment programme. It is not a crisis or clinical
            service. If you need urgent help, please see our{' '}
            <Link href="/safeguarding" className="font-semibold text-teal underline underline-offset-4">
              Safeguarding and Urgent Support
            </Link>{' '}
            page at any time.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <Link href="/refer-yourself">Refer yourself</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/professional-referral">Refer someone else</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
