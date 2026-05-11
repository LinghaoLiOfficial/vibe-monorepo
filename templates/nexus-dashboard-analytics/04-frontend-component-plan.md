# Frontend Component Plan

## Component Tree
- `DashboardPage`
- `AppShell`
- `BrowserFrameMock`
- `TopHeader`
- `BrandBlock`
- `SearchBar`
- `TopActions`
- `UserProfileMini`
- `SidebarNav`
- `NavSection`
- `NavItem`
- `TeamSwitcherCard`
- `UpgradePlanButton`
- `DashboardContent`
- `DashboardToolbar`
- `DateRangeControl`
- `PeriodSelect`
- `ActionButton`
- `KpiRow`
- `KpiCard`
- `PrimaryPanels`
- `SalesOverviewPanel`
- `SubscribersPanel`
- `SecondaryPanels`
- `SalesDistributionPanel`
- `IntegrationsTablePanel`

## Layering And Boundaries
- Shell boundary
- `AppShell` owns global layout regions: sidebar, top header, content.

- Route boundary
- `DashboardPage` composes route-specific widgets and data mappings.

- Widget boundary
- Each analytics panel is self-contained and receives normalized data props.

- Visual boundary
- Card shell treatment centralized in reusable `PanelCard`/`Card` primitive.

## Component Contracts
- `KpiCard`
- Props: `title`, `value`, `delta`, `trend`, `icon`, `infoAction`.

- `SalesOverviewPanel`
- Props: `title`, `series`, `legendItems`, `period`, `controls`.

- `SubscribersPanel`
- Props: `title`, `value`, `delta`, `bars`, `activeIndex`, `period`.

- `IntegrationsTablePanel`
- Props: `rows[{appName, appIcon, type, rate, profit}]`, `onSelectRow`, `onViewAll`.

- `SidebarNav`
- Props: `sections[]`, `activeRoute`, `onNavigate`, `badges`.

## State And Interaction Rules
- Global dashboard state
- `dateRange`, `period`, `globalFilter` shared across widgets.

- Local panel state
- Sort/filter/menu states remain local to each panel unless explicitly synchronized.

- Interaction rules
- Active nav item reflects route.
- Trend chips map to semantic status colors.
- Chart highlight state can be derived from hover/focus or selected datapoint.

## Responsive Behavior
- Desktop (`>=1200`): fixed sidebar + multi-column analytic layout.
- Tablet (`768-1199`): compress spacing, keep two-column where possible, optionally collapse sidebar width.
- Mobile (`<768`): stack panels vertically, convert sidebar to drawer, maintain KPI readability with 1-column cards.
- Keep action controls accessible via wrapping rows and icon+text fallbacks.

## Replaceable Regions
- Brand assets (`logo`, `product name`, avatar identity).
- Navigation labels and section taxonomy.
- Widget data providers and chart rendering implementation.
- Table row schema can be extended with status/actions.
- Visual accent palette can be re-skinned if semantic token roles are preserved.
