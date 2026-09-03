import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { LogoPlate } from '@/components/innovation/logo-plate'
import { PullQuote } from '@/components/innovation/pull-quote'
import { Reveal } from '@/components/innovation/reveal'
import { JourneyTimeline } from '@/components/innovation/journey-timeline'
import {
  PORTFOLIO,
  INNOVATION_PRINCIPLES,
  PARTNERSHIP_CARDS,
  INNOVATION_EMAILS,
} from '@/lib/innovations'

export const metadata: Metadata = {
  title: 'My Innovation Journey',
  description:
    'From lived experience to practical innovation — how Social Innovation CIC grew from one mother making sense of fragmented systems into a wider preventative mission across health, education, social care and communities.',
}

const CORE_MESSAGES = [
  'Prevention Is the Cure',
  'Needs First, Not Diagnosis',
  'Small Steps Create Big Change',
]

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
      {children}
    </span>
  )
}

export default function InnovationJourneyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 sm:px-6 md:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-bright">
            From lived experience to practical innovation
          </p>
          <h1 className="text-pretty text-4xl font-extrabold leading-tight md:text-6xl">
            My Innovation Journey
          </h1>
          <p className="max-w-3xl text-left text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            My journey did not begin with technology or a business plan. It began with lived
            experience, difficult questions and a determination to understand why families can
            repeatedly reach crisis before the full picture is recognised.
          </p>
          <p className="max-w-3xl text-left text-lg leading-relaxed text-primary-foreground/90">
            What started as one mother trying to make sense of fragmented systems has grown into a
            wider mission to develop practical, preventative solutions across health, education,
            social care and communities.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" variant="teal">
              <Link href="#timeline">Explore the Journey</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="#portfolio">View the Innovations</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="#next-step">Help Shape the Next Step</Link>
            </Button>
          </div>

          <ul className="mt-2 flex flex-wrap gap-3">
            {CORE_MESSAGES.map((m) => (
              <li
                key={m}
                className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-sm font-bold"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <Section tone="white" width="wide">
        <div id="timeline" className="mb-12 flex flex-col gap-3 scroll-mt-24">
          <p className="text-sm font-bold uppercase tracking-wide text-teal">The journey, stage by stage</p>
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">
            How the ideas developed, in order
          </h2>
          <p className="max-w-2xl text-left text-lg text-muted-foreground">
            Each stage shares an honest reflection, what was noticed, and the response that emerged
            — with a clear, current development status. The journey is still being written.
          </p>
        </div>
        <JourneyTimeline />
      </Section>

      {/* Portfolio */}
      <Section tone="pale-blue" width="wide">
        <div id="portfolio" className="mb-10 flex flex-col gap-3 scroll-mt-24">
          <p className="text-sm font-bold uppercase tracking-wide text-teal">Innovation portfolio</p>
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">Explore each innovation</h2>
          <p className="max-w-2xl text-left text-lg text-muted-foreground">
            Each Shine Online route has its own selection and safeguarding pathway — they are never
            combined into a single registration choice.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((item) => (
            <Reveal key={item.name} as="article">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <LogoPlate name={item.name} descriptor={item.descriptor} accent={item.accent} />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-teal">{item.audience}</p>
                  <p className="text-left leading-relaxed text-foreground">{item.purpose}</p>
                </div>
                <div className="mt-auto flex flex-col gap-3 pt-2">
                  <StatusPill>{item.status}</StatusPill>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <Link href={item.exploreHref}>Explore</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={item.registerHref}>Register Interest</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Shine Online certificate preview */}
        <Reveal className="mt-10">
          <div className="grid items-center gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-extrabold text-primary">
                Recognising participation, not perfection
              </h3>
              <p className="text-left leading-relaxed text-foreground">
                Every Shine Online route celebrates taking part. Here is a preview of the
                participation certificate participants can receive.
              </p>
              <PullQuote className="text-lg">
                Participation should build confidence — not create another place where people feel
                judged.
              </PullQuote>
            </div>
            <Image
              src="/images/shine-online-certificate.png"
              alt="Preview of the Shine Online participation certificate, with a navy border and gold and teal accents."
              width={900}
              height={636}
              className="w-full rounded-xl border border-border shadow-sm"
            />
          </div>
        </Reveal>
      </Section>

      {/* Principles */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="mb-10 flex flex-col gap-3">
            <p className="text-sm font-bold uppercase tracking-wide text-gold-bright">
              What guides every innovation
            </p>
            <h2 className="text-3xl font-extrabold md:text-4xl">
              The principles behind every decision
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INNOVATION_PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} as="article">
                <div className="flex h-full flex-col gap-3 rounded-2xl bg-background p-6 text-foreground shadow-sm">
                  <span className="flex size-9 items-center justify-center rounded-full bg-pale-teal font-heading text-sm font-extrabold text-teal">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-extrabold text-primary">{p.title}</h3>
                  <p className="text-left leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership */}
      <Section tone="white" width="wide">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-wide text-teal">The next chapter</p>
          <h2 className="text-3xl font-extrabold text-primary md:text-4xl">
            Who we are looking to work with
          </h2>
          <p className="max-w-2xl text-left text-lg text-muted-foreground">
            Social Innovation CIC is seeking people and organisations willing to explore, challenge,
            co-design, test and evaluate these ideas responsibly.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERSHIP_CARDS.map((c) => (
            <Reveal key={c.title} as="article">
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-pale-blue p-5">
                <h3 className="text-lg font-extrabold text-primary">{c.title}</h3>
                <p className="text-left text-sm leading-relaxed text-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Final call to action */}
      <section id="next-step" className="scroll-mt-24 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:py-24">
          <PullQuote tone="dark" className="text-2xl md:text-3xl">
            This journey began with refusing to look away. Its future depends on people willing to
            look closer, listen earlier and build differently.
          </PullQuote>

          <h2 className="text-3xl font-extrabold md:text-4xl">Help Shape the Next Step</h2>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" variant="teal">
              <Link href="/contact">Become a Co-design Partner</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Discuss a Pilot</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/for-organisations">Support a Programme</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Register Your Interest</Link>
            </Button>
          </div>

          <div className="grid w-full gap-4 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold uppercase tracking-wide text-gold-bright">
                General enquiries
              </p>
              <a
                href={`mailto:${INNOVATION_EMAILS.general}`}
                className="break-words font-semibold underline underline-offset-4"
              >
                {INNOVATION_EMAILS.general}
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold uppercase tracking-wide text-gold-bright">
                NeuroPathway &amp; Safe Space
              </p>
              <a
                href={`mailto:${INNOVATION_EMAILS.neuropathway}`}
                className="break-words font-semibold underline underline-offset-4"
              >
                {INNOVATION_EMAILS.neuropathway}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <p className="font-serif text-xl italic text-gold-bright">Prevention Is the Cure.</p>
            <p className="font-serif text-xl italic text-gold-bright">Small Steps. Big Changes.</p>
          </div>
        </div>
      </section>
    </>
  )
}
