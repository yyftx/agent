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
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: '工作台' },
  { to: '/mindmap', icon: Brain, label: '知识地图' },
  { to: '/decision', icon: GitFork, label: '赛道决策' },
  { to: '/checklist', icon: CheckSquare, label: '行动清单' },
  { to: '/title-workshop', icon: PenLine, label: '标题工作坊' },
  { to: '/evidence-chain', icon: Link2, label: '证据链' },
  { to: '/errors', icon: AlertTriangle, label: '错误自查' },
  { to: '/timeline', icon: Calendar, label: '时间线' },
  { to: '/templates', icon: FileText, label: '模板中心' },
  { to: '/team', icon: Users, label: '团队管理' },
  { to: '/cases', icon: Trophy, label: '获奖案例库' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r bg-card flex flex-col">
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Brain className="h-6 w-6 text-primary" />
        <span className="font-semibold text-sm">备战系统</span>
      </div>
      <nav className="flex-1 overflow-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
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
      </nav>
      <div className="border-t p-3 text-xs text-muted-foreground">
        v1.0 · 暑期社会实践备战
      </div>
    </aside>
  )
}
