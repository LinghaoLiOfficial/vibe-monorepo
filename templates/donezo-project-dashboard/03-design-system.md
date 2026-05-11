# Design System Structurization

## Token Taxonomy
- Foundations: color, typography, spacing, radius, border, shadow
- Semantic tokens: surface, text, accent, status, control, emphasis
- Component tokens: sidebar, button, card, chip, chart, list-row, gauge, timer
- Breakpoints: desktop, tablet, mobile-hypothesis

## Color System
- Base surfaces: white cards over a very light gray app canvas.
- Primary accent: emerald/green family for main actions and progress.
- Secondary accents: soft pastel blues, yellows, pinks, and oranges for avatars/statuses.
- Dark accent: near-black/forest green for the timer card.
- Suggested semantic map:
  - `--bg-app`, `--bg-surface`, `--bg-surface-strong`
  - `--text-primary`, `--text-secondary`, `--text-muted`
  - `--border-soft`
  - `--accent-primary`, `--accent-secondary`
  - `--status-success`, `--status-warning`, `--status-pending`

## Typography System
- Heading style: bold sans serif with generous size contrast.
- Metric style: extra-large numeral treatment for KPI cards.
- Body style: clean, medium-weight labels and muted helper copy.
- Microcopy style: compact status labels and due-date text.
- Numerals should remain visually stable and easy to compare.

## Spacing Radius Shadow Border
- Spacing is airy, with large internal padding and generous gaps between cards.
- Radius is high across the system: pill buttons, soft card corners, round avatars.
- Borders are subtle and low-contrast; depth comes more from whitespace than shadow.
- Shadows, if used, should stay soft and minimal.

## Component Style Baselines
- Sidebar items: icon + label, muted inactive states, green active indicator.
- Buttons: primary filled green pill, secondary outlined pill.
- Cards: white surfaces, soft padding, minimal chrome, clear section titles.
- Chart bars: solid green for active/completed, striped gray for pending.
- List rows: icon/avatar at left, title and meta stacked, status chip on the side.

## Responsive Token Considerations
- On mobile, reduce heading and metric sizes by one step.
- Convert wide controls into wrap-friendly or full-width variants.
- Increase touch target height for nav items, CTAs, and rows.
- Simplify chart legends and preserve only the most meaningful state colors.

## Reuse Constraints
- Must preserve: green emphasis language, soft card rhythm, avatar-driven collaboration cues, and clear CTA hierarchy.
- Can replace: icon set, exact chart style, promo card content, and list semantics.
- Can extend: additional dashboard widgets if they follow the same spacing and radius system.
- Risk note: mobile token values remain hypothesis-based until a mobile capture is available.
