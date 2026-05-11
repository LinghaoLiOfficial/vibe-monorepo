# Frontend Component Plan

## Page Composition Tree
- `OverviewDashboardPage`
- `DashboardShell`
- `SidebarNav`
- `TopCommandBar`
- `NotificationCardRow`
- `SectionHeader`
- `DocumentActivityGrid`
- `EventMediaGrid`
- `UtilityCalendarPanel`
- `AgendaList`

## Component Contracts

### `DashboardShell`
- Props: `children`, `sidebar`, `utility`, `backgroundVariant`
- Responsibility: layout orchestration for desktop/tablet/mobile breakpoints

### `SidebarNav`
- Props: `brand`, `menuItems[]`, `recentProjects[]`, `profile`, `activeRoute`
- States: `collapsed`, `expanded`, `mobileDrawerOpen`

### `TopCommandBar`
- Props: `title`, `searchPlaceholder`, `onSearch`, `onCreateProject`
- Slots: left title cluster, center command input, right CTA

### `NotificationCardRow`
- Props: `items[]` (`type`, `title`, `summary`, `actionHref`, `tone`)
- Behavior: desktop 3-column, mobile vertical list

### `DocumentActivityGrid`
- Props: `documents[]` (`badge`, `title`, `author`, `editedAt`, `avatarUrl`)
- Behavior: card list with optional pagination or “See all” navigation

### `EventMediaGrid`
- Props: `events[]` (`tag`, `title`, `imageUrl`, `href`)
- Behavior: responsive image cards; supports horizontal overflow on narrow screens

### `UtilityCalendarPanel`
- Props: `month`, `selectedDate`, `onSelectDate`, `eventsByDate`
- Children: `MiniCalendar`, `AgendaList`

## Data Model Hints
- `NotificationItem`, `DocumentItem`, `EventItem`, `CalendarDay`, `AgendaItem` typed interfaces
- Normalize time metadata to ISO strings for locale-safe formatting
- Keep card payloads serializable for SSR/ISR compatibility

## Responsive Behavior Plan
- Desktop (`>=1200`): `grid-cols-[280px_1fr_300px]`
- Tablet (`768-1199`): sidebar slimmer; utility panel shifts under main sections
- Mobile (`<=767`): drawer nav + one-column feed; calendar collapsible accordion

## Interaction And State Plan
- Global search: controlled input with debounced query callback
- CTA: optimistic modal/open route for new project creation
- Calendar selection: local state with optional URL sync (`?date=YYYY-MM-DD`)
- “See all” links route to dedicated list pages

## Testing Targets
- Visual regression snapshots for desktop and mobile composition
- Keyboard navigation for search and sidebar drawer controls
- Card rendering tests for empty, loading, and populated states
- Calendar selection and agenda filtering behavior tests
