# Page Visual Parse

## Summary
这是一个 B2B SaaS 数据分析后台模板（Nexus Dashboard）。整体为左侧固定导航 + 顶部工具栏 + 主内容卡片网格布局，强调可读性与数据扫描效率。

## Page Type
- 类型: Web Admin Dashboard
- 目标用户: 运营、商业分析、增长团队
- 主任务: 快速查看核心 KPI、趋势图、分布图、集成列表

## Desktop Evidence
- 画布宽度明显大于 1200px，采用三栏信息密度：左导航、右主区、主区内多卡片并列。
- 顶部存在浏览器壳层视觉（地址栏、窗口控件），实际页面主体是单页应用仪表盘。
- 主区第一行有标题 `Dashboard` 与筛选工具（时间范围、周期、Filter、Export）。
- KPI 卡片三列并排：`Page Views`、`Total Revenue`、`Bounce Rate`。
- 第二行为两张大卡：左侧 `Sales Overview`（堆叠柱 + 连线），右侧 `Total Subscriber`（周维度柱图）。
- 第三行左侧 `Sales Distribution`（环形图），右侧 `List of Integration`（表格）。

## Mobile Evidence Or Hypothesis
- 未提供移动端截图，以下为假设。
- 左侧导航在移动端应折叠为抽屉菜单（hamburger 触发）。
- KPI 三卡从 3 列降为 1 列纵向堆叠。
- 双列大卡（Sales Overview / Total Subscriber）降为单列顺序流。
- 表格卡片应启用横向滚动或列裁剪策略，优先保留 `Application` 与 `Profit`。

## Region Breakdown
1. 顶栏区域: 搜索框、快捷图标、用户信息、全局操作。
2. 侧边导航: 分组菜单（General/Tools/Support）+ 当前团队卡片 + 升级按钮。
3. 内容控制区: 页面标题与筛选控制。
4. KPI 概览区: 高层指标与涨跌标签。
5. 图表洞察区: 趋势对比与订阅分布。
6. 明细区: 销售分布与集成表格。

## Visual Signals
- 主色以蓝紫与青绿渐变为核心数据强调色。
- 大面积浅灰背景 + 白色卡片，卡片圆角与细边框（低对比）。
- 字重层次清晰：页面标题 > 指标数字 > 说明文字。
- 状态色语义：绿色表示增长，粉红/红色表示下降。
- 图标为细线风格，降低视觉噪声。

## Interaction Signals
- 菜单项 hover/active 明显，当前项有浅灰底。
- 筛选器、时间范围、导出按钮均为可点击控件。
- 图表与表格区域预期支持 hover tooltip（从信息密度判断）。
- 用户头像区域可进入账户菜单。

## Uncertainties
- 无法从静态图确认真实字体族与具体字号 token。
- 无法确认图表交互是否支持 drill-down。
- 无法确认移动端断点下表格具体降级机制。
- 顶栏某些图标（礼物、通知、加号）的功能语义需产品上下文确认。
