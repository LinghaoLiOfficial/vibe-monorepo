# Nextjs React Frontend Language

## App Router Structure Suggestion
- `app/(dashboard)/layout.tsx`: Shell 布局（Sidebar + Topbar）。
- `app/(dashboard)/dashboard/page.tsx`: 仪表盘页面入口。
- `components/dashboard/*`: KPI、图表、表格卡片组件。
- `components/shell/*`: 侧栏、顶栏、通用控件。

## Server Client Component Boundaries
- Server Components:
  - `page.tsx` 负责首屏数据拉取与拼装。
- Client Components:
  - `PageHeaderControls`（交互控件）
  - 图表组件（tooltip/hover/resize）
  - `IntegrationTable`（排序、横向滚动）

## Props And Data Contracts
- `DashboardMetrics`:
  - `pageViews:number`
  - `revenue:number`
  - `bounceRate:number`
  - `deltas:{pageViews:number,revenue:number,bounceRate:number}`
- `SalesSeries`:
  - `month:string`
  - `segments:{name:string,value:number,colorToken:string}[]`
- `IntegrationRow`:
  - `app:string`
  - `type:string`
  - `rate:number`
  - `profit:number`

## Tailwind Token Mapping
- 颜色映射:
  - `bg.canvas -> bg-slate-100/60`
  - `surface.card -> bg-white`
  - `text.primary -> text-slate-900`
  - `state.positive -> text-emerald-500 bg-emerald-50`
  - `state.negative -> text-rose-500 bg-rose-50`
- 结构映射:
  - 卡片: `rounded-2xl border border-slate-200 p-5`
  - 主布局: `grid grid-cols-12 gap-4`
  - 移动端: `max-md:grid-cols-1`

## TypeScript Contract
- 为核心实体定义 `type` / `interface`：`DashboardMetrics`, `SalesSeries`, `IntegrationRow`。
- 组件 props 禁止 `any`，图表序列使用判别字段保证颜色与图例一致。
- 交互回调类型显式定义，如 `onSort:(key:SortKey)=>void`。

## shadcn/ui Adoption Plan
- 使用 `Card`, `Button`, `Input`, `DropdownMenu`, `Table`, `Badge` 作为基础。
- 在 `CardHeader` 中统一标题与次级操作区样式。
- 通过 `Badge` 复用涨跌标签视觉语义。

## Responsive Implementation Notes
- Desktop Evidence: 复刻双列图表 + 三列 KPI 的信息密度。
- Mobile Hypothesis: `Sidebar` 改 `Sheet`；主区改 `space-y-*` 单列。
- 图表容器添加 `overflow-hidden` + `min-h` 以防极窄设备抖动。
- 表格开启 `overflow-x-auto` 并设置 `min-w-[640px]`。

## Adaptation Constraints
- 必须保持 KPI 卡片位置靠前，保证首屏洞察。
- 颜色可按品牌替换，但需保留正负趋势语义对立。
- 若业务字段变化，优先改数据映射层，不破坏组件契约。
