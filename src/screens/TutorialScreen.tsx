import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import type { NavApi } from './types'
import { theme } from '../theme'

const SLIDES = [
  { icon: '🌙', title: '了解你的每一晚', body: '自动记录入睡、醒来与睡眠分期，生成专属睡眠分。' },
  { icon: '💓', title: '整夜心率与鼾声', body: '持续监测心率变化与打鼾情况，洞察潜在睡眠风险。' },
  { icon: '⏰', title: '智能唤醒', body: '在浅睡阶段轻柔叫醒，告别起床气，开启清醒一天。' },
]

// 新手引导：左右滑动切换 + 圆点指示器 + 进入按钮
export function TutorialScreen({ nav }: { nav: NavApi }) {
  const [step, setStep] = useState(0)
  const last = step === SLIDES.length - 1
  return (
    <div className="screen fade-enter" style={{ background: 'radial-gradient(120% 80% at 50% 0%, #1A1F33 0%, #0B0E14 60%)' }}>
      <StatusBar time="22:00" />
      <div className="screen-scroll" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>{SLIDES[step].icon}</div>
        <div className="large" style={{ fontSize: 26 }}>{SLIDES[step].title}</div>
        <p className="dim medium" style={{ lineHeight: 1.7, marginTop: 12, maxWidth: 280 }}>{SLIDES[step].body}</p>

        <div className="row gap8" style={{ margin: '40px 0' }}>
          {SLIDES.map((_, i) => (
            <div key={i} style={{ width: i === step ? 22 : 8, height: 8, borderRadius: 4, background: i === step ? theme.primary : 'rgba(255,255,255,0.2)', transition: 'all .25s' }} />
          ))}
        </div>

        <div className="row gap12">
          {!last && <div className="card pressable" style={{ padding: '12px 22px', borderColor: 'var(--border-strong)' }} onClick={() => setStep(0)}>跳过</div>}
          <div
            className="card pressable center"
            style={{ padding: '12px 28px', background: theme.primary, color: '#fff', borderColor: 'transparent', fontWeight: 600 }}
            onClick={() => (last ? nav.replace('home') : setStep(s => s + 1))}
          >
            {last ? '开始使用' : '下一步'}
          </div>
        </div>
      </div>
    </div>
  )
}
