import { useState } from 'react'
import { Users, UserPlus, Copy, Check, Crown, Shield, User, Trash2, Link } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: 'owner' | 'admin' | 'member'
  joinedAt: string
}

const demoTeam = {
  id: 'demo-team-1',
  name: '暑期实践小队',
  inviteCode: 'SJ2026-DEMO-CODE',
}

const demoMembers: TeamMember[] = [
  { id: 'u1', name: '你（队长）', role: 'owner', joinedAt: '2026-06-23' },
  { id: 'u2', name: '队员A', role: 'admin', joinedAt: '2026-06-23' },
  { id: 'u3', name: '队员B', role: 'member', joinedAt: '2026-06-24' },
  { id: 'u4', name: '队员C', role: 'member', joinedAt: '2026-06-24' },
]

const roleConfig = {
  owner: { label: '队长', icon: Crown, color: 'text-amber-600 bg-amber-50' },
  admin: { label: '副队长', icon: Shield, color: 'text-blue-600 bg-blue-50' },
  member: { label: '队员', icon: User, color: 'text-gray-600 bg-gray-50' },
}

export default function TeamPage() {
  const [teamName, setTeamName] = useState(demoTeam.name)
  const [members, setMembers] = useState<TeamMember[]>(demoMembers)
  const [copied, setCopied] = useState(false)
  const [newMemberName, setNewMemberName] = useState('')

  const copyInviteCode = () => {
    navigator.clipboard.writeText(demoTeam.inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addMember = () => {
    if (!newMemberName.trim()) return
    setMembers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newMemberName,
        role: 'member',
        joinedAt: new Date().toISOString().slice(0, 10),
      },
    ])
    setNewMemberName('')
  }

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const changeRole = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m
        const roles: TeamMember['role'][] = ['owner', 'admin', 'member']
        const next = roles[(roles.indexOf(m.role) + 1) % 3]
        return { ...m, role: next }
      })
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Team info */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="text-lg font-bold border-0 border-b-2 border-transparent hover:border-primary/30 focus:border-primary outline-none bg-transparent w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">团队名称（点击可编辑）</p>
          </div>
        </div>

        {/* Invite code */}
        <div className="rounded-lg bg-muted p-4">
          <p className="text-xs text-muted-foreground mb-2">邀请码（分享给队员即可加入）</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md bg-background px-3 py-2 text-sm font-mono select-all">
              {demoTeam.inviteCode}
            </code>
            <button
              onClick={copyInviteCode}
              className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm hover:bg-background transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? '已复制' : '复制'}
            </button>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold text-sm">团队成员 ({members.length}人)</h3>
          <span className="text-xs text-muted-foreground">点击角色标签切换权限</span>
        </div>
        <div className="p-3 space-y-1">
          {members.map((member) => {
            const RoleIcon = roleConfig[member.role].icon
            return (
              <div key={member.id} className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-muted/50 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  {member.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">加入于 {member.joinedAt}</p>
                </div>
                <button
                  onClick={() => changeRole(member.id)}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${roleConfig[member.role].color}`}
                >
                  <RoleIcon className="h-3 w-3" />
                  {roleConfig[member.role].label}
                </button>
                {member.role !== 'owner' && (
                  <button onClick={() => removeMember(member.id)} className="rounded p-1 hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Add member */}
        <div className="border-t p-3 flex gap-2">
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMember()}
            placeholder="输入队员姓名..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={addMember}
            className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 active:scale-95"
          >
            <UserPlus className="h-4 w-4" />
            添加
          </button>
        </div>
      </div>

      {/* Role legend */}
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <h4 className="text-sm font-medium mb-2">角色说明</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-amber-600" />
            <span className="font-medium">队长</span>
            <span className="text-muted-foreground">— 管理团队、邀请成员、删除团队</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="font-medium">副队长</span>
            <span className="text-muted-foreground">— 管理任务分配、编辑清单</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-600" />
            <span className="font-medium">队员</span>
            <span className="text-muted-foreground">— 完成任务、参与讨论</span>
          </div>
        </div>
      </div>
    </div>
  )
}
