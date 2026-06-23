import { useState } from 'react'
import { Trophy, MapPin, Users, BookOpen, Target, ArrowUpRight, Award, Search } from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  university: string
  award: string
  year: string
  track: string
  direction: string
  scale: string
  method: string
  highlight: string
  result: string
  lessons: string[]
  tags: string[]
}

const cases: CaseStudy[] = [
  {
    id: 'women-land',
    title: '「禾下她名，地载公平」新时代农村妇女土地权益保护的挑战与应对',
    university: '烟台大学（法学院）',
    award: '第十九届挑战杯 全国特等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '社会建设',
    scale: '全国9省76村，2396份问卷，740份司法案例',
    method: '大样本田野调查+司法案例分析+治理流程构建',
    highlight: '提出"五步全链条治理流程"，形成可推广的制度方案',
    result: '成果已落地区域基层政府，推动政策修订',
    lessons: [
      '跨省大规模调研是特等奖标配（至少6省以上）',
      '问卷量2000+才能支撑统计学意义',
      '必须有可落地的实践方案，不能停留在"建议"层面',
      '标题用典（《诗经》）拉满人文情怀',
    ],
    tags: ['大规模调研', '社会公平', '制度创新', '特等奖'],
  },
  {
    id: 'ancient-village',
    title: '「古村蝶变」传统村落活化利用的路径创新研究——基于山东沂水县12个村落3年跟踪调查及社会实验',
    university: '山东城市建设职业学院',
    award: '第十九届挑战杯 全国特等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '文化建设',
    scale: '山东8乡镇56个村庄，连续3年驻村，累计驻村超3个月',
    method: '长时段田野追踪+社会实验+对比研究',
    highlight: '高职院校首次获哲学社会科学类特等奖，打破"高职无科研"偏见',
    result: '完成多个村落改造方案并实际落地实施',
    lessons: [
      '3年追踪调研→评委无法质疑你的深度',
      '驻村超3个月→不是"走马观花"，是真调研',
      '高职学生同样可以做出高水平社科作品',
      '选题聚焦一个县→深度比广度更能打动评委',
    ],
    tags: ['长时段追踪', '驻村调研', '高职突破', '特等奖'],
  },
  {
    id: 'blueprint',
    title: '「一张蓝图何以绘到底」基层探索乡村振兴长效机制的实践与分析',
    university: '上海大学（社会学院）',
    award: '第十九届挑战杯 全国特等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '政治建设',
    scale: '浙江、山东、陕西等7省10余村，与村民同吃同住',
    method: '口述史+参与式观察+跨省比较',
    highlight: '为四任村支书撰写人物小传，提炼"沟通协商凝聚共识、利益兼容激活动力、组织互嵌保障延续"三大普适原则',
    result: '形成可推广的乡村振兴长效机制分析框架',
    lessons: [
      '同吃同住→才能拿到真实一手信息',
      '口述史方法→让报告有人情味，区别于纯数据堆砌',
      '提炼普适机制→从个案上升到一般规律',
      '"一张蓝图何以绘到底"→标题自带悬念，吸引评委',
    ],
    tags: ['口述史', '同吃同住', '长效机制', '特等奖'],
  },
  {
    id: 'blood-donation',
    title: '「同心共济，生命续航」"三献"工作高捐献率的路径探索——基于全国8省32市43县（区）的深度调研',
    university: '江西财经大学',
    award: '第十九届挑战杯 全国特等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '社会建设',
    scale: '全国8省32市43县（区）',
    method: '演化博弈理论+深度访谈+问卷调查',
    highlight: '运用演化博弈理论分析动员体系，构建可推广的"三献"动员模型',
    result: '模型被多地红十字会采纳应用',
    lessons: [
      '引入理论模型（演化博弈）→提升学术含量',
      '8省32市43县的覆盖→样本分层做得好',
      '三献（献血、献造血干细胞、献遗体）→公益选题自带社会关注度',
      '标题用典+对仗→"同心共济"对"生命续航"',
    ],
    tags: ['理论驱动', '公益选题', '跨学科', '特等奖'],
  },
  {
    id: 'net-riders',
    title: '「一骑当先」"新就业形态"背景下网约配送员职业发展困境与社会支持体系优化研究',
    university: '烟台大学（特里尔学院）',
    award: '第十九届挑战杯 全国二等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '社会建设',
    scale: '多城市网约配送员群体深度调研',
    method: '问卷调查+深度访谈+政策分析',
    highlight: '聚焦"网约配送员"新群体，选题极具时代感',
    result: '提出社会支持体系优化方案',
    lessons: [
      '"新瓶装旧酒"典范：社会保障是老话题→网约配送员是新群体→选题瞬间新颖',
      '群体越具体越有竞争力→不是泛"外卖行业"，是"网约配送员"',
      '新就业形态→紧扣国家政策热点',
    ],
    tags: ['新群体', '新就业形态', '时代感', '二等奖'],
  },
  {
    id: 'fishermen',
    title: '「渔见新生」长江退捕渔民可持续生计现实困境及优化路径——基于安徽11个县（区）213户渔民的跟踪调研',
    university: '安徽师范大学（地理与旅游学院）',
    award: '第十九届挑战杯 全国二等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '生态文明',
    scale: '安徽11个县（区）213户渔民',
    method: '跟踪调研+生计分析框架',
    highlight: '长江十年禁渔→重大国家政策背景下的民生关怀',
    result: '形成退捕渔民可持续生计的优化路径建议',
    lessons: [
      '紧扣"长江十年禁渔"国家战略→政策高度拉满',
      '213户跟踪调研→纵向追踪体现研究深度',
      '生态+民生双重视角→比单纯的环保选题更有温度',
      '标题"渔见新生"→谐音+点题，一语双关',
    ],
    tags: ['国家战略', '民生关怀', '跟踪调研', '二等奖'],
  },
  {
    id: 'opera-stage',
    title: '「戏台新绎，人气共生」古戏台建筑遗产活化保护与价值回归研究——基于11省96处戏台遗产的实证调查',
    university: '烟台大学（建筑学院）',
    award: '第十九届挑战杯 全国二等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '文化建设',
    scale: '全国11省96处戏台遗产',
    method: '建筑测绘+文化遗产评估+活化利用设计',
    highlight: '11省96处的样本量→在文化遗产类研究中极为罕见',
    result: '提出古戏台活化保护方案',
    lessons: [
      '文化遗产选题+大样本→破除了"小案例"的局限',
      '11省96处→用规模解决典型性问题',
      '建筑学+社会学交叉→跨学科加分',
    ],
    tags: ['文化遗产', '大样本', '跨学科', '二等奖'],
  },
  {
    id: 'new-farmers',
    title: '「跨界兴农」新农人助推乡村振兴的五维绘像及其路径优化——基于苏浙皖15市五年的追踪调查',
    university: '安徽师范大学（马克思主义学院）',
    award: '第十九届挑战杯 全国三等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '经济建设',
    scale: '苏浙皖15市，五年追踪',
    method: '长时段追踪调查+五维分析框架',
    highlight: '五年追踪→时间跨度在本科阶段极少见',
    result: '构建新农人助推乡村振兴的路径优化方案',
    lessons: [
      '五年追踪→可以是指导老师课题的延续（借力）',
      '苏浙皖15市→区域聚焦，不做全国撒网',
      '五维绘像→系统思维，不是单维度描述',
    ],
    tags: ['长时段', '区域聚焦', '系统分析', '三等奖'],
  },
  {
    id: 'xiu-hua',
    title: '「绣花功夫」历史地段传统院落保护更新策略研究',
    university: '西安建筑科技大学',
    award: '第十九届挑战杯 全国特等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '文化建设',
    scale: '多地历史地段传统院落',
    method: '城市规划+社会学交叉',
    highlight: '标题用习近平语录"绣花功夫"→人文情怀拉满',
    result: '完成8个改造项目+24个在建，真实落地',
    lessons: [
      '标题引用最高领导人语录→政治高度无可挑剔',
      '8个改造项目落地→"有效益的活动"本身就是样板',
      '城市规划专业→扩成社会问题→作品厚度大幅提升',
      '落地项目数+在建数→评委最看重的"实效"',
    ],
    tags: ['经典案例', '落地实效', '标题典范', '特等奖'],
  },
  {
    id: 'youth-tell-china',
    title: '「青年讲中国」中国式现代化的世界印象——基于33国101位国际学者的深度访谈',
    university: '南京大学（哲学学院）',
    award: '第十九届挑战杯 全国特等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '政治建设',
    scale: '跨越33国，101位国际学者，3700分钟录音，150万字文字材料',
    method: '国际比较+深度访谈+话语分析',
    highlight: '锁定"关键少数"受访对象——国际学者群体，发挥跨学科协作优势',
    result: '构建中国式现代化的国际叙事框架，成果被多部门采纳',
    lessons: [
      '国际视野——33国的广度让评委无法质疑代表性',
      '受访对象精准——不是随机路人，而是有话语权的国际学者',
      '3700分钟录音+150万字→数据量就是态度',
      '跨学科团队：哲学+外语+国际关系+社会学',
    ],
    tags: ['国际视野', '关键少数', '跨学科', '特等奖'],
  },
  {
    id: 'narrative-medicine',
    title: '「以故事疗愈」叙事医学视角下儿童肿瘤患者心理支持体系构建研究',
    university: '北京大学（医学人文学院）',
    award: '第十九届挑战杯 全国一等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '社会建设',
    scale: '全国5家三甲医院，200+患儿家庭深度访谈',
    method: '叙事医学+质性研究+多案例拼合',
    highlight: '医学×人文跨学科——3-4个案例各取最优经验点→拼成最终对策',
    result: '形成可推广的儿童肿瘤心理支持操作指南',
    lessons: [
      '医学+人文交叉→选题极具差异化',
      '多案例经验拼合法——不是简单罗列案例，而是各取精华融合',
      '5家三甲医院合作→体现资源整合能力',
      '情感共鸣型选题——评委也是人，会被感动',
    ],
    tags: ['跨学科', '医学人文', '多案例拼合', '一等奖'],
  },
  {
    id: 'rural-governance',
    title: '「田埂上的治理」村民自治制度落地困境与优化路径——基于湘黔桂6县18村的扎根研究',
    university: '华中师范大学（政治与国际关系学院）',
    award: '第十九届挑战杯 全国一等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '政治建设',
    scale: '湘黔桂3省6县18村，驻村调研累计120天',
    method: '扎根理论+参与式观察+比较案例研究',
    highlight: '120天驻村——不是"去一趟"，是"住一段时间"',
    result: '提炼出村民自治有效运行的五大条件',
    lessons: [
      '扎根理论——从田野中长出来的理论，不是套用既有框架',
      '120天驻村→评委无法质疑调研深度',
      '三省比较→不是单案例，有区域对比',
      '政治建设是蓝海方向——竞争小、差异化大',
    ],
    tags: ['扎根理论', '驻村调研', '区域对比', '一等奖'],
  },
  {
    id: 'carbon-inclusion',
    title: '「碳路先锋」碳普惠制下居民低碳行为激励机制研究——基于长三角5市的实地实验',
    university: '复旦大学（环境科学与工程系）',
    award: '第十九届挑战杯 全国一等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '生态文明',
    scale: '长三角5市，2000+户居民，实地对照实验',
    method: '实地实验+行为经济学+政策模拟',
    highlight: '实地对照实验设计——在社科作品中极为罕见',
    result: '提出碳普惠激励机制优化方案，被上海市生态环境局采纳',
    lessons: [
      '实验方法——比纯问卷调查更有说服力',
      '双碳政策热点→选题有国家级政策支撑',
      '结果被政府部门采纳→最具说服力的"实效"',
      '生态文明赛道虽为红海，但实验方法形成壁垒',
    ],
    tags: ['实地实验', '双碳', '政策采纳', '一等奖'],
  },
  {
    id: 'left-behind-elders',
    title: '「守望乡土」农村留守老人数字融入困境与社会支持网络重构——基于苏北皖北4县32村的混合研究',
    university: '南京农业大学（人文与社会发展学院）',
    award: '第十九届挑战杯 全国二等奖',
    year: '2025',
    track: '大挑赛道',
    direction: '社会建设',
    scale: '苏北皖北4县32村，问卷1680份，深度访谈96位老人',
    method: '混合研究（定量问卷+定性访谈+社会网络分析）',
    highlight: '"留守老人×数字鸿沟"——两个热点交叉出新意',
    result: '构建农村留守老人数字融入的社区支持模型',
    lessons: [
      '热点交叉法——留守老人（旧热点）×数字鸿沟（新热点）=新意',
      '混合研究方法——定量定性结合是获奖标配',
      '社会网络分析——引入专业方法提升学术性',
      '1680份问卷+96位访谈→数据量能达到答辩要求',
    ],
    tags: ['热点交叉', '混合研究', '数字鸿沟', '二等奖'],
  },
]

