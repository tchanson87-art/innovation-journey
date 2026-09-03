"use client"

import { AUDIT_LOG } from "@/lib/demo-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminAudit() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Audit trail</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          A record of key actions. Safeguarding details are never exposed here.
        </p>
      </div>

      <Card className="p-0">
        <ol className="divide-y divide-border">
          {AUDIT_LOG.map((e) => (
            <li key={e.id} className="flex flex-col gap-1 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-foreground">{e.action}</span>
                <Badge variant={e.role === "admin" ? "solid" : "teal"}>{e.role}</Badge>
                <span className="ml-auto text-sm text-muted-foreground">{e.timestamp}</span>
              </div>
              <p className="text-muted-foreground">{e.detail}</p>
              <p className="text-sm text-muted-foreground">By {e.actor}</p>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  )
}
