# Frontend Component Plan

## Component Tree
- `DashboardShell`
- `SideNavRail`
- `TopHeaderBar`
- `TimeRangeToolbar`
- `KpiCardGrid`
- `FinanceSummaryPanel`
- `VisitorPanel`
- `OperationalStatusTable`
- `RealtimeQueuePanel`

## Layering And Boundaries
- Shell layer:
  - layout, navigation rail, page spacing, viewport behavior.
- Domain widget layer:
  - KPI/finance/visitor/queue modules encapsulate fetching + rendering.
- Primitive layer:
  - card, button, badge, tabs, table, progress, chart container.

## Component Contracts
- `KpiCard` props:
  - `title`, `value`, `delta`, `deltaDirection`, `series`, `timeLabels`, `onOpenDetail`
- `TimeRangeToolbar` props:
  - `value`, `onChange`, `filters`, `onFilterChange`, `onSearch`
- `OperationalStatusTable` props:
  - `rows`, `sort`, `onSort`, `query`, `onQueryChange`, `onExport`
- `RealtimeClinicCard` props:
  - `clinicName`, `doctor`, `waiting`, `progress`, `complete`

## State And Interaction Rules
- Global UI state:
  - selected timeframe
  - active filters
  - search query
- Module states:
  - loading, empty, error, refreshedAt
- Interaction rules:
  - timeframe/filter updates fan out to dependent modules
  - export action available on queue table regardless of chart readiness

## Responsive Behavior
- Desktop (`>=1200px`): 2-3 column grid with side-by-side analytics.
- Tablet (`768-1199px`): 2-column adaptive cards; queue table may become horizontally scrollable.
- Mobile (`<=767px`, hypothesis): single-column stack; control bars wrap; reduced chart detail.

## Mobile Degradation Rules
- Convert dense table to summary cards with expandable row details.
- Replace semicircle gauge with compact KPI + mini trend if vertical space is constrained.
- Prioritize actionable modules (queue + real-time status) above deep-detail analytics.

## Replaceable Regions
- Replaceable:
  - chart rendering components (line/bar/dot/gauge)
  - data-source adapters and API schemas
  - iconography pack
- Must preserve:
  - overall dashboard zoning and section ordering
  - KPI prominence and operational-action discoverability
