export const FOUNDER = {
  name: 'Tanja Hanson',
  roles: ['Mother', 'Carer', 'Advocate'],
  tagline: 'From Lived Experience to Lasting Change',
  mission:
    'I am the founder of Social Innovation CIC. My work began not with a business plan, but with a family, a growing worry, and a refusal to accept that reaching crisis should be the only way to be heard.',
  organisation: 'Social Innovation CIC',
}

export const FOUNDER_PRINCIPLES = [
  'Prevention Is the Cure',
  'Needs First, Not Labels',
  'Small Steps Create Big Change',
]

/** Short, elegant reflection — stanzas of a few lines each. */
export const REFLECTION = {
  title: 'The Woman Who Refused to Look Away',
  eyebrow: 'A reflection',
  stanzas: [
    ['She noticed the small things first —', 'the pattern behind the difficult days,', 'the meaning behind the meltdown.'],
    ['She asked the questions no one answered,', 'and kept asking when the answers', 'were slow to come.'],
    ['She did not have a title for it,', 'only a feeling that early understanding', 'could change everything.'],
    ['So she wrote it down. She joined the dots.', 'And she built a way for other families', 'to be understood sooner.'],
  ],
}

export const NOTE_FROM_ME = {
  quote:
    'I did not set out to build an organisation. I set out to make sure another family would not have to reach breaking point before someone looked closely.',
  closing: 'This is why prevention matters to me. It always has.',
}

export interface Chapter {
  number: string
  title: string
  paragraphs: string[]
  /** Optional pull-quote shown after this chapter. */
  quote?: string
  /** Marks a chapter that touches on a sensitive, softened crisis moment. */
  sensitive?: boolean
}

export const STORY_INTRO =
  'This is my story — told honestly, and with care. It is about noticing early, being heard late, and deciding to build something better for the families who come next.'

export const CHAPTERS: Chapter[] = [
  {
    number: '01',
    title: 'Before the worry had a name',
    paragraphs: [
      'Long before there were meetings or referrals, there were small things — the difficult mornings, the transitions that overwhelmed, the after-school exhaustion that no one else seemed to see.',
      'As a mother and carer, I began keeping track. Not because I had answers, but because I could feel a pattern forming that the everyday snapshots were missing.',
    ],
    quote: 'The signs were never missing. They were scattered.',
  },
  {
    number: '02',
    title: 'Fighting to be heard',
    paragraphs: [
      'Every service we spoke to held a piece of the picture. A note here, an observation there, a form completed and filed away. Each one was doing its part, but no one was bringing it together.',
      'We repeated the same story again and again, to different people, hoping that this time it would be enough to unlock the right support.',
    ],
    quote: 'Every service held a page of it. Nobody was holding the book.',
  },
  {
    number: '03',
    title: 'A turning point',
    sensitive: true,
    paragraphs: [
      'There came a point where the strain of not being understood became frightening — a low and frightening moment that made it painfully clear how much was at stake when help arrives too late.',
      'I will not describe that time in detail here. What matters is what it taught me: that families should never have to reach a crisis before the full picture is finally recognised. Everyone came through it, and it became the reason this work exists.',
    ],
    quote: 'No family should have to reach breaking point to be believed.',
  },
  {
    number: '04',
    title: 'Turning pain into purpose',
    paragraphs: [
      'I began to imagine what might have changed if the observations from home, school and the people who knew us had been gently brought together over time — organised, not to label a child, but to understand their needs.',
      'That idea became NeuroPathway: a preventative, needs-led way to help families, schools and professionals recognise strengths, triggers and unmet needs earlier, and to strengthen the child’s own voice.',
    ],
  },
  {
    number: '05',
    title: 'What we are building',
    paragraphs: [
      'Social Innovation CIC grew from the realisation that these gaps were not unique to us. It is now an umbrella for co-designing responsible, preventative solutions across education, health, social care and communities.',
      'The work is still being written, and it is deliberately honest about what is proven and what is still in development. But its purpose has never changed: early understanding, and support that arrives before crisis.',
    ],
    quote: 'One idea, one conversation, one committed partnership can be the beginning of something better.',
  },
]

/** Softened, signposting content note shown before the sensitive chapter. */
export const CONTENT_NOTE = {
  body:
    'The next part of my story gently touches on a family reaching a frightening low point. It is summarised with care and contains no graphic detail. You are welcome to skip ahead.',
  skipLabel: 'Skip to “Turning pain into purpose”',
  skipHref: '#chapter-04',
  helpLabel: 'Need urgent help now?',
  helpHref: '/safeguarding',
}
