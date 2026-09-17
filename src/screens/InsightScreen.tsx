import { StatusBar } from '../components/StatusBar'
import { IconBack, IconChevron } from '../components/icons'
import type { NavApi } from './types'
import { theme } from '../theme'

const INSIGHTS = [
  { id: 1, title: '你的深睡集中在前半夜', body: '数据显示深睡多发生在 23:00-01:00，建议 23 点前入睡以最大化深睡收益。', tag: 'good' as const },
  { id: 2, title: '周末补觉打乱节律', body: '周六平均晚起 2.5 小时，导致周日入睡困难。建议起床时间波动控制在 1 小时内。', tag: 'warn' as const },
  { id: 3, title: '咖啡因代谢窗口', body: '昨日下午的咖啡可能延迟了你的入睡。敏感人群建议 14:00 后避免咖啡因。', tag: 'warn' as const },
  { id: 4, title: '规律作息评分上升', body: '过去 7 天你的作息规律性提升 9%，继续保持！', tag: 'good' as const },
]

export function InsightScreen({ nav }: { nav: NavApi }) {
  return (
    <div className="screen fade-enter">
      <StatusBar time="08:05" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">睡眠建议</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        {INSIGHTS.map(ins => (
          <div key={ins.id} className="card pressable" style={{ margin: '10px 16px' }} onClick={() => {}}>
            <div className="row between" style={{ marginBottom: 6 }}>
              <span className={`tag ${ins.tag}`}>{ins.tag === 'good' ? '已达标' : '待改善'}</span>
              <IconChevron size={14} style={{ color: theme.textFaint }} />
            </div>
            <div className="medium" style={{ marginBottom: 4 }}>{ins.title}</div>
            <p className="dim small" style={{ lineHeight: 1.6, margin: 0 }}>{ins.body}</p>
          </div>
        ))}
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
