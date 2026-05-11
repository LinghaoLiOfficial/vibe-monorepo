# Next.js React Frontend Language

## App Router Structure Suggestion
- `app/(dashboard)/layout.tsx` for shell layout (sidebar + top header)
- `app/(dashboard)/dashboard/page.tsx` main analytics page
- `app/globals.css` token variables and base styles
- `components/dashboard/*` feature components per card/module
- `components/ui/*` shadcn/ui primitives and wrapped variants

## Server Client Component Boundaries
- Server components: page-level data loading wrappers and initial analytics payload fetch.
- Client components: interactive controls (date picker, dropdowns, filter/sort menus), charts, row selections.
- Hybrid pattern: server provides normalized data; client handles visualization interactions.

## Props And Data Contracts
- `DashboardPageData`
  - `kpis: Array<{ key: string; label: string; value: number; deltaPct: number; direction: 'up' | 'down' }>`
  - `salesOverview: { total: number; deltaPct: number; series: Array<{ month: string; segments: Array<{ region: string; value: number }> }> }`
  - `subscribers: { total: number; deltaPct: number; weeklyBars: Array<{ day: string; value: number; highlighted?: boolean }> }`
  - `distribution: Array<{ channel: string; amount: number; colorToken: string }>`
  - `integrations: Array<{ id: string; app: string; type: string; rate: number; profit: number }>`

## Tailwind Token Mapping
- Map semantic tokens via CSS vars and Tailwind config extensions:
  - colors: `bg-app`, `surface`, `surface-elevated`, `text-primary`, `text-muted`, `accent-primary`, `status-positive`, `status-negative`
  - spacing: `card-px`, `card-py`, `section-gap`
  - radius: `card`, `control`, `chip`
  - shadow: `surface-soft`
- Utility conventions:
  - `grid gap-4 md:gap-6`
  - `rounded-[var(--radius-card)]`
  - `border border-[color:var(--border-soft)]`

## TypeScript Contract
- Define shared types in `components/dashboard/types.ts`.
- Use strict union literals for trend direction, interval, and module identifiers.
- Prefer readonly arrays for chart series inputs.
- Add runtime schema validation at data boundary (e.g., zod) for dashboard payload.

## shadcn/ui Adoption Plan
- Reuse: `Card`, `Button`, `Input`, `DropdownMenu`, `Table`, `Badge`, `Separator`.
- Extend wrappers:
  - `MetricBadge` for trend chips
  - `ToolbarSelect` for period/date controls
  - `ProgressRate` for integration rate bars
- Keep primitives visually aligned through local tokenized class variants.

## Responsive Implementation Notes
- Desktop-first grid becomes stacked layout below `md`.
- Sidebar switches to drawer on mobile with preserved nav grouping.
- Toolbar actions become horizontally scrollable row when space constrained.
- Charts should expose compact mode prop (`dense=true`) for mobile simplification.

## Adaptation Constraints
- Preserve KPI-first scan order and chart/table pairing logic.
- Do not overload mobile with full desktop table fidelity; prioritize key fields.
- Keep trend color semantics stable across all breakpoints.
- Verification gap: mobile assumptions require screenshot validation before production parity claims.
