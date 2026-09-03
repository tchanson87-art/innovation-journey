"use client"

import { useState } from "react"
import { useDemo } from "@/lib/store"
import { COHORT } from "@/lib/demo-data"
import { Certificate, type CertificateData } from "@/components/certificate"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Printer, Award } from "lucide-react"

const WORDINGS: Record<string, string> = {
  completion:
    "has completed the eight-week Small Steps Confidence Programme, taking supported steps to rebuild confidence and recognise personal strengths.",
  participation:
    "has taken part in the Small Steps Confidence Programme and made valued personal progress along the way.",
}

export default function CertificatesPage() {
  const { currentUser, state, issueCertificate } = useDemo()
  const myCohorts = currentUser?.facilitatorOf ?? []
  const participants = state.participants.filter(
    (p) => p.user.cohortId && myCohorts.includes(p.user.cohortId),
  )

  const [selectedId, setSelectedId] = useState(participants[0]?.user.id ?? "")
  const [wordingKey, setWordingKey] = useState<"completion" | "participation">("completion")

  const selected = participants.find((p) => p.user.id === selectedId)

  const cert: CertificateData | null = selected
    ? {
        participantName: selected.user.preferredName,
        wording: WORDINGS[wordingKey],
        cohortName: COHORT.name,
        cohortDate: new Date(COHORT.startDate).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        }),
        facilitatorName: currentUser?.name ?? "Facilitator",
        number: `SS-${COHORT.startDate.slice(0, 4)}-${selected.user.id.slice(-2).toUpperCase()}`,
      }
    : null

  return (
    <div className="flex flex-col gap-6">
      <div className="print:hidden">
        <h1 className="text-3xl font-extrabold text-primary">Certificates</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Recognise participation and individual progress. Perfect attendance is never required.
        </p>
      </div>

      <Card className="print:hidden">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Participant" htmlFor="cert-participant">
            <select
              id="cert-participant"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            >
              {participants.map((p) => (
                <option key={p.user.id} value={p.user.id}>
                  {p.user.preferredName}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Recognition wording" htmlFor="cert-wording">
            <select
              id="cert-wording"
              value={wordingKey}
              onChange={(e) => setWordingKey(e.target.value as "completion" | "participation")}
              className="min-h-11 w-full rounded-xl border-2 border-input bg-background px-4 text-base"
            >
              <option value="completion">Completion</option>
              <option value="participation">Participation and progress</option>
            </select>
          </Field>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="teal" onClick={() => selected && issueCertificate(selected.user.id)}>
            <Award className="size-5" aria-hidden="true" />
            Issue certificate
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="size-5" aria-hidden="true" />
            Print or save as PDF
          </Button>
          {selected?.certificateIssued && (
            <span role="status" className="text-sm font-semibold text-success">
              Certificate issued for {selected.user.preferredName}
            </span>
          )}
        </div>
      </Card>

      {cert ? (
        <Certificate data={cert} />
      ) : (
        <Card>
          <p className="text-muted-foreground">Select a participant to preview a certificate.</p>
        </Card>
      )}
    </div>
  )
}
