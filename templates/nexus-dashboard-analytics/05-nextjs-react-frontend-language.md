# Next.js + React Frontend Language

## App Router Structure Suggestion
- `app/(dashboard)/layout.tsx`: shared shell layout (sidebar + top bar).
- `app/(dashboard)/dashboard/page.tsx`: dashboard route container.
- `app/(dashboard)/dashboard/loading.tsx`: skeleton states for cards/charts/table.
- `app/(dashboard)/dashboard/error.tsx`: scoped recovery UI.
- `components/dashboard/*`: route-focused widgets.
- `components/ui/*`: reusable primitives (card, chip, button, input, table, progress).

## Server Client Component Boundaries
- Server components
- Route `page.tsx` and data-fetch wrappers when initial dashboard payload is fetched on server.

- Client components
- Interactive controls: date picker, select, filter popover, panel menus.
- Chart wrappers if relying on client-side chart library.
- Any local stateful widget (sorting, highlight state) should be `use client`.

- Boundary rule
- Keep data shaping on server, interaction state in client leaf components.

## Props And Data Contracts
- `DashboardPayload`
- `kpis[]`, `salesOverview`, `subscribers`, `salesDistribution`, `integrations`.

- `KpiDTO`
- `{ id, label, value, deltaPercent, trend: 'up'|'down', format }`.

- `ChartSeriesDTO`
- `{ xLabel, segments[{key,value,colorToken}] }[]`.

- `IntegrationRowDTO`
- `{ id, appName, appIconUrl, type, ratePercent, profitAmount }`.

- Contract rule
- UI components consume presentational DTOs, not raw backend entities.

## Tailwind Token Mapping
- Colors
- `bg-surface`, `bg-card`, `text-primary`, `text-secondary`, `border-subtle` mapped via CSS variables in `:root`.

- Spacing/radius
- Use Tailwind scale aligned to token rhythm (`p-4`, `p-6`, `gap-4`, `rounded-xl`).

- Status chips
- `trend-up`: `bg-emerald-50 text-emerald-600`
- `trend-down`: `bg-rose-50 text-rose-600`

- Chart series
- Map semantic classes like `series-1..series-5` to CSS variables for easy theming.

## Adaptation Constraints
- Preserve information hierarchy: KPI row must remain the first visual section.
- Preserve shell IA: sidebar + top utility header should not be removed in desktop template.
- Avoid heavy shadows or saturated backgrounds that break minimal analytics tone.
- Ensure keyboard accessibility for all toolbar controls and panel menus.
- Avoid hardcoding numeric strings; all metrics must be data-driven and format-aware.
