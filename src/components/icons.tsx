import type { CSSProperties } from 'react'

interface IconProps {
  size?: number
  className?: string
  style?: CSSProperties
}

const base = (size: number): CSSProperties => ({ width: size, height: size, display: 'block' })

export const IconHome = ({ size = 22, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ ...base(size), ...style }}>
    <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" />
  </svg>
)
export const IconMoon = ({ size = 22, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ ...base(size), ...style }}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z" />
  </svg>
)
export const IconTrend = ({ size = 22, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ ...base(size), ...style }}>
    <path d="M3 17l5-5 4 3 6-7" /><path d="M16 8h4v4" />
  </svg>
)
export const IconUser = ({ size = 22, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ ...base(size), ...style }}>
    <circle cx={12} cy={8} r={4} /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
)
export const IconBack = ({ size = 22, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ ...base(size), ...style }}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
)
export const IconChevron = ({ size = 18, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ ...base(size), ...style }}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)
export const IconBell = ({ size = 18, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ ...base(size), ...style }}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
)
export const IconHeart = ({ size = 14, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ ...base(size), ...style }}>
    <path d="M12 21s-7-4.6-9.3-9C1 8.5 2.7 5 6.2 5 8.5 5 10 6.6 12 9c2-2.4 3.5-4 5.8-4 3.5 0 5.2 3.5 3.5 7C19 16.4 12 21 12 21Z" />
  </svg>
)
export const IconWave = ({ size = 14, style }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" style={{ ...base(size), ...style }}>
    <path d="M3 12c2 0 2-6 4-6s2 12 4 12 2-9 4-9 2 3 4 3" />
  </svg>
)
