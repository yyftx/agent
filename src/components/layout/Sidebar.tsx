import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  GitFork,
  CheckSquare,
  PenLine,
  Link2,
  AlertTriangle,
  FileText,
  Calendar,
  Users,
  Brain,
  Trophy,
  Lightbulb,
  BookOpen,
  Presentation,
} from 'lucide-react'

const flowItems = [
  { to: '/', icon: LayoutDashboard, label: '工作台' },
  { to: '/topic-selection', icon: Lightbulb, label: '选题工坊' },
  { to: '/decision', icon: GitFork, label: '赛道决策' },
  { to: '/research-methods', icon: BookOpen, label: '调研方法' },
  { to: '/checklist', icon: CheckSquare, label: '行动清单' },
  { to: '/report-writing', icon: FileText, label: '报告写作' },
  { to: '/title-workshop', icon: PenLine, label: '标题工作坊' },
  { to: '/evidence-chain', icon: Link2, label: '证据链' },
  { to: '/defense', icon: Presentation, label: '答辩准备' },
  { to: '/errors', icon: AlertTriangle, label: '错误自查' },
]

const toolItems = [
  { to: '/mindmap', icon: Brain, label: '知识地图' },
  { to: '/cases', icon: Trophy, label: '获奖案例库' },
  { to: '/templates', icon: FileText, label: '模板中心' },
  { to: '/timeline', icon: Calendar, label: '时间线' },
  { to: '/team', icon: Users, label: '团队管理' },
]

function NavSection({ title, items }: { title: string; items: typeof flowItems }) {
  return (
    <div>
      <p className="px-3 py-2 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">{title}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r bg-card flex flex-col">
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Brain className="h-6 w-6 text-primary" />
        <span className="font-semibold text-sm">备战系统</span>
      </div>
      <nav className="flex-1 overflow-auto p-3 space-y-4">
        <NavSection title="备赛流程" items={flowItems} />
        <NavSection title="工具箱" items={toolItems} />
      </nav>
      <div className="border-t p-3 text-xs text-muted-foreground">
        v1.2 · 暑期社会实践备战
      </div>
    </aside>
  )
}
