import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Do I need a diagnosis or referral to take part?',
    a: 'No. No diagnosis, qualification or employment history is required. You can refer yourself, or a professional can refer you with your consent.',
  },
  {
    q: 'Is this therapy or a mental health service?',
    a: 'No. This is a confidence and empowerment programme, not a crisis or clinical service. It is gentle, practical and led by you. If you need urgent help, please use the urgent support options available throughout the site.',
  },
  {
    q: 'What happens in a session?',
    a: 'Sessions are small, friendly and relaxed. Each week has a gentle theme, a simple activity and time to talk. You choose how much to join in.',
  },
  {
    q: 'What if I miss a week?',
    a: 'That is completely fine. You can continue when you feel ready, and you do not need perfect attendance to complete the programme or receive recognition.',
  },
  {
    q: 'Who will see my information?',
    a: 'You choose what to share. Your private reflections stay visible only to you unless you decide to share a specific entry. Facilitators only see what you have agreed to share.',
  },
  {
    q: 'How much does it cost?',
    a: 'The programme is delivered through community and partner funding. Contact Social Innovation CIC to find out about cohorts in your area.',
  },
]

export function Faq() {
  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-border bg-card p-1 open:bg-pale-blue"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-lg font-bold text-foreground [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown
              className="size-5 shrink-0 text-teal transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5 pt-1 text-base text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  )
}
