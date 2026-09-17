import { useMemo } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconChevron } from '../components/icons'
import { genWeekData } from '../data/sleepData'
import type { NavApi } from './types'
import { theme } from '../theme'

export function ProfileScreen({ nav }: { nav: NavApi }) {
  const data = useMemo(() => genWeekData(), [])
  const streak = 23
  const avg = Math.round(data.reduce((a, d) => a + d.score, 0) / data.length)
  return (
    <div className="screen fade-enter">
      <StatusBar time="20:30" />
      <div className="screen-scroll">
        <div className="row gap12" style={{ padding: '14px 20px' }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(135deg,#7C6CF0,#4ECDC4)', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 700 }}>A</div>
          <div className="col gap4">
            <span className="large">Alex</span>
            <span className="faint small">坚持记录 {streak} 天</span>
          </div>
        </div>

        <div className="row gap12" style={{ padding: '6px 16px 14px' }}>
          <Stat label="平均睡眠分" v={String(avg)} />
          <Stat label="连续打卡" v={`${streak}天`} />
          <Stat label="累计记录" v="186晚" />
        </div>

        <div className="card" style={{ margin: '0 16px' }}>
          <MenuItem icon="📊" title="睡眠趋势" onClick={() => nav.setTab('trend')} />
          <MenuItem icon="📝" title="每周报告" onClick={() => nav.push('report')} />
          <MenuItem icon="🔗" title="设备管理" onClick={() => nav.push('device')} />
          <MenuItem icon="⚙️" title="设置" onClick={() => nav.push('settings')} last />
        </div>

        <div className="card" style={{ margin: '12px 16px' }} onClick={() => nav.push('share')}>
          <div className="row between">
            <span className="medium">📤 分享我的睡眠周报</span>
            <IconChevron size={16} style={{ color: theme.textFaint }} />
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
function Stat({ label, v }: { label: string; v: string }) {
  return (
    <div className="card col center gap4" style={{ flex: 1, padding: 14 }}>
      <b style={{ fontSize: 20 }}>{v}</b>
      <span className="faint small">{label}</span>
    </div>
  )
}
function MenuItem({ icon, title, onClick, last }: { icon: string; title: string; onClick: () => void; last?: boolean }) {
  return (
    <div className="row between pressable" style={{ padding: '14px 4px', borderBottom: last ? 'none' : '1px solid var(--border)' }} onClick={onClick}>
      <span className="row gap12 medium"><span>{icon}</span>{title}</span>
      <IconChevron size={16} style={{ color: theme.textFaint }} />
    </div>
  )
}
