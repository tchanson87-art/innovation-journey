"use client"

import type { ConfidenceCheckIn } from "@/lib/types"
import { CHECK_IN_QUESTIONS } from "@/lib/program"

/** Average of the answered questions for a check-in (skipped questions ignored). */
function averageScore(c: ConfidenceCheckIn): number | null {
  const values = CHECK_IN_QUESTIONS.map((q) => c[q.key as keyof ConfidenceCheckIn] as number | null).filter(
    (v): v is number => typeof v === "number",
  )
  if (values.length === 0) return null
  return values.reduce((a, b) => a + b, 0) / values.length
}

const pointLabels: Record<string, string> = {
  baseline: "Start",
  midpoint: "Midway",
  final: "End",
  weekly: "Weekly",
}

export function ConfidenceChart({ checkIns }: { checkIns: ConfidenceCheckIn[] }) {
  const points = checkIns
    .map((c) => ({ label: pointLabels[c.point] ?? `Week ${c.week}`, value: averageScore(c) }))
    .filter((p): p is { label: string; value: number } => p.value !== null)

  if (points.length === 0) {
    return (
      <p className="rounded-xl bg-muted p-4 text-muted-foreground">
        Your confidence chart will appear here once you complete your first check-in.
      </p>
    )
  }

  const width = 520
  const height = 220
  const padX = 44
  const padY = 28
  const plotW = width - padX * 2
  const plotH = height - padY * 2
  const maxX = Math.max(points.length - 1, 1)

  const xFor = (i: number) => padX + (i / maxX) * plotW
  const yFor = (v: number) => padY + (1 - (v - 1) / 9) * plotH

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.value)}`).join(" ")

  return (
    <figure className="flex flex-col gap-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Confidence over time. ${points.map((p) => `${p.label}: ${p.value.toFixed(1)} out of 10`).join(". ")}.`}
      >
        {[1, 4, 7, 10].map((g) => (
          <g key={g}>
            <line x1={padX} x2={width - padX} y1={yFor(g)} y2={yFor(g)} stroke="var(--border)" strokeWidth="1" />
            <text x={padX - 10} y={yFor(g) + 4} textAnchor="end" className="fill-[var(--muted-foreground)] text-[11px]">
              {g}
            </text>
          </g>
        ))}
        <path d={linePath} fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={p.label}>
            <circle cx={xFor(i)} cy={yFor(p.value)} r="6" fill="var(--primary)" />
            <text x={xFor(i)} y={height - 6} textAnchor="middle" className="fill-[var(--foreground)] text-[12px] font-semibold">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="text-sm text-muted-foreground">
        Higher is more confident, on a scale of 1 to 10. Skipped questions are not counted.
      </figcaption>
    </figure>
  )
}
