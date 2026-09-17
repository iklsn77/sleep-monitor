import { useRef } from 'react'

interface Handlers {
  onSwipeLeft?: () => void // 向左滑 -> 下一天
  onSwipeRight?: () => void // 向右滑 -> 上一天
  onSwipeDown?: () => void
}

// 轻量手势识别：阈值 + 方向判定，避免误触
export function useSwipe({ onSwipeLeft, onSwipeRight, onSwipeDown }: Handlers) {
  const start = useRef<{ x: number; y: number; t: number } | null>(null)
  const THRESHOLD = 45

  return {
    onTouchStart: (e: React.TouchEvent | React.PointerEvent) => {
      const p = 'touches' in e ? e.touches[0] : e
      start.current = { x: p.clientX, y: p.clientY, t: Date.now() }
    },
    onTouchEnd: (e: React.TouchEvent | React.PointerEvent) => {
      if (!start.current) return
      const p = 'changedTouches' in e ? e.changedTouches[0] : e
      const dx = p.clientX - start.current.x
      const dy = p.clientY - start.current.y
      const dt = Date.now() - start.current.t
      start.current = null
      if (dt > 800) return // 长按拖拽不算
      if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD) return
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onSwipeLeft?.()
        else onSwipeRight?.()
      } else if (dy > 0) {
        onSwipeDown?.()
      }
    },
  }
}
