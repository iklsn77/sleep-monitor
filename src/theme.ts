// 设计令牌：集中管理颜色，供 SVG / Canvas / 内联样式复用
export const theme = {
  bg: '#0B0E14',
  bgElevated: '#12161F',
  surface: '#161B26',
  surfaceHi: '#1E2433',
  border: 'rgba(255,255,255,0.06)',
  borderStrong: 'rgba(255,255,255,0.12)',
  text: '#EDEFF5',
  textDim: '#9AA3B5',
  textFaint: '#5C6678',
  primary: '#7C6CF0',
  primarySoft: 'rgba(124,108,240,0.16)',
  cyan: '#4ECDC4',
  // 睡眠分期配色（国际通行 Hypnogram 配色体系）
  stage: {
    awake: '#FF7A85',
    rem: '#B07CFF',
    light: '#5B8DEF',
    deep: '#3C4BA8',
  },
  good: '#4ED99B',
  warn: '#FFC26B',
  danger: '#FF7A85',
  shadow: '0 18px 40px -18px rgba(0,0,0,0.7)',
}

export type StageType = 'awake' | 'rem' | 'light' | 'deep'
export const stageColor: Record<StageType, string> = theme.stage
export const stageLabel: Record<StageType, string> = {
  awake: '清醒',
  rem: 'REM',
  light: '浅睡',
  deep: '深睡',
}
