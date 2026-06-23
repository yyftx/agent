import { useState } from 'react'
import { Check, Clock, User, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

interface Task {
  id: string
  title: string
  desc: string
  phase: 'before' | 'during' | 'after'
  status: 'pending' | 'in_progress' | 'completed'
  assignee: string
}

const initialTasks: Task[] = [
  // 出发前
  { id: 'b1', title: '跑目标政府/村办公室"坐40分钟"', desc: '摸清对方需求、考核指标、媒体资源', phase: 'before', status: 'pending', assignee: '' },
  { id: 'b2', title: '确定调研主题', desc: '有社会热点帽子 + 缩小到具体点位', phase: 'before', status: 'pending', assignee: '' },
  { id: 'b3', title: '完成文献查阅', desc: '在学习强国、知网等平台查阅相关文献', phase: 'before', status: 'pending', assignee: '' },
  { id: 'b4', title: '列出一级标题+二级标题目录', desc: '出发前就必须有报告框架！', phase: 'before', status: 'pending', assignee: '' },
  { id: 'b5', title: '预设调研结论', desc: '倒推法：先想结论再设计调研', phase: 'before', status: 'pending', assignee: '' },
  { id: 'b6', title: '设计调研样本', desc: '确定数量、构成、可获取性', phase: 'before', status: 'pending', assignee: '' },
  { id: 'b7', title: '设计落地活动', desc: '活动必须匹配对策建议', phase: 'before', status: 'pending', assignee: '' },
  { id: 'b8', title: '制作佐证材料模板', desc: '村委会证明模板 + 媒体报道稿模板', phase: 'before', status: 'pending', assignee: '' },
  // 实践中
  { id: 'd1', title: '所有活动拍照/视频', desc: '学生必须出镜！草船借箭也需要人在里面', phase: 'during', status: 'pending', assignee: '' },
  { id: 'd2', title: '现场盖章', desc: '在直播/活动现场就请村委配合盖章', phase: 'during', status: 'pending', assignee: '' },
  { id: 'd3', title: '收集所有数据', desc: '销量截图、收入变化、过程记录、签到表', phase: 'during', status: 'pending', assignee: '' },
  { id: 'd4', title: '找媒体报道', desc: '利用政府背书联系媒体发稿', phase: 'during', status: 'pending', assignee: '' },
  { id: 'd5', title: '每天整理调研日志', desc: '每天300字，别堆积到最后', phase: 'during', status: 'pending', assignee: '' },
  // 返程后
  { id: 'a1', title: '按预设框架写调研报告', desc: '不是流水账！以调研主题为轴', phase: 'after', status: 'pending', assignee: '' },
  { id: 'a2', title: '前面加实践章节+后面加落地案例', desc: '落地案例必须匹配对策建议', phase: 'after', status: 'pending', assignee: '' },
  { id: 'a3', title: '整理全部佐证材料', desc: '分类编号，确保在2年有效期内', phase: 'after', status: 'pending', assignee: '' },
  { id: 'a4', title: '反复打磨标题', desc: '大标题抓眼球，小标题点本质', phase: 'after', status: 'pending', assignee: '' },
  { id: 'a5', title: '对照十大错误清单自查', desc: '逐项确认没有踩致命错误', phase: 'after', status: 'pending', assignee: '' },
  { id: 'a6', title: '模拟答辩演练', desc: '准备汇报PPT，反复练习', phase: 'after', status: 'pending', assignee: '' },
]

const phaseConfig = {
  before: { label: '出发前', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  during: { label: '实践中', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  after: { label: '返程后', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
}

export default function ChecklistPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [activePhase, setActivePhase] = useState<'before' | 'during' | 'after'>('before')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const order = ['pending', 'in_progress', 'completed']
        const next = order[(order.indexOf(t.status) + 1) % 3]
        return { ...t, status: next as Task['status'] }
      })
    )
  }

  const addTask = () => {
    if (!newTaskTitle.trim()) return
    const task: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      desc: '',
      phase: activePhase,
      status: 'pending',
      assignee: '',
    }
    setTasks((prev) => [...prev, task])
    setNewTaskTitle('')
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const phaseTasks = tasks.filter((t) => t.phase === activePhase)
  const completedCount = phaseTasks.filter((t) => t.status === 'completed').length
  const progress = phaseTasks.length > 0 ? (completedCount / phaseTasks.length) * 100 : 0

  const config = phaseConfig[activePhase]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Phase selector */}
      <div className="flex rounded-lg bg-muted p-1">
        {(Object.keys(phaseConfig) as Array<'before' | 'during' | 'after'>).map((phase) => (
          <button
            key={phase}
            onClick={() => setActivePhase(phase)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              activePhase === phase ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {phaseConfig[phase].label} ({tasks.filter((t) => t.phase === phase).filter((t) => t.status === 'completed').length}/{tasks.filter((t) => t.phase === phase).length})
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className={`rounded-xl border ${config.border} ${config.bg} p-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${config.color}`}>{config.label}进度</span>
          <span className="text-sm">{completedCount}/{phaseTasks.length}</span>
        </div>
        <div className="h-2 rounded-full bg-white/50 overflow-hidden">
          <div className="h-full rounded-full bg-current transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: config.color.replace('text-', '') }} />
        </div>
      </div>

      {/* Task list */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-4 space-y-1">
          {phaseTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50 ${
                task.status === 'completed' ? 'opacity-60' : ''
              }`}
            >
              <button
                onClick={() => toggleStatus(task.id)}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                  task.status === 'completed'
                    ? 'border-green-500 bg-green-500 text-white'
                    : task.status === 'in_progress'
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-gray-300'
                }`}
              >
                {task.status === 'completed' && <Check className="h-3 w-3" />}
                {task.status === 'in_progress' && <Clock className="h-3 w-3 text-amber-500" />}
              </button>
              <div className="flex-1 min-w-0">
                <span className={`text-sm ${task.status === 'completed' ? 'line-through' : 'font-medium'}`}>
                  {task.title}
                </span>
                {task.desc && <p className="text-xs text-muted-foreground mt-0.5">{task.desc}</p>}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="shrink-0 rounded p-1 hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add task */}
        <div className="border-t p-4 flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="添加新任务..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={addTask}
            className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
            添加
          </button>
        </div>
      </div>
    </div>
  )
}
