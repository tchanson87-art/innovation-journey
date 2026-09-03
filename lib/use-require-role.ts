"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemo } from "@/lib/store"
import type { Role } from "@/lib/types"

/**
 * Client-side demo guard. Redirects to sign-in if not signed in,
 * or to the correct area if the signed-in user has a different role.
 * This is a demonstration convenience, not a security boundary.
 */
export function useRequireRole(role: Role) {
  const { ready, currentUser } = useDemo()
  const router = useRouter()

  useEffect(() => {
    if (!ready) return
    if (!currentUser) {
      router.replace("/sign-in")
    } else if (currentUser.role !== role) {
      const dest =
        currentUser.role === "participant"
          ? "/portal"
          : currentUser.role === "facilitator"
            ? "/facilitator"
            : "/admin"
      router.replace(dest)
    }
  }, [ready, currentUser, role, router])

  return { ready, currentUser, allowed: ready && currentUser?.role === role }
}
