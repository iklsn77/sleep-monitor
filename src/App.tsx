import { useState, useCallback } from 'react'
import { TabBar, type TabKey } from './components/TabBar'
import type { NavApi, ScreenName, NavParams } from './screens/types'

import { HomeScreen } from './screens/HomeScreen'
import { DetailScreen } from './screens/DetailScreen'
import { TrendScreen } from './screens/TrendScreen'
import { ReportScreen } from './screens/ReportScreen'
import { AlarmScreen } from './screens/AlarmScreen'
import { SnoreScreen } from './screens/SnoreScreen'
import { EnvironmentScreen } from './screens/EnvironmentScreen'
import { InsightScreen } from './screens/InsightScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { DeviceScreen } from './screens/DeviceScreen'
import { ShareScreen } from './screens/ShareScreen'
import { TutorialScreen } from './screens/TutorialScreen'

interface Frame { name: ScreenName; params: NavParams }

// 三个主 Tab 各自的初始屏
const TAB_HOME: Record<TabKey, ScreenName> = { home: 'home', trend: 'trend', profile: 'profile' }

function ScreenRenderer({ frame, nav }: { frame: Frame; nav: NavApi }) {
  switch (frame.name) {
    case 'home': return <HomeScreen nav={nav} />
    case 'detail': return <DetailScreen nav={nav} date={frame.params.date as string} />
    case 'trend': return <TrendScreen nav={nav} />
    case 'report': return <ReportScreen nav={nav} />
    case 'alarm': return <AlarmScreen nav={nav} />
    case 'snore': return <SnoreScreen nav={nav} />
    case 'environment': return <EnvironmentScreen nav={nav} />
    case 'insight': return <InsightScreen nav={nav} />
    case 'profile': return <ProfileScreen nav={nav} />
    case 'settings': return <SettingsScreen nav={nav} />
    case 'device': return <DeviceScreen nav={nav} />
    case 'share': return <ShareScreen nav={nav} />
    case 'tutorial': return <TutorialScreen nav={nav} />
    default: return <HomeScreen nav={nav} />
  }
}

export default function App() {
  const [tab, setTab] = useState<TabKey>('home')
  const [stack, setStack] = useState<Frame[]>([{ name: TAB_HOME.home, params: {} }])

  const push = useCallback((name: ScreenName, params: NavParams = {}) => {
    setStack(s => [...s, { name, params }])
  }, [])
  const pop = useCallback(() => setStack(s => (s.length > 1 ? s.slice(0, -1) : s)), [])
  const replace = useCallback((name: ScreenName, params: NavParams = {}) => setStack([{ name, params }]), [])
  const setTabRaw = useCallback((t: TabKey) => {
    setTab(t)
    setStack([{ name: TAB_HOME[t], params: {} }])
  }, [])

  const nav: NavApi = { push, pop, replace, setTab: setTabRaw }
  const current = stack[stack.length - 1]
  const showTab = current.name === 'home' || current.name === 'trend' || current.name === 'profile'

  return (
    <div className="phone">
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div key={`${current.name}-${stack.length}`} style={{ position: 'absolute', inset: 0 }}>
            <ScreenRenderer frame={current} nav={nav} />
          </div>
        </div>
        {showTab && <TabBar active={tab} onChange={setTabRaw} />}
      </div>
    </div>
  )
}
