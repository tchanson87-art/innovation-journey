import { Badge } from '@/components/ui/badge'

export function PageHero({
  eyebrow,
  title,
  description,
  lead,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  lead?: string
  children?: React.ReactNode
}) {
  const body = description ?? lead
  return (
    <section className="bg-pale-blue">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-4 py-12 sm:px-6 md:py-16">
        {eyebrow && <Badge variant="teal">{eyebrow}</Badge>}
        <h1 className="text-4xl font-extrabold leading-tight text-primary md:text-5xl">{title}</h1>
        {body && <p className="max-w-2xl text-xl text-foreground">{body}</p>}
        {children}
      </div>
    </section>
  )
}
