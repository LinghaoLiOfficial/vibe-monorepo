# UIUX Design Language

## UX Intent
- 以“高频扫描 + 低学习成本”为第一目标。
- 通过卡片化布局将复杂数据拆解为可快速消费的信息块。
- 让用户在 5-10 秒内完成核心业务健康度判断。

## Information Architecture Signals
- 全局层: 左侧导航承载主模块切换，顶部承载跨模块工具。
- 页面层: 标题 + 筛选控制定义当前分析上下文。
- 内容层: `KPI -> 趋势图 -> 结构分布 -> 明细表`，符合由概览到细节的阅读路径。
- 功能层: 同类操作聚合（Filter/Sort/Export）减少操作跳跃。

## Interaction Principles
- 默认状态克制，交互状态清晰（hover/active/focus）。
- 优先“就地操作”：每个卡片内部提供独立筛选或周期切换。
- 关键数值使用视觉锚点（字号、色块、涨跌标签）提高可发现性。
- 风险信息（下跌）与正向信息（增长）采用明确语义色区分。

## Responsive Intent (Desktop + Mobile)
- Desktop Evidence: 保持双列与多列并排，优先密度和对比浏览。
- Mobile Hypothesis: 转为单列流，保证触达与可读，减少并排比较。
- 图表在移动端优先保留趋势含义，弱化装饰细节。
- 表格卡片移动端应优先呈现关键列并允许横滑查看次要列。

## Assumptions And Uncertainties
- 假设用户主要在桌面端进行分析操作，移动端以“查看”为主。
- 未见移动端证据，断点和组件重排策略为推断。
- 无法从截图确认键盘可达性与焦点环样式。
