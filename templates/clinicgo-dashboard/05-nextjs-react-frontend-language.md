# Next.js React Frontend Language

## App Router Structure Suggestion
- `app/(dashboard)/layout.tsx`: shell + navigation rail + header slot.
- `app/(dashboard)/page.tsx`: default dashboard route.
- `app/(dashboard)/queue/page.tsx`: queue management deep view.
- `app/(dashboard)/analytics/page.tsx`: expanded analytics view.
- `components/dashboard/*`: domain widgets and chart wrappers.

## Server Client Component Boundaries
- Server components:
  - route-level data bootstrap and auth/session gate.
  - static metadata and initial payload aggregation.
- Client components:
  - timeframe toggles, search/filter controls, interactive charts, queue inline actions.
- Boundary rule:
  - keep heavy interactions client-side but pass typed initial data from server.

## Props And Data Contracts
- Define shared contracts in `types/dashboard.ts`:
  - `TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly'`
  - `KpiMetric`, `SeriesPoint`, `QueueRow`, `ClinicRealtimeState`, `FinanceBreakdown`
- API adapters should normalize backend payloads to stable UI contracts before render.

## Tailwind Token Mapping
- Map design tokens via CSS variables in `app/globals.css` and Tailwind theme extension:
  - `--bg-canvas`, `--bg-card`, `--border-muted`, `--text-primary`, `--accent-violet`
- Suggested utility mapping:
  - cards: `rounded-2xl border border-[var(--border-muted)] bg-[var(--bg-card)]`
  - KPI values: `text-4xl font-semibold tracking-tight`
  - dense grids: `gap-4 xl:gap-6`

## TypeScript Contract
- Enable strict mode and avoid `any` in widget interfaces.
- Use discriminated unions for loading/error/success module states.
- Keep chart input typed as immutable arrays (`readonly SeriesPoint[]`) where possible.

## shadcn/ui Adoption Plan
- Reuse primitives:
  - `Card`, `Tabs`, `Button`, `Input`, `Table`, `Badge`, `DropdownMenu`, `Tooltip`
- Extend primitives with domain wrappers:
  - `KpiCard`, `FinancePanel`, `VisitorGaugeCard`, `RealtimeClinicPanel`
- Keep style overrides token-based, not one-off inline colors.

## Responsive Implementation Notes
- Sidebar:
  - desktop fixed rail; mobile switch to drawer/bottom nav.
- Analytics grid:
  - `xl:grid-cols-3`, `md:grid-cols-2`, `grid-cols-1`.
- Queue table:
  - fallback to card list for `sm` breakpoints.
- Note: responsive behavior is partially hypothesis due to missing mobile screenshot evidence.

## Adaptation Constraints
- Preserve:
  - data density hierarchy, card grouping, and high-contrast KPI readability.
- Flexible:
  - backend endpoints, charting library choice, icon set.
- Constraints:
  - avoid visual drift from clinical dashboard tone; keep neutrals dominant with limited accents.
