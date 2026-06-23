import { ClipboardCheck, MessageSquare, GitCompare, Camera, AlertTriangle, Lightbulb } from 'lucide-react'
import { researchMethodsData } from '../data/training-framework'

const { questionnaire, interview, sampling, oneHandData, commonPitfalls } = researchMethodsData

export default function ResearchMethodsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <ClipboardCheck className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">调研方法指南</h2>
            <p className="text-sm text-muted-foreground">扎实的调研是获奖的根基。三分选题，七分调研。</p>
          </div>
        </div>
      </div>

      {/* Questionnaire */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-1 flex items-center gap-2">
          <ClipboardCheck className="h-4 w-4 text-primary" />
          {questionnaire.title}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 mt-3">
          <div>
            <h4 className="text-sm font-medium mb-2">五大原则</h4>
            <ul className="space-y-2">
              {questionnaire.principles.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">样本量参考</h4>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-3 py-2 text-left text-xs font-medium">目标级别</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">最低</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">理想</th>
                  </tr>
                </thead>
                <tbody>
                  {questionnaire.sampleSize.map((row, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-3 py-2 text-xs">{row.scope}</td>
                      <td className="px-3 py-2 text-center text-xs text-muted-foreground">{row.min}</td>
                      <td className="px-3 py-2 text-center text-xs font-medium text-primary">{row.ideal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              注意：问卷量 ÷ 3 ≈ 实际回收量的粗略估计。线上回收率通常低于30%，线下面对面可做到80%+。
            </p>
          </div>
        </div>
      </div>

      {/* Interview */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          {interview.title}
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-4">
          {interview.types.map((t) => (
            <div key={t.name} className="rounded-lg border p-3 bg-muted/30">
              <h4 className="font-medium text-sm">{t.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
              <p className="text-xs text-primary mt-1">适用：{t.scenario}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
          <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            访谈实操要点
          </h4>
          <ul className="space-y-1.5">
            {interview.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                <span className="text-amber-400 mt-0.5 shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sampling */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <GitCompare className="h-4 w-4 text-primary" />
          抽样方法对比
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {sampling.map((s) => (
            <div key={s.name} className="rounded-lg border p-4">
              <h4 className="font-medium text-sm">{s.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              <div className="flex items-start gap-2 mt-2">
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">✅ 优：{s.pros}</span>
                <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">⚠ 劣：{s.cons}</span>
              </div>
              <p className="text-xs text-primary mt-2">🎯 何时用：{s.when}</p>
            </div>
          ))}
        </div>
      </div>

      {/* One-hand data checklist */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          {oneHandData.title}
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {oneHandData.mustHave.map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border p-2.5 text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-green-100 text-green-600 text-xs">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-amber-600 mt-3 bg-amber-50 rounded-lg p-2.5">
          📏 {oneHandData.reference}
        </p>
      </div>

      {/* Common pitfalls */}
      <div>
        <h3 className="mb-3 text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          常见调研翻车案例
        </h3>
        <div className="space-y-3">
          {commonPitfalls.map((p, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs font-bold">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-700">❌ {p.pitfall}</h4>
                  <p className="text-xs text-green-700 mt-1">✅ 正确做法：{p.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
