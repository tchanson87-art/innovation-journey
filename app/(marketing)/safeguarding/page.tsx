import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { URGENT_HELP } from "@/lib/program"
import { Phone, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Safeguarding and urgent support",
  description:
    "How to get urgent help and how safeguarding works on the Small Steps Confidence Programme.",
}

export default function SafeguardingSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Your safety matters"
        title="Safeguarding and urgent support"
        lead="This is a confidence and empowerment programme, not a crisis or clinical service."
      />

      <Section width="narrow">
        <Card className="border-2 border-destructive/30 bg-destructive/5">
          <h2 className="text-2xl font-bold text-primary">If you need urgent help</h2>
          <p className="mt-2 text-foreground">
            This platform is not monitored continuously and cannot provide emergency help. If you or
            someone else is in immediate danger, please use one of the options below.
          </p>
          <ul className="mt-5 flex flex-col gap-4">
            {URGENT_HELP.map((h) => (
              <li
                key={h.name}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-background p-4"
              >
                <div>
                  <p className="font-bold text-foreground">{h.name}</p>
                  <p className="text-sm text-muted-foreground">{h.detail}</p>
                </div>
                {h.action && h.label && (
                  <Button asChild variant="destructive" size="sm">
                    <a href={h.action}>
                      <Phone className="size-4" aria-hidden="true" />
                      {h.label}
                    </a>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section tone="pale-blue" width="narrow">
        <h2 className="text-2xl font-bold text-primary">How safeguarding works here</h2>
        <div className="mt-4 flex flex-col gap-4 text-lg text-foreground">
          <p>
            You can ask your facilitator for a private check-in at any time. Check-in requests are
            reviewed by facilitators during programme hours. They are not monitored overnight, at
            weekends or on public holidays, so please use the urgent contacts above if you need help
            straight away.
          </p>
          <p>
            If a facilitator becomes aware of a safeguarding concern, they follow Social Innovation
            CIC&apos;s safeguarding procedures. Safeguarding records are kept securely, with restricted
            access, and are never included in cohort or impact reports.
          </p>
        </div>
        <Card className="mt-6 flex items-start gap-3 bg-background">
          <Info className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Expected response time for a non-urgent check-in request is up to two working days.
            Please never rely on this platform in an emergency.
          </p>
        </Card>
      </Section>
    </>
  )
}
