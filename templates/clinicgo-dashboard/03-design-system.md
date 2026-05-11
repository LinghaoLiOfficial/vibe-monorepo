# Design System Structurization

## Token Taxonomy
- Foundation tokens: color, typography, spacing, radius, border, shadow.
- Semantic tokens: success/warning/error/info/status-progress.
- Component tokens: card, table, badge, segmented-control, chart-accent, icon-button.

## Color System
- Neutral base:
  - `bg.canvas`: very light gray with subtle lavender tint
  - `bg.card`: white / near-white
  - `border.default`: low-contrast gray
  - `text.primary`: near-black
  - `text.secondary`: medium gray
- Accent palette:
  - Primary analytics: violet/indigo range
  - Support accents: blue, green, amber/orange, coral-red for category/status cues
- Delta semantics:
  - Positive: green
  - Negative: muted red

## Typography System
- Style direction: modern sans-serif UI face, high legibility in dense dashboard contexts.
- Hierarchy:
  - `display-metric`: large numeric KPIs
  - `heading-section`: card and region headers
  - `label-ui`: controls and field labels
  - `body-data`: table and metadata text
- Numeric emphasis: tabular-friendly number rendering is recommended for KPI stability.

## Spacing Radius Shadow Border
- Spacing rhythm: 4/8/12/16/24 scale with generous card paddings.
- Radius:
  - rail buttons: medium
  - cards/panels: medium-large rounded corners
  - chips/mini controls: small-medium
- Borders/shadow:
  - light stroke-first separation
  - very soft shadows to avoid visual noise

## Component Style Baselines
- Cards: neutral backgrounds, clear header strips, internal section separators.
- Controls: pill-like segmented groups, subtle pressed/selected states.
- Tables: low-contrast row dividers, strong column header readability.
- Chart modules: accent-forward marks on muted grids, preserving quick trend recognition.

## Responsive Token Considerations
- Mobile token overrides:
  - reduce horizontal paddings
  - slightly reduce metric typography size
  - preserve minimum touch target size for controls and icon buttons
- Chart density tokens should adapt: fewer labels/ticks, simplified legends.

## Reuse Constraints
- Must preserve: neutral + accent contrast strategy, card modularity, metric-first hierarchy.
- Can replace: icon set specifics, exact chart libraries/mark types.
- Avoid: over-saturated backgrounds or heavy shadows that break clinical/professional tone.
