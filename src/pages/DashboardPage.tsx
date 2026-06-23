import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Brain,
  GitFork,
  CheckSquare,
  PenLine,
  Link2,
  AlertTriangle,
  FileText,
  Calendar,
  Users,
  ArrowRight,
  Lightbulb,
  Target,
  Trophy,
  Award,
  Presentation,
  Search,
  BookOpen,
  ClipboardCheck,
} from 'lucide-react'

interface StageGroup {
  stage: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  items: { to: string; icon: React.ComponentType<{ className?: string }>; label: string; desc: string }[]
}

const stageGroups: StageGroup[] = [
  {
    stage: '选题阶段',
    icon: Search,
    color: 'text-purple-600 bg-purple-50',
    items: [
      { to: '/topic-selection', icon: Lightbulb, label: '选题工坊', desc: '三大原则 + 缩小法 + 自检清单' },
      { to: '/decision', icon: GitFork, label: '赛道决策', desc: '确认走传统还是大挑路线' },
    ],
  },
  {
    stage: '调研阶段',
    icon: ClipboardCheck,
    color: 'text-blue-600 bg-blue-50',
    items: [
      { to: '/research-methods', icon: BookOpen, label: '调研方法', desc: '问卷/访谈/抽样实用指南' },
      { to: '/checklist', icon: CheckSquare, label: '行动清单', desc: '出发前/中/后任务跟踪' },
    ],
  },
  {
    stage: '写作阶段',
    icon: FileText,
    color: 'text-green-600 bg-green-50',
    items: [
      { to: '/report-writing', icon: FileText, label: '报告写作', desc: '六段式结构 + 三维深化法' },
      { to: '/title-workshop', icon: PenLine, label: '标题工作坊', desc: '黄金法则校验标题质量' },
      { to: '/evidence-chain', icon: Link2, label: '证据链', desc: '结论←证据对应关系' },
    ],
  },
  {
    stage: '答辩阶段',
    icon: Presentation,
    color: 'text-orange-600 bg-orange-50',
    items: [
      { to: '/defense', icon: Presentation, label: '答辩准备', desc: '预设问题 + 模拟计时器' },
      { to: '/errors', icon: AlertTriangle, label: '错误自查', desc: '15项致命错误逐项确认' },
    ],
  },
  {
    stage: '全程工具',
    icon: Brain,
    color: 'text-gray-600 bg-gray-50',
    items: [
      { to: '/mindmap', icon: Brain, label: '知识地图', desc: '完整培训框架可视化' },
      { to: '/cases', icon: Trophy, label: '获奖案例库', desc: '12个国赛获奖案例' },
      { to: '/templates', icon: FileText, label: '模板中心', desc: '7类文档一键生成' },
      { to: '/timeline', icon: Calendar, label: '时间线', desc: '项目里程碑规划' },
      { to: '/team', icon: Users, label: '团队管理', desc: '组队 + 角色分配' },
    ],
  },
]

const spotlights = [
  {
    title: '禾下她名，地载公平',
    uni: '烟台大学 · 国赛特等奖',
    highlight: '9省76村、2396份问卷、740份司法案例——提出"五步全链条治理流程"',
  },
  {
    title: '古村蝶变',
    uni: '山东城建学院 · 国赛特等奖',
    highlight: '连续3年驻村超3个月——高职院校首次获哲学社会科学类特等奖',
  },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeStage, setActiveStage] = useState(0)
  const stages = ['选题', '调研', '写作', '答辩', '提交']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">社会实践备赛总控台</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              选题 → 调研 → 写作 → 答辩 → 提交 · 全流程一站覆盖
            </p>
          </div>
        </div>

        {/* Stage progress indicator */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            {stages.map((s, i) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => setActiveStage(i)}
                  className={`group flex flex-col items-center gap-1`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      i < activeStage
                        ? 'bg-green-100 text-green-700'
                        : i === activeStage
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i < activeStage ? '✓' : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      i === activeStage ? 'text-primary' : i < activeStage ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    {s}
                  </span>
                </button>
                {i < stages.length - 1 && (
                  <div className={`h-0.5 w-8 sm:w-16 mb-5 rounded transition-colors ${i < activeStage ? 'bg-green-300' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            点击对应阶段高亮，下方入口自动分组显示
          </p>
        </div>
      </div>

      {/* Stage-grouped entry cards */}
      <div>
        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
          {(() => {
            const Icon = stageGroups[activeStage].icon
            return <Icon className="h-5 w-5" />
          })()}
          {stageGroups[activeStage].stage} · 推荐入口
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stageGroups[activeStage].items.map((action) => (
            <button
              key={action.to}
              onClick={() => navigate(action.to)}
              className="group flex items-start gap-4 rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/30 active:scale-[0.98]"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stageGroups[activeStage].color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{action.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All entries quick view */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">全部功能入口</h3>
        <div className="space-y-3">
          {stageGroups.map((group) => (
            <div key={group.stage} className="flex items-start gap-3">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-medium ${group.color}`}>
                <group.icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    className="rounded-full border px-2.5 py-1 text-xs hover:bg-accent hover:border-primary/30 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case spotlights */}
      <div>
        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <Award className="h-5 w-5" />
          获奖案例速览
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {spotlights.map((c) => (
            <div key={c.title} className="rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs text-amber-600 font-medium mb-1">国赛特等奖</div>
              <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{c.uni}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{c.highlight}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/cases')}
          className="mt-4 w-full rounded-lg border border-dashed py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          查看全部 12 个获奖案例 →
        </button>
      </div>
    </div>
  )
}
