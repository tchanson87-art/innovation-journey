import type { PlateAccent } from '@/components/innovation/logo-plate'

export const INNOVATION_EMAILS = {
  general: 'tanja.socialinnovationcic@zohomail.eu',
  neuropathway: 'tanjahanson.neuropathway@zohomail.eu',
}

export interface JourneyStage {
  number: number
  title: string
  reflection?: string
  noticed?: string
  response?: string
  body: string[]
  feature?: string
  note?: string
  principles?: string[]
  workstreams?: string[]
  logo?: { name: string; descriptor?: string; accent: PlateAccent }
  status?: string
  cta?: { label: string; href: string }
}

/** Honest, non-clinical development-status labels. */
export const STATUS = {
  livedExperience: 'Founder lived-experience insight',
  rationale: 'Founding rationale — not proof of effectiveness',
  inDevelopment: 'In development — governance and pilot design underway',
  earlyStage: 'Early-stage innovation — scope and governance requirements to be confirmed',
  delivering: 'Demonstration build — not yet independently evaluated',
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    number: 1,
    title: 'Experiencing the gaps firsthand',
    body: [
      'My innovation journey began through lived experience as a mother and carer navigating education, health and social-care systems. I saw how families could spend years repeating information while important patterns remained scattered across different people, services and records.',
    ],
    reflection: 'I was not looking for a business idea. I was looking for a better way.',
    note: 'This reflects the founder’s own experience. No private or identifiable family information is shared.',
    status: STATUS.livedExperience,
  },
  {
    number: 2,
    title: 'Looking beyond individual incidents',
    body: [
      'I began asking what might change if observations were brought together over time. One incident can offer only a snapshot, but repeated information from home, education and relevant professionals may reveal strengths, triggers, unmet needs and support that works.',
    ],
    feature:
      'What if the information needed to understand someone already exists, but has never been brought together properly?',
    note: 'This is the founding rationale behind the innovation. It is not a claim of proven effectiveness.',
    status: STATUS.rationale,
  },
  {
    number: 3,
    title: 'Turning scattered observations into a clearer pathway',
    body: [
      'NeuroPathway developed from the idea that children and families should not have to reach crisis before patterns are recognised. It is a preventative, needs-led ecosystem designed to help families, schools and relevant professionals organise everyday observations, strengthen the child’s voice and support better-informed human conversations.',
    ],
    principles: [
      'Needs first, not diagnosis',
      'Behaviour can be communication',
      'Patterns matter',
      'Context matters',
      'Children and families must be heard',
      'Technology should support human judgement',
    ],
    logo: { name: 'NeuroPathway', descriptor: 'Needs-led ecosystem', accent: 'teal' },
    status: STATUS.inDevelopment,
    cta: { label: 'Explore NeuroPathway', href: '#portfolio' },
  },
  {
    number: 4,
    title: 'Giving children a safer way to express their voice',
    body: [
      'Safe Space grew from the recognition that children do not always communicate through formal conversations. Some may find it easier to use emotional check-ins, journalling, creative activities, goals or other age-appropriate tools.',
    ],
    note: 'Safe Space is intended to support communication and wellbeing. It is not an emergency, diagnostic, clinical or autonomous safeguarding service.',
    logo: { name: 'NeuroPathway Safe Space', descriptor: 'Child voice & wellbeing', accent: 'teal' },
    status: STATUS.inDevelopment,
    cta: { label: 'Explore Safe Space', href: '#portfolio' },
  },
  {
    number: 5,
    title: 'Creating Social Innovation CIC',
    body: [
      'I realised that the gaps I had experienced were not limited to one service or one type of need. Social Innovation CIC was created as an umbrella for co-designing responsible, preventative solutions across health, social care, education and communities.',
    ],
    feature:
      'To identify system gaps through lived experience, evidence and collaboration, then develop practical solutions that help people receive the right support earlier.',
    workstreams: [
      'Community benefit',
      'Evidenced need',
      'Safeguarding',
      'Data protection',
      'Accessibility',
      'Professional input',
      'Delivery capacity',
      'Evaluation',
      'Sustainability',
    ],
    logo: { name: 'Social Innovation CIC', descriptor: 'The umbrella', accent: 'navy' },
    status: STATUS.inDevelopment,
  },
  {
    number: 6,
    title: 'Recognising gaps at moments of care and transition',
    body: [
      'MediSense emerged as a separate innovation exploring how concise, accessible care information could support safer communication at important points of admission, crisis or handover.',
    ],
    note: 'MediSense has its own purpose, users, data requirements, clinical-safety considerations and development pathway. It is distinct from NeuroPathway.',
    logo: { name: 'MediSense', descriptor: 'Care communication', accent: 'gold' },
    status: STATUS.earlyStage,
    cta: { label: 'Register Interest in MediSense', href: '/contact' },
  },
  {
    number: 7,
    title: 'Prevention also means building confidence',
    body: [
      'The journey expanded beyond digital innovation. Small Steps was developed around the belief that confidence can grow through manageable actions, supportive reflection, connection and recognition of personal strengths.',
    ],
    feature:
      'Progress does not always arrive through one dramatic change. Sometimes it begins with one achievable step.',
    logo: { name: 'Small Steps', descriptor: 'Confidence Programme', accent: 'teal' },
    status: STATUS.delivering,
    cta: { label: 'Explore Small Steps', href: '/' },
  },
  {
    number: 8,
    title: 'Creating safe opportunities for people to shine',
    body: [
      'Shine Online grew from a desire to create an inclusive space where people can share creativity, talents, interests and achievements without confidence, disability or fear of being on camera becoming a barrier.',
    ],
    feature: 'Participation should build confidence — not create another place where people feel judged.',
    note: 'Three connected routes — 16 and Over, 15 and Under, and Primary — each with distinct age-appropriate design, safeguarding, moderation and consent arrangements.',
    logo: { name: 'Shine Online', descriptor: 'Inclusive participation', accent: 'gold' },
    status: STATUS.earlyStage,
    cta: { label: 'Explore Shine Online', href: '#portfolio' },
  },
  {
    number: 9,
    title: 'Building the foundations properly',
    body: [
      'Innovation is more than having a good idea. It requires co-design, safeguarding, responsible data use, accessibility, professional expertise, evaluation and honest learning.',
    ],
    workstreams: [
      'Community co-design',
      'Safeguarding',
      'Information governance',
      'Data protection',
      'Accessibility',
      'Technical security',
      'Clinical-safety assessment where applicable',
      'Pilot design',
      'Outcome measurement',
      'Partnership development',
      'Sustainable delivery',
    ],
    note: 'No workstream is marked complete unless its completion has been verified.',
    status: STATUS.inDevelopment,
  },
  {
    number: 10,
    title: 'The journey is still being written',
    body: [
      'The next stage is about bringing the right people together. Social Innovation CIC is seeking people and organisations willing to explore, challenge, co-design, test and evaluate these ideas responsibly.',
    ],
    feature:
      'I cannot change an entire system alone. But one idea, one conversation and one committed partnership can become the beginning of something better.',
  },
]

