'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type {
  DemoUser,
  ParticipantRecord,
  Referral,
  ConfidenceCheckIn,
  Goal,
  Strength,
  StepStatus,
} from './types'
import {
  PARTICIPANTS,
  REFERRALS,
  DEMO_ACCOUNTS,
  FACILITATOR_NOTES,
  SAFEGUARDING_RECORDS,
  ONWARD_REFERRALS,
} from './demo-data'
import type { FacilitatorNote, SafeguardingRecord, OnwardReferral } from './types'

const STORAGE_KEY = 'small-steps-demo-v1'

interface DemoState {
  currentUserId: string | null
  participants: ParticipantRecord[]
  referrals: Referral[]
  facilitatorNotes: FacilitatorNote[]
  safeguarding: SafeguardingRecord[]
  onward: OnwardReferral[]
}

function seed(): DemoState {
  return {
    currentUserId: null,
    participants: structuredClone(PARTICIPANTS),
    referrals: structuredClone(REFERRALS),
    facilitatorNotes: structuredClone(FACILITATOR_NOTES),
    safeguarding: structuredClone(SAFEGUARDING_RECORDS),
    onward: structuredClone(ONWARD_REFERRALS),
  }
}

interface DemoContextValue {
  ready: boolean
  currentUser: DemoUser | null
  accounts: DemoUser[]
  state: DemoState
  signIn: (userId: string) => void
  signOut: () => void
  resetDemo: () => void
  getParticipant: (id: string) => ParticipantRecord | undefined
  myRecord: ParticipantRecord | null
  addReferral: (r: Referral) => void
  createReferral: (input: Omit<Referral, 'id' | 'createdAt' | 'status'>) => string
  updateReferralStatus: (id: string, status: Referral['status']) => void
  addCheckIn: (participantId: string, checkIn: ConfidenceCheckIn) => void
  upsertGoal: (participantId: string, goal: Goal) => void
  setGoalStatus: (participantId: string, goalId: string, status: StepStatus) => void
  addStrength: (participantId: string, strength: Strength) => void
  toggleStrengthValued: (participantId: string, strengthId: string) => void
  completeWeekActivity: (participantId: string, week: number) => void
  addReflection: (participantId: string, text: string) => void
  setSharing: (participantId: string, key: 'shareGoalsWithFacilitator' | 'shareReflections', value: boolean) => void
  setAttendance: (participantId: string, week: number, value: 'present' | 'absent' | 'apologies') => void
  issueCertificate: (participantId: string) => void
  addNote: (note: FacilitatorNote) => void
  addSafeguarding: (record: SafeguardingRecord) => void
  addOnward: (record: OnwardReferral) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(seed)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setState(JSON.parse(raw))
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state, ready])

  const currentUser = state.currentUserId
    ? DEMO_ACCOUNTS.find((a) => a.id === state.currentUserId) ?? null
    : null

  const mutateParticipant = useCallback(
    (participantId: string, fn: (p: ParticipantRecord) => ParticipantRecord) => {
      setState((s) => ({
        ...s,
        participants: s.participants.map((p) => (p.user.id === participantId ? fn(p) : p)),
      }))
    },
    [],
  )

  const value: DemoContextValue = {
    ready,
    currentUser,
    accounts: DEMO_ACCOUNTS,
    state,
    signIn: (userId) => setState((s) => ({ ...s, currentUserId: userId })),
    signOut: () => setState((s) => ({ ...s, currentUserId: null })),
    resetDemo: () => setState(seed()),
    getParticipant: (id) => state.participants.find((p) => p.user.id === id),
    myRecord: currentUser?.role === 'participant'
      ? state.participants.find((p) => p.user.id === currentUser.id) ?? null
      : null,
    addReferral: (r) => setState((s) => ({ ...s, referrals: [r, ...s.referrals] })),
    createReferral: (input) => {
      const seq = Math.floor(1000 + Math.random() * 9000)
      const prefix =
        input.type === 'self'
          ? 'SR'
          : input.type === 'professional'
            ? 'PR'
            : input.type === 'partner'
              ? 'PE'
              : 'CE'
      const id = `${prefix}-${seq}`
      const referral: Referral = {
        ...input,
        id,
        createdAt: new Date().toISOString().slice(0, 10),
        status: 'new',
      }
      setState((s) => ({ ...s, referrals: [referral, ...s.referrals] }))
      return id
    },
    updateReferralStatus: (id, status) =>
      setState((s) => ({
        ...s,
        referrals: s.referrals.map((r) => (r.id === id ? { ...r, status } : r)),
      })),
    addCheckIn: (participantId, checkIn) =>
      mutateParticipant(participantId, (p) => ({ ...p, checkIns: [...p.checkIns, checkIn] })),
    upsertGoal: (participantId, goal) =>
      mutateParticipant(participantId, (p) => {
        const exists = p.goals.some((g) => g.id === goal.id)
        return {
          ...p,
          goals: exists ? p.goals.map((g) => (g.id === goal.id ? goal : g)) : [...p.goals, goal],
        }
      }),
    setGoalStatus: (participantId, goalId, status) =>
      mutateParticipant(participantId, (p) => ({
        ...p,
        goals: p.goals.map((g) =>
          g.id === goalId ? { ...g, status, updatedAt: new Date().toISOString().slice(0, 10) } : g,
        ),
      })),
    addStrength: (participantId, strength) =>
      mutateParticipant(participantId, (p) => ({ ...p, strengths: [...p.strengths, strength] })),
    toggleStrengthValued: (participantId, strengthId) =>
      mutateParticipant(participantId, (p) => ({
        ...p,
        strengths: p.strengths.map((s) =>
          s.id === strengthId ? { ...s, valued: !s.valued } : s,
        ),
      })),
    completeWeekActivity: (participantId, week) =>
      mutateParticipant(participantId, (p) => ({
        ...p,
        currentWeek: Math.max(p.currentWeek, Math.min(week + 1, 8)),
        weekProgress: p.weekProgress.map((w) =>
          w.week === week
            ? { ...w, status: 'complete', completedActivities: ['activity'] }
            : w.week === week + 1 && w.status === 'locked'
              ? { ...w, status: 'available' }
              : w,
        ),
      })),
    addReflection: (participantId, text) =>
      mutateParticipant(participantId, (p) => ({
        ...p,
        privateReflections: [
          { id: `refl-${Date.now()}`, date: new Date().toISOString().slice(0, 10), text, shared: false },
          ...p.privateReflections,
        ],
      })),
    setSharing: (participantId, key, val) =>
      mutateParticipant(participantId, (p) => ({ ...p, [key]: val })),
    setAttendance: (participantId, week, val) =>
      mutateParticipant(participantId, (p) => ({
        ...p,
        attendance: { ...p.attendance, [week]: val },
      })),
    issueCertificate: (participantId) =>
      mutateParticipant(participantId, (p) => ({ ...p, certificateIssued: true })),
    addNote: (note) => setState((s) => ({ ...s, facilitatorNotes: [note, ...s.facilitatorNotes] })),
    addSafeguarding: (record) =>
      setState((s) => ({ ...s, safeguarding: [record, ...s.safeguarding] })),
    addOnward: (record) => setState((s) => ({ ...s, onward: [record, ...s.onward] })),
  }

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
