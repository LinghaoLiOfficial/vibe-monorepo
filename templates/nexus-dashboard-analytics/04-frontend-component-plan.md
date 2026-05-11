# Frontend Component Plan

## Component Tree
- `DashboardShell`
- `SidebarNav`
- `TopUtilityHeader`
- `DashboardToolbar`
- `KpiGrid`
- `KpiCard`
- `SalesOverviewCard`
- `SubscriberCard`
- `SalesDistributionCard`
- `IntegrationListCard`
- `IntegrationRow`

## Layering And Boundaries
- Shell boundary: app frame with sidebar + main content container.
- Navigation boundary: `SidebarNav` manages route links and active states only.
- Data widgets boundary: each analytics card isolates rendering and local controls.
- Shared primitives boundary: button/input/chip/progress from UI kit layer.

## Component Contracts
- `KpiCard` props: `{ icon, title, value, trendValue, trendDirection }`
- `DashboardToolbar` props: `{ dateRange, period, onDateChange, onPeriodChange, onFilter, onExport }`
- `SalesOverviewCard` props: `{ totalRevenue, delta, seriesByMonth, legendItems }`
- `SubscriberCard` props: `{ totalSubscribers, delta, bars, interval }`
- `IntegrationRow` props: `{ appName, appType, ratePercent, profitAmount, checked }`

## State And Interaction Rules
- Global state: selected date range and aggregation period shared across cards.
- Local card state: sorting/filter menus remain scoped to card.
- Navigation state: active route highlighted; badge counts reactive.
- Table state: row selection optional and non-blocking for read-only mode.

## Responsive Behavior
- Desktop: 2-column analytics region with large-left/small-right split.
- Tablet: collapse to single-column card stack with preserved card order.
- Mobile: stack all cards vertically; toolbar controls wrap and condense.

## Mobile Degradation Rules
- Replace full table with compact rows showing app, rate, profit.
- Collapse non-critical chart legends into togglable chips.
- Reduce simultaneous KPI cards per row to one.
- Hide decorative browser-frame chrome and preserve core app content.

## Replaceable Regions
- Replaceable: brand/logo, icon set, chart rendering library, specific modules list.
- Semi-replaceable: metric labels and thresholds (keep structural rhythm).
- Non-replaceable: dashboard IA hierarchy, card-based composition, control affordance model.
