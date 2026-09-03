"use client"

import { useDemo } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Referral } from "@/lib/types"

const TYPE_LABEL: Record<Referral["type"], string> = {
  self: "Self-referral",
  professional: "Professional",
  partner: "Partner enquiry",
  commissioning: "Commissioning",
}

const STATUS_OPTIONS: Referral["status"][] = ["new", "reviewing", "allocated", "declined"]
const STATUS_LABEL: Record<Referral["status"], string> = {
  new: "New",
  reviewing: "Reviewing",
  allocated: "Allocated",
  declined: "Declined",
}

export default function AdminReferrals() {
  const { state, updateReferralStatus } = useDemo()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Referrals</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Review incoming referrals and update their status.
        </p>
      </div>

      {state.referrals.length === 0 ? (
        <Card>
          <p className="text-muted-foreground">No referrals yet.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {state.referrals.map((r) => (
            <Card key={r.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                      {r.preferredName || r.name}
                    </span>
                    <Badge variant="default">{TYPE_LABEL[r.type]}</Badge>
                    {r.demo && <Badge variant="warning">Demonstration data</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reference {r.id} · received {r.createdAt}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <label
                    htmlFor={`status-${r.id}`}
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Status
                  </label>
                  <select
                    id={`status-${r.id}`}
                    value={r.status}
                    onChange={(e) =>
                      updateReferralStatus(r.id, e.target.value as Referral["status"])
                    }
                    className="min-h-11 rounded-xl border-2 border-input bg-background px-4 text-base"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <dl className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                {r.reason && <Detail label="Reason for interest" value={r.reason} />}
                {r.area && <Detail label="Area" value={r.area} />}
                {r.accessibility && (
                  <Detail label="Accessibility needs" value={r.accessibility} />
                )}
                {r.organisation && <Detail label="Organisation" value={r.organisation} />}
                <Detail label="Contact" value={`${r.contact}${r.contactMethod ? ` (${r.contactMethod})` : ""}`} />
                <Detail label="Consent to contact" value={r.consent ? "Given" : "Not given"} />
              </dl>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  )
}
