'use client'

import { useState } from 'react'
import { LifeBuoy, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { URGENT_HELP } from '@/lib/program'

export function UrgentHelpButton({ variant = 'floating' }: { variant?: 'floating' | 'inline' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {variant === 'floating' ? (
        <button
          onClick={() => setOpen(true)}
          className="no-print fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-destructive px-5 py-3 font-bold text-destructive-foreground shadow-lg transition-colors hover:bg-destructive/90"
        >
          <LifeBuoy className="size-5" aria-hidden="true" />
          Need urgent help?
        </button>
      ) : (
        <Button variant="destructive" onClick={() => setOpen(true)}>
          <LifeBuoy />
          Need urgent help?
        </Button>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Need urgent help?"
        description="This platform is not monitored continuously and cannot provide emergency help."
      >
        <div className="flex flex-col gap-3">
          <p className="rounded-xl bg-pale-blue p-4 text-sm text-foreground">
            If someone is in immediate danger, always call 999. The contacts below can help right
            now.
          </p>
          <ul className="flex flex-col gap-3">
            {URGENT_HELP.map((item) => (
              <li
                key={item.name}
                className="flex flex-col gap-2 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-bold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                {item.action && item.label && (
                  <Button asChild variant="teal" size="sm">
                    <a href={item.action}>
                      <Phone />
                      {item.label}
                    </a>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  )
}
