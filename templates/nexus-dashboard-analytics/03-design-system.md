# Design System Structuring

## Token Taxonomy
- Color: `bg/*`, `surface/*`, `text/*`, `data/*`, `state/*`
- Typography: `font.family`, `font.size`, `font.weight`, `line.height`
- Space: `space.1-10`
- Radius: `radius.sm/md/lg/xl`
- Border/Shadow: `border.subtle`, `shadow.soft`
- Motion: `duration.fast/base`, `easing.standard`

## Color System
- 背景: 浅灰冷色 (`bg.canvas`) + 白色卡片 (`surface.card`)。
- 文本: 深灰近黑 (`text.primary`)、中灰 (`text.secondary`)、浅灰 (`text.muted`)。
- 数据色: 蓝紫系为主序列，青绿色为辅助序列。
- 状态色:
  - `state.positive`: 青绿
  - `state.negative`: 粉红/玫红
  - `state.neutral`: 灰

## Typography System
- 建议字体: 无衬线 UI 字体（现代中性风格）。
- 层级:
  - H1 页面标题: 粗体大字号
  - Card Title: 中等字重
  - KPI Value: 特大字号 + 高对比
  - Meta/Label: 小字号中低对比
- 数字建议使用等宽数字特性以提升对齐感。

## Spacing Radius Shadow Border
- 卡片内边距中等偏大，维持信息呼吸感。
- 模块间距稳定，形成规则网格。
- 圆角统一中等（卡片/按钮/输入框一致语义）。
- 边框低对比细线，阴影极轻或无阴影。

## Component Style Baselines
- Sidebar: 分组标题 + 行项目，active 态以背景底色高亮。
- Topbar Search: 大圆角输入框，左图标右快捷键提示。
- KPI Card: 图标 + 标题 + 主数值 + 变化标签。
- Chart Card: 标题区带次级操作（Filter/Sort）。
- Table Card: 轻量行分隔，关键指标可视化条形辅助。

## Responsive Token Considerations
- Desktop Evidence: 保留 12 栏栅格思路，卡片跨列组合。
- Mobile Hypothesis: 缩减水平间距，提高纵向节奏；按钮高度增加以提升触控。
- 表格在移动端采用 `min-width + overflow-x` 或卡片化行转换。

## Reuse Constraints
- 必须保留：卡片化信息结构、KPI 强调方式、状态色语义。
- 可替换：品牌色具体色值、图标库、字体家族。
- 可扩展：图表类型、筛选维度、表格字段。
