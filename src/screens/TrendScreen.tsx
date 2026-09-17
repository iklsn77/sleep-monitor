import { useMemo } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconTrend } from '../components/icons'
import { genWeekData, scoreLevel } from '../data/sleepData'
import type { NavApi } from './types'
import { theme } from '../theme'

// 7 日睡眠分柱状对比
export function TrendScreen({ nav }: { nav: NavApi }) {
  const data = useMemo(() => genWeekData(), [])
  const max = Math.max(...data.map(d => d.score))
  const avg = Math.round(data.reduce((a, d) => a + d.score, 0) / data.length)

  return (
    <div className="screen fade-enter">
      <StatusBar time="10:20" />
      <div className="row gap12" style={{ padding: '8px 16px' }}>
        <IconTrend size={22} style={{ color: theme.primary }} />
        <div className="large">睡眠趋势</div>
      </div>
      <div className="screen-scroll">
        <div className="card" style={{ margin: '8px 16px' }}>
          <div className="row between medium"><span className="dim">近 7 日平均睡眠分</span><b style={{ fontSize: 22 }}>{avg}</b></div>
          <div className="row" style={{ alignItems: 'flex-end', gap: 8, height: 150, marginTop: 14, padding: '0 4px' }}>
            {data.map((d, i) => {
              const h = 24 + (d.score / max) * 100
              const sel = i === data.length - 1
              return (
                <div key={d.date} className="col center" style={{ flex: 1, gap: 6, cursor: 'pointer' }} onClick={() => nav.push('detail', { date: d.date })}>
                  <div style={{ height: 110, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ width: '100%', height: h, borderRadius: 8, background: sel ? theme.primary : 'rgba(255,255,255,0.1)' }} />
                  </div>
                  <span className="faint small">{d.weekday.slice(1)}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card" style={{ margin: '12px 16px' }}>
          <div className="medium" style={{ marginBottom: 10 }}>睡眠时长分布</div>
          {data.map(d => {
            const h = Math.round(d.totalSleep / 60 * 10) / 10
            return (
              <div key={d.date} className="row between small" style={{ padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="dim">{d.weekday}</span>
                <span>{h} 小时</span>
                <span className={`tag ${scoreLevel(d.score).tag}`}>{d.score}</span>
              </div>
            )
          })}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
