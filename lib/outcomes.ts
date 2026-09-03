import type { ParticipantRecord, Referral, OnwardReferral } from './types'

function avg(nums: number[]): number {
  if (nums.length === 0) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function pct(count: number, total: number): number {
  if (total === 0) return 0
  return Math.round((count / total) * 100)
}

/** Mean of the answered check-in questions for one check-in (skipped questions ignored). */
export function checkInMean(ci: {
  confident: number | null
  connected: number | null
  askForHelp: number | null
  decisions: number | null
  nextStep: number | null
}): number | null {
  const answered = [ci.confident, ci.connected, ci.askForHelp, ci.decisions, ci.nextStep].filter(
    (n): n is number => typeof n === 'number',
  )
  if (answered.length === 0) return null
  return avg(answered)
}

export interface CohortOutcomes {
  referred: number
  enrolled: number
  attendanceRate: number
  completionRate: number
  averageConfidenceChange: number
  threeStrengthsPct: number
  goalCompletedPct: number
  improvedConnectionPct: number
  progressCommunity: number
  progressVolunteering: number
  progressEducation: number
  progressEmployment: number
  satisfaction: number
  followUpPositive: number
}

/**
 * Computes anonymised cohort-level outcomes from participant records.
 * No identifiable information is returned — counts and percentages only.
 */
export function computeOutcomes(
  participants: ParticipantRecord[],
  referrals: Referral[],
  onward: OnwardReferral[],
): CohortOutcomes {
  const enrolled = participants.length
  const referred = Math.max(enrolled, referrals.filter((r) => r.status !== 'declined').length)

  // Attendance across recorded weeks
  let present = 0
  let recorded = 0
  for (const p of participants) {
    for (const v of Object.values(p.attendance)) {
      if (v === null || v === undefined) continue
      recorded += 1
      if (v === 'present') present += 1
    }
  }

  // Completion: reached week 8 complete, or certificate issued
  const completed = participants.filter(
    (p) => p.certificateIssued || p.weekProgress.find((w) => w.week === 8)?.status === 'complete',
  ).length

  // Confidence change: final (or latest) mean minus baseline mean
  const changes: number[] = []
  const connectionImproved: number[] = []
  for (const p of participants) {
    const baseline = p.checkIns.find((c) => c.point === 'baseline')
    const latest = [...p.checkIns].reverse().find((c) => c.point === 'final') ?? p.checkIns.at(-1)
    if (baseline && latest && baseline.id !== latest.id) {
      const b = checkInMean(baseline)
      const l = checkInMean(latest)
      if (b !== null && l !== null) changes.push(l - b)
      if (
        typeof baseline.connected === 'number' &&
        typeof latest.connected === 'number' &&
        latest.connected > baseline.connected
      ) {
        connectionImproved.push(1)
      }
    }
  }

  const threeStrengths = participants.filter((p) => p.strengths.length >= 3).length
  const goalCompleted = participants.filter((p) =>
    p.goals.some((g) => g.status === 'completed'),
  ).length

  const dest = (t: OnwardReferral['type']) => onward.filter((o) => o.type === t).length

  return {
    referred,
    enrolled,
    attendanceRate: pct(present, recorded),
    completionRate: pct(completed, enrolled),
    averageConfidenceChange: Math.round(avg(changes) * 10) / 10,
    threeStrengthsPct: pct(threeStrengths, enrolled),
    goalCompletedPct: pct(goalCompleted, enrolled),
    improvedConnectionPct: pct(connectionImproved.length, enrolled),
    progressCommunity: dest('community'),
    progressVolunteering: dest('volunteering'),
    progressEducation: dest('education'),
    progressEmployment: dest('employment'),
    // Demonstration satisfaction / follow-up figures (fictional)
    satisfaction: 94,
    followUpPositive: 78,
  }
}
