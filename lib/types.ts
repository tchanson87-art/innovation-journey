export type Role = 'participant' | 'facilitator' | 'admin'

export type StepStatus =
  | 'not-started'
  | 'thinking'
  | 'in-progress'
  | 'completed'
  | 'changed-mind'

export type EvidenceStrength = 'Low' | 'Moderate' | 'High'

export interface WeekContent {
  week: number
  title: string
  icon: string
  focus: string[]
  activity: string
  outputs: string[]
  note?: string
  activityOptions?: string[]
}

export interface DemoUser {
  id: string
  role: Role
  name: string
  preferredName: string
  email: string
  cohortId?: string
  facilitatorOf?: string[]
}

export interface ConfidenceCheckIn {
  id: string
  participantId: string
  point: 'baseline' | 'midpoint' | 'final' | 'weekly'
  week: number
  date: string
  confident: number | null
  connected: number | null
  askForHelp: number | null
  decisions: number | null
  nextStep: number | null
  reflection?: string
}

export interface Strength {
  id: string
  participantId: string
  label: string
  source: string
  week: number
  valued: boolean
}

export interface Goal {
  id: string
  participantId: string
  week: number
  change: string
  why: string
  smallestStep: string
  help: string
  when: string
  howItWent: string
  next: string
  status: StepStatus
  updatedAt: string
}

export interface WeekProgress {
  week: number
  status: 'locked' | 'available' | 'in-progress' | 'complete'
  completedActivities: string[]
  reflection?: string
}

export interface ParticipantRecord {
  user: DemoUser
  currentWeek: number
  nextSessionDate: string
  shareGoalsWithFacilitator: boolean
  shareReflections: boolean
  weekProgress: WeekProgress[]
  checkIns: ConfidenceCheckIn[]
  strengths: Strength[]
  goals: Goal[]
  privateReflections: { id: string; date: string; text: string; shared: boolean }[]
  certificateIssued: boolean
  attendance: Record<number, 'present' | 'absent' | 'apologies' | null>
}

export interface Referral {
  id: string
  type: 'self' | 'professional' | 'partner' | 'commissioning'
  createdAt: string
  status: 'new' | 'reviewing' | 'allocated' | 'declined'
  name: string
  preferredName?: string
  contact: string
  contactMethod?: string
  reason?: string
  accessibility?: string
  area?: string
  consent: boolean
  organisation?: string
  demo?: boolean
}

export interface FacilitatorNote {
  id: string
  participantId: string
  date: string
  type: 'session' | 'adjustment' | 'check-in'
  text: string
  author: string
}

export interface SafeguardingRecord {
  id: string
  date: string
  participantLabel: string
  concern: string
  actionTaken: string
  personNotified: string
  followUp: string
  restricted: true
  author: string
}

export interface OnwardReferral {
  id: string
  participantId: string
  date: string
  destination: string
  type: 'community' | 'volunteering' | 'education' | 'employment' | 'wellbeing'
  notes: string
  agreed: boolean
}

export interface AuditEntry {
  id: string
  timestamp: string
  actor: string
  role: Role
  action: string
  detail: string
}
