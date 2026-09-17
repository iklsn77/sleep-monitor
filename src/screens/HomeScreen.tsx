import { useState, useMemo } from 'react'
import { StatusBar } from '../components/StatusBar'
import { SleepRing } from '../components/SleepRing'
import { Hypnogram } from '../components/Hypnogram'
import { IconBell, IconChevron, IconHeart } from '../components/icons'
import { genWeekData, stagePcts, fmtDuration, scoreLevel } from '../data/sleepData'
import { useSwipe } from '../hooks/useSwipe'
import type { NavApi } from './types'
import { theme } from '../theme'

export function HomeScreen({ nav }: { nav: NavApi }) {
  const data = useMemo(() => genWeekData(), [])
  const [idx, setIdx] = useState(data.length - 1) // 默认最近一晚
  const rec = data[idx]
  const swipe = useSwipe({
    onSwipeLeft: () => setIdx(i => Math.min(data.length - 1, i + 1)),
    onSwipeRight: () => setIdx(i => Math.max(0, i - 1)),
  })
  const lvl = scoreLevel(rec.score)
  const pcts = stagePcts(rec)

  return (
    <div className="screen fade-enter">
      <StatusBar time="07:42" />
      <div className="screen-scroll" {...swipe}>
        <div className="row between" style={{ padding: '6px 22px 4px' }}>
          <div>
            <div className="faint small">睡眠总览</div>
            <div className="large">早安，昨晚睡得不错</div>
          </div>
          <div className="chip pressable" onClick={() => nav.push('alarm')}>
            <IconBell size={16} /> 闹钟
          </div>
        </div>

        <div className="card" style={{ margin: '8px 16px 0' }}>
          <div className="row" style={{ gap: 18 }}>
            <SleepRing score={rec.score} size={132} />
            <div className="col gap8" style={{ flex: 1 }}>
              <span className={`tag ${lvl.tag}`}>{lvl.label} · 睡眠分 {rec.score}</span>
              <div className="row gap8 medium"><span className="dim">睡眠时长</span><b>{fmtDuration(rec.totalSleep)}</b></div>
              <div className="row gap8 medium"><span className="dim">入睡</span><b>{rec.sleepOnset}</b><span className="dim">起床</span><b>{rec.wakeTime}</b></div>
              <div className="row gap8 medium"><IconHeart size={13} style={{ color: theme.danger }} /><span className="dim">平均心率</span><b>{rec.avgHR} bpm</b></div>
            </div>
          </div>
        </div>

        {/* 日期切换条（左右滑动切换） */}
        <div className="row between" style={{ padding: '16px 22px 6px' }}>
          <span className="faint small">← 左右滑动切换日期 →</span>
          <span className="small dim">{rec.date} · {rec.weekday}</span>
        </div>

        {/* 睡眠分期条 */}
        <div className="card" style={{ margin: '0 16px' }}>
          <div className="row between" style={{ marginBottom: 10 }}>
            <span className="medium">睡眠分期</span>
            <span className="small dim">效率 {rec.efficiency}%</span>
          </div>
          <Hypnogram stages={rec.stages} totalMin={rec.totalSleep} width={330} height={150} />
          <div className="row gap12" style={{ marginTop: 8, flexWrap: 'wrap' }}>
            {pcts.map(p => (
              <div key={p.stage} className="row gap8 small">
                <span style={{ width: 9, height: 9, borderRadius: 3, background: theme.stage[p.stage], display: 'inline-block' }} />
                <span className="dim">{labelOf(p.stage)}</span>
                <b>{Math.round(p.pct)}%</b>
              </div>
            ))}
          </div>
        </div>

        {/* 快捷入口 */}
        <div className="row gap12" style={{ padding: '16px 16px 24px' }}>
          <Quick to="snore" nav={nav} title="鼾声" sub="12 次" />
          <Quick to="environment" nav={nav} title="环境" sub={`${rec.env.temp}°C`} />
          <Quick to="insight" nav={nav} title="建议" sub="查看" />
        </div>
      </div>
    </div>
  )
}

function Quick({ to, nav, title, sub }: { to: any; nav: NavApi; title: string; sub: string }) {
  return (
    <div className="card pressable col gap8" style={{ flex: 1, padding: 14 }} onClick={() => nav.push(to)}>
      <span className="medium">{title}</span>
      <span className="dim small">{sub}</span>
      <IconChevron size={14} style={{ color: theme.textFaint, alignSelf: 'flex-end' }} />
    </div>
  )
}

function labelOf(s: string) {
  return s === 'awake' ? '清醒' : s === 'rem' ? 'REM' : s === 'light' ? '浅睡' : '深睡'
}
