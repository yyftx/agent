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
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  Trophy,
} from 'lucide-react'

const quickActions = [
  { to: '/decision', icon: GitFork, label: '选择赛道', desc: '决定走传统还是大挑路线', color: 'text-blue-600 bg-blue-50' },
  { to: '/mindmap', icon: Brain, label: '浏览知识地图', desc: '查看完整培训框架', color: 'text-purple-600 bg-purple-50' },
  { to: '/checklist', icon: CheckSquare, label: '行动清单', desc: '跟踪出发前/中/后任务', color: 'text-green-600 bg-green-50' },
  { to: '/title-workshop', icon: PenLine, label: '打磨标题', desc: '用黄金法则校验标题', color: 'text-orange-600 bg-orange-50' },
  { to: '/errors', icon: AlertTriangle, label: '十大错误自查', desc: '对照致命错误清单', color: 'text-red-600 bg-red-50' },
  { to: '/templates', icon: FileText, label: '生成模板', desc: '下载对接函等文档', color: 'text-teal-600 bg-teal-50' },
]

const goldenQuotes = [
  '"搞活动不难，搞到有效益的活动才是难。"',
  '"真正的操作往往都是倒过来的——先预设结论再去做调研。"',
  '"评委90%是标题党，从大标题看到二级标题，先打基本分。"',
  '"凡以二手数据代替调研实践的，都是0分。"',
  '"以目标为导向，而不是以形式为导向。"',
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const randomQuote = goldenQuotes[Math.floor(Math.random() * goldenQuotes.length)]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">暑期社会实践备战系统</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              基于张豪芬老师 2026.6.22 培训内容 · 两条赛道 · 四步法 · 六步法 · 全流程覆盖
            </p>
          </div>
        </div>

        {/* Golden quote */}
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-sm text-amber-800 italic">{randomQuote}</p>
          </div>
        </div>
      </div>

      {/* Quick actions grid */}
      <div>
        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          快速入口
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.to}
              onClick={() => navigate(action.to)}
              className="group flex items-start gap-4 rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/30 active:scale-[0.98]"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
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

      {/* Process overview */}
      <div>
        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          社会实践获奖闭环
        </h2>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {['出发前倒推设计', '现场做效益拿佐证', '回来按框架写报告', '打磨标题+查错误', '提交完整材料'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {i + 1}
                </div>
                <span className="font-medium">{step}</span>
                {i < 4 && <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block" />}
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            "出发前倒推设计 + 现场做效益拿佐证 + 回来按框架写报告 = 社会实践获奖的完整闭环"
          </p>
        </div>
      </div>
    </div>
  )
}
