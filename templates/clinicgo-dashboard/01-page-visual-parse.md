# Page Visual Parse

## Summary
A desktop-first medical operations dashboard with KPI cards, trend charts, queue table, and real-time clinic status panel. Visual hierarchy is data-dense but clear via card grouping, muted neutrals, and selective accent colors.

## Page Type
- Application dashboard
- Domain: clinic/hospital operations management
- Primary goal: monitor occupancy, patients, cancellation, revenue, queue flow, and clinic progress

## Desktop Evidence
- Evidence source: `template-preparation/inputs/screenshots/clinicgo-dashboard.webp`
- Approx viewport: wide desktop (`>=1200px`), multi-column layout
- Left rail: icon-only vertical navigation with section separators and active highlight
- Top bar: breadcrumb, welcome text, notifications/settings, period switch (daily/weekly/monthly/yearly), filter/menu actions
- Main grid:
  - Row 1: three KPI cards (occupancy, total patients, cancellation), each with weekly delta and mini chart
  - Row 2 left: financial summary big chart + right-side stat strip (revenue/expenses/cash flow/invoices)
  - Row 2 right: venue visitor card (channel bars + semicircle gauge)
  - Row 3 left: operational queue table with search/export/actions
  - Row 3 right: real-time queue status by clinic card(s)

## Mobile Evidence Or Hypothesis
- Mobile screenshot evidence: not provided
- Hypothesis (`<=767px`):
  - Collapse from 3-column to 1-column stacked cards
  - Left rail converts to bottom tab bar or drawer
  - Top control cluster wraps into two rows; time-range segmented control becomes horizontally scrollable
  - Large charts keep card containers, with reduced tick labels and optional horizontal pan for dense datasets
  - Queue table becomes card-list rows or horizontally scroll container

## Region Breakdown
1. Navigation Region
- Vertical icon rail, monochrome outlined icons, minimal text, active item with dark tile.

2. Header And Controls Region
- Breadcrumb plus personalized greeting on left; utility buttons on right.
- Secondary control row with search, interval tabs, filter and overflow.

3. KPI Snapshot Region
- Three equal-width metric cards with title row, large value, delta (% vs last week), and sparkline/bar microvisual.

4. Finance And Traffic Analytics Region
- Dominant finance chart area with pointillist/dot-bar style visualization.
- Adjacent stat subcards for financial breakdown.
- Visitor card includes channel progress bars and semicircular radial metric.

5. Operations Region
- Table-driven queue board (queue no, appointment id, patient, department, doctor, room, status, payment).
- Real-time clinic status cards with waiting/progress/complete counts.

## Visual Signals
- Palette: near-monochrome grayscale base; accents in purple/indigo, blue, green, orange, red.
- Shape language: medium-large rounded corners, soft borders, minimal shadows.
- Typography: modern sans, strong contrast between headings and values; dense but breathable spacing.
- Data emphasis: large numerals + color-coded deltas + sparkline/mini bars + segmented widgets.

## Interaction Signals
- Segmented period control suggests immediate metric/timeframe switching.
- Search/filter/export/overflow controls indicate operational workflows.
- Cards with arrow affordances imply drill-down navigation.
- Queue and status modules imply live-refresh or frequent polling behavior.

## Uncertainties
- Exact font family, pixel-level spacing scale, and radius values are inferred visually.
- Actual hover/focus/pressed states and animation timing are not observable from static screenshot.
- True mobile adaptation pattern is hypothesized (no mobile evidence).
- Data binding/update frequency and sorting/filter logic are not inferable from image alone.
