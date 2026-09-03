"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useDemo } from "@/lib/store"
import { WEEKS } from "@/lib/program"
import { WeekIcon } from "@/components/week-icon"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckInForm } from "@/components/portal/check-in-form"
import { ArrowLeft, ArrowRight, Check, CircleDot, Target, ClipboardList } from "lucide-react"

export default function WeekPage({ params }: { params: Promise<{ week: string }> }) {
  const { week: weekParam } = use(params)
  const weekNo = Number(weekParam)
  const { myRecord, completeWeekActivity } = useDemo()
  const [justCompleted, setJustCompleted] = useState(false)

  const week = WEEKS.find((w) => w.week === weekNo)
  if (!week || weekNo < 1 || weekNo > 8) notFound()
  if (!myRecord) return null

  const progress = myRecord.weekProgress.find((w) => w.week === weekNo)
  const status = progress?.status ?? "locked"
  const locked = status === "locked"
  const complete = status === "complete" || justCompleted
  const showCheckIn = weekNo === 1 || weekNo === 8

  return (
    <div className="flex flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link href="/portal">
          <ArrowLeft className="size-4" />
          Back to my dashboard
        </Link>
      </Button>

      {/* Header */}
      <section className="flex flex-col gap-4 rounded-3xl bg-pale-blue p-6 md:flex-row md:items-center md:gap-6 md:p-8">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <WeekIcon name={week.icon} className="size-8" />
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="solid">Week {week.week}</Badge>
            {complete && <Badge variant="success">Completed</Badge>}
            {status === "in-progress" && !complete && <Badge variant="teal">In progress</Badge>}
          </div>
          <h1 className="text-3xl font-extrabold text-primary text-balance md:text-4xl">{week.title}</h1>
        </div>
      </section>

      {locked ? (
        <Card className="p-6 text-center">
          <p className="text-lg text-foreground">This week is not open yet.</p>
          <p className="mt-1 text-muted-foreground">
            It will become available as you move through the programme. There is no rush.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            {week.note && (
              <p className="rounded-2xl border-2 border-teal/30 bg-teal-soft p-4 font-semibold text-foreground">
                {week.note}
              </p>
            )}

            <Card className="flex flex-col gap-4 p-6">
              <div className="flex items-center gap-2">
                <CircleDot className="size-5 text-teal" aria-hidden="true" />
                <h2 className="text-xl font-bold text-foreground">This week we focus on</h2>
              </div>
              <ul className="grid gap-2">
                {week.focus.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-1 size-5 shrink-0 text-teal" aria-hidden="true" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="flex flex-col gap-4 p-6">
              <div className="flex items-center gap-2">
                <ClipboardList className="size-5 text-teal" aria-hidden="true" />
                <h2 className="text-xl font-bold text-foreground">Your activity</h2>
              </div>
              <p className="text-lg text-foreground text-pretty">{week.activity}</p>
              {week.activityOptions && (
                <div className="flex flex-wrap gap-2">
                  {week.activityOptions.map((o) => (
                    <span key={o} className="rounded-full bg-muted px-3 py-1.5 text-sm font-semibold text-foreground">
                      {o}
                    </span>
                  ))}
                </div>
              )}

              {complete ? (
                <div role="status" className="flex items-center gap-3 rounded-xl bg-success/10 p-4 text-foreground">
                  <Check className="size-6 text-success" aria-hidden="true" />
                  <span className="font-semibold">Well done — you have marked this activity as complete.</span>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => {
                      completeWeekActivity(myRecord.user.id, weekNo)
                      setJustCompleted(true)
                    }}
                    size="lg"
                  >
                    Mark this activity as complete
                  </Button>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Only mark it complete when you feel ready. You can come back at any time.
                  </p>
                </div>
              )}
            </Card>

            {showCheckIn && (
              <Card className="flex flex-col gap-4 p-6">
                <h2 className="text-xl font-bold text-foreground">
                  {weekNo === 1 ? "Your starting check-in" : "Your final check-in"}
                </h2>
                <CheckInForm
                  participantId={myRecord.user.id}
                  week={weekNo}
                  point={weekNo === 1 ? "baseline" : "final"}
                />
              </Card>
            )}
          </div>

          {/* Outputs sidebar */}
          <div className="flex flex-col gap-6">
            <Card className="flex flex-col gap-3 p-6">
              <div className="flex items-center gap-2">
                <Target className="size-5 text-teal" aria-hidden="true" />
                <h2 className="text-lg font-bold text-foreground">What you will come away with</h2>
              </div>
              <ul className="grid gap-2">
                {week.outputs.map((o) => (
                  <li key={o} className="rounded-xl bg-pale-blue px-4 py-3 text-foreground">
                    {o}
                  </li>
                ))}
              </ul>
            </Card>

            <div className="flex items-center justify-between gap-2">
              {weekNo > 1 ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/portal/week/${weekNo - 1}`}>
                    <ArrowLeft className="size-4" />
                    Week {weekNo - 1}
                  </Link>
                </Button>
              ) : (
                <span />
              )}
              {weekNo < 8 && (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/portal/week/${weekNo + 1}`}>
                    Week {weekNo + 1}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