const directions = ['全部', '经济建设', '政治建设', '文化建设', '社会建设', '生态文明']
const awards = ['全部', '特等奖', '一等奖', '二等奖', '三等奖']

export default function CaseStudiesPage() {
  const [filterDir, setFilterDir] = useState('全部')
  const [filterAward, setFilterAward] = useState('全部')
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState<CaseStudy | null>(null)

  const filtered = cases.filter((c) => {
    if (filterDir !== '全部' && c.direction !== filterDir) return false
    if (filterAward !== '全部' && c.award.includes(filterAward) === false) return false
    if (searchTerm && !c.title.includes(searchTerm) && !c.university.includes(searchTerm) && !c.tags.some((t) => t.includes(searchTerm))) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold">获奖案例库</h2>
            <p className="text-sm text-muted-foreground">参考挑战杯国赛真实获奖作品，了解"好作品"长什么样</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 flex-1 min-w-[200px] max-w-xs">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="搜索案例..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          {/* Direction filter */}
          <div className="flex flex-wrap gap-1.5">
            {directions.map((d) => (
              <button
                key={d}
                onClick={() => setFilterDir(d)}
                className={`rounded-full px-3 py-1 text-xs transition-all ${
                  filterDir === d ? 'bg-primary text-primary-foreground font-medium' : 'bg-muted hover:bg-accent'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          {/* Award filter */}
          <div className="flex flex-wrap gap-1.5">
            {awards.map((a) => (
              <button
                key={a}
                onClick={() => setFilterAward(a)}
                className={`rounded-full px-3 py-1 text-xs transition-all ${
                  filterAward === a ? 'bg-amber-100 text-amber-800 font-medium border border-amber-300' : 'bg-muted hover:bg-accent'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case cards grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(selected?.id === c.id ? null : c)}
            className={`text-left rounded-xl border shadow-sm transition-all hover:shadow-md ${
              selected?.id === c.id ? 'border-primary ring-2 ring-primary/20' : 'bg-card hover:border-primary/30'
            }`}
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  c.award.includes('特等奖') ? 'bg-amber-100 text-amber-800' :
                  c.award.includes('一等奖') ? 'bg-blue-100 text-blue-800' :
                  c.award.includes('二等奖') ? 'bg-gray-100 text-gray-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  <Award className="h-3 w-3" />
                  {c.award.replace('第十九届挑战杯 ', '').replace('第十八届挑战杯 ', '')}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {c.direction}
                </div>
              </div>

              <h3 className="font-semibold text-sm leading-snug mb-2">{c.title}</h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {c.university}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {c.scale}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs">{t}</span>
                ))}
              </div>

              {/* Expanded detail */}
              {selected?.id === c.id && (
                <div className="mt-4 space-y-3 border-t pt-4">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">🏆 亮点</h4>
                    <p className="text-sm">{c.highlight}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">📐 研究方法</h4>
                    <p className="text-sm">{c.method}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">📊 成果落地</h4>
                    <p className="text-sm">{c.result}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      可借鉴经验
                    </h4>
                    <ul className="space-y-1">
                      {c.lessons.map((l, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <ArrowUpRight className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-10 w-10 mx-auto mb-2 opacity-30" />
          <p>没有匹配的案例，试试换一个筛选条件</p>
        </div>
      )}

      {/* Key takeaways */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          获奖作品共同规律
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: '🌍', title: '大规模样本', desc: '特等奖普遍覆盖6-11省，问卷2000+份。不是走马观花，是真正的"田野"。' },
            { icon: '⏳', title: '长时段追踪', desc: '连续3年追踪、驻村超3个月、18个月跟踪——深度比广度更能打动评委。' },
            { icon: '🏛️', title: '紧扣国家战略', desc: '乡村振兴、生态保护、基层治理——选题要对标国家战略，评委才有共鸣。' },
            { icon: '🔬', title: '理论驱动', desc: '演化博弈、五维分析、口述史——引入学术理论框架，提升作品学术含量。' },
            { icon: '📐', title: '落地实效', desc: '完成改造项目、政策被采纳、带动增收——评委最爱"做出了真东西"。' },
            { icon: '✍️', title: '标题即竞争力', desc: '用典、诗意、对仗、设问——90%的评委是"标题党"，好标题先赢一半。' },
          ].map((item) => (
            <div key={item.title} className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
