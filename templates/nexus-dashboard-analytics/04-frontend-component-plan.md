# Frontend Component Plan

## Component Tree
- `DashboardPage`
- `AppShell`
- `SidebarNav`
- `TopBar`
- `PageHeaderControls`
- `KpiCardsRow`
- `KpiCard`
- `SalesOverviewCard`
- `SubscriberCard`
- `SalesDistributionCard`
- `IntegrationListCard`
- `IntegrationTable`

## Layering And Boundaries
- `AppShell` 管理全局布局与响应式断点切换。
- `SidebarNav` 与 `TopBar` 为跨页面可复用框架层。
- 各数据卡片为页面域组件，接受数据与配置，不耦合获取逻辑。
- 图表实现封装在卡片内部子组件，外层只传入序列数据。

## Component Contracts
- `KpiCard(props)`: `title`, `value`, `delta`, `trend`, `icon`。
- `SalesOverviewCard(props)`: `total`, `delta`, `seriesByMonth`, `legend`。
- `SubscriberCard(props)`: `total`, `delta`, `weeklyBars`。
- `IntegrationTable(props)`: `rows[{app,type,rate,profit}]`, `sortable`, `onSort`。
- `PageHeaderControls(props)`: `dateRange`, `period`, `onFilter`, `onExport`。

## State And Interaction Rules
- 页面级状态: `dateRange`, `period`, `filters`, `sortKey`。
- 卡片局部状态: hover 高亮、图表 tooltip 显示。
- 交互优先级: 时间范围变更 > 筛选 > 排序。
- 导出动作为幂等触发，不应破坏当前筛选上下文。

## Responsive Behavior
- >=1200px: 侧栏固定，主内容双列/三列卡片布局。
- 768-1199px: 缩窄侧栏，图表卡片优先全宽展示。
- <=767px: 侧栏抽屉化，主内容单列流。

## Mobile Degradation Rules
- KPI 卡片纵向堆叠，保留指标值与趋势标签。
- `SalesOverview` 图表可裁剪为关键两个月或切换简版图。
- `IntegrationTable` 默认展示 2-3 核心列，其余列折叠或横滑。
- 顶栏次级图标（如礼物）可折叠进更多菜单。

## Replaceable Regions
- 可替换区域:
  - 品牌区（Logo + 名称）
  - KPI 指标定义
  - 图表组件实现库（Recharts/ECharts）
  - 集成列表数据源与字段映射
- 不建议替换区域:
  - 整体信息层级顺序
  - 卡片化布局的主骨架
