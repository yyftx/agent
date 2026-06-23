import { useState, useEffect, useRef } from 'react'
import { Presentation, Clock, MessageSquare, Lightbulb, CheckCircle, Play, Pause, RotateCcw, Award } from 'lucide-react'
import { defensePrepData } from '../data/training-framework'

const { process, pptPrinciples, questions, tips } = defensePrepData

export default function DefensePrepPage() {
  // Timer
  const TOTAL_TIME = 5 * 60 // 5 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timerRunning])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setTimerRunning(false)
    setTimeLeft(TOTAL_TIME)
  }

  // Random question
  const allQuestions = questions.flatMap((q) => q.questions)
  const [randomQ, setRandomQ] = useState('')
  const pickRandom = () => {
    const q = allQuestions[Math.floor(Math.random() * allQuestions.length)]
    setRandomQ(q)
  }

  const timePercent = (timeLeft / TOTAL_TIME) * 100
  const isWarning = timeLeft <= 60
  const isDanger = timeLeft <= 30

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
            <Presentation className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">答辩准备室</h2>
            <p className="text-sm text-muted-foreground">"想明白、干明白、讲明白"——三分做，七分讲。</p>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          {process.title}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {process.steps.map((s) => (
            <div key={s.phase} className="rounded-lg border p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{s.phase}</h4>
                <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">{s.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{s.content}</p>
              <p className="text-xs text-amber-600">💡 {s.tips}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Timer */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          模拟计时器
          <span className="text-xs text-muted-foreground font-normal">（练习5分钟陈述）</span>
        </h3>
        <div className="text-center">
          {/* Timer display */}
          <div className="relative mx-auto w-40 h-40 mb-4">
            <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="72" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="80" cy="80" r="72"
                fill="none"
                stroke={isDanger ? '#ef4444' : isWarning ? '#f59e0b' : '#22c55e'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 72}`}
                strokeDashoffset={`${2 * Math.PI * 72 * (1 - timePercent / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-3xl font-bold tabular-nums ${isDanger ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                timerRunning ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {timerRunning ? (
                <span className="flex items-center gap-1.5"><Pause className="h-4 w-4" />暂停</span>
              ) : (
                <span className="flex items-center gap-1.5"><Play className="h-4 w-4" />{timeLeft < TOTAL_TIME ? '继续' : '开始计时'}</span>
              )}
            </button>
            <button
              onClick={resetTimer}
              className="rounded-full px-4 py-2 text-sm border hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              重置
            </button>
          </div>

          {timeLeft === 0 && (
            <div className="mt-4 rounded-lg bg-red-100 border border-red-300 p-3">
              <p className="text-sm font-medium text-red-700">⏰ 时间到！超时是答辩的致命减分项。练习控制在 4分30秒 左右。</p>
            </div>
          )}
        </div>
      </div>

      {/* PPT Principles */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Presentation className="h-4 w-4 text-primary" />
          PPT 制作五原则
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pptPrinciples.map((p) => (
            <div key={p.principle} className="rounded-lg border p-3 bg-muted/30">
              <h4 className="font-medium text-sm">{p.principle}</h4>
              <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Judge Questions */}
      <div>
        <h3 className="mb-3 text-base font-semibold flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          预设评委问题库
          <span className="text-xs text-muted-foreground font-normal">（提前准备，有备无患）</span>
        </h3>
        <div className="space-y-3">
          {questions.map((cat) => (
            <div key={cat.category} className="rounded-xl border bg-card p-4 shadow-sm">
              <h4 className="text-sm font-semibold mb-2 text-primary">{cat.category}</h4>
              <ul className="space-y-1.5">
                {cat.questions.map((q, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-muted-foreground/40 mt-0.5 shrink-0">Q:</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Random Question Picker */}
      <div className="rounded-xl border bg-card p-6 shadow-sm bg-gradient-to-r from-orange-50/50 to-amber-50/50">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-500" />
          随机抽题练习
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          点按钮随机抽取一个评委问题，和队友互相模拟提问练习。预设问题越多，答辩越从容。
        </p>
        {randomQ && (
          <div className="rounded-lg bg-white/80 border p-3 mb-3">
            <p className="text-sm font-medium">🎤 评委问：{randomQ}</p>
          </div>
        )}
        <button
          onClick={pickRandom}
          className="rounded-lg bg-orange-500 text-white px-4 py-2 text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          随机抽一题
        </button>
      </div>

      {/* Tips */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          答辩七大技巧
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border p-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
                {i + 1}
              </div>
              <span className="text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
