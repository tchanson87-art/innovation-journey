import type { CohortOutcomes } from "@/lib/outcomes"
import { Card } from "@/components/ui/card"

function Stat({
  label,
  value,
  suffix,
  help,
}: {
  label: string
  value: string | number
  suffix?: string
  help?: string
}) {
  return (
    <Card className="flex flex-col gap-1">
      <span className="text-3xl font-extrabold text-primary">
        {value}
        {suffix}
      </span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {help && <span className="text-xs text-muted-foreground">{help}</span>}
    </Card>
  )
}

export function OutcomesGrid({ o }: { o: CohortOutcomes }) {
  const change =
    o.averageConfidenceChange > 0 ? `+${o.averageConfidenceChange}` : `${o.averageConfidenceChange}`
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="mb-3 text-lg font-bold text-primary">Reach and engagement</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Referred" value={o.referred} />
          <Stat label="Enrolled" value={o.enrolled} />
          <Stat label="Attendance rate" value={o.attendanceRate} suffix="%" />
          <Stat label="Completion rate" value={o.completionRate} suffix="%" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-primary">Confidence and strengths</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Average confidence change"
            value={change}
            help="Mean change from baseline to latest check-in"
          />
          <Stat label="Identified 3+ strengths" value={o.threeStrengthsPct} suffix="%" />
          <Stat label="Completed a personal goal" value={o.goalCompletedPct} suffix="%" />
          <Stat label="Reported improved connection" value={o.improvedConnectionPct} suffix="%" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-primary">Onward progression</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Into community activity" value={o.progressCommunity} />
          <Stat label="Into volunteering" value={o.progressVolunteering} />
          <Stat label="Into education or training" value={o.progressEducation} />
          <Stat label="Towards employment" value={o.progressEmployment} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-primary">Experience and follow-up</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Stat
            label="Participant satisfaction"
            value={o.satisfaction}
            suffix="%"
            help="Demonstration figure"
          />
          <Stat
            label="Positive follow-up (4–6 weeks)"
            value={o.followUpPositive}
            suffix="%"
            help="Demonstration figure"
          />
        </div>
      </section>
    </div>
  )
}
