# Design System Structurization

## Token Taxonomy
- Core tokens: color, typography, spacing, radius, border, shadow, motion.
- Semantic tokens: surface, text, interactive, status, chart-series.
- Component tokens: card, nav-item, chip, input, button, table-row, chart-bar.

## Color System
- Neutral surfaces
- `surface/base`: very light cool gray
- `surface/card`: white
- `surface/subtle`: soft gray

- Text
- `text/primary`: near-black
- `text/secondary`: medium gray
- `text/muted`: light gray

- Brand and interaction
- `brand/primary`: indigo-blue
- `brand/secondary`: cyan-teal
- `interactive/focus`: medium blue ring

- Status
- `status/positive`: mint/green tint with darker green text
- `status/negative`: light red/pink tint with darker rose text

- Data series palette
- `series/1`: deep indigo
- `series/2`: violet
- `series/3`: blue
- `series/4`: teal
- `series/5`: aqua

## Typography System
- Family: modern sans-serif (interchangeable with system-friendly sans family).
- Scale intent
- Display metric: large bold numerals for KPIs.
- Section heading: medium-large semibold.
- Body label: regular medium.
- Meta/helper: small regular.
- Numeric emphasis rules
- KPIs and chart labels receive heavier weight and tighter color contrast than surrounding text.

## Spacing Radius Shadow Border
- Spacing scale (suggested): 4 / 8 / 12 / 16 / 20 / 24 / 32.
- Card padding uses mid-large spacing for air and readability.
- Corner radius: small-to-medium rounded corners across cards/controls.
- Border: subtle 1px neutral borders for separation in light theme.
- Shadow: minimal or near-none; relies more on border/surface contrast than elevation.

## Component Style Baselines
- Sidebar nav item
- Default: icon + text in neutral.
- Active: tinted background pill, stronger text contrast.

- KPI card
- Header row with icon/title/info action.
- Large metric line + delta chip.

- Chips
- Rounded, compact, color-coded by trend with arrow indicators.

- Inputs and control buttons
- Outlined, light surface, low-contrast borders, clear icon + label.

- Data panels
- Consistent card shell with title/action strip and chart region.

- Data table rows
- Icon/avatar + name + metadata columns + progress indicator.

## Reuse Constraints
- Must preserve
- Sidebar + top utility + dashboard card composition pattern.
- KPI-first hierarchy and dense-but-calm spacing rhythm.
- Neutral base with blue/teal accent language.

- Can replace
- Brand identity assets, icon pack, chart library internals.
- Exact copy text and mock numeric values.

- Can extend
- Additional widget types, alert banners, drill-down panels, and role-based shortcuts.
- Dark mode variant if semantic token mapping is maintained.
