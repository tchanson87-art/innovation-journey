import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Section } from "@/components/ui/section"
import { SelfReferralForm } from "@/components/forms/self-referral-form"

export const metadata: Metadata = {
  title: "Refer yourself",
  description:
    "Take a small first step and refer yourself to the Small Steps Confidence Programme. No diagnosis, qualification or work history is needed.",
}

export default function ReferYourselfPage() {
  return (
    <>
      <PageHero
        eyebrow="Self-referral"
        title="Refer yourself"
        lead="This is a friendly first step, not a commitment. Share only what you feel comfortable with, and a member of our team will get in touch for a relaxed conversation."
      />
      <Section width="narrow">
        <div className="mb-8 rounded-2xl bg-blue-soft p-5 text-base leading-relaxed text-foreground">
          You do not need a diagnosis, a qualification or any work history to take part. There are no
          wrong answers on this form, and you can ask for help to complete it at any time.
        </div>
        <SelfReferralForm />
      </Section>
    </>
  )
}