export interface PortfolioItem {
  name: string
  descriptor: string
  accent: PlateAccent
  audience: string
  purpose: string
  status: string
  exploreHref: string
  registerHref: string
}

export const PORTFOLIO: PortfolioItem[] = [
  {
    name: 'NeuroPathway',
    descriptor: 'Needs-led ecosystem',
    accent: 'teal',
    audience: 'Families, schools and relevant professionals',
    purpose: 'Organise everyday observations to recognise patterns and unmet needs earlier.',
    status: STATUS.inDevelopment,
    exploreHref: '#stage-3',
    registerHref: '/contact',
  },
  {
    name: 'NeuroPathway Safe Space',
    descriptor: 'Child voice & wellbeing',
    accent: 'teal',
    audience: 'Children and young people',
    purpose: 'Age-appropriate check-ins, journalling and creative tools to express their voice.',
    status: STATUS.inDevelopment,
    exploreHref: '#stage-4',
    registerHref: '/contact',
  },
  {
    name: 'MediSense',
    descriptor: 'Care communication',
    accent: 'gold',
    audience: 'People at points of admission, crisis or handover',
    purpose: 'Explore concise, accessible care information for safer communication.',
    status: STATUS.earlyStage,
    exploreHref: '#stage-6',
    registerHref: '/contact',
  },
  {
    name: 'Small Steps Confidence Programme',
    descriptor: 'Confidence Programme',
    accent: 'teal',
    audience: 'Adults rebuilding confidence',
    purpose: 'An eight-week supportive journey built around small, achievable steps.',
    status: STATUS.delivering,
    exploreHref: '/',
    registerHref: '/refer-yourself',
  },
  {
    name: 'Shine Online — 16 and Over',
    descriptor: 'Inclusive participation',
    accent: 'gold',
    audience: 'Adults aged 16 and over',
    purpose: 'Share creativity and achievements in a supportive, inclusive space.',
    status: STATUS.earlyStage,
    exploreHref: '#stage-8',
    registerHref: '/contact',
  },
  {
    name: 'Shine Online — 15 and Under',
    descriptor: 'Inclusive participation',
    accent: 'gold',
    audience: 'Young people aged 15 and under',
    purpose: 'Age-appropriate participation with its own safeguarding and consent pathway.',
    status: STATUS.earlyStage,
    exploreHref: '#stage-8',
    registerHref: '/contact',
  },
  {
    name: 'Shine Online — Primary',
    descriptor: 'Inclusive participation',
    accent: 'gold',
    audience: 'Primary-aged children',
    purpose: 'A gentle, closely-safeguarded route designed for the youngest participants.',
    status: STATUS.earlyStage,
    exploreHref: '#stage-8',
    registerHref: '/contact',
  },
]

