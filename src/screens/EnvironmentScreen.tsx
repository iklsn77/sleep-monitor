import { useMemo } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/icons'
import { genWeekData } from '../data/sleepData'
import type { NavApi } from './types'
import { theme } from '../theme'

export function EnvironmentScreen({ nav }: { nav: NavApi }) {
  const data = useMemo(() => genWeekData(), [])
  const rec = data[data.length - 1]
  const e = rec.env
  const items = [
    { k: '环境噪音', v: `${e.noise} dB`, ok: e.noise < 40, tip: e.noise < 40 ? '安静，利于深睡' : '偏吵，建议佩戴耳塞' },
    { k: '卧室温度', v: `${e.temp} °C`, ok: e.temp >= 18 && e.temp <= 24, tip: e.temp >= 18 && e.temp <= 24 ? '舒适区间' : '建议 18-24°C' },
    { k: '光照强度', v: `${e.light} lux`, ok: e.light < 10, tip: e.light < 10 ? '足够黑暗' : '建议拉遮光窗帘' },
  ]
  return (
    <div className="screen fade-enter">
      <StatusBar time="07:55" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">睡眠环境</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        <div className="card" style={{ margin: '8px 16px' }}>
          {items.map((it, i) => (
            <div key={it.k} className="row between" style={{ padding: '12px 0', borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--border)' }}>
              <div className="col gap8">
                <span className="medium">{it.k}</span>
                <span className="faint small">{it.tip}</span>
              </div>
              <div className="col center" style={{ alignItems: 'flex-end', gap: 4 }}>
                <b style={{ fontSize: 20 }}>{it.v}</b>
                <span className={`tag ${it.ok ? 'good' : 'warn'}`}>{it.ok ? '理想' : '可优化'}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ margin: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: theme.primarySoft, display: 'grid', placeItems: 'center', color: theme.primary }}>🌡️</div>
          <div className="col gap4">
            <span className="medium">温湿度联动</span>
            <span className="faint small">已连接智能空调，入睡后自动调至 22°C</span>
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
