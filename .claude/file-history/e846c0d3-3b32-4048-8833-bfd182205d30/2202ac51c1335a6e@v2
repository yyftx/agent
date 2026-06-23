import { useState, useEffect, useRef } from 'react'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, ChevronRight, X } from 'lucide-react'
import { trainingFrameworkMd } from '../data/training-framework'

interface DetailNode {
  title: string
  content: string
  examples?: string
}

const transformer = new Transformer()

const nodeDetails: Record<string, DetailNode> = {
  '两条赛道': {
    title: '两条赛道（不能混着写！）',
    content: '当前暑期社会实践实质上分为两大类型，评审标准截然不同。**两条赛道不能混着写！** 传统赛道以"活动"为轴，大挑赛道以"调研主题"为轴。写反了就输了。',
    examples: '传统赛道：重实践效果 + 媒体报道 + 批示\n大挑赛道：重学术含量 + 对策建议 + 落地应用'
  },
  '传统社会实践': {
    title: '传统社会实践赛道',
    content: '以实践活动为主线的传统社会实践。脱胎于已取消的"红色专项赛"，但评委思维/习惯仍沿用。经过10-20年传承，套路变化不大，但竞争白热化。',
    examples: '核心公式：匹配对方需求 → 戴大帽子 → 搞有效益的活动 → 提前设置佐证材料'
  },
  '大挑导向社会实践': {
    title: '大挑导向社会实践赛道',
    content: '以哲学社会科学调查报告为主线。脱胎于挑战杯主体赛文科作品评审。门槛更高但差异化空间大。**核心方法论是"倒过来"：先预设结论 → 再设计调研方案和实践活动。**',
    examples: '六步法：出发前准备(80%) → 选赛道 → 选题 → 标题 → 报告结构 → 佐证材料'
  },
  '第一步：匹配对方需求': {
    title: '四步法 · 第一步：匹配对方需求',
    content: '**最被忽视的第一步。** 主动跑基层办公室"坐40分钟"，问清三件事：\n1. 你们平常考核什么？（有大量隐性考核指标）\n2. 你们有没有日常联系的媒体资源？\n3. 今年暑假这几个月，你们重点工作方向是什么？',
    examples: '核心洞察：基层有"隐性考核指标"需要完成。你帮他完成 → 他帮你搞定媒体、盖章、批示。这是互利，不是求人。\n\n错误做法：自己闭门想方案 / 只跟村民聊。村委没资源给你，要找镇/街道/县一级。'
  },
  '第二步：戴大帽子': {
    title: '四步法 · 第二步：戴大帽子',
    content: '提炼有较高社会价值利益的"核心思想"或"核心内容"。现在的社会实践已脱离"做了就好"的年代——**谁的包装都很好，你的包装差别在哪里？**',
    examples: '帽子来源：学习强国近半年朗读版、中宣部解读文章、时政热点\n\n示范：不要只喊"乡村振兴"——要具体到"十五规划中三区25线的某个具体点位"'
  },
  '第三步：有效益的活动': {
    title: '四步法 · 第三步：搞一个"有效益"的活动',
    content: '搞活动本身不难，搞到"有效益"的活动才难。**"有效益"的两种类型：**\n- 社会价值效益：规划方案被政府采纳、内容列入年度/十五/四年工作计划\n- 经济价值效益：直播带货产生销售数据、农户增收（有截图佐证）',
    examples: '关键：盖章时机！在现场直播时请村委配合盖章——村民高兴。干完了回来再求人盖章，怎么好意思？\n\n正确做法：持续3-6个月，每周/每月跟进，记录每场数据。'
  },
  '第四步：提前设置佐证材料': {
    title: '四步法 · 第四步：提前设置佐证材料',
    content: '**村委会/政府证明的黄金模板四要素：**\n1. 学校名字 + 学生名字（学生必须排第一）\n2. 团队做了什么事（具体、可验证）\n3. 产生了什么量化效果（必须带数字）\n4. 盖公章',
    examples: '佐证材料互证链条：\n村委会盖章 → 媒体愿意报道（政府已背书）→ 更高级别批示/反馈'
  },
}

export default function MindMapPage() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const markmapRef = useRef<Markmap | null>(null)
  const [activeNode, setActiveNode] = useState<DetailNode | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!svgRef.current) return

    const { root } = transformer.transform(trainingFrameworkMd)
    const mm = Markmap.create(svgRef.current, {
      autoFit: true,
      initialExpandLevel: 2,
      duration: 500,
      maxWidth: 280,
    } as any)
    mm.setData(root)
    mm.fit()
    markmapRef.current = mm

    return () => {
      mm.destroy()
    }
  }, [])

  const handleNodeClick = (nodeId: string) => {
    // Find detail for the clicked node
    for (const [key, detail] of Object.entries(nodeDetails)) {
      if (nodeId.includes(key) || key.includes(nodeId.split('/').pop() || '')) {
        setActiveNode(detail)
        return
      }
    }
  }

  const zoomIn = () => markmapRef.current?.rescale(1.3)
  const zoomOut = () => markmapRef.current?.rescale(0.7)
  const resetZoom = () => { markmapRef.current?.fit() }

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4">
      {/* Main mind map area */}
      <div className="flex-1 flex flex-col rounded-xl border bg-card shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b px-4 py-2">
          <button onClick={zoomIn} className="rounded-md p-1.5 hover:bg-muted" title="放大">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button onClick={zoomOut} className="rounded-md p-1.5 hover:bg-muted" title="缩小">
            <ZoomOut className="h-4 w-4" />
          </button>
          <button onClick={resetZoom} className="rounded-md p-1.5 hover:bg-muted" title="重置">
            <RotateCcw className="h-4 w-4" />
          </button>
          <div className="w-px h-5 bg-border mx-1" />
          <input
            type="text"
            placeholder="搜索节点..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-md border px-3 py-1 text-sm outline-none focus:border-primary max-w-xs"
          />
        </div>
        {/* Mind map SVG */}
        <div ref={containerRef} className="flex-1 overflow-hidden">
          <svg ref={svgRef} className="h-full w-full" />
        </div>
      </div>

      {/* Detail panel */}
      {activeNode && (
        <div className="w-80 shrink-0 rounded-xl border bg-card shadow-sm overflow-auto">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-primary" />
              节点详情
            </h3>
            <button onClick={() => setActiveNode(null)} className="rounded-md p-1 hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <h3 className="font-bold text-lg">{activeNode.title}</h3>
            <div className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activeNode.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
            {activeNode.examples && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <p className="text-xs font-medium text-blue-700 mb-1">📌 示例/案例</p>
                <p className="text-xs text-blue-800 whitespace-pre-line">{activeNode.examples}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
