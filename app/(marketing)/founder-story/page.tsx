import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { PullQuote } from '@/components/innovation/pull-quote'
import { Reveal } from '@/components/innovation/reveal'
import {
  FOUNDER,
  FOUNDER_PRINCIPLES,
  REFLECTION,
  NOTE_FROM_ME,
  STORY_INTRO,
  CHAPTERS,
  CONTENT_NOTE,
} from '@/lib/founder'

export const metadata: Metadata = {
  title: 'The Founder’s Story',
  description:
    'Tanja Hanson, founder of Social Innovation CIC, on how lived experience as a mother and carer became a preventative, needs-led mission — from noticing early to building support that arrives before crisis.',
}

export default function FounderStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 sm:px-6 md:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-bright">
            {FOUNDER.roles.join(' · ')}
          </p>
          <h1 className="font-serif text-5xl font-extrabold leading-tight md:text-7xl">
            Tanja <span className="text-gold-bright">Hanson</span>
          </h1>
          <p className="font-serif text-2xl italic text-primary-foreground/90 md:text-3xl">
            {FOUNDER.tagline}
          </p>
          <p className="max-w-3xl text-left text-lg leading-relaxed text-primary-foreground/90">
            {FOUNDER.mission}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" variant="teal">
              <Link href="#story">Read My Story</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/innovation-journey">Explore the Innovations</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Partner With Me</Link>
            </Button>
          </div>

          <ul className="mt-2 flex flex-wrap gap-3">
            {FOUNDER_PRINCIPLES.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-sm font-bold"
              >
                <span aria-hidden="true" className="size-2 rotate-45 bg-gold-bright" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reflection */}
      <Section tone="pale-blue" width="narrow">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold uppercase tracking-wide text-teal">{REFLECTION.eyebrow}</p>
            <h2 className="text-balance font-serif text-3xl font-extrabold text-primary md:text-4xl">
              {REFLECTION.title}
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {REFLECTION.stanzas.map((stanza, i) => (
              <Reveal key={i}>
                <p className="font-serif text-xl italic leading-relaxed text-foreground md:text-2xl">
                  {stanza.map((line, j) => (
                    <span key={j} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* A Note From Me */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-gold-bright">A note from me</p>
          <PullQuote tone="dark" className="text-2xl md:text-3xl">
            {NOTE_FROM_ME.quote}
          </PullQuote>
          <p className="font-serif text-xl italic text-gold-bright">{NOTE_FROM_ME.closing}</p>
        </div>
      </section>

      {/* My Story long-read */}
      <Section tone="white" width="narrow">
        <div id="story" className="scroll-mt-24">
          <p className="mb-10 text-balance font-serif text-2xl font-semibold leading-relaxed text-primary md:text-3xl">
            {STORY_INTRO}
          </p>

          <div className="flex flex-col gap-14">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.number} id={`chapter-${chapter.number}`} className="scroll-mt-24">
                {/* Content note precedes the sensitive chapter */}
                {chapter.sensitive && (
                  <Reveal className="mb-10">
                    <div className="flex flex-col gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-6">
                      <p className="text-sm font-bold uppercase tracking-wide text-gold">
                        Content note
                      </p>
                      <p className="text-left leading-relaxed text-foreground">
                        {CONTENT_NOTE.body}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-1">
                        <Link
                          href={CONTENT_NOTE.skipHref}
                          className="text-sm font-bold text-teal underline underline-offset-4 hover:text-primary"
                        >
                          {CONTENT_NOTE.skipLabel}
                        </Link>
                        <Link
                          href={CONTENT_NOTE.helpHref}
                          className="text-sm font-bold text-teal underline underline-offset-4 hover:text-primary"
                        >
                          {CONTENT_NOTE.helpLabel}
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                )}

                <Reveal as="article">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-baseline gap-4">
                      <span className="font-serif text-4xl font-extrabold text-gold md:text-5xl">
                        {chapter.number}
                      </span>
                      <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
                        {chapter.title}
                      </h2>
                    </div>
                    {chapter.paragraphs.map((para, i) => (
                      <p key={i} className="text-left text-lg leading-relaxed text-foreground">
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>

                {chapter.quote && (
                  <Reveal className="mt-8">
                    <div className="rounded-2xl border border-border bg-pale-blue p-6 md:p-8">
                      <PullQuote className="text-xl md:text-2xl">{chapter.quote}</PullQuote>
                    </div>
                  </Reveal>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing call to action */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:py-20">
          <h2 className="text-3xl font-extrabold md:text-4xl">Help shape what comes next</h2>
          <p className="text-left text-lg leading-relaxed text-primary-foreground/90">
            I cannot change an entire system alone. If this story resonates with you — as a family,
            a school, a professional or a partner — I would love to hear from you.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" variant="teal">
              <Link href="/contact">Partner With Me</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/innovation-journey">See the Innovation Journey</Link>
            </Button>
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
