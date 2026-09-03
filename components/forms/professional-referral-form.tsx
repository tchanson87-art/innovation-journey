"use client"

import { useState } from "react"
import { Field, Input, Textarea, CheckboxField } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Confirmation } from "@/components/forms/confirmation"
import { useDemo } from "@/lib/store"

type Errors = Record<string, string>

export function ProfessionalReferralForm() {
  const { createReferral } = useDemo()
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [values, setValues] = useState({
    referrerName: "",
    organisation: "",
    referrerContact: "",
    adultName: "",
    adultContact: "",
    reason: "",
    accessibility: "",
    area: "",
    knowsAboutReferral: false,
    hasConsented: false,
    suitable: false,
    safeguardingManaged: false,
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

  function validate(): Errors {
    const e: Errors = {}
    if (!values.referrerName.trim()) e.referrerName = "Please enter your name."
    if (!values.organisation.trim()) e.organisation = "Please tell us which organisation you are referring from."
    if (!values.referrerContact.trim()) e.referrerContact = "Please give us a way to contact you."
    if (!values.adultName.trim()) e.adultName = "Please enter the name of the adult being referred."
    if (!values.adultContact.trim()) e.adultContact = "Please give a contact detail for the adult, with their consent."
    if (!values.knowsAboutReferral) e.knowsAboutReferral = "We can only accept referrals the adult knows about."
    if (!values.hasConsented) e.hasConsented = "We need the adult's consent to be contacted."
    if (!values.suitable) e.suitable = "Please confirm this is suitable for a non-clinical confidence programme."
    if (!values.safeguardingManaged)
      e.safeguardingManaged = "Please confirm any immediate concerns are being managed by the correct service."
    return e
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`field-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      const ref = createReferral({
        type: "professional",
        name: values.adultName,
        contact: values.adultContact,
        reason: values.reason,
        accessibility: values.accessibility,
        area: values.area,
        organisation: values.organisation,
        consent: values.hasConsented,
      })
      setSubmitting(false)
      setDone(ref)
    }, 600)
  }

  if (done) {
    return (
      <Confirmation
        title="Thank you, the referral has been received"
        reference={done}
        message="We will review this referral and make contact with the adult using the details you have provided. If we need any further information we will get in touch with you."
      />
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <fieldset className="grid gap-6 rounded-2xl border-2 border-border p-5">
        <legend className="px-2 text-lg font-bold text-foreground">About you</legend>
        <Field htmlFor="field-referrerName" label="Your name" required error={errors.referrerName}>
          <Input value={values.referrerName} onChange={(e) => set("referrerName", e.target.value)} />
        </Field>
        <Field htmlFor="field-organisation" label="Your organisation" required error={errors.organisation}>
          <Input value={values.organisation} onChange={(e) => set("organisation", e.target.value)} />
        </Field>
        <Field htmlFor="field-referrerContact" label="Your work email or phone" required error={errors.referrerContact}>
          <Input value={values.referrerContact} onChange={(e) => set("referrerContact", e.target.value)} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 rounded-2xl border-2 border-border p-5">
        <legend className="px-2 text-lg font-bold text-foreground">About the adult being referred</legend>
        <Field htmlFor="field-adultName" label="Their name" required error={errors.adultName}>
          <Input value={values.adultName} onChange={(e) => set("adultName", e.target.value)} />
        </Field>
        <Field
          htmlFor="field-adultContact"
          label="Their contact detail"
          hint="With their consent. We will use this to make a friendly introductory contact."
          required
          error={errors.adultContact}
        >
          <Input value={values.adultContact} onChange={(e) => set("adultContact", e.target.value)} />
        </Field>
        <Field
          htmlFor="field-reason"
          label="Briefly, why might the programme help?"
          hint="Please keep this general. Do not include detailed medical history."
        >
          <Textarea value={values.reason} onChange={(e) => set("reason", e.target.value)} rows={3} />
        </Field>
        <Field htmlFor="field-accessibility" label="Any accessibility or communication needs">
          <Textarea value={values.accessibility} onChange={(e) => set("accessibility", e.target.value)} rows={2} />
        </Field>
        <Field htmlFor="field-area" label="Area or postcode">
          <Input value={values.area} onChange={(e) => set("area", e.target.value)} className="max-w-48" />
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 rounded-2xl border-2 border-teal/40 bg-teal-soft p-5">
        <legend className="px-2 text-lg font-bold text-foreground">Consent and suitability</legend>
        <CheckboxField
          id="knowsAboutReferral"
          label="The adult knows about this referral."
          checked={values.knowsAboutReferral}
          onChange={(c) => set("knowsAboutReferral", c)}
          error={errors.knowsAboutReferral}
        />
        <CheckboxField
          id="hasConsented"
          label="The adult has consented to being contacted."
          checked={values.hasConsented}
          onChange={(c) => set("hasConsented", c)}
          error={errors.hasConsented}
        />
        <CheckboxField
          id="suitable"
          label="This referral is suitable for a non-clinical confidence programme."
          checked={values.suitable}
          onChange={(c) => set("suitable", c)}
          error={errors.suitable}
        />
        <CheckboxField
          id="safeguardingManaged"
          label="Any immediate safeguarding or crisis concerns have been managed through the correct service."
          checked={values.safeguardingManaged}
          onChange={(c) => set("safeguardingManaged", c)}
          error={errors.safeguardingManaged}
        />
      </fieldset>

      <div>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Submit referral"}
        </Button>
      </div>
    </form>
  )
}
