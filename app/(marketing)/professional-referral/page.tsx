import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Section } from "@/components/ui/section"
import { ProfessionalReferralForm } from "@/components/forms/professional-referral-form"

export const metadata: Metadata = {
  title: "Professional referral",
  description:
    "For professionals referring an adult, with their consent, to the Small Steps Confidence Programme.",
}

export default function ProfessionalReferralPage() {
  return (
    <>
      <PageHero
        eyebrow="For professionals"
        title="Refer an adult you support"
        lead="Please only refer an adult who knows about and consents to this referral. We collect the minimum information needed to make a warm, respectful first contact."
      />
      <Section width="narrow">
        <div className="mb-8 rounded-2xl bg-blue-soft p-5 text-base leading-relaxed text-foreground">
          This is a non-clinical confidence and wellbeing programme. It is not a crisis service. If
          someone is in immediate danger, please contact the appropriate emergency or clinical service
          first. Do not include detailed medical histories on this form.
        </div>
        <ProfessionalReferralForm />
      </Section>
    </>
  )
}
