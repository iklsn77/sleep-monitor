import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/icons'
import type { NavApi } from './types'

export function SettingsScreen({ nav }: { nav: NavApi }) {
  const [push, setPush] = useState(true)
  const [smart, setSmart] = useState(true)
  const Toggle = ({ on, set }: { on: boolean; set: (v: boolean) => void }) => (
    <div onClick={() => set(!on)} style={{ width: 46, height: 28, borderRadius: 999, background: on ? '#7C6CF0' : 'rgba(255,255,255,0.12)', position: 'relative', transition: 'background .2s', flex: '0 0 auto' }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
    </div>
  )
  return (
    <div className="screen fade-enter">
      <StatusBar time="20:40" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">设置</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        <div className="card" style={{ margin: '8px 16px' }}>
          <Row k="推送通知" comp={<Toggle on={push} set={setPush} />} />
          <Row k="智能唤醒" comp={<Toggle on={smart} set={setSmart} />} />
          <Row k="健康数据同步" v="Apple 健康 ›" last />
        </div>
        <div className="card" style={{ margin: '12px 16px' }}>
          <Row k="单位制" v="公制 ›" />
          <Row k="语言" v="简体中文 ›" />
          <Row k="关于" v="v1.0.0 ›" last />
        </div>
        <div className="card center pressable" style={{ margin: '14px 16px', color: '#FF7A85', fontWeight: 600 }}>退出登录</div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
function Row({ k, v, comp, last }: { k: string; v?: string; comp?: React.ReactNode; last?: boolean }) {
  return (
    <div className="row between" style={{ padding: '14px 4px', borderBottom: last ? 'none' : '1px solid var(--border)' }}>
      <span className="medium">{k}</span>
      {comp ?? <span className="dim medium">{v}</span>}
    </div>
  )
}
