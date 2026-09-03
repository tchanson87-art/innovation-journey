import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { EnquiryForm } from "@/components/forms/enquiry-form"
import { Building2, HandHeart, HeartHandshake, LineChart, Users, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "For organisations",
  description:
    "Commission, host, refer to or sponsor the Small Steps Confidence Programme. For councils, housing providers, NHS and social care, charities, colleges and employment support.",
}

const ways = [
  { icon: Building2, title: "Commission a local cohort", body: "Fund a group in your area, shaped around the people you support." },
  { icon: HeartHandshake, title: "Host the programme", body: "Offer a warm, accessible venue and we bring the rest." },
  { icon: Users, title: "Refer eligible adults", body: "Refer people you work with, with their consent." },
  { icon: HandHeart, title: "Sponsor participant costs", body: "Remove cost as a barrier for people who would benefit." },
  { icon: Sparkles, title: "Provide progression opportunities", body: "Offer volunteering, training or work-tasters as next steps." },
  { icon: LineChart, title: "Receive an impact report", body: "Get a clear, anonymised report on outcomes for your cohort." },
]

export default function ForOrganisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="For organisations"
        title="Work with us to rebuild confidence in your community"
        lead="We partner with councils, housing providers, NHS and social care organisations, charities, community groups, colleges and employment-support organisations."
      />

      <Section>
        <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">Ways to get involved</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ways.map((w) => (
            <Card key={w.title} className="flex flex-col gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-soft text-teal">
                <w.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-foreground">{w.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{w.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="blue" width="narrow">
        <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">Enquire about commissioning</h2>
        <p className="mt-3 mb-8 text-lg leading-relaxed text-muted-foreground">
          Tell us a little about your organisation and what you are hoping to achieve. There is no
          obligation, and we are happy to talk through the options.
        </p>
        <EnquiryForm
          type="commissioning"
          interestLabel="What are you interested in? For example commissioning, hosting or referring."
        />
      </Section>
    </>
  )
}
