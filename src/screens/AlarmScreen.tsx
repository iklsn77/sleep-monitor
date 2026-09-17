import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/icons'
import { BottomSheet } from '../components/BottomSheet'
import { theme } from '../theme'
import type { NavApi } from './types'

interface Alarm { id: number; time: string; label: string; days: string; on: boolean; smart: boolean }

const INIT: Alarm[] = [
  { id: 1, time: '07:30', label: '工作日起床', days: '周一至周五', on: true, smart: true },
  { id: 2, time: '09:00', label: '周末', days: '周六周日', on: false, smart: false },
  { id: 3, time: '22:30', label: '睡前提醒', days: '每天', on: true, smart: false },
]

export function AlarmScreen({ nav }: { nav: NavApi }) {
  const [alarms, setAlarms] = useState(INIT)
  const [sheet, setSheet] = useState(false)
  const toggle = (id: number) => setAlarms(a => a.map(x => x.id === id ? { ...x, on: !x.on } : x))

  return (
    <div className="screen fade-enter">
      <StatusBar time="22:10" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">智能闹钟</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        {alarms.map(a => (
          <div key={a.id} className="card" style={{ margin: '10px 16px', opacity: a.on ? 1 : 0.5 }}>
            <div className="row between">
              <div className="col gap8">
                <span className="large" style={{ fontSize: 30, color: a.on ? theme.text : theme.textFaint }}>{a.time}</span>
                <span className="dim small">{a.label} · {a.days}</span>
                {a.smart && <span className="chip primary" style={{ width: 'fit-content', padding: '3px 10px', fontSize: 11 }}>智能唤醒</span>}
              </div>
              <div
                onClick={() => toggle(a.id)}
                style={{ width: 50, height: 30, borderRadius: 999, background: a.on ? theme.primary : 'rgba(255,255,255,0.12)', position: 'relative', transition: 'background .2s', flex: '0 0 auto' }}
              >
                <div style={{ position: 'absolute', top: 3, left: a.on ? 23 : 3, width: 24, height: 24, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
              </div>
            </div>
          </div>
        ))}
        <div className="card pressable center" style={{ margin: '14px 16px', color: theme.primary, fontWeight: 600 }} onClick={() => setSheet(true)}>
          + 新增闹钟
        </div>
        <p className="faint small" style={{ padding: '0 24px', lineHeight: 1.6 }}>
          智能唤醒会在你浅睡阶段（起床时间前 30 分钟内）轻柔叫醒，减少起床气。
        </p>
      </div>

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="新增智能闹钟">
        <div className="col gap12">
          <Row k="时间" v="07:30" />
          <Row k="重复" v="工作日" />
          <Row k="智能唤醒" v="开启" />
          <div className="card pressable center" style={{ background: theme.primary, color: '#fff', fontWeight: 600, borderColor: 'transparent' }}>保存</div>
        </div>
      </BottomSheet>
    </div>
  )
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="row between medium" style={{ padding: '12px 4px', borderBottom: '1px solid var(--border)' }}><span className="dim">{k}</span><b>{v} ›</b></div>
}
