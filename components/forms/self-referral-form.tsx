"use client"

import { useState } from "react"
import { Field, Input, Textarea, RadioGroup, CheckboxField } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Confirmation } from "@/components/forms/confirmation"
import { useDemo } from "@/lib/store"

type Errors = Record<string, string>

export function SelfReferralForm() {
  const { createReferral } = useDemo()
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [values, setValues] = useState({
    name: "",
    preferredName: "",
    contact: "",
    contactMethod: "email",
    reason: "",
    accessibility: "",
    postcode: "",
    consent: false,
    privacy: false,
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
    if (!values.name.trim()) e.name = "Please enter your name so we know who to contact."
    if (!values.contact.trim()) {
      e.contact = "Please give us an email address or phone number."
    } else if (values.contactMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact.trim())) {
      e.contact = "That email address does not look right. Please check it."
    }
    if (!values.reason.trim()) e.reason = "Please tell us a little about why you are interested."
    if (!values.consent) e.consent = "We need your consent to contact you before we can continue."
    if (!values.privacy) e.privacy = "Please confirm you have read how we look after your information."
    return e
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`field-${Object.keys(found)[0]}`)
      first?.focus()
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      const ref = createReferral({
        type: "self",
        name: values.name,
        preferredName: values.preferredName,
        contact: values.contact,
        contactMethod: values.contactMethod,
        reason: values.reason,
        accessibility: values.accessibility,
        area: values.postcode,
        consent: values.consent,
      })
      setSubmitting(false)
      setDone(ref)
    }, 600)
  }

  if (done) {
    return (
      <Confirmation
        title="Thank you, your self-referral has been received"
        reference={done}
        message="A member of the Social Innovation CIC team will contact you using your preferred method for a friendly, no-pressure conversation. There is nothing else you need to do right now."
      />
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <Field htmlFor="field-name" label="Your name" required error={errors.name}>
        <Input value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
      </Field>

      <Field
        htmlFor="field-preferredName"
        label="Preferred name"
        hint="What would you like us to call you? This is optional."
      >
        <Input value={values.preferredName} onChange={(e) => set("preferredName", e.target.value)} />
      </Field>

      <Field htmlFor="field-contactMethod" label="How would you prefer we contact you?">
        <RadioGroup
          name="contactMethod"
          value={values.contactMethod}
          onChange={(v) => set("contactMethod", v)}
          options={[
            { value: "email", label: "Email" },
            { value: "phone", label: "Phone call or text message" },
          ]}
        />
      </Field>

      <Field
        htmlFor="field-contact"
        label={values.contactMethod === "email" ? "Email address" : "Phone number"}
        required
        error={errors.contact}
      >
        <Input
          type={values.contactMethod === "email" ? "email" : "tel"}
          value={values.contact}
          onChange={(e) => set("contact", e.target.value)}
          autoComplete={values.contactMethod === "email" ? "email" : "tel"}
        />
      </Field>

      <Field
        htmlFor="field-reason"
        label="What has made you interested in the programme?"
        hint="A sentence or two is plenty. You do not need to share anything you would rather not."
        required
        error={errors.reason}
      >
        <Textarea value={values.reason} onChange={(e) => set("reason", e.target.value)} rows={4} />
      </Field>

      <Field
        htmlFor="field-accessibility"
        label="Accessibility or communication needs"
        hint="Tell us how we can make taking part easier for you. Optional."
      >
        <Textarea value={values.accessibility} onChange={(e) => set("accessibility", e.target.value)} rows={3} />
      </Field>

      <Field htmlFor="field-postcode" label="Area or postcode" hint="This helps us find a group near you. Optional.">
        <Input
          value={values.postcode}
          onChange={(e) => set("postcode", e.target.value)}
          autoComplete="postal-code"
          className="max-w-48"
        />
      </Field>

      <CheckboxField
        id="consent"
        label="I am happy for Social Innovation CIC to contact me about the programme."
        checked={values.consent}
        onChange={(c) => set("consent", c)}
        error={errors.consent}
      />

      <CheckboxField
        id="privacy"
        label="I have read how my information will be looked after."
        checked={values.privacy}
        onChange={(c) => set("privacy", c)}
        error={errors.privacy}
      />

      <div>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send my self-referral"}
        </Button>
      </div>
    </form>
  )
}
