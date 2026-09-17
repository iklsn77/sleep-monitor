import { StatusBar } from '../components/StatusBar'
import { IconBack } from '../components/icons'
import type { NavApi } from './types'
import { theme } from '../theme'

export function ShareScreen({ nav }: { nav: NavApi }) {
  return (
    <div className="screen fade-enter">
      <StatusBar time="20:50" />
      <div className="row between" style={{ padding: '8px 16px' }}>
        <div className="row gap12 pressable" onClick={() => nav.pop()}><IconBack size={22} /></div>
        <div className="large">分享周报</div>
        <div style={{ width: 22 }} />
      </div>
      <div className="screen-scroll">
        <div className="card" style={{ margin: '10px 16px', background: 'linear-gradient(135deg,#1A1F2E,#12161F)' }}>
          <div className="faint small">本周睡眠卡片</div>
          <div className="large" style={{ fontSize: 28, margin: '6px 0' }}>睡眠分 81</div>
          <div className="row gap12" style={{ marginTop: 10 }}>
            <span className="chip" style={{ color: theme.primary }}>深睡 +6%</span>
            <span className="chip" style={{ color: theme.good }}>规律 +9%</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '14px 0' }} />
          <div className="row between faint small"><span>由 SleepMonitor 生成</span><span>扫码体验 →</span></div>
        </div>

        <div className="row gap12" style={{ padding: '6px 16px' }}>
          <div className="card center pressable" style={{ flex: 1 }}><span style={{ fontSize: 22 }}>📱</span><span className="small dim" style={{ marginTop: 4 }}>微信</span></div>
          <div className="card center pressable" style={{ flex: 1 }}><span style={{ fontSize: 22 }}>📸</span><span className="small dim" style={{ marginTop: 4 }}>存图</span></div>
          <div className="card center pressable" style={{ flex: 1 }}><span style={{ fontSize: 22 }}>🔗</span><span className="small dim" style={{ marginTop: 4 }}>复制链接</span></div>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}
