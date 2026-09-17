import type { SleepStage } from '../data/sleepData'
import { stageColor, type StageType } from '../theme'

interface Props {
  stages: SleepStage[]
  totalMin: number
  width: number
  height?: number
}

const ORDER: StageType[] = ['awake', 'rem', 'light', 'deep'] // 自上而下：清醒->REM->浅->深
const PAD_TOP = 8
const PAD_BOTTOM = 8

// 睡眠分期图（阶梯状 Hypnogram），用 SVG 表达睡眠深度随时间的阶梯变化
export function Hypnogram({ stages, totalMin, width, height = 150 }: Props) {
  const usableH = height - PAD_TOP - PAD_BOTTOM
  const rowStep = usableH / (ORDER.length - 1)
  const yOf = (s: StageType) => PAD_TOP + ORDER.indexOf(s) * rowStep
  const xOf = (min: number) => (min / totalMin) * width
  const midY = (a: StageType, b: StageType) => (yOf(a) + yOf(b)) / 2

  const pts: { x: number; y: number }[] = []
  pts.push({ x: 0, y: yOf(stages[0].stage) })
  let cursor = 0
  stages.forEach((s, i) => {
    const x0 = xOf(cursor)
    const x1 = xOf(cursor + s.duration)
    const y = yOf(s.stage)
    pts.push({ x: x0, y })
    pts.push({ x: x1, y })
    const next = stages[i + 1]
    if (next) pts.push({ x: x1, y: midY(s.stage, next.stage) })
    cursor += s.duration
  })

  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const segs = stages.map(s => ({
    x: xOf(s.start),
    w: xOf(s.start + s.duration) - xOf(s.start),
    color: stageColor[s.stage],
  }))

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {segs.map((s, i) => (
        <rect key={i} x={s.x} y={PAD_TOP} width={Math.max(s.w - 1, 0)} height={height - PAD_TOP - PAD_BOTTOM} fill={s.color} opacity={0.16} rx={3} />
      ))}
      <path d={path} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {pts.filter((_, i) => i % 3 === 0).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.2} fill="#fff" />
      ))}
    </svg>
  )
}
