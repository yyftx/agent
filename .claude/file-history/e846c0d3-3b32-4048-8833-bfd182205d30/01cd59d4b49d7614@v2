import { useState } from 'react'
import { AlertTriangle, Check, ShieldAlert, Info } from 'lucide-react'
import { trainingSections } from '../data/training-framework'

const errors = trainingSections.fatalErrors

export default function FatalErrorsPage() {
  const [confirmations, setConfirmations] = useState<Record<number, boolean>>({})
  const [notes, setNotes] = useState<Record<number, string>>({})

  const toggleConfirmation = (rank: number) => {
    setConfirmations((prev) => ({ ...prev, [rank]: !prev[rank] }))
  }

  const confirmedCount = Object.values(confirmations).filter(Boolean).length

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
            <ShieldAlert className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">十大致命错误自查</h2>
            <p className="text-sm text-muted-foreground">逐项确认你的项目是否存在这些致命问题</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${(confirmedCount / errors.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium">{confirmedCount}/{errors.length} 已确认</span>
        </div>
      </div>

      {/* Error cards */}
      <div className="space-y-3">
        {errors.map((err) => (
          <div
            key={err.rank}
            className={`rounded-xl border shadow-sm transition-all ${
              confirmations[err.rank] ? 'bg-green-50/30 border-green-200' : 'bg-card'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  err.rank <= 3 ? 'bg-red-100 text-red-700' : err.rank <= 6 ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {err.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-sm">{err.error}</h4>
                      <p className="text-xs text-red-600 font-medium mt-0.5">后果：{err.consequence}</p>
                    </div>
                    <button
                      onClick={() => toggleConfirmation(err.rank)}
                      className={`shrink-0 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        confirmations[err.rank]
                          ? 'bg-green-500 text-white'
                          : 'border border-gray-300 text-muted-foreground hover:border-green-300 hover:text-green-600'
                      }`}
                    >
                      {confirmations[err.rank] && <Check className="h-3 w-3" />}
                      {confirmations[err.rank] ? '已确认无误' : '确认'}
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="添加备注或预防措施..."
                    value={notes[err.rank] || ''}
                    onChange={(e) => setNotes((prev) => ({ ...prev, [err.rank]: e.target.value }))}
                    className="mt-2 w-full rounded-md border bg-background px-2 py-1 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {confirmedCount === errors.length && (
        <div className="rounded-xl border border-green-300 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-700">十项致命错误已全部确认通过！你的项目已经避免了最致命的坑。</span>
          </div>
        </div>
      )}
    </div>
  )
}
