import { useMemo } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/icons'
import { genWeekData, scoreLevel } from '../data/sleepData'
import type { NavApi } from './types'

// 周报：生成式文案 + 雷达式评分
export function ReportScreen({ nav }: { nav: NavApi }) {
  const data = useMemo(() => genWeekData(), [])
  const rec = data[data.length - 1]
  const lvl = scoreLevel(rec.score)
  const dims = [
    { k: '睡眠时长', v: 82 }, { k: '深睡比例', v: 76 }, { k: '入睡速度', v: 88 },
    { k: '睡眠效率', v: rec.efficiency }, { k: '心率平稳', v: 90 }, { k: '规律作息', v: 71 },
  ]

  return (
    <div className="screen fade-enter">
      <StatusBar time="09:10" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">本周睡眠报告</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        <div className="card" style={{ margin: '8px 16px', textAlign: 'center' }}>
          <div className="faint small">综合评价</div>
          <div className="large" style={{ fontSize: 34 }}>{lvl.label}</div>
          <p className="dim medium" style={{ lineHeight: 1.6, margin: '10px 4px' }}>
            本周你的平均睡眠分为 <b style={{ color: 'var(--text)' }}>{Math.round(data.reduce((a, d) => a + d.score, 0) / 7)}</b>，
            入睡速度表现优异，但深睡比例仍有提升空间。建议睡前 1 小时减少屏幕蓝光，并保持固定起床时间。
          </p>
        </div>
        <div className="card" style={{ margin: '12px 16px' }}>
          <div className="medium" style={{ marginBottom: 12 }}>多维度评分</div>
          {dims.map(d => (
            <div key={d.k} className="col" style={{ marginBottom: 10 }}>
              <div className="row between small"><span className="dim">{d.k}</span><b>{d.v}</b></div>
              <div style={{ height: 7, borderRadius: 6, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ width: `${d.v}%`, height: '100%', background: 'linear-gradient(90deg,#7C6CF0,#4ECDC4)', borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
