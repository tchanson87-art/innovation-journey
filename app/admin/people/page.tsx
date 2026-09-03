"use client"

import { useDemo } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const ROLE_PERMISSIONS: Record<string, string[]> = {
  participant: [
    "Access own journey, goals and reflections",
    "Control what is shared with facilitators",
    "Download own progress summary",
  ],
  facilitator: [
    "View assigned cohorts only",
    "Record attendance and supportive notes",
    "View participant goals where consent is given",
    "Issue certificates and record onward referrals",
  ],
  admin: [
    "Create programmes and cohorts",
    "Review referrals and allocate participants",
    "View anonymised organisation-wide outcomes",
    "Maintain the audit trail",
  ],
}

export default function AdminPeople() {
  const { accounts } = useDemo()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">People &amp; permissions</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Manage accounts and role-based access.
          </p>
        </div>
        <Button variant="teal" disabled>
          Invite facilitator (demo)
        </Button>
      </div>

      <Card>
        <h2 className="text-xl font-bold text-primary">Accounts</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr className="border-b border-border text-sm text-muted-foreground">
                <th scope="col" className="py-2 pr-4 font-semibold">Name</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Role</th>
                <th scope="col" className="py-2 font-semibold">Email</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0">
                  <th scope="row" className="py-3 pr-4 font-semibold text-foreground">
                    {a.name}
                  </th>
                  <td className="py-3 pr-4">
                    <Badge variant={a.role === "admin" ? "solid" : a.role === "facilitator" ? "teal" : "default"}>
                      {a.role}
                    </Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{a.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {Object.entries(ROLE_PERMISSIONS).map(([role, perms]) => (
          <Card key={role}>
            <h3 className="text-lg font-bold capitalize text-primary">{role}</h3>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
              {perms.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-teal" aria-hidden="true">
                    •
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}
