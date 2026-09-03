import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { ORG } from "@/lib/program"

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How the Small Steps Confidence Programme handles personal information, aligned with UK GDPR principles.",
}

const sections = [
  {
    heading: "Our approach",
    body: [
      "Privacy and safeguarding are built into this platform from the beginning. We collect only the information we need, keep it secure, and give you control over what is shared.",
    ],
  },
  {
    heading: "What we collect and why",
    body: [
      "For referrals, we collect basic contact details, your general reason for interest, any accessibility needs and your consent to be contacted. We do not collect detailed medical histories through the public referral form.",
      "For participants, we hold your programme progress, goals, confidence check-ins, strengths and any reflections you choose to save. Private reflections remain visible only to you unless you actively choose to share a specific entry.",
    ],
  },
  {
    heading: "Your choices and rights",
    body: [
      "You can choose what information is shared with facilitators. You can ask us to correct your personal information, request that your account is deactivated, or request deletion of your data.",
      "We do not sell participant data, we do not use it for advertising, and we do not use participant reflections to train AI systems. There are no public participant profiles.",
    ],
  },
  {
    heading: "Keeping information secure",
    body: [
      "We use secure authentication, role-based access controls, consent records, audit logging, and encryption in transit and at rest. Sessions expire after a period of inactivity and passwords can be reset securely.",
      "Facilitators can only access the cohorts assigned to them, and administrators can only access authorised organisational data. Safeguarding records are held separately with restricted access.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "We keep personal information only for as long as needed to deliver the programme and meet our obligations, then remove or anonymise it in line with our retention controls.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Your information"
        title="Privacy notice"
        lead="How we handle personal information, aligned with UK GDPR principles."
      />

      <Section width="narrow">
        <Card className="mb-6 bg-pale-blue">
          <p className="text-primary">
            This platform is a demonstration. It should not be described as fully legally compliant
            until it has undergone proper governance, security and data-protection review.
          </p>
        </Card>

        <div className="flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl font-bold text-primary">{s.heading}</h2>
              <div className="mt-2 flex flex-col gap-3 text-lg leading-relaxed text-foreground">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h2 className="text-2xl font-bold text-primary">Contact us</h2>
            <p className="mt-2 text-lg text-foreground">
              For any question about your information, contact {ORG.name} at{" "}
              <a href={`mailto:${ORG.email}`} className="font-semibold text-teal underline">
                {ORG.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
