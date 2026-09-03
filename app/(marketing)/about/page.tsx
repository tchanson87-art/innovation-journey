import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Section, SectionHeading } from '@/components/ui/section'
import { PageHero } from '@/components/page-hero'
import { SUPPORTS, CENTRAL_MESSAGE, REASSURANCE } from '@/lib/program'

export const metadata: Metadata = {
  title: 'About the programme',
  description:
    'Small Steps is a supportive, non-clinical confidence programme for adults. No diagnosis, qualification or employment history is required.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the programme"
        title="A supportive space to rebuild confidence"
        description="Small Steps helps adults recognise their strengths and take manageable steps toward community, learning, volunteering or employment."
      />

      <Section>
        <div className="mx-auto max-w-3xl flex flex-col gap-5 text-lg text-foreground">
          <p>
            The Small Steps Confidence Programme supports adults who may feel that confidence has
            slipped away, for many different reasons. It is a warm, encouraging group programme, not
            a clinical or crisis service.
          </p>
          <p className="rounded-2xl bg-pale-teal p-6 text-xl font-semibold text-primary">
            {CENTRAL_MESSAGE}
          </p>
          <p className="text-muted-foreground">
            We know that starting something new can feel daunting. That is why we go gently, in
            small friendly groups, at a pace that feels comfortable for you.
          </p>
        </div>
      </Section>

      <Section tone="pale-blue">
        <SectionHeading
          centered
          eyebrow="Who it supports"
          title="The programme supports adults who may be experiencing"
        />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {SUPPORTS.map((item) => (
            <li key={item}>
              <Card className="h-full">
                <CardContent className="flex items-start gap-3 p-5">
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-pale-teal text-secondary-foreground">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium">{item}</span>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg font-semibold text-primary">
          No diagnosis, qualification or employment history is required.
        </p>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-balance text-2xl font-bold text-primary">{REASSURANCE}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/journey">See the eight-week journey</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/refer-yourself">Refer yourself</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
