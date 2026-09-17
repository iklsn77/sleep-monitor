import { type ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

// 底部弹窗（微动效：遮罩淡入 + 面板从下往上滑入）
export function BottomSheet({ open, onClose, children, title }: Props) {
  if (!open) return null
  return (
    <div className="sheet-mask" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-grip" />
        {title && <div className="large" style={{ marginBottom: 14 }}>{title}</div>}
        {children}
      </div>
    </div>
  )
}
