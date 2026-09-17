import { IconHome, IconTrend, IconUser } from './icons'

export type TabKey = 'home' | 'trend' | 'profile'

const TABS: { key: TabKey; label: string; Icon: typeof IconHome }[] = [
  { key: 'home', label: '睡眠', Icon: IconHome },
  { key: 'trend', label: '趋势', Icon: IconTrend },
  { key: 'profile', label: '我的', Icon: IconUser },
]

export function TabBar({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) {
  return (
    <div className="tabbar">
      {TABS.map(t => (
        <div key={t.key} className={`tab ${active === t.key ? 'active' : ''}`} onClick={() => onChange(t.key)}>
          <t.Icon size={22} />
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  )
}
