import { useState } from 'react'
import { ArrowRight, ArrowLeft, Check, Target, FileText, Medal, Lightbulb } from 'lucide-react'

interface Question {
  id: string
  question: string
  description: string
  options: { label: string; value: string; desc?: string }[]
}

const questions: Question[] = [
  {
    id: 'goal',
    question: '你们的核心目标是什么？',
    description: '这决定了你应该走哪条赛道',
    options: [
      { label: '拿到一个有分量的奖，为保研/综测加分', value: 'award' },
      { label: '真正做点对社会有意义的事，得奖随缘', value: 'impact' },
      { label: '还不确定，先了解一下', value: 'unsure' },
    ],
  },
  {
    id: 'strength',
    question: '你们团队的强项是什么？',
    description: '不同赛道对团队能力的要求不同',
    options: [
      { label: '学术研究能力强，会做问卷、写论文', value: 'research', desc: '适合大挑赛道' },
      { label: '执行力强，能搞活动、跑现场、对接人', value: 'execution', desc: '适合传统赛道' },
      { label: '两个都还行', value: 'both' },
    ],
  },
  {
    id: 'topic',
    question: '你们已经有初步的选题或方向了吗？',
    description: '有明确的研究/实践方向是做好的基础',
    options: [
      { label: '有明确的研究问题和理论视角', value: 'clear_research', desc: '大挑赛道准备好了' },
      { label: '有想做的大致方向，但还没细化', value: 'vague' },
      { label: '只确定要去某个地方，还没想好做什么', value: 'none' },
    ],
  },
  {
    id: 'resources',
    question: '你们能接触到的资源是什么？',
    description: '资源决定了你能做到什么程度',
    options: [
      { label: '有政府/基层单位关系，能拿到对接函和盖章', value: 'government', desc: '传统赛道优势' },
      { label: '有学术导师指导，能发论文、申软著', value: 'academic', desc: '大挑赛道优势' },
      { label: '两边都有一些', value: 'both' },
      { label: '目前都没有，需要从头建立', value: 'none' },
    ],
  },
  {
    id: 'commitment',
    question: '你们愿意投入多长时间？',
    description: '时间投入直接影响作品深度',
    options: [
      { label: '集中一两周搞定', value: 'short', desc: '偏传统赛道' },
      { label: '愿意持续3-6个月，甚至更长', value: 'long', desc: '大挑赛道需要' },
      { label: '看情况', value: 'flexible' },
    ],
  },
]

function calculateRecommendation(answers: Record<string, string>): {
  track: 'traditional' | 'datiao' | 'either'
  confidence: number
  reasoning: string[]
} {
  let traditionalScore = 0
  let datiaoScore = 0
  const reasoning: string[] = []

  if (answers.goal === 'award') {
    datiaoScore += 2
    reasoning.push('冲着拿奖去 → 大挑赛道获奖含金量更高')
  } else if (answers.goal === 'impact') {
    traditionalScore += 1
    datiaoScore += 1
    reasoning.push('两条赛道都能产生社会影响')
  }

  if (answers.strength === 'research') {
    datiaoScore += 2
    reasoning.push('团队学术能力强 → 适合做调研报告')
  } else if (answers.strength === 'execution') {
    traditionalScore += 2
    reasoning.push('团队执行力强 → 适合搞实践活动')
  }

  if (answers.topic === 'clear_research') {
    datiaoScore += 2
    reasoning.push('已有明确研究问题 → 大挑起跑线领先')
  } else if (answers.topic === 'none') {
    traditionalScore += 1
    reasoning.push('选题模糊 → 传统赛道入门门槛更低')
  }

  if (answers.resources === 'government') {
    traditionalScore += 2
    reasoning.push('有政府资源 → 传统赛道四步法更容易落地')
  } else if (answers.resources === 'academic') {
    datiaoScore += 2
    reasoning.push('有学术导师 → 大挑赛道学术支撑更强')
  } else if (answers.resources === 'none') {
    reasoning.push('⚠️ 资源为零 → 先跑基层办公室"坐40分钟"！不管走哪条赛道，这是第一步')
  }

  if (answers.commitment === 'short') {
    traditionalScore += 1
    reasoning.push('时间短 → 传统赛道更适合')
  } else if (answers.commitment === 'long') {
    datiaoScore += 2
    reasoning.push('愿意长期投入 → 大挑赛道需要深耕')
  }

  const confidence = Math.abs(traditionalScore - datiaoScore) / Math.max(traditionalScore + datiaoScore, 1)
  const track = traditionalScore > datiaoScore ? 'traditional' : datiaoScore > traditionalScore ? 'datiao' : 'either'

  return { track, confidence: Math.min(confidence * 100, 95), reasoning }
}

export default function DecisionWizardPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ReturnType<typeof calculateRecommendation> | null>(null)

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value }
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setResult(calculateRecommendation(newAnswers))
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    const trackInfo = result.track === 'traditional'
      ? { name: '传统社会实践赛道', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', icon: Target, desc: '以实践活动为主线，四步法：匹配需求→戴帽子→搞有效益活动→拿佐证' }
      : result.track === 'datiao'
      ? { name: '大挑导向社会实践赛道', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: Medal, desc: '以调研报告为主线，六步法：出发前准备(80%)→选赛道→选题→标题→报告结构→佐证材料' }
      : { name: '两条赛道均可', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', icon: Target, desc: '建议进一步明确目标和资源后再做决定' }

    const Icon = trackInfo.icon
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className={`rounded-xl border ${trackInfo.border} ${trackInfo.bg} p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <Icon className="h-8 w-8" />
            <div>
              <h2 className="text-xl font-bold">推荐结果</h2>
              <p className="text-lg font-semibold mt-1">→ {trackInfo.name}</p>
            </div>
          </div>
          <p className="text-sm opacity-80">{trackInfo.desc}</p>
          <p className="text-sm mt-2 opacity-60">置信度：{result.confidence.toFixed(0)}%</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            决策依据
          </h3>
          <ul className="space-y-2">
            {result.reasoning.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-3">你的回答</h3>
          <dl className="space-y-2 text-sm">
            {questions.map((q) => (
              <div key={q.id} className="flex justify-between py-1 border-b last:border-0">
                <dt className="text-muted-foreground">{q.question}</dt>
                <dd className="font-medium">{q.options.find((o) => o.value === answers[q.id])?.label || '—'}</dd>
              </div>
            ))}
          </dl>
        </div>

        <button onClick={reset} className="w-full rounded-lg border py-3 text-sm font-medium hover:bg-muted transition-colors">
          重新测试
        </button>
      </div>
    )
  }

  const q = questions[step]
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">第 {step + 1}/{questions.length} 题</span>
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <h2 className="text-lg font-bold mb-1">{q.question}</h2>
        <p className="text-sm text-muted-foreground mb-6">{q.description}</p>

        <div className="space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className="w-full flex items-center justify-between rounded-lg border p-4 text-left transition-all hover:border-primary hover:shadow-sm active:scale-[0.98] group"
            >
              <div>
                <span className="font-medium text-sm">{opt.label}</span>
                {opt.desc && <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {step > 0 && (
          <button onClick={handleBack} className="mt-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            上一题
          </button>
        )}
      </div>
    </div>
  )
}
