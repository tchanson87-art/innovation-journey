import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { EnquiryForm } from "@/components/forms/enquiry-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with Social Innovation CIC about the Small Steps Confidence Programme.",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        lead="Whether you are an adult thinking about taking part, or an organisation who would like to work with us, we would be glad to hear from you."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid gap-4">
            <Card className="flex items-start gap-4">
              <Mail className="mt-1 size-6 shrink-0 text-teal" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-bold text-foreground">Email</h2>
                <p className="text-muted-foreground">hello@socialinnovationcic.example</p>
              </div>
            </Card>
            <Card className="flex items-start gap-4">
              <Phone className="mt-1 size-6 shrink-0 text-teal" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-bold text-foreground">Phone</h2>
                <p className="text-muted-foreground">0000 000 0000</p>
              </div>
            </Card>
            <Card className="flex items-start gap-4">
              <MapPin className="mt-1 size-6 shrink-0 text-teal" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-bold text-foreground">Where we work</h2>
                <p className="text-muted-foreground">Community venues across the region.</p>
              </div>
            </Card>
            <Card className="flex items-start gap-4">
              <Clock className="mt-1 size-6 shrink-0 text-teal" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-bold text-foreground">When we reply</h2>
                <p className="text-muted-foreground">
                  We aim to respond within three working days. This inbox is not monitored for
                  emergencies.
                </p>
              </div>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">Send us a message</h2>
            <p className="mt-2 mb-6 leading-relaxed text-muted-foreground">
              Use the form below and we will get back to you.
            </p>
            <EnquiryForm type="partner" interestLabel="How can we help?" />
          </div>
        </div>
      </Section>
    </>
  )
}
