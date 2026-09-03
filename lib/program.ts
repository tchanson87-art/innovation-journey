import type { WeekContent } from './types'

export const ORG = {
  name: 'Social Innovation CIC',
  programme: 'Small Steps Confidence Programme',
  taglines: ['Prevention Is the Cure', 'Small steps create big changes'],
  email: 'hello@socialinnovationcic.org.uk',
  phone: '0300 000 0000',
  address: 'Social Innovation CIC, Community House, Riverside, UK',
} as const

export const CENTRAL_MESSAGE =
  'Confidence is not something people either have or do not have. It can be rebuilt through safety, encouragement, opportunity and small achievable steps.'

export const REASSURANCE =
  'You do not have to change everything at once. One supported step can begin an entirely new pathway.'

export const CHECK_IN_QUESTIONS = [
  { key: 'confident', label: 'How confident do you feel today?' },
  { key: 'connected', label: 'How connected to other people do you feel?' },
  { key: 'askForHelp', label: 'How able do you feel to ask for help?' },
  { key: 'decisions', label: 'How confident do you feel making decisions?' },
  { key: 'nextStep', label: 'How ready do you feel to take your next step?' },
] as const

export const PATHWAY_STEPS = [
  'Enquiry or referral',
  'Friendly introductory conversation',
  'Accessibility and support needs agreed',
  'Eight weekly group sessions',
  'Personal goals and activities',
  'Celebration and certificate',
  'Supported next-step pathway',
  'Follow-up after four to six weeks',
]

export const SUPPORTS = [
  'Low confidence or self-esteem',
  'Social isolation or anxiety',
  'Unemployment or long-term absence from work',
  'Difficult life experiences, trauma or bereavement',
  'Caring responsibilities',
  'Poor mental health',
  'Fear of services, meetings or unfamiliar opportunities',
]

export const WEEKS: WeekContent[] = [
  {
    week: 1,
    title: 'Starting Where I Am',
    icon: 'compass',
    focus: [
      'Creating a safe environment',
      'Understanding confidence',
      'Agreeing group values',
      'Identifying what the participant wants to change',
      'Setting one realistic personal goal',
    ],
    activity: 'Where I am now and where I would like to be.',
    outputs: ['Baseline confidence score', 'Personal goal', 'Support preferences'],
  },
  {
    week: 2,
    title: 'Recognising My Strengths',
    icon: 'sparkles',
    focus: [
      'Personal qualities',
      'Achievements',
      'Lived experience',
      'Skills developed through caring, parenting and overcoming challenges',
      'Transferable abilities',
    ],
    activity: 'Create a personal strengths map.',
    outputs: ['Strengths profile', 'Three qualities the participant values in themselves'],
  },
  {
    week: 3,
    title: 'Challenging Self-Doubt',
    icon: 'heart-handshake',
    focus: [
      'Understanding negative self-talk',
      'Recognising unhelpful thoughts',
      'Self-compassion',
      'Helpful coping strategies',
    ],
    activity: 'Turn one negative belief into a balanced and supportive statement.',
    outputs: ['Personal coping toolkit'],
    note: 'This is not therapy or clinical treatment. It is gentle, practical and led by you.',
  },
  {
    week: 4,
    title: 'Finding My Voice',
    icon: 'megaphone',
    focus: [
      'Communication',
      'Expressing needs',
      'Asking for help',
      'Healthy boundaries',
      'Preparing for meetings and appointments',
    ],
    activity: 'Practise a conversation using a simple scenario.',
    outputs: ['Personal meeting or conversation plan'],
  },
  {
    week: 5,
    title: 'Everyday and Digital Confidence',
    icon: 'smartphone',
    focus: [
      'Making phone calls',
      'Writing emails',
      'Completing online forms',
      'Preparing for appointments',
      'Digital safety',
      'Finding trustworthy support',
    ],
    activity: 'Choose and complete one practical task.',
    outputs: ['Completed everyday or digital challenge'],
  },
  {
    week: 6,
    title: 'Trying Something New',
    icon: 'palette',
    focus: [
      'Working with others',
      'Creativity',
      'Problem-solving',
      'Taking a manageable risk in a supportive environment',
    ],
    activity: 'Take part in a shared activity of your choosing.',
    activityOptions: [
      'Community project',
      'Creative activity',
      'Small event',
      'Digital project',
      'Group presentation',
      'Local problem-solving challenge',
    ],
    outputs: ['Shared group achievement'],
  },
  {
    week: 7,
    title: 'My Next Small Step',
    icon: 'footprints',
    focus: [
      'Community opportunities',
      'Education and training',
      'Volunteering',
      'Peer support',
      'Employment',
      'Personal wellbeing and independence',
    ],
    activity: 'Build a next-step pathway without pressure.',
    outputs: ['One immediate step', 'One medium-term goal', 'Support or introduction required'],
  },
  {
    week: 8,
    title: 'Celebrating Progress',
    icon: 'award',
    focus: [
      'Reviewing progress',
      'Recognising change',
      'Celebrating achievements',
      'Agreeing follow-up support',
    ],
    activity: 'Review your journey and celebrate how far you have come.',
    outputs: [
      'Final confidence score',
      'Personal progress summary',
      'Certificate',
      'Agreed next step',
      'Optional participant feedback',
    ],
  },
]

export const ENCOURAGEMENTS = [
  'You are building progress.',
  'Small steps still count.',
  'Continue when you feel ready.',
  'Your experience contains strengths.',
]

export const URGENT_HELP = [
  {
    name: 'Emergency services',
    detail: 'Call 999 if someone is in immediate danger.',
    action: 'tel:999',
    label: 'Call 999',
  },
  {
    name: 'NHS 111',
    detail: 'Call 111 and select the mental health option where appropriate.',
    action: 'tel:111',
    label: 'Call 111',
  },
  {
    name: 'Samaritans',
    detail: 'Free to call, day or night, 365 days a year.',
    action: 'tel:116123',
    label: 'Call 116 123',
  },
  {
    name: 'Your GP or support worker',
    detail: 'You can also contact your GP or an existing support worker.',
    action: null,
    label: null,
  },
]

export const STEP_STATUS_LABELS: Record<string, string> = {
  'not-started': 'Not started',
  thinking: 'Thinking about it',
  'in-progress': 'In progress',
  completed: 'Completed',
  'changed-mind': 'Changed my mind',
}
