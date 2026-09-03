"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Phone, Globe, HeartHandshake, LifeBuoy, FileText } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    icon: HeartHandshake,
    title: "Understanding confidence",
    body: "A gentle guide to what confidence is, and how it can be rebuilt through small, safe steps.",
  },
  {
    icon: Phone,
    title: "Preparing for a phone call",
    body: "A simple checklist to help you feel ready before making a call to a service or appointment.",
  },
  {
    icon: Globe,
    title: "Staying safe online",
    body: "Straightforward tips for using the internet, email and online forms with confidence.",
  },
  {
    icon: BookOpen,
    title: "Coping strategies toolkit",
    body: "Practical, non-clinical strategies for calmer moments when things feel overwhelming.",
  },
]

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="size-7 text-teal" aria-hidden="true" />
          <h1 className="text-3xl font-extrabold text-primary">Helpful resources</h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
          A small library of friendly, easy-to-read guides. Take what is useful to you and leave the
          rest for another time.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((r) => (
          <Card key={r.title} className="flex flex-col gap-3 p-6">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-soft text-teal">
              <r.icon className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-bold text-foreground">{r.title}</h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">{r.body}</p>
            <div className="mt-auto pt-2">
              <Button variant="outline" size="sm">
                <FileText className="size-4" />
                Open guide
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="flex flex-col gap-3 border-2 border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-center gap-2">
          <LifeBuoy className="size-6 text-destructive" aria-hidden="true" />
          <h2 className="text-xl font-bold text-foreground">If you need urgent help</h2>
        </div>
        <p className="text-foreground text-pretty">
          This platform is not monitored continuously and cannot provide emergency help. If someone is
          in immediate danger, call 999.
        </p>
        <div>
          <Button asChild variant="destructive">
            <Link href="/support">See urgent support information</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
