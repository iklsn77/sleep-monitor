import { useMemo } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconBack, IconHeart } from '../components/icons'
import { genWeekData, stagePcts, fmtDuration, scoreLevel } from '../data/sleepData'
import type { NavApi } from './types'
import { theme } from '../theme'

// 心率曲线（SVG 折线图）
function HrChart({ series, width }: { series: number[]; width: number }) {
  const h = 120
  const min = Math.min(...series) - 2
  const max = Math.max(...series) + 2
  const x = (i: number) => (i / (series.length - 1)) * width
  const y = (v: number) => h - ((v - min) / (max - min)) * h
  const path = series.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${path} L ${width} ${h} L 0 ${h} Z`
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="hrg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.danger} stopOpacity={0.35} />
          <stop offset="100%" stopColor={theme.danger} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#hrg)" />
      <path d={path} fill="none" stroke={theme.danger} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export function DetailScreen({ nav, date }: { nav: NavApi; date?: string }) {
  const data = useMemo(() => genWeekData(), [])
  const rec = data.find(d => d.date === date) ?? data[data.length - 1]
  const lvl = scoreLevel(rec.score)
  const pcts = stagePcts(rec)

  return (
    <div className="screen fade-enter">
      <StatusBar time="07:42" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">睡眠详情</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        <div className="row center" style={{ flexDirection: 'column', gap: 4, padding: '6px 0 12px' }}>
          <span className={`tag ${lvl.tag}`}>{lvl.label}</span>
          <div className="large" style={{ fontSize: 30 }}>{rec.score}<span className="faint" style={{ fontSize: 14 }}> 分</span></div>
          <span className="faint small">{rec.date} · {rec.weekday}</span>
        </div>

        <div className="card" style={{ margin: '0 16px 12px' }}>
          <div className="row between medium" style={{ marginBottom: 8 }}><span className="dim">整夜心率</span><span className="row gap8"><IconHeart size={13} style={{ color: theme.danger }} />{rec.avgHR} bpm</span></div>
          <HrChart series={rec.hrSeries} width={330} />
          <div className="row between faint small" style={{ marginTop: 4 }}><span>入睡</span><span>凌晨</span><span>起床</span></div>
        </div>

        <div className="card" style={{ margin: '0 16px 12px' }}>
          <div className="medium" style={{ marginBottom: 8 }}>睡眠结构</div>
          {pcts.map(p => (
            <div key={p.stage} className="col" style={{ marginBottom: 8 }}>
              <div className="row between small"><span className="dim">{labelOf(p.stage)}</span><span>{Math.round(p.mins)} 分 · {Math.round(p.pct)}%</span></div>
              <div style={{ height: 8, borderRadius: 6, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ width: `${p.pct}%`, height: '100%', background: theme.stage[p.stage], borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ margin: '0 16px 24px' }}>
          <div className="row between medium" style={{ marginBottom: 8 }}><span className="dim">关键指标</span></div>
          <Metric k="睡眠时长" v={fmtDuration(rec.totalSleep)} />
          <Metric k="入睡潜伏期" v={`${rec.sleepLatency} 分`} />
          <Metric k="睡眠效率" v={`${rec.efficiency}%`} />
          <Metric k="最低心率" v={`${rec.lowHR} bpm`} />
          <Metric k="鼾声次数" v={`${rec.snoreCount} 次`} last />
        </div>
      </div>
    </div>
  )
}

function Metric({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div className={`row between medium ${last ? '' : ''}`} style={{ padding: '9px 0', borderBottom: last ? 'none' : '1px solid var(--border)' }}>
      <span className="dim">{k}</span><b>{v}</b>
    </div>
  )
}
function labelOf(s: string) {
  return s === 'awake' ? '清醒' : s === 'rem' ? 'REM' : s === 'light' ? '浅睡' : '深睡'
}
