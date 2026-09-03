"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDemo } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandMark } from "@/components/brand-mark"
import { UserRound, Users, ShieldCheck, ArrowRight } from "lucide-react"

const roleMeta: Record<string, { icon: typeof UserRound; blurb: string; dest: string }> = {
  participant: { icon: UserRound, blurb: "See the eight-week journey, trackers and goals", dest: "/portal" },
  facilitator: { icon: Users, blurb: "Manage your cohort, attendance and sessions", dest: "/facilitator" },
  admin: { icon: ShieldCheck, blurb: "Programmes, referrals and organisation-wide outcomes", dest: "/admin" },
}

export default function SignInPage() {
  const { accounts, signIn } = useDemo()
  const router = useRouter()

  function enter(userId: string, role: string) {
    signIn(userId)
    router.push(roleMeta[role].dest)
  }

  return (
    <main className="min-h-dvh bg-pale-blue">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/" aria-label="Back to home">
            <BrandMark />
          </Link>
          <h1 className="text-3xl font-extrabold text-primary md:text-4xl">Sign in</h1>
          <p className="max-w-xl text-lg text-foreground">
            This is a demonstration. Choose one of the fictional accounts below to explore the platform
            from that person&apos;s point of view. No password is needed in the demo.
          </p>
          <Badge variant="warning">Demonstration accounts — fictional data</Badge>
        </div>

        <div className="grid gap-4">
          {accounts.map((account) => {
            const meta = roleMeta[account.role]
            const Icon = meta.icon
            return (
              <Card key={account.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-soft text-teal">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-foreground">{account.name}</h2>
                      <Badge variant="muted" className="capitalize">
                        {account.role}
                      </Badge>
                    </div>
                    <p className="mt-1 text-muted-foreground">{meta.blurb}</p>
                  </div>
                </div>
                <Button
                  onClick={() => enter(account.id, account.role)}
                  className="shrink-0"
                >
                  Enter as {account.preferredName}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </Card>
            )
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Looking for the public site?{" "}
          <Link href="/" className="font-semibold text-teal underline underline-offset-2">
            Return to the home page
          </Link>
        </p>
      </div>
    </main>
  )
}
