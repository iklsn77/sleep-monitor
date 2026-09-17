import { theme } from '../theme'

interface Props {
  score: number
  size?: number
  stroke?: number
  label?: string
}

// 睡眠分环形图（SVG 渐变描边 + 动画）
export function SleepRing({ score, size = 150, stroke = 12, label = '睡眠分' }: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, score)) / 100
  const dash = c * pct
  const color = score >= 70 ? theme.good : score >= 60 ? theme.warn : theme.danger
  const gid = `ring-${label}-${score}`
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.primary} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={`url(#${gid})`} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dasharray 1s cubic-bezier(.22,1,.36,1)' }}
      />
      <text x="50%" y="46%" textAnchor="middle" fill={theme.text} fontSize={size * 0.26} fontWeight={700}>
        {score}
      </text>
      <text x="50%" y="62%" textAnchor="middle" fill={theme.textDim} fontSize={size * 0.085}>
        {label}
      </text>
    </svg>
  )
}
