import { BrandMark } from "@/components/brand-mark"
import { ORG } from "@/lib/program"

export interface CertificateData {
  participantName: string
  wording: string
  cohortName: string
  cohortDate: string
  facilitatorName: string
  number: string
}

export function Certificate({ data }: { data: CertificateData }) {
  return (
    <div
      className="mx-auto w-full max-w-3xl rounded-2xl border-4 border-primary bg-background p-8 text-center sm:p-12 print:border-2"
      role="img"
      aria-label={`Certificate for ${data.participantName}`}
    >
      <div className="mb-6 flex items-center justify-center">
        <BrandMark className="size-12" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-widest text-teal">
        {ORG.programme}
      </p>
      <h2 className="mt-4 text-lg font-semibold text-muted-foreground">
        This certificate is presented to
      </h2>
      <p className="mt-3 font-serif text-4xl font-bold text-primary sm:text-5xl">
        {data.participantName}
      </p>
      <p className="mx-auto mt-5 max-w-xl text-lg text-foreground">{data.wording}</p>

      <div className="mt-8 grid gap-4 border-t border-border pt-6 text-left sm:grid-cols-3">
        <CertField label="Cohort" value={data.cohortName} />
        <CertField label="Date" value={data.cohortDate} />
        <CertField label="Facilitator" value={data.facilitatorName} />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>Certificate no. {data.number}</span>
        <span>{ORG.name}</span>
      </div>
    </div>
  )
}

function CertField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  )
}
