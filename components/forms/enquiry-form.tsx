"use client"

import { useState } from "react"
import { Field, Input, Textarea, CheckboxField } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Confirmation } from "@/components/forms/confirmation"
import { useDemo } from "@/lib/store"
import type { Referral } from "@/lib/types"

export function EnquiryForm({
  type,
  interestLabel,
}: {
  type: Extract<Referral["type"], "partner" | "commissioning">
  interestLabel: string
}) {
  const { createReferral } = useDemo()
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [values, setValues] = useState({
    name: "",
    organisation: "",
    contact: "",
    area: "",
    interest: "",
    consent: false,
  })

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => {
      if (!e[key]) return e
      const next = { ...e }
      delete next[key]
      return next
    })
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const e: Record<string, string> = {}
    if (!values.name.trim()) e.name = "Please enter your name."
    if (!values.organisation.trim()) e.organisation = "Please tell us your organisation."
    if (!values.contact.trim()) e.contact = "Please give us a way to reply."
    if (!values.interest.trim()) e.interest = "Please tell us a little about what you are looking for."
    if (!values.consent) e.consent = "Please confirm we can contact you about your enquiry."
    setErrors(e)
    if (Object.keys(e).length > 0) {
      document.getElementById(`field-${Object.keys(e)[0]}`)?.focus()
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      const ref = createReferral({
        type,
        name: values.name,
        organisation: values.organisation,
        contact: values.contact,
        area: values.area,
        reason: values.interest,
        consent: values.consent,
      })
      setSubmitting(false)
      setDone(ref)
    }, 600)
  }

  if (done) {
    return (
      <Confirmation
        title="Thank you for your enquiry"
        reference={done}
        message="A member of the Social Innovation CIC team will be in touch to talk through how we can work together. There is no obligation at this stage."
      />
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <Field htmlFor="field-name" label="Your name" required error={errors.name}>
        <Input value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
      </Field>
      <Field htmlFor="field-organisation" label="Organisation" required error={errors.organisation}>
        <Input value={values.organisation} onChange={(e) => set("organisation", e.target.value)} />
      </Field>
      <Field htmlFor="field-contact" label="Email or phone" required error={errors.contact}>
        <Input value={values.contact} onChange={(e) => set("contact", e.target.value)} />
      </Field>
      <Field htmlFor="field-area" label="Area you serve" hint="Optional.">
        <Input value={values.area} onChange={(e) => set("area", e.target.value)} />
      </Field>
      <Field htmlFor="field-interest" label={interestLabel} required error={errors.interest}>
        <Textarea value={values.interest} onChange={(e) => set("interest", e.target.value)} rows={4} />
      </Field>
      <CheckboxField
        id="consent"
        label="I am happy for Social Innovation CIC to contact me about this enquiry."
        checked={values.consent}
        onChange={(c) => set("consent", c)}
        error={errors.consent}
      />
      <div>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  )
}
