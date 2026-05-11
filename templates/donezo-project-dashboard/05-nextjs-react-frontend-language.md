# Next.js React Frontend Language

## App Router Structure Suggestion
- `app/(dashboard)/layout.tsx` for the shell, sidebar, and top bar
- `app/(dashboard)/dashboard/page.tsx` for the main dashboard page
- `components/dashboard/*` for feature widgets
- `components/ui/*` for shared shadcn/ui primitives
- `app/globals.css` for tokens and theme variables

## Server Client Component Boundaries
- Server components: page data fetch, initial layout, and static card composition.
- Client components: search, drawer nav, CTA handlers, timer controls, and chart interactivity.
- Use server data as normalized props and keep interactive state local to widgets.

## Props And Data Contracts
- `DashboardPayload`
  - `kpis: Array<{ id: string; label: string; value: string; note?: string; tone: 'primary' | 'neutral' | 'success' | 'warning' }>`
  - `analytics: { labels: string[]; values: number[]; pendingFlags: boolean[] }`
  - `projects: Array<{ id: string; title: string; dueDate: string; icon: string }>`
  - `members: Array<{ id: string; name: string; role: string; status: string; avatarUrl: string }>`
  - `progress: { percent: number; legend: Array<{ label: string; color: string }> }`
  - `timer: { value: string; running: boolean }`

## Tailwind Token Mapping
- Map CSS vars to Tailwind tokens for surfaces, text, borders, and emerald emphasis.
- Suggested utilities:
  - `rounded-[var(--radius-card)]`
  - `bg-[color:var(--bg-surface)]`
  - `text-[color:var(--text-primary)]`
  - `border-[color:var(--border-soft)]`
  - `gap-4 md:gap-6`
- Use a compact card variant for dense dashboard widgets.

## TypeScript Contract
- Define strict unions for KPI tone, timer state, and navigation item keys.
- Keep dashboard payload types in a shared `types.ts`.
- Prefer readonly arrays for chart and list data.
- Validate payloads at the server boundary with a schema layer if data is external.

## shadcn/ui Adoption Plan
- Reuse: `Button`, `Input`, `Card`, `Badge`, `Avatar`, `DropdownMenu`, `Sheet`, `Separator`.
- Wrap primitives for dashboard-specific styling: KPI cards, timer buttons, and progress legend chips.
- Keep component variants token-driven so the green brand language stays consistent.

## Responsive Implementation Notes
- Desktop-first grid should collapse to a single-column feed on small screens.
- Sidebar should switch to `Sheet` on mobile.
- Search and utility icons should compress into a single top row.
- Charts should support a dense mode with fewer labels and simpler legends.

## Adaptation Constraints
- Preserve the order: hero actions -> KPIs -> analytics -> operational widgets.
- Keep the green emphasis and card softness intact when redesigning implementation details.
- Do not force desktop card density onto mobile; preserve readability over exact parity.
- Verification gap: mobile layout remains assumption-based until a mobile capture is available.
