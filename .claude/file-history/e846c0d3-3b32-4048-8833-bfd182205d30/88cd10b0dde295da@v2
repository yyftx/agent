import { useState } from 'react'
import { Plus, X, Link2, AlertTriangle, Check, ArrowRight } from 'lucide-react'

interface Claim {
  id: string
  text: string
}

interface Evidence {
  id: string
  claimId: string
  type: string
  title: string
  collected: boolean
}

const evidenceTypes = [
  { value: 'government_stamp', label: '政府公章/对接函', icon: '🏛️' },
  { value: 'media', label: '媒体报道', icon: '📰' },
  { value: 'photo', label: '现场照片/视频', icon: '📸' },
  { value: 'survey', label: '调查问卷数据', icon: '📊' },
  { value: 'stamp', label: '村委会盖章证明', icon: '🔖' },
  { value: 'expert', label: '专家推荐/反馈', icon: '👨‍🏫' },
  { value: 'patent', label: '专利/软著', icon: '📜' },
  { value: 'other', label: '其他材料', icon: '📄' },
]

export default function EvidenceChainPage() {
  const [claims, setClaims] = useState<Claim[]>([
    { id: 'c1', text: '本项目产生了实际经济效益，帮助农户增收' },
    { id: 'c2', text: '实践活动得到了当地政府认可' },
    { id: 'c3', text: '调研样本具有典型性和代表性' },
  ])
  const [evidences, setEvidences] = useState<Evidence[]>([
    { id: 'e1', claimId: 'c1', type: 'survey', title: '3个月直播销售数据记录', collected: false },
    { id: 'e2', claimId: 'c2', type: 'government_stamp', title: '镇政府对接收函及批示', collected: false },
    { id: 'e3', claimId: 'c3', type: 'media', title: 'CCTV对该村的专题报道截图', collected: false },
  ])
  const [newClaim, setNewClaim] = useState('')
  const [newEvidence, setNewEvidence] = useState({ claimId: '', type: 'government_stamp', title: '' })

  const addClaim = () => {
    if (!newClaim.trim()) return
    setClaims((prev) => [...prev, { id: crypto.randomUUID(), text: newClaim }])
    setNewClaim('')
  }

  const addEvidence = () => {
    if (!newEvidence.title.trim() || !newEvidence.claimId) return
    setEvidences((prev) => [...prev, { ...newEvidence, id: crypto.randomUUID(), collected: false }])
    setNewEvidence({ claimId: '', type: 'government_stamp', title: '' })
  }

  const deleteClaim = (id: string) => {
    setClaims((prev) => prev.filter((c) => c.id !== id))
    setEvidences((prev) => prev.filter((e) => e.claimId !== id))
  }

  const deleteEvidence = (id: string) => {
    setEvidences((prev) => prev.filter((e) => e.id !== id))
  }

  const toggleCollected = (id: string) => {
    setEvidences((prev) => prev.map((e) => e.id === id ? { ...e, collected: !e.collected } : e))
  }

  const unlinkedClaims = claims.filter((c) => !evidences.some((e) => e.claimId === c.id))

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
          <Link2 className="h-5 w-5 text-blue-500" />
          佐证证据链
        </h2>
        <p className="text-sm text-muted-foreground">
          每个结论都要有对应的证据支撑。记住：<strong>证据链互证</strong>——村委会盖章→媒体报道（政府已背书）→更高级别批示/反馈
        </p>

        {/* Gap warnings */}
        {unlinkedClaims.length > 0 && (
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">
                检测到 {unlinkedClaims.length} 个结论缺少证据支撑
              </span>
            </div>
            <ul className="mt-2 space-y-1">
              {unlinkedClaims.map((c) => (
                <li key={c.id} className="text-xs text-amber-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {c.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Claims and their evidence */}
      <div className="space-y-4">
        {claims.map((claim) => {
          const claimEvidences = evidences.filter((e) => e.claimId === claim.id)
          const allCollected = claimEvidences.length > 0 && claimEvidences.every((e) => e.collected)
          return (
            <div key={claim.id} className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="flex items-start justify-between border-b bg-muted/30 px-4 py-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${allCollected ? 'bg-green-500 text-white' : claimEvidences.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {allCollected ? <Check className="h-3 w-3" /> : claimEvidences.length}
                  </div>
                  <span className="font-medium text-sm">{claim.text}</span>
                </div>
                <button onClick={() => deleteClaim(claim.id)} className="shrink-0 rounded p-1 hover:bg-destructive/10 hover:text-destructive">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="p-3 space-y-2">
                {claimEvidences.map((ev) => {
                  const typeInfo = evidenceTypes.find((t) => t.value === ev.type)
                  return (
                    <div key={ev.id} className={`flex items-center gap-3 rounded-lg border p-2.5 ${ev.collected ? 'bg-green-50/50 border-green-200' : ''}`}>
                      <button onClick={() => toggleCollected(ev.id)} className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${ev.collected ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>
                        {ev.collected && <Check className="h-3 w-3" />}
                      </button>
                      <span className="text-lg">{typeInfo?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{ev.title}</p>
                        <p className="text-xs text-muted-foreground">{typeInfo?.label}</p>
                      </div>
                      <button onClick={() => deleteEvidence(ev.id)} className="rounded p-1 hover:bg-destructive/10 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
                {/* Add evidence to this claim */}
                <div className="flex gap-2 pt-1">
                  <select
                    value={newEvidence.claimId === claim.id ? newEvidence.type : 'government_stamp'}
                    onChange={(e) => setNewEvidence({ claimId: claim.id, type: e.target.value, title: '' })}
                    className="rounded-lg border px-2 py-1.5 text-xs outline-none"
                  >
                    {evidenceTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="添加证据..."
                    value={newEvidence.claimId === claim.id ? newEvidence.title : ''}
                    onChange={(e) => setNewEvidence({ claimId: claim.id, type: newEvidence.claimId === claim.id ? newEvidence.type : 'government_stamp', title: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && addEvidence()}
                    className="flex-1 rounded-lg border px-3 py-1.5 text-xs outline-none focus:border-primary"
                  />
                  <button onClick={addEvidence} className="rounded-lg bg-primary px-2.5 py-1.5 text-xs text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add claim */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newClaim}
          onChange={(e) => setNewClaim(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addClaim()}
          placeholder="添加新结论（比如：调研结果已被政府采纳...）"
          className="flex-1 rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button onClick={addClaim} className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          添加
        </button>
      </div>

      {/* Evidence chain legend */}
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <h4 className="text-sm font-medium mb-2">📋 证据互证链条</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <span className="rounded-full bg-green-50 border border-green-200 px-2 py-1">村委会盖章</span>
          <ArrowRight className="h-3 w-3" />
          <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-1">媒体报道（政府已背书）</span>
          <ArrowRight className="h-3 w-3" />
          <span className="rounded-full bg-purple-50 border border-purple-200 px-2 py-1">更高级别批示/反馈</span>
        </div>
      </div>
    </div>
  )
}
