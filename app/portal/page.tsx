"use client"

import Link from "next/link"
import { useDemo } from "@/lib/store"
import { WEEKS, ENCOURAGEMENTS, STEP_STATUS_LABELS } from "@/lib/program"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProgressPathway } from "@/components/portal/progress-pathway"
import { ConfidenceChart } from "@/components/portal/confidence-chart"
import { WeekIcon } from "@/components/week-icon"
import { CalendarDays, Sparkles, Target, Award, ArrowRight, FileText } from "lucide-react"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
}

export default function ParticipantDashboard() {
  const { myRecord } = useDemo()
  if (!myRecord) return null

  const currentWeekContent = WEEKS.find((w) => w.week === myRecord.currentWeek) ?? WEEKS[0]
  const completedCount = myRecord.weekProgress.filter((w) => w.status === "complete").length
  const activeGoal = myRecord.goals.find((g) => g.status === "in-progress" || g.status === "thinking") ?? myRecord.goals[0]
  const valuedStrengths = myRecord.strengths.filter((s) => s.valued)
  const encouragement = ENCOURAGEMENTS[completedCount % ENCOURAGEMENTS.length]

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <section className="rounded-3xl bg-primary p-6 text-primary-foreground md:p-8">
        <p className="text-lg opacity-90">Welcome back,</p>
        <h1 className="text-3xl font-extrabold md:text-4xl">{myRecord.user.preferredName}</h1>
        <p className="mt-3 max-w-2xl text-lg opacity-95 text-pretty">{encouragement}</p>
      </section>

      {/* Snapshot row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-start gap-4 p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-pale-blue text-primary">
            <WeekIcon name={currentWeekContent.icon} className="size-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">You are on</p>
            <p className="text-lg font-bold text-foreground">Week {myRecord.currentWeek}</p>
            <p className="text-sm text-muted-foreground text-pretty">{currentWeekContent.title}</p>
          </div>
        </Card>
        <Card className="flex items-start gap-4 p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-soft text-teal">
            <CalendarDays className="size-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Next session</p>
            <p className="text-lg font-bold text-foreground">{formatDate(myRecord.nextSessionDate)}</p>
            <p className="text-sm text-muted-foreground">Riverside Community Hub</p>
          </div>
        </Card>
        <Card className="flex items-start gap-4 p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-soft text-teal">
            <Award className="size-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Weeks completed</p>
            <p className="text-lg font-bold text-foreground">{completedCount} of 8</p>
            <p className="text-sm text-muted-foreground">Small steps still count.</p>
          </div>
        </Card>
      </div>

      {/* My Next Small Step */}
      <Card className="flex flex-col gap-4 border-2 border-teal/30 bg-teal-soft p-6">
        <div className="flex items-center gap-2">
          <Target className="size-6 text-teal" aria-hidden="true" />
          <h2 className="text-xl font-extrabold text-foreground">My next small step</h2>
        </div>
        {activeGoal ? (
          <>
            <p className="text-lg text-foreground text-pretty">{activeGoal.smallestStep || activeGoal.change}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="teal">{STEP_STATUS_LABELS[activeGoal.status]}</Badge>
              {activeGoal.when && <span className="text-sm text-muted-foreground">Aiming for: {activeGoal.when}</span>}
            </div>
            <div>
              <Button asChild variant="teal">
                <Link href="/portal/goals">
                  View and update my goals
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-foreground">You have not set a goal yet. There is no rush — you can start whenever you feel ready.</p>
            <div>
              <Button asChild variant="teal">
                <Link href="/portal/goals">Set my first small step</Link>
              </Button>
            </div>
          </>
        )}
      </Card>

      {/* Pathway */}
      <Card className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-extrabold text-foreground">My eight-week journey</h2>
          <span className="text-sm text-muted-foreground">Continue when you feel ready.</span>
        </div>
        <ProgressPathway weekProgress={myRecord.weekProgress} />
      </Card>

      {/* Confidence + strengths */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-extrabold text-foreground">My confidence</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/portal/tracker">Open tracker</Link>
            </Button>
          </div>
          <ConfidenceChart checkIns={myRecord.checkIns} />
        </Card>

        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-teal" aria-hidden="true" />
            <h2 className="text-xl font-extrabold text-foreground">Strengths I have gathered</h2>
          </div>
          {myRecord.strengths.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {myRecord.strengths.map((s) => (
                <li key={s.id}>
                  <span className={s.valued ? "inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1.5 text-sm font-semibold text-primary" : "inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-semibold text-foreground"}>
                    {s.valued && <Sparkles className="size-3.5 text-teal" aria-hidden="true" />}
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Your strengths will be collected as you move through the programme.</p>
          )}
          {valuedStrengths.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Highlighted strengths are ones you have said you value in yourself.
            </p>
          )}
          <div>
            <Button asChild variant="outline" size="sm">
              <Link href="/portal/strengths">See my strengths profile</Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Achievements + help */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-6">
          <h2 className="text-xl font-extrabold text-foreground">Achievements</h2>
          {myRecord.certificateIssued ? (
            <div className="flex items-center gap-4 rounded-2xl bg-pale-blue p-4">
              <Award className="size-10 text-teal" aria-hidden="true" />
              <div>
                <p className="font-bold text-foreground">Programme certificate</p>
                <p className="text-sm text-muted-foreground">Awarded by Social Innovation CIC</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Your certificate will be here when you reach the end of the programme. It recognises your
              participation and progress — perfect attendance is not required.
            </p>
          )}
          <div>
            <Button asChild variant="outline" size="sm">
              <Link href="/portal/summary">
                <FileText className="size-4" />
                Download my progress summary
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 p-6">
          <h2 className="text-xl font-extrabold text-foreground">Help and support</h2>
          <p className="text-muted-foreground text-pretty">
            You can ask your facilitator for a private check-in at any time. This platform is not
            monitored continuously and cannot provide emergency help.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/portal/resources">Helpful resources</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/support">Urgent support information</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
