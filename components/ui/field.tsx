'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export function Label({
  className,
  required,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn('block text-base font-semibold text-foreground', className)} {...props}>
      {children}
      {required && (
        <span className="text-destructive" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
  )
}

const controlBase =
  'w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus-visible:border-ring focus-visible:outline-none aria-[invalid=true]:border-destructive disabled:opacity-60'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(controlBase, 'min-h-11', className)} {...props} />
  ),
)
Input.displayName = 'Input'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(controlBase, 'min-h-28 resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(controlBase, 'min-h-11', className)} {...props}>
    {children}
  </select>
))
Select.displayName = 'Select'

interface FieldProps {
  label: string
  htmlFor: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function Field({ label, htmlFor, required, hint, error, children, className }: FieldProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined
  const errorId = error ? `${htmlFor}-error` : undefined
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {hint && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            id: htmlFor,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
          })
        : children}
      {error && (
        <p id={errorId} role="alert" className="flex items-start gap-1.5 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function Checkbox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        'mt-0.5 size-6 shrink-0 rounded-md border-2 border-input text-teal accent-[var(--teal)] focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}

interface CheckboxFieldProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  hint?: string
}

/** A labelled checkbox row with its own error message, for consent-style questions. */
export function CheckboxField({ id, label, checked, onChange, error, hint }: CheckboxFieldProps) {
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <Checkbox
          id={`field-${id}`}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        />
        <label htmlFor={`field-${id}`} className="text-base leading-relaxed text-foreground">
          {label}
        </label>
      </div>
      {hint && (
        <p id={hintId} className="pl-9 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="pl-9 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

interface RadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

export function RadioGroup({ name, value, onChange, options }: RadioGroupProps) {
  return (
    <div role="radiogroup" className="flex flex-col gap-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-3 rounded-xl border-2 border-input bg-background px-4 py-3 text-base has-[:checked]:border-teal has-[:checked]:bg-teal-soft"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="size-5 accent-[var(--teal)]"
          />
          {opt.label}
        </label>
      ))}
    </div>
  )
}
