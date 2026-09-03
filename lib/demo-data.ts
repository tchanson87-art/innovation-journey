import type {
  DemoUser,
  ParticipantRecord,
  Referral,
  FacilitatorNote,
  SafeguardingRecord,
  OnwardReferral,
  ConfidenceCheckIn,
  Strength,
  Goal,
  WeekProgress,
  AuditEntry,
} from './types'

export const COHORT = {
  id: 'cohort-riverside-spring',
  name: 'Riverside Spring Cohort',
  programme: 'Small Steps Confidence Programme',
  location: 'Riverside Community Hub',
  startDate: '2026-04-14',
  dayTime: 'Tuesdays, 10:00 – 12:00',
  referralRoute: 'Community and self-referral',
  partner: 'Riverside Housing Partnership',
}

export const FACILITATOR: DemoUser = {
  id: 'fac-1',
  role: 'facilitator',
  name: 'Priya Sharma',
  preferredName: 'Priya',
  email: 'priya@socialinnovationcic.org.uk',
  facilitatorOf: [COHORT.id],
}

export const ADMIN: DemoUser = {
  id: 'admin-1',
  role: 'admin',
  name: 'Jordan Ellis',
  preferredName: 'Jordan',
  email: 'jordan@socialinnovationcic.org.uk',
}

function checkIns(pid: string, base: number[], mid: number[], fin: number[] | null): ConfidenceCheckIn[] {
  const out: ConfidenceCheckIn[] = [
    {
      id: `${pid}-ci-base`,
      participantId: pid,
      point: 'baseline',
      week: 1,
      date: '2026-04-14',
      confident: base[0],
      connected: base[1],
      askForHelp: base[2],
      decisions: base[3],
      nextStep: base[4],
    },
    {
      id: `${pid}-ci-mid`,
      participantId: pid,
      point: 'midpoint',
      week: 4,
      date: '2026-05-05',
      confident: mid[0],
      connected: mid[1],
      askForHelp: mid[2],
      decisions: mid[3],
      nextStep: mid[4],
    },
  ]
  if (fin) {
    out.push({
      id: `${pid}-ci-final`,
      participantId: pid,
      point: 'final',
      week: 8,
      date: '2026-06-02',
      confident: fin[0],
      connected: fin[1],
      askForHelp: fin[2],
      decisions: fin[3],
      nextStep: fin[4],
    })
  }
  return out
}

function strengths(pid: string, items: [string, string, number, boolean][]): Strength[] {
  return items.map((s, i) => ({
    id: `${pid}-str-${i}`,
    participantId: pid,
    label: s[0],
    source: s[1],
    week: s[2],
    valued: s[3],
  }))
}

function weekProgress(complete: number, current: number): WeekProgress[] {
  return Array.from({ length: 8 }, (_, i) => {
    const week = i + 1
    let status: WeekProgress['status'] = 'locked'
    if (week <= complete) status = 'complete'
    else if (week === current) status = 'in-progress'
    else if (week === current + 1) status = 'available'
    else if (week <= current) status = 'available'
    return {
      week,
      status,
      completedActivities: week <= complete ? ['activity'] : [],
    }
  })
}

// Participant A — good progress, part way through
const pA: ParticipantRecord = {
  user: {
    id: 'part-1',
    role: 'participant',
    name: 'Marie Doyle',
    preferredName: 'Marie',
    email: 'marie@example.com',
    cohortId: COHORT.id,
  },
  currentWeek: 5,
  nextSessionDate: '2026-05-12',
  shareGoalsWithFacilitator: true,
  shareReflections: false,
  weekProgress: weekProgress(4, 5),
  checkIns: checkIns('part-1', [3, 2, 2, 3, 2], [5, 5, 4, 5, 4], null),
  strengths: strengths('part-1', [
    ['Patient', 'Years of caring for a family member', 2, true],
    ['Good listener', 'Supporting friends through hard times', 2, true],
    ['Organised', 'Managing a busy household', 2, true],
    ['Determined', 'Returning to the group each week', 6, false],
  ]),
  goals: [
    {
      id: 'part-1-goal-1',
      participantId: 'part-1',
      week: 1,
      change: 'Feel calmer when speaking to new people',
      why: 'I want to join a local walking group but feel nervous',
      smallestStep: 'Say hello to one new person at the session',
      help: 'Support from the facilitator and the group',
      when: 'This week',
      howItWent: 'I managed it twice and it felt easier the second time',
      next: 'Ask someone a question next week',
      status: 'completed',
      updatedAt: '2026-04-21',
    },
    {
      id: 'part-1-goal-2',
      participantId: 'part-1',
      week: 5,
      change: 'Book a GP appointment online',
      why: 'I have been putting it off for months',
      smallestStep: 'Find the practice website and read the booking page',
      help: 'The digital confidence session',
      when: 'By next Tuesday',
      howItWent: '',
      next: '',
      status: 'in-progress',
      updatedAt: '2026-05-06',
    },
  ],
  privateReflections: [
    {
      id: 'part-1-ref-1',
      date: '2026-04-21',
      text: 'I was dreading coming back but I am glad I did. People were kind.',
      shared: false,
    },
  ],
  certificateIssued: false,
  attendance: { 1: 'present', 2: 'present', 3: 'apologies', 4: 'present', 5: null, 6: null, 7: null, 8: null },
}

