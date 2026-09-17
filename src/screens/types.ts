import type { TabKey } from '../components/TabBar'

export type ScreenName =
  | 'home' | 'detail' | 'trend' | 'report' | 'alarm'
  | 'snore' | 'environment' | 'insight' | 'profile'
  | 'settings' | 'device' | 'share' | 'tutorial'

export interface NavParams {
  date?: string
  tab?: TabKey
  [k: string]: unknown
}

export interface NavApi {
  push: (name: ScreenName, params?: NavParams) => void
  pop: () => void
  replace: (name: ScreenName, params?: NavParams) => void
  setTab: (tab: TabKey) => void
}
