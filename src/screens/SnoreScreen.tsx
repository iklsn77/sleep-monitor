import { useMemo } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/icons'
import { genWeekData } from '../data/sleepData'
import type { NavApi } from './types'
import { theme } from '../theme'

// 声波可视化（伪频谱条）
function Wave({ seed }: { seed: number }) {
  const bars = Array.from({ length: 40 }, (_, i) => 10 + Math.abs(Math.sin(i * 0.7 + seed)) * 40 * (0.5 + (Math.sin(i) + 1) / 2))
  return (
    <div className="row center" style={{ gap: 2, height: 80, alignItems: 'center', overflow: 'hidden' }}>
      {bars.map((h, i) => <div key={i} style={{ width: 3, height: h, background: theme.cyan, borderRadius: 2, opacity: 0.8 }} />)}
    </div>
  )
}

export function SnoreScreen({ nav }: { nav: NavApi }) {
  const data = useMemo(() => genWeekData(), [])
  const rec = data[data.length - 1]
  return (
    <div className="screen fade-enter">
      <StatusBar time="07:50" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">鼾声监测</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        <div className="card" style={{ margin: '8px 16px', textAlign: 'center' }}>
          <div className="faint small">昨夜鼾声</div>
          <div className="large" style={{ fontSize: 34 }}>{rec.snoreCount}<span className="faint small"> 次</span></div>
          <div className="small dim" style={{ marginTop: 4 }}>最长单次 18 秒 · 占总睡眠 4%</div>
        </div>
        <div className="card" style={{ margin: '12px 16px' }}>
          <div className="medium" style={{ marginBottom: 6 }}>鼾声音频片段</div>
          <Wave seed={3.1} />
          <div className="row between faint small"><span>入睡后 2:14</span><span>0:18</span></div>
        </div>
        <div className="card" style={{ margin: '12px 16px' }}>
          <div className="medium" style={{ marginBottom: 8 }}>改善建议</div>
          <p className="dim medium" style={{ lineHeight: 1.7, margin: 0 }}>
            侧卧睡眠可降低软腭塌陷概率，减少打鼾。如长期严重打鼾并伴日间嗜睡，建议进行睡眠呼吸暂停（OSA）筛查。
          </p>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