// Participant B — completed programme, certificate issued
const pB: ParticipantRecord = {
  user: {
    id: 'part-2',
    role: 'participant',
    name: 'Tomasz Kowalski',
    preferredName: 'Tom',
    email: 'tom@example.com',
    cohortId: COHORT.id,
  },
  currentWeek: 8,
  nextSessionDate: '2026-06-02',
  shareGoalsWithFacilitator: true,
  shareReflections: true,
  weekProgress: weekProgress(8, 8),
  checkIns: checkIns('part-2', [2, 1, 2, 2, 1], [4, 3, 4, 4, 3], [7, 7, 6, 7, 7]),
  strengths: strengths('part-2', [
    ['Reliable', 'Never missed a session', 2, true],
    ['Practical problem-solver', 'Fixed the group project display', 6, true],
    ['Encouraging to others', 'Helped a quieter member join in', 6, true],
    ['Resilient', 'Kept going after a difficult year', 2, false],
  ]),
  goals: [
    {
      id: 'part-2-goal-1',
      participantId: 'part-2',
      week: 1,
      change: 'Speak to one person outside my home each week',
      why: 'I have felt very isolated since being off work',
      smallestStep: 'Attend the group each Tuesday',
      help: 'The group and my support worker',
      when: 'Every week',
      howItWent: 'I now speak to several people and look forward to it',
      next: 'Join the community garden volunteering',
      status: 'completed',
      updatedAt: '2026-05-26',
    },
    {
      id: 'part-2-goal-2',
      participantId: 'part-2',
      week: 7,
      change: 'Volunteer locally',
      why: 'I want structure and to feel useful again',
      smallestStep: 'Visit the community garden with the facilitator',
      help: 'Introduction arranged through the programme',
      when: 'Week after the programme ends',
      howItWent: 'Visit went well, I have agreed a trial morning',
      next: 'Start a weekly volunteering session',
      status: 'completed',
      updatedAt: '2026-06-01',
    },
  ],
  privateReflections: [
    {
      id: 'part-2-ref-1',
      date: '2026-06-01',
      text: 'Eight weeks ago I could not imagine this. I feel like myself again.',
      shared: true,
    },
  ],
  certificateIssued: true,
  attendance: { 1: 'present', 2: 'present', 3: 'present', 4: 'present', 5: 'present', 6: 'present', 7: 'present', 8: 'present' },
}

