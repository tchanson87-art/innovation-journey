"use client"

import { useDemo } from "@/lib/store"
import { WEEKS } from "@/lib/program"
import { Card } from "@/components/ui/card"

const OPTIONS: { value: "present" | "absent" | "apologies"; label: string }[] = [
  { value: "present", label: "Present" },
  { value: "apologies", label: "Apologies" },
  { value: "absent", label: "Absent" },
]

export default function AttendancePage() {
  const { currentUser, state, setAttendance } = useDemo()
  const myCohorts = currentUser?.facilitatorOf ?? []
  const participants = state.participants.filter(
    (p) => p.user.cohortId && myCohorts.includes(p.user.cohortId),
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-primary">Attendance register</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Record attendance for each weekly session. Perfect attendance is never required.
        </p>
      </div>

      {participants.map((p) => (
        <Card key={p.user.id}>
          <h2 className="text-xl font-bold text-primary">{p.user.preferredName}</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Weekly attendance for {p.user.preferredName}
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="pb-2 pr-4 text-sm font-semibold text-muted-foreground">
                    Week
                  </th>
                  <th scope="col" className="pb-2 text-sm font-semibold text-muted-foreground">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {WEEKS.map((w) => {
                  const value = p.attendance[w.week] ?? null
                  return (
                    <tr key={w.week} className="border-t border-border">
                      <th
                        scope="row"
                        className="py-3 pr-4 align-top font-semibold text-foreground"
                      >
                        <span className="text-teal">Week {w.week}</span>
                        <span className="block text-sm font-normal text-muted-foreground">
                          {w.title}
                        </span>
                      </th>
                      <td className="py-3">
                        <fieldset>
                          <legend className="sr-only">
                            Week {w.week} attendance for {p.user.preferredName}
                          </legend>
                          <div className="flex flex-wrap gap-2">
                            {OPTIONS.map((opt) => {
                              const active = value === opt.value
                              return (
                                <label
                                  key={opt.value}
                                  className={
                                    "cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-semibold " +
                                    (active
                                      ? "border-teal bg-pale-teal text-primary"
                                      : "border-input bg-background text-muted-foreground hover:border-teal/50")
                                  }
                                >
                                  <input
                                    type="radio"
                                    name={`att-${p.user.id}-${w.week}`}
                                    value={opt.value}
                                    checked={active}
                                    onChange={() => setAttendance(p.user.id, w.week, opt.value)}
                                    className="sr-only"
                                  />
                                  {opt.label}
                                </label>
                              )
                            })}
                          </div>
                        </fieldset>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  )
}
