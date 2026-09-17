import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/icons'
import type { NavApi } from './types'
import { theme } from '../theme'

export function DeviceScreen({ nav }: { nav: NavApi }) {
  const [connected, setConnected] = useState(true)
  const battery = 86
  return (
    <div className="screen fade-enter">
      <StatusBar time="20:45" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">设备管理</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        <div className="card" style={{ margin: '8px 16px' }}>
          <div className="row between">
            <div className="row gap12">
              <div style={{ width: 44, height: 44, borderRadius: 12, background: theme.surfaceHi, display: 'grid', placeItems: 'center', fontSize: 22 }}>⌚</div>
              <div className="col gap4">
                <span className="medium">SleepBand 手环</span>
                <span className="dim small">{connected ? '已连接' : '未连接'}</span>
              </div>
            </div>
            <span className={`tag ${connected ? 'good' : 'danger'}`}>{connected ? '在线' : '离线'}</span>
          </div>
          <div className="row between" style={{ marginTop: 14 }}>
            <span className="faint small">电量</span>
            <div className="row gap8" style={{ flex: 1, justifyContent: 'flex-end' }}>
              <div style={{ width: 120, height: 8, borderRadius: 6, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{ width: `${battery}%`, height: '100%', background: theme.good, borderRadius: 6 }} />
              </div>
              <b className="small">{battery}%</b>
            </div>
          </div>
        </div>

        <div className="card" style={{ margin: '12px 16px' }}>
          <Row k="固件版本" v="2.3.1" />
          <Row k="佩戴位置" v="非惯用手腕 ›" />
          <Row k="监测精度" v="标准 ›" last />
        </div>

        <div className="card center pressable" style={{ margin: '14px 16px', color: theme.textDim, fontWeight: 600 }} onClick={() => setConnected(c => !c)}>
          {connected ? '断开连接' : '重新连接'}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
function Row({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return <div className="row between" style={{ padding: '13px 4px', borderBottom: last ? 'none' : '1px solid var(--border)' }}><span className="medium">{k}</span><span className="dim medium">{v}</span></div>
}
