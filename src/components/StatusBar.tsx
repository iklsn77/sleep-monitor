interface Props { time?: string }
// 仿 iOS 状态栏（时间 + 信号/WiFi/电量）
export function StatusBar({ time = '22:30' }: Props) {
  return (
    <div className="statusbar">
      <span>{time}</span>
      <span className="icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 10.5a1.3 1.3 0 0 0 0-2.6" strokeLinecap="round"/><path d="M5.5 8a4.5 4.5 0 0 1 5 0M3 5.5a8 8 0 0 1 10 0" strokeLinecap="round"/><circle cx="8" cy="11.5" r="0.8" fill="currentColor"/></svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="currentColor"><rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor"/><rect x="2" y="2" width="16" height="8" rx="1.5"/><rect x="23" y="3.5" width="2" height="5" rx="1"/></svg>
      </span>
    </div>
  )
}
