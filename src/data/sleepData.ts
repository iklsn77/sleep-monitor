import type { StageType } from '../theme'

export interface SleepStage {
  stage: StageType
  start: number // 分钟（相对入睡时间）
  duration: number // 分钟
}
export interface SleepRecord {
  date: string // YYYY-MM-DD
  weekday: string
  bedTime: string // 上床
  sleepOnset: string // 入睡
  wakeTime: string // 起床
  sleepLatency: number // 入睡潜伏期(分)
  totalSleep: number // 总睡眠(分)
  efficiency: number // 睡眠效率(%)
  score: number // 睡眠分 0-100
  avgHR: number
  lowHR: number
  snoreCount: number
  stages: SleepStage[]
  // 单晚心率序列（每 5 分钟采样，用于曲线）
  hrSeries: number[]
  // 环境：噪音 / 温度 / 光照
  env: { noise: number; temp: number; light: number }
}

// 可复现的伪随机（线性同余），保证每次构建数据一致
function makeRng(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

// 生成一晚的睡眠分期（W->N1/N2(浅)->N3(深)->REM 循环）
function genStages(rng: () => number, total: number): SleepStage[] {
  const stages: SleepStage[] = []
  let cursor = 0
  // 入睡后先一段浅睡，逐渐加深，再循环
  const pattern: StageType[] = ['light', 'light', 'deep', 'deep', 'rem', 'light', 'deep', 'rem', 'light', 'deep', 'rem', 'light', 'awake', 'light', 'rem']
  let i = 0
  while (cursor < total - 10) {
    const type = pattern[i % pattern.length]
    // 各阶段时长
    let dur =
      type === 'deep' ? 40 + Math.floor(rng() * 35) :
      type === 'rem' ? 12 + Math.floor(rng() * 20) :
      type === 'awake' ? 4 + Math.floor(rng() * 10) :
      20 + Math.floor(rng() * 35)
    dur = Math.min(dur, total - cursor)
    stages.push({ stage: type, start: cursor, duration: dur })
    cursor += dur
    i++
  }
  return stages
}

function scoreOf(efficiency: number, deepPct: number, awakeCount: number): number {
  let s = Math.round(efficiency * 0.5 + deepPct * 1.6 + 30)
  s -= awakeCount * 2
  return Math.max(45, Math.min(99, s))
}

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function genWeekData(): SleepRecord[] {
  const rng = makeRng(20250901)
  const records: SleepRecord[] = []
  // 以 2025-09-15 周一为最近一晚
  const base = new Date('2025-09-15T00:00:00')
  for (let d = 0; d < 7; d++) {
    const day = new Date(base)
    day.setDate(base.getDate() - (6 - d))
    const dateStr = day.toISOString().slice(0, 10)
    const weekday = WEEKDAYS[day.getDay()]

    const total = Math.floor(360 + rng() * 170) // 6~8.8h
    const latency = Math.floor(8 + rng() * 28)
    const awakeCount = Math.floor(rng() * 4)
    const efficiency = Math.round(82 + rng() * 15 - awakeCount * 2)
    const stages = genStages(rng, total)
    const deepMin = stages.filter(s => s.stage === 'deep').reduce((a, s) => a + s.duration, 0)
    const deepPct = (deepMin / total) * 100
    const score = scoreOf(efficiency, deepPct, awakeCount)

    // 心率序列：入睡后下降，夜间波动，清晨回升
    const hrSeries: number[] = []
    const avg = Math.round(54 + rng() * 8)
    const steps = Math.ceil(total / 5)
    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const baseline = avg + 6 * (1 - t) + Math.sin(t * Math.PI * 3) * 4
      const noise = (rng() - 0.5) * 6
      hrSeries.push(Math.round(baseline + noise))
    }

    const bedH = 22 + Math.floor(rng() * 2)
    const bedM = Math.floor(rng() * 60)
    const wake = new Date(day)
    wake.setHours(bedH > 20 ? bedH : bedH + 24, bedM + latency)
    const wakeMins = wake.getHours() * 60 + wake.getMinutes()
    const onsetMins = wakeMins - total

    records.push({
      date: dateStr,
      weekday,
      bedTime: fmt(onsetMins - latency),
      sleepOnset: fmt(onsetMins),
      wakeTime: fmt(wakeMins),
      sleepLatency: latency,
      totalSleep: total,
      efficiency,
      score,
      avgHR: avg,
      lowHR: avg - 6,
      snoreCount: Math.floor(rng() * 12),
      stages,
      hrSeries,
      env: {
        noise: Math.round(28 + rng() * 18),
        temp: +(22 + rng() * 3).toFixed(1),
        light: Math.round(2 + rng() * 20),
      },
    })
  }
  return records
}

function fmt(mins: number): string {
  let m = ((mins % 1440) + 1440) % 1440
  const h = Math.floor(m / 60)
  const mm = m % 60
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

export function stagePcts(rec: SleepRecord) {
  const total = rec.totalSleep
  const acc: Record<StageType, number> = { awake: 0, rem: 0, light: 0, deep: 0 }
  rec.stages.forEach(s => (acc[s.stage] += s.duration))
  return (Object.keys(acc) as StageType[]).map(k => ({
    stage: k,
    mins: acc[k],
    pct: (acc[k] / total) * 100,
  }))
}

export function fmtDuration(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}小时${m}分`
}

export function scoreLevel(score: number): { label: string; tag: 'good' | 'warn' | 'danger' } {
  if (score >= 85) return { label: '优秀', tag: 'good' }
  if (score >= 70) return { label: '良好', tag: 'good' }
  if (score >= 60) return { label: '一般', tag: 'warn' }
  return { label: '较差', tag: 'danger' }
}
