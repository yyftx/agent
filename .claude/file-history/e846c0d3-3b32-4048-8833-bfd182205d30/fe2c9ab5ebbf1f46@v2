import { useState } from 'react'
import { Calendar, Plus, X, ChevronRight } from 'lucide-react'

interface Milestone {
  id: string
  title: string
  description: string
  phase: 'preparation' | 'fieldwork' | 'post_work'
  startDate: string
  endDate: string
  status: 'pending' | 'in_progress' | 'completed'
  assignee: string
  dependsOn?: string
}

const defaultMilestones: Milestone[] = [
  { id: 'm1', title: '跑基层办公室对接', description: '坐40分钟摸清需求', phase: 'preparation', startDate: '2026-06-25', endDate: '2026-07-01', status: 'pending', assignee: '' },
  { id: 'm2', title: '确定选题和框架', description: '学习强国翻半年+列标题目录', phase: 'preparation', startDate: '2026-06-25', endDate: '2026-07-05', status: 'pending', assignee: '' },
  { id: 'm3', title: '完成文献综述', description: '知网+相关政策文件', phase: 'preparation', startDate: '2026-06-28', endDate: '2026-07-10', status: 'pending', assignee: '' },
  { id: 'm4', title: '设计调研工具', description: '问卷+访谈提纲+样本设计', phase: 'preparation', startDate: '2026-07-01', endDate: '2026-07-12', status: 'pending', assignee: '' },
  { id: 'm5', title: '制作模板材料', description: '对接函+证明+媒体稿模板', phase: 'preparation', startDate: '2026-07-05', endDate: '2026-07-12', status: 'pending', assignee: '' },
  { id: 'm6', title: '出发实践（现场）', description: '拍照+盖章+数据收集+媒体联系', phase: 'fieldwork', startDate: '2026-07-15', endDate: '2026-07-30', status: 'pending', assignee: '' },
  { id: 'm7', title: '撰写调研报告', description: '按预设框架写，非流水账', phase: 'post_work', startDate: '2026-08-01', endDate: '2026-08-20', status: 'pending', assignee: '' },
  { id: 'm8', title: '打磨标题', description: '反复修改至少5版', phase: 'post_work', startDate: '2026-08-15', endDate: '2026-08-25', status: 'pending', assignee: '' },
  { id: 'm9', title: '整理佐证材料', description: '分类编号+确保2年有效期', phase: 'post_work', startDate: '2026-08-20', endDate: '2026-08-30', status: 'pending', assignee: '' },
  { id: 'm10', title: '对照十大错误自查', description: '逐项确认+模拟答辩', phase: 'post_work', startDate: '2026-08-25', endDate: '2026-09-01', status: 'pending', assignee: '' },
]

const phaseConfig = {
  preparation: { label: '准备阶段（出发前）', color: 'border-l-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  fieldwork: { label: '实践阶段（现场）', color: 'border-l-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
  post_work: { label: '收尾阶段（返程后）', color: 'border-l-green-500', bg: 'bg-green-50', text: 'text-green-700' },
}

export default function TimelinePage() {
  const [milestones, setMilestones] = useState<Milestone[]>(defaultMilestones)
  const [showAdd, setShowAdd] = useState(false)
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    phase: 'preparation',
    status: 'pending',
    startDate: '',
    endDate: '',
  })

  const updateStatus = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m
        const order: Milestone['status'][] = ['pending', 'in_progress', 'completed']
        const next = order[(order.indexOf(m.status) + 1) % 3]
        return { ...m, status: next }
      })
    )
  }

  const addMilestone = () => {
    if (!newMilestone.title) return
    setMilestones((prev) => [
      ...prev,
      { ...newMilestone, id: crypto.randomUUID() } as Milestone,
    ])
    setNewMilestone({ phase: 'preparation', status: 'pending', startDate: '', endDate: '' })
    setShowAdd(false)
  }

  const deleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id))
  }

  const grouped = milestones.reduce(
    (acc, m) => {
      acc[m.phase] = acc[m.phase] || []
      acc[m.phase].push(m)
      return acc
    },
    {} as Record<string, Milestone[]>
  )

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="rounded-xl border bg-card p-4 shadow-sm flex-1 mr-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            项目时间线
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            从准备到收尾的全流程时间规划。建议以2027年大挑为终点倒推安排。
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="shrink-0 flex items-center gap-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          添加
        </button>
      </div>

      {showAdd && (
        <div className="rounded-xl border bg-card p-4 shadow-sm space-y-3">
          <input type="text" placeholder="里程碑名称" value={newMilestone.title || ''}
            onChange={(e) => setNewMilestone((p) => ({ ...p, title: e.target.value }))}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary" />
          <div className="flex gap-3">
            <input type="date" value={newMilestone.startDate || ''}
              onChange={(e) => setNewMilestone((p) => ({ ...p, startDate: e.target.value }))}
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary" />
            <input type="date" value={newMilestone.endDate || ''}
              onChange={(e) => setNewMilestone((p) => ({ ...p, endDate: e.target.value }))}
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <select value={newMilestone.phase}
            onChange={(e) => setNewMilestone((p) => ({ ...p, phase: e.target.value as Milestone['phase'] }))}
            className="rounded-lg border px-3 py-2 text-sm outline-none">
            <option value="preparation">准备阶段（出发前）</option>
            <option value="fieldwork">实践阶段（现场）</option>
            <option value="post_work">收尾阶段（返程后）</option>
          </select>
          <div className="flex gap-2">
            <button onClick={addMilestone} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">确定添加</button>
            <button onClick={() => setShowAdd(false)} className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">取消</button>
          </div>
        </div>
      )}

      {Object.entries(phaseConfig).map(([phase, config]) => (
        <div key={phase} className="space-y-3">
          <h3 className={`text-sm font-semibold ${config.text}`}>{config.label}</h3>
          <div className="space-y-2">
            {(grouped[phase] || []).map((m) => (
              <div key={m.id} className={`rounded-lg border-l-4 bg-card shadow-sm p-3 ${config.color} ${m.status === 'completed' ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => updateStatus(m.id)}
                      className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${
                        m.status === 'completed' ? 'bg-green-500 border-green-500' :
                        m.status === 'in_progress' ? 'border-amber-400 bg-amber-100' :
                        'border-gray-300'
                      }`}
                    />
                    <div>
                      <span className={`text-sm font-medium ${m.status === 'completed' ? 'line-through' : ''}`}>
                        {m.title}
                      </span>
                      {m.description && <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {m.startDate} → {m.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      m.status === 'completed' ? 'bg-green-100 text-green-700' :
                      m.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {m.status === 'completed' ? '已完成' : m.status === 'in_progress' ? '进行中' : '待开始'}
                    </span>
                    <button onClick={() => deleteMilestone(m.id)} className="rounded p-0.5 hover:bg-destructive/10 hover:text-destructive">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
