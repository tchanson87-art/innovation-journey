import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { PageHero } from '@/components/page-hero'
import { JourneyExplorer } from '@/components/journey-explorer'
import { CENTRAL_MESSAGE } from '@/lib/program'

export const metadata: Metadata = {
  title: 'Programme Journey',
  description:
    'Explore the eight-week Small Steps journey. Each week gently builds confidence with a simple focus, activity and something to take away.',
}

export default function JourneyPage() {
  return (
    <>
      <PageHero
        eyebrow="The eight-week journey"
        title="Eight small, achievable steps"
        description="Select any week to see its focus, activity and what you will take away. Each week gently builds on the last."
      />

      <Section>
        <JourneyExplorer />
      </Section>

      <Section tone="navy" className="py-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-balance text-xl font-bold md:text-2xl">{CENTRAL_MESSAGE}</p>
          <Button asChild size="lg" variant="teal">
            <Link href="/refer-yourself">Start with a small step</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
