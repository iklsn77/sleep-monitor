# 🌙 SleepMonitor · 智能睡眠监测 App

> 一个面向「智能睡眠监测」场景的移动端交互原型，使用 **React + TypeScript + Vite** 实现。可真实运行、支持手势交互，用于演示睡眠数据的可视化与核心交互流程。

---

## ✨ 项目亮点

- 🎨 **12+ 核心页面**：睡眠总览、睡眠详情、趋势、周报、智能闹钟、鼾声、环境、建议、个人中心、设置、设备、分享、新手引导
- 🤳 **复杂手势交互**：首页/详情页支持左右滑动切换日期、下拉关闭、开关滑动、Tab 切换
- ✨ **微动效**：环形进度动画、底部弹窗上滑、卡片按压回弹、图表进入动画
- 📊 **数据可视化**：睡眠分环形图、睡眠分期 Hypnogram 阶梯图、心率曲线、7 日对比柱状图（纯 SVG 实现，无第三方图表库）
- 🌗 **深色主题设计系统**：集中式设计令牌（颜色 / 间距 / 圆角），统一视觉语言
- ⚡ **工程化**：TypeScript 严格模式、组件化、可复现的 Mock 数据（线性同余随机数种子）

---

## 🧱 技术架构

```
sleep-monitor/
├── index.html            # 入口
├── vite.config.ts        # Vite 配置（静态站点，可部署 GitHub Pages）
├── tsconfig*.json        # TS 严格模式配置
└── src/
    ├── main.tsx          # React 入口
    ├── App.tsx           # 导航栈 + Tab 路由
    ├── theme.ts          # 设计令牌（深色主题 / 分期配色）
    ├── styles/global.css # 全局样式 + 手机外壳
    ├── data/
    │   └── sleepData.ts  # 可复现 Mock 数据（睡眠记录 / 分期 / 心率）
    ├── hooks/
    │   └── useSwipe.ts   # 手势识别 Hook（方向 / 阈值 / 防误触）
    ├── components/        # 复用组件：StatusBar / TabBar / SleepRing / Hypnogram / BottomSheet / icons
    └── screens/          # 12 个页面 + 导航类型定义
        ├── HomeScreen / DetailScreen / TrendScreen / ReportScreen
        ├── AlarmScreen / SnoreScreen / EnvironmentScreen / InsightScreen
        └── ProfileScreen / SettingsScreen / DeviceScreen / ShareScreen / TutorialScreen
```

**交互框架**：基于「导航栈 + Tab」的轻量路由，无需额外路由库；通过 `useSwipe` 统一处理触摸手势。

---

## 🚀 本地运行

```bash
npm install
npm run dev        # 本地开发预览（默认 http://localhost:5173）
npm run build      # 类型检查 + 生产构建（输出 dist/）
npm run preview    # 预览构建产物
```

> 在浏览器开发者工具中切换为移动端视图（推荐 iPhone 14 尺寸 390×844）以获得最佳观感。

---

## 📱 页面清单（12+）

| # | 页面 | 关键交互 / 可视化 |
|---|------|------------------|
| 1 | 睡眠总览 Home | 睡眠分环形图、**左右滑动切换日期**、分期条 |
| 2 | 睡眠详情 Detail | 整夜心率曲线、睡眠结构占比条 |
| 3 | 睡眠趋势 Trend | 7 日睡眠分柱状对比、时长分布 |
| 4 | 睡眠周报 Report | 多维度评分、生成式建议文案 |
| 5 | 智能闹钟 Alarm | 开关滑动、**底部弹窗新增**（微动效） |
| 6 | 鼾声监测 Snore | 声波可视化、改善建议 |
| 7 | 睡眠环境 Environment | 噪音/温度/光照评估卡片 |
| 8 | 睡眠建议 Insight | 个性化洞察列表 |
| 9 | 个人中心 Profile | 连续打卡、统计、入口聚合 |
| 10 | 设置 Settings | 多项开关、列表导航 |
| 11 | 设备管理 Device | 手环连接状态、电量 |
| 12 | 分享周报 Share | 可分享睡眠卡片 |
| 13 | 新手引导 Tutorial | 滑动引导、**圆点指示器** + 进入动效 |

---

## 🔧 迭代记录

> 自首个版本以来，陆续修复与优化的问题节选如下：

- [x] 修复入睡/起床时间跨午夜显示错误（>24h 格式化）
- [x] 优化手势切换阈值，避免滚动列表时误触发日期切换
- [x] 修复 Hypnogram 阶段切换时折线「跳变」的视觉断层
- [x] 底部弹窗增加遮罩点击关闭，降低操作门槛
- [x] 睡眠分环形图增加数值过渡动画，避免突兀跳变
- [x] 修复深色背景下低对比度文字（统一语义化颜色）
- [x] 增加 Tab 切换时页面重挂载，避免状态串台
- [x] 优化卡片按压回弹反馈（active 缩放）
- [x] 修复窄屏下分期图溢出裁切
- [x] 闹钟开关增加滑动惯性，贴合原生手感
- [x] 新手引导支持「跳过」与「下一步」状态管理
- [x] 统一圆角 / 间距规范，消除视觉不一致

---

## 🗺️ 路线图

- [ ] 接入真实健康数据 SDK（Apple Health / 设备蓝牙）
- [ ] 增加 WebView 与 Native 通信桥接示例
- [ ] 支持主题换肤（浅色 / 护眼）
- [ ] 补充单元测试（Vitest）与组件文档

---

## 📄 License

MIT © 2025

---

## 🌐 线上 Demo

> 部署至 GitHub Pages 后，可在此访问在线演示（将 `<username>` 替换为你的 GitHub 用户名）：
>
> https://<username>.github.io/sleep-monitor/
>
> 仓库截图：
> ![preview](docs/preview.png)

> 本项目为个人发起的睡眠监测交互原型，数据均为本地可复现的 Mock 数据，不含任何真实用户隐私信息。
