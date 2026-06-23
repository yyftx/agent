import { useState } from 'react'
import { FileText, Download, Copy, Check } from 'lucide-react'

interface Template {
  id: string
  title: string
  description: string
  icon: string
  fields: { key: string; label: string; placeholder: string }[]
}

const templates: Template[] = [
  {
    id: 'government_letter',
    title: '政府对接函',
    description: '用于联系政府/社区/机构，正式介绍团队和实践目的',
    icon: '🏛️',
    fields: [
      { key: 'school', label: '学校名称', placeholder: 'XX大学' },
      { key: 'teamName', label: '团队名称', placeholder: 'XX社会实践团队' },
      { key: 'leaderName', label: '队长姓名（学生）', placeholder: '张三' },
      { key: 'projectTitle', label: '项目/调研标题', placeholder: '关于XX的调研' },
      { key: 'targetUnit', label: '对接单位名称', placeholder: 'XX镇人民政府' },
      { key: 'date', label: '出发日期', placeholder: '2026年7月X日—X日' },
      { key: 'teamSize', label: '团队人数', placeholder: 'X人' },
    ],
  },
  {
    id: 'village_cert',
    title: '村委会/政府证明',
    description: '证明活动开展及产生效果的正式文件（黄金模板四要素）',
    icon: '🔖',
    fields: [
      { key: 'school', label: '学校名称', placeholder: 'XX大学' },
      { key: 'studentName', label: '学生姓名（排第一）', placeholder: '张三' },
      { key: 'teamName', label: '团队名称', placeholder: 'XX社会实践团队' },
      { key: 'activity', label: '做了什么（具体可验证）', placeholder: '带领X户农户完成3个月直播' },
      { key: 'effect', label: '量化效果（必须带数字）', placeholder: '使收入提升了300%' },
      { key: 'date', label: '日期', placeholder: '2026年X月X日' },
    ],
  },
  {
    id: 'media_draft',
    title: '媒体报道通稿',
    description: '标准化的媒体宣传稿件，便于记者快速理解和采用',
    icon: '📰',
    fields: [
      { key: 'school', label: '学校名称', placeholder: 'XX大学' },
      { key: 'projectTitle', label: '项目标题（抓人眼球！）', placeholder: '绣花功夫：XX调研' },
      { key: 'highlight', label: '核心亮点（一句话）', placeholder: '团队帮助农户月销从1000元提升至10000元' },
      { key: 'activityDesc', label: '活动描述', placeholder: '团队开展了...活动' },
      { key: 'quote', label: '学生感言/引述', placeholder: '"..."——队长张三说' },
      { key: 'contact', label: '联系人', placeholder: '张三 138xxxx' },
    ],
  },
  {
    id: 'feedback_request',
    title: '批示/反馈请求函',
    description: '请求政府或学会出具正式反馈意见的函件',
    icon: '📝',
    fields: [
      { key: 'school', label: '学校名称', placeholder: 'XX大学' },
      { key: 'studentName', label: '学生姓名（排第一）', placeholder: '张三' },
      { key: 'projectTitle', label: '项目标题', placeholder: '关于XX的调研报告' },
      { key: 'targetUnit', label: '请求出具反馈的单位', placeholder: 'XX学会/XX局' },
      { key: 'summary', label: '项目摘要（一段话）', placeholder: '本项目通过...发现...建议...' },
    ],
  },
  {
    id: 'survey_template',
    title: '调查问卷模板',
    description: '结构化调查问卷，包含基本信息和核心问题板块',
    icon: '📊',
    fields: [
      { key: 'projectTitle', label: '调研题目', placeholder: '关于XX的调查研究' },
      { key: 'targetGroup', label: '调查对象', placeholder: 'XX村村民/XX群体' },
      { key: 'sampleSize', label: '计划样本量', placeholder: 'N=200' },
      { key: 'coreQuestions', label: '核心调查维度（用;分隔）', placeholder: '收入变化;生活满意度;政策认知度' },
    ],
  },
  {
    id: 'interview_guide',
    title: '访谈提纲模板',
    description: '半结构化访谈提纲，用于深度访谈关键信息人',
    icon: '🎙️',
    fields: [
      { key: 'projectTitle', label: '调研题目', placeholder: '关于XX的调查研究' },
      { key: 'intervieweeType', label: '访谈对象类型', placeholder: '村干部/农户/企业主' },
      { key: 'interviewCount', label: '计划访谈人数', placeholder: '10-15人' },
      { key: 'keyTopics', label: '核心访谈话题（用;分隔）', placeholder: '生活变化;政策感知;困难需求;未来期望' },
    ],
  },
  {
    id: 'activity_signin',
    title: '活动签到表模板',
    description: '标准化活动签到表，作为参与人数的佐证材料',
    icon: '✍️',
    fields: [
      { key: 'activityName', label: '活动名称', placeholder: 'XX主题宣讲/直播活动' },
      { key: 'date', label: '活动日期', placeholder: '2026年X月X日' },
      { key: 'location', label: '活动地点', placeholder: 'XX村文化礼堂' },
      { key: 'organizer', label: '主办方（学校和团队名）', placeholder: 'XX大学XX团队' },
    ],
  },
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  const selectTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setFormData({})
    setCopied(false)
  }

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const generateText = (): string => {
    if (!selectedTemplate) return ''
    const data = formData
    switch (selectedTemplate.id) {
      case 'government_letter':
        return `【对接函】

${data.school || 'XX大学'} ${data.teamName || 'XX社会实践团队'}：
为深入贯彻习近平总书记关于青年工作的重要思想，引导青年学生在社会实践中受教育、长才干、作贡献，${data.school || 'XX大学'}拟组织${data.teamName || 'XX团队'}于${data.date || '2026年X月'}赴${data.targetUnit || 'XX单位'}开展以"${data.projectTitle || 'XX调研'}"为主题的社会实践活动。团队由${data.teamSize || 'X'}名师生组成，由${data.leaderName || 'XXX'}同学担任队长。

恳请贵单位予以接洽为盼！

联系人：${data.leaderName || 'XXX'}
联系电话：_______________

${data.school || 'XX大学'}团委（盖章）
${data.date || '2026年X月X日'}`

      case 'village_cert':
        return `【证明】

兹证明${data.school || 'XX大学'}${data.studentName || 'XXX'}同学的${data.teamName || 'XX社会实践团队'}来我村（社区）开展${data.activity || '实践活动'}，${data.activity || ''}，取得了显著成效，${data.effect || '……'}。

特此证明。

${data.targetUnit || 'XX村民委员会'}（盖章）
${data.date || '2026年X月X日'}`

      case 'media_draft':
        return `【媒体报道通稿】

标题：${data.projectTitle || 'XX大学实践团赴XX开展XX活动'}

本报讯 （通讯员 ${data.studentName || 'XXX'}）${data.activityDesc || '近日，XX大学XX社会实践团队赴XX地开展了XX活动……'}

${data.highlight || '活动期间，团队帮助当地农户……取得了显著成效。'}

"${data.quote || '这次实践让我们真正走进了基层，感受到了……'}"${data.studentName || 'XXX'}同学说。

据悉，该团队由${data.school || 'XX大学'}团委组织，是该校2026年暑期社会实践重点团队之一。

联系人：${data.contact || 'XXX'}（学生队长）
联系电话：_______________`

      case 'feedback_request':
        return `【关于出具反馈意见的函】

${data.targetUnit || 'XX单位'}：
${data.school || 'XX大学'}学生${data.studentName || 'XXX'}带领的社会实践团队，围绕"${data.projectTitle || 'XX调研'}"开展了深入调研。${data.summary || '……'}

恳请贵单位审阅调研报告并出具书面反馈意见，对调研成果的学术价值和实践意义给予评价。

此致
敬礼

${data.school || 'XX大学'}团委（盖章）
${data.date || '2026年X月X日'}`
      default:
        return `请选择模板并填写信息后生成文本`
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (selectedTemplate) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <button onClick={() => setSelectedTemplate(null)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← 返回模板列表
        </button>

        <div className="rounded-xl border bg-card shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{selectedTemplate.icon}</span>
            <div>
              <h2 className="text-lg font-bold">{selectedTemplate.title}</h2>
              <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {selectedTemplate.fields.map((field) => (
              <div key={field.key} className={field.key === 'activityDesc' || field.key === 'summary' || field.key === 'coreQuestions' || field.key === 'keyTopics' || field.key === 'activity' || field.key === 'effect' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                {field.key === 'activityDesc' || field.key === 'summary' ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.key] || ''}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl border bg-card shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              生成预览
            </h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? '已复制' : '复制文本'}
            </button>
          </div>
          <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed font-sans">
            {generateText()}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5" />
          模板中心
        </h2>
        <p className="text-sm text-muted-foreground">
          7类必备佐证材料模板。填入信息后一键生成文本，可复制到 Word 中排版打印。
          记住：<strong>学生名字必须排第一！</strong>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {templates.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => selectTemplate(tmpl)}
            className="flex items-start gap-4 rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/30 active:scale-[0.98]"
          >
            <span className="text-3xl">{tmpl.icon}</span>
            <div>
              <h3 className="font-medium text-sm">{tmpl.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{tmpl.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
