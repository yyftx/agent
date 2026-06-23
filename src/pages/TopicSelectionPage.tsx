import { useState } from 'react'
import { Lightbulb, Target, CheckSquare, Search, TrendingUp, GitBranch, ArrowRight, Sparkles, Check, X } from 'lucide-react'
import { topicSelectionData, trainingSections } from '../data/training-framework'

const { principles, sources, formula, selfCheck, shrinkMethod } = topicSelectionData
const directions = trainingSections.datiaoSixSteps[1].directions

export default function TopicSelectionPage() {
  const [checkResults, setCheckResults] = useState<Record<number, boolean>>({})
  const [inspiration, setInspiration] = useState('')

  const painPoints = ['人口老龄化', '新就业形态', '基层治理', '乡村空心化', '文化遗产保护', '生态文明', '教育公平', '数字鸿沟', '食品安全', '心理健康']
  const majors = ['法学', '社会学', '经济学', '公共管理', '新闻传播', '建筑规划', '环境科学', '教育学', '医学', '农学']
  const angles = ['代际差异视角', '基层实践视角', '制度变迁视角', '空间正义视角', '数字赋能视角', '性别视角', '可持续生计视角', '文化认同视角']

  const generateInspiration = () => {
    const p = painPoints[Math.floor(Math.random() * painPoints.length)]
    const m = majors[Math.floor(Math.random() * majors.length)]
    const a = angles[Math.floor(Math.random() * angles.length)]
    setInspiration(`"${p}" × ${m} × "${a}" → 值得深挖的选题方向`)
  }

  const toggleCheck = (i: number) => {
    setCheckResults((prev) => ({ ...prev, [i]: !prev[i] }))
  }
  const passedCount = Object.values(checkResults).filter(Boolean).length

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
            <Lightbulb className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">选题工坊</h2>
            <p className="text-sm text-muted-foreground">选题是获奖最关键的第一步。题好一半文，题歪全白费。</p>
          </div>
        </div>
      </div>

      {/* Three Principles */}
      <div>
        <h3 className="mb-3 text-base font-semibold flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          选题三大原则
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                {p.icon === 'Lightbulb' && <Lightbulb className="h-4 w-4 text-purple-500" />}
                {p.icon === 'Target' && <Target className="h-4 w-4 text-blue-500" />}
                {p.icon === 'CheckSquare' && <CheckSquare className="h-4 w-4 text-green-500" />}
                <span className="font-medium text-sm">{p.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Three Sources */}
      <div>
        <h3 className="mb-3 text-base font-semibold flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          选题从哪来？— "向上看、左右看、向下看"
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {sources.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-4 shadow-sm">
              <h4 className="font-medium text-sm mb-2">{s.title}</h4>
              <ul className="space-y-1.5">
                {s.items.map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="rounded-xl border bg-card p-6 shadow-sm bg-gradient-to-r from-purple-50/50 to-blue-50/50">
        <h3 className="text-base font-semibold mb-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          选题核心公式
        </h3>
        <p className="text-lg font-bold text-center my-3 text-primary">
          社会痛点 + 专业优势 + 小切口创新 = 获奖级选题
        </p>
        <div className="space-y-2 mt-4">
          {formula.examples.map((ex, i) => (
            <div key={i} className="rounded-lg bg-white/80 border p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded">痛点: {ex.pain}</span>
                <ArrowRight className="h-3 w-3" />
                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">专业: {ex.major}</span>
                <ArrowRight className="h-3 w-3" />
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded">角度: {ex.angle}</span>
              </div>
              <p className="text-sm font-medium">→ {ex.result}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Direction Hot Map */}
      <div>
        <h3 className="mb-3 text-base font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          五大方向竞争热力图
        </h3>
        <div className="grid gap-2 sm:grid-cols-5">
          {directions.map((d: any) => (
            <div
              key={d.name}
              className={`rounded-xl border p-3 text-center shadow-sm ${
                d.strategy.includes('优先') ? 'bg-blue-50/50 border-blue-200' : 'bg-red-50/50 border-red-200'
              }`}
            >
              <div className="text-lg mb-0.5">{d.name === '经济' ? '💰' : d.name === '政治' ? '🏛️' : d.name === '文化' ? '🎭' : d.name === '社会' ? '🤝' : '🌿'}</div>
              <div className="font-medium text-sm">{d.name}建设</div>
              <div className={`text-xs mt-1 font-medium ${d.strategy.includes('优先') ? 'text-blue-700' : 'text-red-600'}`}>
                {d.competition}
              </div>
              <div className={`text-xs mt-0.5 ${d.strategy.includes('优先') ? 'text-blue-600' : 'text-red-500'}`}>
                {d.strategy}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shrink Method */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-primary" />
          {shrinkMethod.title}
        </h3>
        <div className="space-y-3">
          {shrinkMethod.steps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{s.level}</span>
                  <span className="font-medium text-sm">{s.example}</span>
                </div>
                {s.problem && <p className="text-xs text-red-500 mt-0.5">⚠ {s.problem}</p>}
                {!s.problem && <p className="text-xs text-green-600 mt-0.5">✅ 可操作的选题</p>}
              </div>
              {i < shrinkMethod.steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground mt-1.5 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Self Check */}
      <div>
        <h3 className="mb-3 text-base font-semibold flex items-center gap-2">
          <CheckSquare className="h-4 w-4 text-primary" />
          选题自检清单
          <span className="text-xs text-muted-foreground font-normal">（逐项确认）</span>
        </h3>
        <div className="rounded-xl border bg-card shadow-sm divide-y">
          {selfCheck.map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 transition-colors ${checkResults[i] ? 'bg-green-50/50' : ''}`}>
              <button
                onClick={() => toggleCheck(i)}
                className={`shrink-0 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                  checkResults[i] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-300'
                }`}
              >
                {checkResults[i] && <Check className="h-3 w-3" />}
              </button>
              <span className={`text-sm ${checkResults[i] ? 'text-green-700' : ''}`}>{item.question}</span>
            </div>
          ))}
        </div>
        {passedCount === selfCheck.length && (
          <div className="mt-3 rounded-lg bg-green-100 border border-green-300 p-3 flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700 font-medium">6项全部通过！你的选题已经具备竞争力，可以进入下一步了。</span>
          </div>
        )}
        {passedCount > 0 && passedCount < selfCheck.length && (
          <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-center gap-2">
            <X className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-amber-700">还有 {selfCheck.length - passedCount} 项未通过，建议先完善选题再进入调研阶段。</span>
          </div>
        )}
      </div>

      {/* Inspiration Generator */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          选题灵感生成器
          <span className="text-xs text-muted-foreground font-normal">（随机组合启发思路）</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          把三个要素随机组合，碰撞选题灵感。运气好能碰到好思路，运气不好至少知道"怎么组合"。
        </p>
        {inspiration && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3">
            <p className="text-sm font-medium text-amber-800">{inspiration}</p>
          </div>
        )}
        <button
          onClick={generateInspiration}
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          再来一个灵感
        </button>
      </div>
    </div>
  )
}