// Participant C — early, gentle start
const pC: ParticipantRecord = {
  user: {
    id: 'part-3',
    role: 'participant',
    name: 'Aisha Bello',
    preferredName: 'Aisha',
    email: 'aisha@example.com',
    cohortId: COHORT.id,
  },
  currentWeek: 2,
  nextSessionDate: '2026-05-12',
  shareGoalsWithFacilitator: false,
  shareReflections: false,
  weekProgress: weekProgress(1, 2),
  checkIns: checkIns('part-3', [2, 2, 1, 2, 1], [3, 3, 2, 2, 2], null).slice(0, 1),
  strengths: strengths('part-3', [
    ['Caring', 'Looking after three children', 2, true],
    ['Creative', 'Enjoys drawing and crafts', 2, false],
  ]),
  goals: [
    {
      id: 'part-3-goal-1',
      participantId: 'part-3',
      week: 1,
      change: 'Feel less anxious coming into a group room',
      why: 'Groups have felt overwhelming in the past',
      smallestStep: 'Arrive a few minutes early to settle in',
      help: 'A quiet seat near the door, agreed with the facilitator',
      when: 'Next session',
      howItWent: '',
      next: '',
      status: 'thinking',
      updatedAt: '2026-04-15',
    },
  ],
  privateReflections: [],
  certificateIssued: false,
  attendance: { 1: 'present', 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
}

export const PARTICIPANTS: ParticipantRecord[] = [pA, pB, pC]

export const FACILITATOR_NOTES: FacilitatorNote[] = [
  {
    id: 'note-1',
    participantId: 'part-1',
    date: '2026-04-14',
    type: 'adjustment',
    text: 'Prefers a seat near the window and advance notice of any group activities.',
    author: 'Priya',
  },
  {
    id: 'note-2',
    participantId: 'part-1',
    date: '2026-05-05',
    type: 'session',
    text: 'Contributed to the group discussion for the first time. Growing in confidence.',
    author: 'Priya',
  },
  {
    id: 'note-3',
    participantId: 'part-3',
    date: '2026-04-14',
    type: 'adjustment',
    text: 'Quiet seat near the door agreed. May step out for a short break if needed.',
    author: 'Priya',
  },
]

export const SAFEGUARDING_RECORDS: SafeguardingRecord[] = [
  {
    id: 'sg-1',
    date: '2026-04-28',
    participantLabel: 'Participant (restricted)',
    concern: 'Participant mentioned feeling low. No immediate risk indicated.',
    actionTaken: 'Offered a private check-in and shared the urgent support information.',
    personNotified: 'Safeguarding Lead (Social Innovation CIC)',
    followUp: 'Facilitator to check in at the next session.',
    restricted: true,
    author: 'Priya',
  },
]

export const ONWARD_REFERRALS: OnwardReferral[] = [
  {
    id: 'onward-1',
    participantId: 'part-2',
    date: '2026-06-01',
    destination: 'Riverside Community Garden',
    type: 'volunteering',
    notes: 'Trial morning agreed with participant consent.',
    agreed: true,
  },
]

export const REFERRALS: Referral[] = [
  {
    id: 'ref-demo-1',
    type: 'self',
    createdAt: '2026-05-01',
    status: 'reviewing',
    name: 'Sam Carter',
    preferredName: 'Sam',
    contact: 'sam@example.com',
    contactMethod: 'Email',
    reason: 'Would like to build confidence after a long time out of work.',
    accessibility: 'Prefers written information in advance.',
    area: 'RV1',
    consent: true,
    demo: true,
  },
  {
    id: 'ref-demo-2',
    type: 'professional',
    createdAt: '2026-05-03',
    status: 'new',
    name: 'Referred adult (consented)',
    contact: 'via support worker',
    reason: 'Social isolation following bereavement.',
    area: 'RV3',
    consent: true,
    organisation: 'Riverside Housing Partnership',
    demo: true,
  },
]

export const AUDIT_LOG: AuditEntry[] = [
  {
    id: 'audit-1',
    timestamp: '2026-04-10 09:14',
    actor: 'Jordan Ellis',
    role: 'admin',
    action: 'Created cohort',
    detail: 'Riverside Spring Cohort created and linked to Riverside Housing Partnership.',
  },
  {
    id: 'audit-2',
    timestamp: '2026-04-10 09:20',
    actor: 'Jordan Ellis',
    role: 'admin',
    action: 'Invited facilitator',
    detail: 'Priya Sharma invited and assigned to Riverside Spring Cohort.',
  },
  {
    id: 'audit-3',
    timestamp: '2026-04-12 15:02',
    actor: 'Jordan Ellis',
    role: 'admin',
    action: 'Allocated participants',
    detail: '3 participants allocated to Riverside Spring Cohort following referral review.',
  },
  {
    id: 'audit-4',
    timestamp: '2026-04-28 11:35',
    actor: 'Priya Sharma',
    role: 'facilitator',
    action: 'Recorded safeguarding note',
    detail: 'Restricted safeguarding record created (details access-controlled).',
  },
  {
    id: 'audit-5',
    timestamp: '2026-06-01 10:05',
    actor: 'Priya Sharma',
    role: 'facilitator',
    action: 'Recorded onward referral',
    detail: 'Onward referral to volunteering recorded with participant consent.',
  },
]

export const DEMO_ACCOUNTS: DemoUser[] = [
  pA.user,
  pB.user,
  pC.user,
  FACILITATOR,
  ADMIN,
]
