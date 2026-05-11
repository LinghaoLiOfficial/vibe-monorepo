# Next.js + React Frontend Design Language

## Stack And Boundaries
- Framework: Next.js App Router
- Language: TypeScript + React Server/Client components by interaction needs
- Styling: Tailwind CSS with CSS variables token bridge
- UI primitives: shadcn/ui (`Button`, `Input`, `Card`, `Sheet`, `Avatar`, `Badge`)

## Token Mapping Strategy
- Define core variables in `app/globals.css` under `:root`
- Extend Tailwind theme aliases to semantic keys:
  - `bg-surface-primary`, `bg-surface-sidebar`
  - `text-primary`, `text-secondary`
  - `border-soft`, `radius-shell`, `radius-card`
- Keep status accents (`lime`, `peach`) as semantic utility classes for chips/notification tone

## Layout Blueprint
- Root shell: `min-h-screen` background layer + centered rounded dashboard container
- Desktop grid: `xl:grid xl:grid-cols-[280px_minmax(0,1fr)_300px]`
- Tablet fallback: `md:grid-cols-[88px_minmax(0,1fr)]` + utility section below main
- Mobile fallback: `block`; sidebar rendered via `Sheet`

## Component Implementation Notes
- `SidebarNav`: server-rendered menu data + client drawer state on mobile
- `TopCommandBar`: `Input` with prefix icon and keyboard hint chip (`kbd` style)
- Notification/document/event cards: use composable `Card` wrappers with slot props
- Utility calendar: lightweight custom grid or calendar primitive; agenda list as stacked cards

## Interaction Patterns
- Search command input: debounced client callback; optional command palette hotkey
- CTA route: `/projects/new` via `next/link` or `router.push`
- Calendar day selection: client state with URL param sync for shareable context
- List drill-down: `Link` wrappers on card action affordances

## Accessibility Guidance
- Ensure color contrast for side rail text and subtle metadata labels
- Visible focus rings on input, buttons, and card links
- ARIA labels for icon-only triggers (menu toggle, card arrow actions)
- Keyboard access for drawer, calendar selection, and primary CTA

## Mobile Hypothesis Implementation
- No mobile screenshot provided; implement conservative adaptation:
  - keep semantic order of sections
  - collapse dense grids to single-column
  - preserve top-level search + create action visibility
  - move utility calendar/events below main content with optional collapse

## Suggested File Map
- `app/(dashboard)/overview/page.tsx`
- `components/dashboard/dashboard-shell.tsx`
- `components/dashboard/sidebar-nav.tsx`
- `components/dashboard/top-command-bar.tsx`
- `components/dashboard/notification-card-row.tsx`
- `components/dashboard/document-activity-grid.tsx`
- `components/dashboard/event-media-grid.tsx`
- `components/dashboard/utility-calendar-panel.tsx`
- `lib/types/dashboard.ts`
