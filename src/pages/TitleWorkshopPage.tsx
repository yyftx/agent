import { useState } from 'react'
import { Check, X, Lightbulb, Copy, RefreshCw } from 'lucide-react'

interface TitleCheck {
  label: string
  pass: boolean
  tip: string
}

function analyzeTitle(title: string, direction: string): TitleCheck[] {
  const checks: TitleCheck[] = [
    {
      label: '研究对象（哪里/谁）',
      pass: title.length > 5 && !/^从.*角度/.test(title),
      tip: '标题要明确告诉评委你研究的是什么地方或什么人群',
    },
    {
      label: '研究问题（什么）',
      pass: title.length > 8 && /[研究|调查|探析|路径|策略|机制|模式]/.test(title),
      tip: '标题应包含研究问题的关键词，如"路径""策略""机制"等',
    },
    {
      label: '理论视角（用什么理论看）',
      pass: /[视域|视角|视阈|背景下|语境|维度]/.test(title) || title.length > 12,
      tip: '最好能在标题中体现理论框架，如"XX视域下""XX视角"',
    },
    {
      label: '字数适中（15-25字）',
      pass: title.length >= 10 && title.length <= 30,
      tip: title.length < 10 ? '太短，信息量不够' : title.length > 30 ? '太长，不够精炼' : '长度合适',
    },
    {
      label: '抓人眼球（用典/诗意/情怀）',
      pass: !/^从.*角度|^关于|^浅谈|^浅析/.test(title),
      tip: '避免"从XX角度""关于XX""浅谈XX"等范式化开头',
    },
    {
      label: '方向匹配',
      pass: direction !== '' || title.length > 0,
      tip: direction ? `已选方向：${direction}` : '请先选择五大方向之一',
    },
  ]
  return checks
}

const directionOptions = [
  { value: '经济', label: '经济建设', desc: '蓝海，竞争小', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { value: '政治', label: '政治建设', desc: '蓝海，竞争小', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
  { value: '文化', label: '文化建设', desc: '红海，需强差异化', color: 'bg-red-50 border-red-200 text-red-700' },
  { value: '社会', label: '社会建设', desc: '红海，人多', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { value: '生态文明', label: '生态文明建设', desc: '红海，人多', color: 'bg-green-50 border-green-200 text-green-700' },
]

const goodExamples = [
  '绣花功夫：历史地段传统院落保护更新策略研究',
  '叙事医学视域下儿童肿瘤患者生命质量提升路径调研',
  '韧性治理视角下浙北农村电商物流网络适应性研究——以安吉县3个淘宝村为例',
  '共同富裕背景下山区县生态产品价值实现路径研究',
]

const badExamples = [
  '从学生角度看乡村振兴',
  '关于外来务工人员的调查',
  '浅谈社区治理的问题与对策',
  '暑期社会实践调研报告',
]

export default function TitleWorkshopPage() {
  const [direction, setDirection] = useState('')
  const [rawTopic, setRawTopic] = useState('')
  const [draftTitle, setDraftTitle] = useState('')
  const [versionHistory, setVersionHistory] = useState<string[]>([])

  const checks = analyzeTitle(draftTitle, direction)
  const passCount = checks.filter((c) => c.pass).length
  const score = Math.round((passCount / checks.length) * 100)

  const saveVersion = () => {
    if (draftTitle && !versionHistory.includes(draftTitle)) {
      setVersionHistory((prev) => [draftTitle, ...prev].slice(0, 10))
    }
  }

  const useExample = (title: string) => {
    setVersionHistory((prev) => ([draftTitle, ...prev].filter(Boolean).slice(0, 10)))
    setDraftTitle(title)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          标题工作坊
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          记住张老师的话：<strong>90%的评委是"标题党"</strong>，从大标题看到二级标题先打基本分。标题决定了作品在什么层次。
        </p>

        {/* Direction selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">第一步：选择赛道方向</label>
          <div className="flex flex-wrap gap-2">
            {directionOptions.map((d) => (
              <button
                key={d.value}
                onClick={() => setDirection(d.value)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-all ${
                  direction === d.value ? `${d.color} border-2 font-medium` : 'bg-muted hover:bg-accent'
                }`}
              >
                {d.label}
                <span className="ml-1 text-xs opacity-60">({d.desc})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">第二步：输入你的选题/标题</label>
          <input
            type="text"
            value={rawTopic}
            onChange={(e) => setRawTopic(e.target.value)}
            placeholder="比如：乡村振兴、直播带货..."
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-primary mb-2"
          />
          <label className="block text-sm font-medium mb-2">完整标题草稿</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="写出你的完整标题..."
              className="flex-1 rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button onClick={saveVersion} className="rounded-lg border px-3 py-2 text-sm hover:bg-muted transition-colors" title="保存版本">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Score */}
        {draftTitle && (
          <div className="mb-6 rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">黄金法则评分</span>
              <span className={`text-lg font-bold ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                {score}/100
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        )}

        {/* Checks */}
        {draftTitle && (
          <div className="space-y-2 mb-6">
            {checks.map((check) => (
              <div key={check.label} className={`flex items-start gap-3 rounded-lg border p-3 ${check.pass ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'}`}>
                {check.pass ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                ) : (
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                )}
                <div>
                  <span className={`text-sm font-medium ${check.pass ? 'text-green-700' : 'text-red-700'}`}>{check.label}</span>
                  <p className="text-xs opacity-70 mt-0.5">{check.tip}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Version history */}
        {versionHistory.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              版本历史
            </h4>
            <div className="space-y-1">
              {versionHistory.map((v, i) => (
                <button key={i} onClick={() => setDraftTitle(v)} className="block w-full text-left rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors truncate">
                  v{versionHistory.length - i}: {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <h4 className="text-sm font-medium text-green-700 mb-2">✅ 好标题示范</h4>
            <ul className="space-y-1.5">
              {goodExamples.map((ex) => (
                <li key={ex}>
                  <button onClick={() => useExample(ex)} className="text-xs text-green-800 hover:underline text-left">
                    {ex}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <h4 className="text-sm font-medium text-red-700 mb-2">❌ 坏标题示范（范式化）</h4>
            <ul className="space-y-1.5">
              {badExamples.map((ex) => (
                <li key={ex} className="text-xs text-red-800 line-through">{ex}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
