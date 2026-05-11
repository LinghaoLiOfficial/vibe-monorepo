# Design System Structurization

## Token Foundations

### Color Tokens
- `--bg-canvas`: deep navy/ink gradient backdrop
- `--surface-primary`: warm light gray (`main content`)
- `--surface-sidebar`: charcoal translucent (`left rail`)
- `--surface-card`: neutral light panel
- `--surface-card-accent`: soft peach (message notification card)
- `--text-primary`: near-black
- `--text-secondary`: medium gray
- `--text-inverse`: white
- `--accent-lime`: status/new chips
- `--accent-dark`: black CTA background
- `--border-soft`: low-contrast gray border

### Typography Tokens
- `--font-sans`: modern geometric sans (fallback: `"Inter", "Segoe UI", sans-serif`)
- `--text-xs`: metadata/date labels
- `--text-sm`: helper body and card subtitles
- `--text-md`: navigation and normal card body
- `--text-lg`: card titles
- `--text-xl`: section titles
- `--text-2xl`: page titles
- Weight scale: 400/500/600/700

### Radius And Shadow Tokens
- `--radius-shell`: 28-32px app container
- `--radius-lg`: 18-22px cards/search/button shells
- `--radius-md`: 12-14px small cards/chips
- `--radius-pill`: 999px for chips/tags
- `--shadow-soft`: subtle spread for floating cards

### Spacing Tokens
- 4px base rhythm with primary steps: 8/12/16/20/24/32
- Section spacing: 32-40px vertical between major modules
- Card internal padding: 20-24px

## Component Style Rules

### App Shell
- Centered max-width container with large radius and thin outline.
- Maintain layered feel against colorful abstract background.

### Sidebar Navigation
- Dark translucent panel; active row gets brighter panel + border.
- Icon and text left-aligned; chevron for drill-down sections.

### Command Search Bar
- Full-width rounded input with prefix icon and keyboard hint capsule.
- Neutral border; no heavy shadow to keep calm visual tone.

### Buttons And Chips
- Primary CTA: dark fill, light text, circular plus icon.
- Status chip: pastel fill with medium-weight label.

### Content Cards
- Light surfaces, soft border, rounded corners.
- Title/meta stack with optional trailing action icon.
- Support mixed content: text-only, avatar metadata, or media thumbnail.

### Calendar/Agenda Widgets
- Compact typography grid with selected-day highlight ring/fill.
- Agenda cards use lightweight border and clear time-title hierarchy.

## Responsive Rules
- `>=1200px`: three-zone layout (`sidebar / main / utility`)
- `768-1199px`: two-zone layout (`main dominant`, utility may drop below fold)
- `<=767px`: one-column stack, drawer navigation, utility widgets moved below primary feed

## Motion Guidelines
- Short transitions (`120-180ms`) for hover/active states.
- Card elevation and border tint changes on hover.
- Calendar day selection uses subtle scale/opacity feedback.
