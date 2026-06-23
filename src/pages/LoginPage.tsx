import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Mail, KeyRound, LogIn } from 'lucide-react'
import { useAppStore } from '../stores/appStore'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const setUser = useAppStore((s) => s.setUser)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, use local-only mode without Supabase
    const mockUser = {
      id: crypto.randomUUID(),
      email: email || 'demo@example.com',
      displayName: displayName || '队长',
    }
    setUser(mockUser)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">暑期社会实践备战系统</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            基于老师6.22培训内容构建
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                isLogin ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                !isLogin ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              注册
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">团队昵称</label>
                <div className="relative">
                  <LogIn className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="输入你的名字"
                    className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            {isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">密码</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="输入密码"
                    className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
            >
              {isLogin ? '进入系统' : '创建账号'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            目前为本地演示模式，无需真实邮箱即可进入
          </p>
        </div>
      </div>
    </div>
  )
}