export const INNOVATION_PRINCIPLES = [
  {
    title: 'Prevention before crisis',
    body: 'Recognising strengths, patterns and needs early — before families reach breaking point.',
  },
  {
    title: 'Needs first, not diagnosis',
    body: 'Describing what someone struggles with and what helps, rather than reaching for a label.',
  },
  {
    title: 'Lived experience with professional rigour',
    body: 'Ideas grounded in real experience and shaped by qualified professional expertise.',
  },
  {
    title: 'Nothing about people without people',
    body: 'Co-designing with the families, children and communities the work is meant to serve.',
  },
  {
    title: 'Safe, ethical and transparent design',
    body: 'Safeguarding, consent and responsible data use built in from the very beginning.',
  },
  {
    title: 'Evidence before claims',
    body: 'Being honest about what is still in development and never overstating what is proven.',
  },
]

export const PARTNERSHIP_CARDS = [
  {
    title: 'Families & community members',
    body: 'Share lived experience and help co-design what genuinely helps.',
  },
  {
    title: 'Schools & education partners',
    body: 'Explore how early recognition can support pupils and staff.',
  },
  {
    title: 'NHS & health professionals',
    body: 'Contribute clinical-safety insight and shape responsible pathways.',
  },
  {
    title: 'Local authorities',
    body: 'Consider preventative approaches that reach people earlier.',
  },
  {
    title: 'Universities & researchers',
    body: 'Help design evaluation and build an honest evidence base.',
  },
  {
    title: 'Charities & community organisations',
    body: 'Partner on delivery and reach communities already trusted.',
  },
  {
    title: 'Funders & social investors',
    body: 'Support responsible development, pilots and evaluation.',
  },
  {
    title: 'Technology, safeguarding & governance specialists',
    body: 'Strengthen security, safeguarding and information governance.',
  },
]
