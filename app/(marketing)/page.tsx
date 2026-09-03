import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  HeartHandshake,
  Users,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Section, SectionHeading } from '@/components/ui/section'
import { WeekIcon } from '@/components/week-icon'
import { Faq } from '@/components/faq'
import {
  WEEKS,
  SUPPORTS,
  PATHWAY_STEPS,
  REASSURANCE,
  CENTRAL_MESSAGE,
  ORG,
} from '@/lib/program'

const OUTCOMES = [
  'Increased confidence and self-belief',
  'Recognising personal strengths',
  'Feeling more connected to others',
  'Greater everyday and digital confidence',
  'A clear, manageable next step',
  'Being ready for community, learning, volunteering or work',
]

const REASSURANCES = [
  'No diagnosis, qualification or employment history is needed.',
  'You can go at your own pace and pause when you need to.',
  'Small, friendly groups in a safe and welcoming space.',
  'You choose what you share and with whom.',
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-pale-blue">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="flex flex-col gap-6">
            <Image
              src="/images/social-innovation-cic-logo.png"
              alt="Social Innovation CIC logo: a colourful tree of life encircled by the words Think, Believe, Attract and Become, with the NeuroPathway and MediSense sub-brands beneath"
              width={160}
              height={160}
              priority
              className="size-28 w-fit rounded-full bg-white object-contain shadow-sm ring-1 ring-border md:size-36"
            />
            <Badge variant="teal" className="w-fit">
              An eight-week supportive journey
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight text-primary md:text-5xl">
              Small Steps Confidence Programme
            </h1>
            <p className="text-xl text-foreground">
              An eight-week supportive journey helping adults recognise their strengths, rebuild
              confidence and take their next manageable step.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/refer-yourself">
                  Refer Yourself
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="teal">
                <Link href="/professional-referral">Refer Someone</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/for-organisations">Host a Programme</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
            <p className="flex items-center gap-2 text-sm font-semibold text-teal">
              <ShieldCheck className="size-5" aria-hidden="true" />
              Delivered by {ORG.name}
            </p>
          </div>
          <div className="relative">
            <Image
              src="/images/hero-community.png"
              alt="A diverse group of adults sitting together and talking warmly in a welcoming community room"
              width={720}
              height={560}
              priority
              className="h-auto w-full rounded-3xl border border-border object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Reassurance statement */}
      <Section tone="navy" className="py-12 md:py-14">
        <p className="mx-auto max-w-3xl text-balance text-center text-2xl font-bold leading-snug md:text-3xl">
          &ldquo;You do not have to change everything at once. One supported step can begin an
          entirely new pathway.&rdquo;
        </p>
      </Section>

      {/* What the programme is */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-4">
            <SectionHeading
              eyebrow="What it is"
              title="A calm, friendly programme built around you"
            />
            <p className="text-lg text-muted-foreground">
              Small Steps is a supportive group programme for adults who would like to feel more
              confident in everyday life. Over eight gentle weekly sessions, you will explore your
              strengths, try new things at your own pace, and plan one manageable next step.
            </p>
            <p className="text-lg text-muted-foreground">
              It is not therapy or a clinical service. It is a warm, encouraging space led by
              friendly facilitators alongside a small group of people who understand.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="default">
                <HeartHandshake className="size-4" /> Supportive
              </Badge>
              <Badge variant="teal">
                <Users className="size-4" /> Small groups
              </Badge>
              <Badge variant="default">
                <Sparkles className="size-4" /> Strengths-based
              </Badge>
            </div>
          </div>
          <Image
            src="/images/activity-creative.png"
            alt="Two adults working together on a creative craft project at a table"
            width={640}
            height={480}
            className="h-auto w-full rounded-3xl border border-border object-cover shadow-sm"
          />
        </div>
      </Section>

      {/* Who it supports */}
      <Section tone="pale-teal">
        <SectionHeading
          centered
          eyebrow="Who it supports"
          title="This programme is for adults who may be experiencing"
          description="Everyone is welcome. No diagnosis, qualification or employment history is required."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORTS.map((item) => (
            <li key={item}>
              <Card className="h-full">
                <CardContent className="flex items-start gap-3 p-5">
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-pale-teal text-secondary-foreground">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium text-foreground">{item}</span>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="The participant pathway"
          description="A clear, supported route from first contact to your next step."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {PATHWAY_STEPS.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-2xl border border-border p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="pt-1.5 text-lg font-semibold text-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Eight-week journey preview */}
      <Section tone="pale-blue">
        <SectionHeading
          eyebrow="The eight-week journey"
          title="Eight small, achievable steps"
          description="Each week gently builds on the last. Explore the full journey to see what each week involves."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WEEKS.map((w) => (
            <li key={w.week}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-pale-teal text-teal">
                      <WeekIcon name={w.icon} />
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wide text-teal">
                      Week {w.week}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.focus[0]}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" variant="teal">
            <Link href="/journey">
              Explore the full journey
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Expected outcomes */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Image
            src="/images/activity-learning.png"
            alt="A friendly mentor helping another adult with a laptop in a bright learning space"
            width={640}
            height={480}
            className="order-2 h-auto w-full rounded-3xl border border-border object-cover shadow-sm md:order-1"
          />
          <div className="order-1 flex flex-col gap-4 md:order-2">
            <SectionHeading eyebrow="Expected outcomes" title="What people often gain" />
            <ul className="flex flex-col gap-3">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-teal text-teal-foreground">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-lg text-foreground">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Participant reassurance */}
      <Section tone="pale-teal">
        <SectionHeading centered eyebrow="Reassurance" title="You are welcome here" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {REASSURANCES.map((r) => (
            <Card key={r}>
              <CardContent className="flex items-start gap-3 p-5">
                <HeartHandshake className="mt-0.5 size-6 shrink-0 text-teal" aria-hidden="true" />
                <p className="text-lg font-medium text-foreground">{r}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-balance text-center text-xl font-semibold text-primary">
          {REASSURANCE}
        </p>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading centered eyebrow="Questions" title="Frequently asked questions" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Faq />
        </div>
      </Section>

      {/* Social Innovation CIC */}
      <Section tone="navy">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="About us" title="Social Innovation CIC" className="text-primary-foreground [&_span]:text-pale-teal [&_h2]:text-primary-foreground" />
            <p className="text-lg text-pale-teal">
              We are a community interest company working to prevent isolation and unlock potential.
              We believe confidence can be rebuilt through safety, encouragement, opportunity and
              small achievable steps.
            </p>
            <p className="text-lg font-semibold text-primary-foreground">Small steps create big changes.</p>
          </div>
          <Card className="bg-background/10 text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-5 p-6 text-center">
              <Image
                src="/images/social-innovation-cic-logo.png"
                alt="Social Innovation CIC logo"
                width={320}
                height={320}
                className="size-44 rounded-full bg-white object-contain p-2 shadow-md md:size-52"
              />
              <p className="text-balance text-xl font-bold">&ldquo;{CENTRAL_MESSAGE}&rdquo;</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="teal">
                  <Link href="/about">More about the programme</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section tone="pale-blue">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading centered title="Ready to take a small step?" />
          <p className="max-w-2xl text-lg text-muted-foreground">
            Whether the programme is for you or someone you know, we would love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/refer-yourself">Refer Yourself</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact {ORG.name}</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
