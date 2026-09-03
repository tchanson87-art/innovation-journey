import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { ORG } from "@/lib/program"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "Our commitment to making the Small Steps Confidence Programme usable for everyone, aligned with WCAG 2.2 AA.",
}

const commitments = [
  "Clear, large, readable text with generous spacing",
  "Strong colour contrast throughout",
  "Full keyboard navigation with visible focus states",
  "Labels and descriptive error messages on every form",
  "Content written in plain British English",
  "A layout that works on phones, tablets and computers",
  "The ability to skip straight to the main content",
  "Support for zooming and larger text sizes",
]

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Designed for everyone"
        title="Accessibility statement"
        lead="We want this platform to be easy to use, including for adults with limited digital confidence."
      />

      <Section width="narrow">
        <p className="text-lg leading-relaxed text-foreground">
          We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 AA principles. Building
          confidence starts with a calm, welcoming experience that does not get in your way.
        </p>

        <Card className="mt-6">
          <h2 className="text-2xl font-bold text-primary">What we have built in</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {commitments.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-pale-teal text-teal">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="text-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-primary">Tell us how we can improve</h2>
          <p className="mt-2 text-lg text-foreground">
            If you find anything difficult to use, or need information in a different format, please
            contact {ORG.name} at{" "}
            <a href={`mailto:${ORG.email}`} className="font-semibold text-teal underline">
              {ORG.email}
            </a>
            . We will do our best to help and to put things right.
          </p>
        </div>
      </Section>
    </>
  )
}
