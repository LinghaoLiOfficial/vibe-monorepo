# Frontend Component Plan

## Component Tree
- `DashboardShell`
- `SidebarNav`
- `TopUtilityBar`
- `PageHero`
- `ActionGroup`
- `KpiGrid`
- `KpiCard`
- `ProjectAnalyticsCard`
- `ReminderCard`
- `ProjectListCard`
- `TeamCollaborationCard`
- `ProgressGaugeCard`
- `TimeTrackerCard`
- `PromoCard`

## Layering And Boundaries
- Shell boundary owns the app frame, sidebar, and content canvas.
- Utility boundary owns search, icons, and profile controls.
- Card boundary owns each dashboard widget and its local behavior.
- Shared UI boundary owns buttons, inputs, chips, badges, and avatar primitives.

## Component Contracts
- `KpiCard` props: `{ title, value, note, tone, icon }`
- `ActionGroup` props: `{ primaryLabel, secondaryLabel, onPrimary, onSecondary }`
- `ProjectAnalyticsCard` props: `{ series, labels, highlightedIndex }`
- `ProjectListCard` props: `{ items, onCreate }`
- `TeamCollaborationCard` props: `{ members }`
- `ProgressGaugeCard` props: `{ percent, legend }`
- `TimeTrackerCard` props: `{ time, onPause, onStop }`

## State And Interaction Rules
- Global state: selected workspace and search query.
- Local state: card actions, timer controls, and row hover/selection.
- CTA hierarchy should always keep `Add Project` as primary.
- Cards can drill down without leaving the dashboard shell.

## Responsive Behavior
- Desktop: left nav plus multi-column content grid.
- Tablet: preserve shell, collapse some cards into two columns.
- Mobile: stack cards vertically and convert the shell into a drawer-based nav.

## Mobile Degradation Rules
- Sidebar becomes a drawer or compact icon rail.
- KPI cards reduce to one or two per row.
- Project list becomes a compact vertical list with only the essential metadata.
- Timer and promo cards can move lower in the flow.

## Replaceable Regions
- Replaceable: brand, iconography, analytics chart library, timer implementation, promo card content.
- Semi-replaceable: metric labels, collaborator names, project row text.
- Non-replaceable: shell hierarchy, KPI-first order, and the card-based operational layout.
