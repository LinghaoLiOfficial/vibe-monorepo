# Template Index

## Template Identity
- template_id: `nexus-dashboard-analytics`
- archetype: `saas-admin-dashboard`
- primary_platform: `desktop-web`

## Retrieval Tags
- `dashboard`
- `analytics`
- `saas`
- `left-sidebar`
- `kpi-cards`
- `chart-heavy`
- `integration-table`
- `light-theme`
- `mobile-hypothesis`

## Matching Signals
- 左侧固定导航 + 顶栏搜索 + 头像操作。
- 首屏三 KPI 卡片并列。
- 中区双图表卡（趋势 + 柱图）。
- 下区分布图与集成表组合。
- 视觉语义强调“清爽浅色 + 蓝紫青数据色”。

## Must Preserve / Can Replace / Can Extend
- Must Preserve:
  - 信息层级顺序（概览 -> 趋势 -> 明细）
  - 卡片化布局与趋势标签语义
- Can Replace:
  - 品牌 Logo 与色值
  - 图标风格与字体
- Can Extend:
  - 更多业务图表卡
  - 筛选器维度
  - 集成表高级交互（分页/筛选）

## Responsive Coverage
- Desktop: Evidence-based（截图直接支持）
- Mobile: Hypothesis-based（无移动端截图）
- 风险级别: medium

## Reuse Recommendation
- 推荐用于中后台数据分析类页面快速起版。
- 如需高保真移动端交付，建议补充 `<=767px` 截图后再二次抽象。
