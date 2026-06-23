import { FileText, BookOpen, Layers, GitCompare, Target, Check } from 'lucide-react'
import { reportWritingData } from '../data/training-framework'

const { framework, structure, threeDeepen, comparison, winningPatterns } = reportWritingData

export default function ReportWritingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">报告写作框架</h2>
            <p className="text-sm text-muted-foreground">评委看的不是你的行程记录，而是你的分析能力。</p>
          </div>
        </div>
      </div>

      {/* Core Framework */}
      <div className="rounded-xl border bg-card p-6 shadow-sm bg-gradient-to-r from-green-50/50 to-blue-50/50">
        <h3 className="text-base font-semibold mb-1">{framework.title}</h3>
        <p className="text-sm text-primary font-medium mb-4">🎯 {framework.center}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {framework.points.map((p) => (
            <div key={p.label} className="rounded-lg bg-white/80 border p-3">
              <div className="flex items-center gap-2 mb-1">
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span className="font-medium text-sm">{p.label}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{p.desc}</p>
              <p className="text-xs text-red-600">❌ 反面：{p.bad}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Standard Structure */}
      <div>
        <h3 className="mb-3 text-base font-semibold flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          报告标准结构（六段式）
        </h3>
        <div className="space-y-2">
          {structure.map((s, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{s.section}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.content}</p>
                  <p className="text-xs text-amber-600 mt-1 bg-amber-50 inline-block px-2 py-0.5 rounded">💡 {s.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Three Deepen */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          "三维深化法" — 避免调研流于表面
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {threeDeepen.map((d) => (
            <div key={d.dimension} className="rounded-lg border p-4 bg-muted/30">
              <h4 className="font-medium text-sm mb-2">{d.dimension}</h4>
              <p className="text-xs text-muted-foreground mb-2">{d.method}</p>
              <p className="text-xs font-medium text-primary">🔑 关键问题：{d.question}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison: Bad vs Good */}
      <div>
        <h3 className="mb-3 text-base font-semibold flex items-center gap-2">
          <GitCompare className="h-4 w-4 text-primary" />
          {comparison.title}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50/30 p-5">
            <h4 className="text-sm font-medium text-red-700 mb-2">{comparison.bad.title}</h4>
            <p className="text-sm text-red-800 leading-relaxed italic">{comparison.bad.excerpt}</p>
            <p className="text-xs text-red-600 mt-2 font-medium">{comparison.bad.comment}</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50/30 p-5">
            <h4 className="text-sm font-medium text-green-700 mb-2">{comparison.good.title}</h4>
            <p className="text-sm text-green-800 leading-relaxed italic">{comparison.good.excerpt}</p>
            <p className="text-xs text-green-600 mt-2 font-medium">{comparison.good.comment}</p>
          </div>
        </div>
      </div>

      {/* Winning Patterns */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-amber-500" />
          获奖报告共同特征
        </h3>
        <div className="space-y-2">
          {winningPatterns.map((p, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                {i + 1}
              </div>
              <span className="text-sm">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
