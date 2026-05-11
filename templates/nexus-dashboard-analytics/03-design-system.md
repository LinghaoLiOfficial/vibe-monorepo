# Design System Structurization

## Token Taxonomy
- Foundations: color, typography, spacing, radius, border, shadow
- Semantic UI tokens: surface, text, divider, accent, status, interactive
- Component tokens: card, nav-item, button, chip, chart-series, table-row
- Breakpoint tokens: desktop (>=1200), tablet (768-1199), mobile (<=767 hypothesis)

## Color System
- Neutral surfaces: cool gray ramp for app background, cards, and separators.
- Primary accent: indigo/violet family for brand and active chart bars.
- Secondary accents: blue and cyan for multi-series distinction.
- Status colors: mint/green for positive deltas, rose/red for negative deltas.
- Suggested semantic map:
  - `--bg-app`, `--bg-surface`, `--bg-elevated`
  - `--text-primary`, `--text-secondary`, `--text-muted`
  - `--border-soft`, `--border-strong`
  - `--accent-primary`, `--accent-secondary`, `--accent-tertiary`
  - `--status-positive`, `--status-negative`

## Typography System
- Role hierarchy:
  - Display metric: bold, large numeric style
  - Section title: semibold heading
  - Card title/labels: medium body
  - Meta/helper text: regular muted small
- Recommended token slots:
  - `--font-size-display`, `--font-size-h2`, `--font-size-body`, `--font-size-caption`
  - `--font-weight-regular|medium|semibold|bold`
- Numeral alignment should favor tabular/consistent-width behavior for KPI comparability.

## Spacing Radius Shadow Border
- Spacing rhythm appears 4/8-based with larger card paddings (16-24).
- Radius scale: medium-large corners for cards and controls; pill radius for chips.
- Borders: thin, low-contrast outlines to separate cards without heavy frames.
- Shadows: minimal to none; layering relies more on background contrast than depth blur.

## Component Style Baselines
- Sidebar: fixed width, grouped nav, active row with filled neutral highlight.
- Top search: rounded input, subtle border, icon-leading with shortcut suffix.
- KPI card: icon + label row, dominant value, compact status chip.
- Chart cards: high whitespace, anchored value callouts, lightweight legends.
- Table card: simplified row separators, progress bars as secondary quantitative cue.
- Buttons: outline-secondary pattern for utility actions, consistent icon spacing.

## Responsive Token Considerations
- On mobile (hypothesis), reduce paddings and heading sizes by one token step.
- Increase touch target min-height for row/actions tokens.
- Convert dense horizontal control groups into wrap/scroll token variants.
- Chart token overrides: fewer legend colors visible at once, simplified axis labels.

## Reuse Constraints
- Must preserve: card modularity, KPI prominence, chart color semantics, nav grouping logic.
- Can replace: icon set, brand glyph, exact chart style variant.
- Can extend: additional cards/modules if spacing rhythm and hierarchy are retained.
- Risk note: mobile tokens are assumption-based pending real mobile screenshot evidence.
