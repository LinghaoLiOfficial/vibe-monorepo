# Page Visual Parse

## Summary
A clean, light-themed project management dashboard for Donezo with a fixed left sidebar, top utility bar, KPI cards, mixed analytics widgets, a task/project list, and a dark promotional timer card. The page is optimized for quick operational scanning and action.

## Page Type
- Type: SaaS productivity / project management dashboard
- Primary user goals: monitor project status, inspect team progress, launch actions, and track time-sensitive work
- Information density: medium-high, card-based, highly modular

## Desktop Evidence
- Large rounded app shell on a soft gray background.
- Left sidebar with brand, grouped navigation, active item highlight, and a promo/download card at the bottom.
- Top header with search field, keyboard shortcut hint, message/notification icons, and user profile block.
- Hero row with page title, helper text, and primary/secondary actions (`Add Project`, `Import Data`).
- KPI row of four cards: Total Projects, Ended Projects, Running Projects, Pending Project.
- Middle row includes a weekly project analytics bar chart, a reminders card with meeting CTA, and a project list card with a `+ New` button.
- Bottom row includes team collaboration list, project progress gauge, and a time tracker card.
- Visual hierarchy strongly favors page title, KPI counts, and the active chart/gauge.

## Mobile Evidence Or Hypothesis
No mobile screenshot provided. Hypothesis for <=767px:
- Sidebar collapses into a drawer or compact top nav trigger.
- Search, utility icons, and profile compress into a single wrapped top bar.
- Hero actions stack vertically or become full-width pills.
- KPI cards collapse to a one-column stack or two-up grid.
- Analytics, reminders, project list, team collaboration, progress, and timer cards stack in a single vertical feed.
- Table-like project rows simplify to compact list items with the due date preserved.

## Region Breakdown
1. App Shell Region
- Rounded container with outer margin and subtle elevation.

2. Sidebar Region
- Brand mark and wordmark
- Menu section with Dashboard, Tasks, Calendar, Analytics, Team
- General section with Settings, Help, Logout
- Promo/download card at bottom

3. Global Utility Region
- Search input with shortcut badge
- Message and notification icon buttons
- User avatar, name, and email

4. Hero Action Region
- Page title: Dashboard
- Supporting subtitle
- Primary CTA: Add Project
- Secondary CTA: Import Data

5. KPI Summary Region
- Four metric cards with labels, values, and status copy
- First card uses dark green gradient emphasis

6. Analytics Region
- Weekly project analytics bar chart with striped pending bars and solid completed bars
- Weekday labels along the bottom

7. Reminder Region
- Meeting card with time window and Start Meeting action

8. Project List Region
- Task/project rows with icon, title, due date, and `+ New` affordance

9. Team Collaboration Region
- Avatar-based list of collaborators with task/status chips

10. Progress Region
- Semi-donut gauge with percentage and legend

11. Timer Region
- Dark, textured time tracker card with play/pause-style controls

## Visual Signals
- Color language: soft neutrals for structure, deep emerald green for primary emphasis, pastel status accents, dark near-black for the timer card.
- Shape language: large corner radii, pill buttons, rounded avatar chips, soft card borders.
- Typography: bold black headings, oversized numerals, muted helper text, compact status tags.
- Pattern language: striped bars indicate pending state; gradient fills indicate progress/completion.
- Atmosphere: calm, polished, premium, slightly playful through avatars and gradients.

## Interaction Signals
- Primary interactions: navigation, search, project creation, import, meeting start, new item creation, timer control.
- Likely hover states on sidebar items, row actions, icon buttons, and CTA pills.
- Dashboard cards appear tappable/clickable for drill-down.
- Status chips imply filtering or status inspection.

## Uncertainties
- Exact font family, icon library, and spacing scale are inferred.
- The analytics chart data semantics are not fully labeled beyond visual state.
- Motion, hover, and timer behavior are not observable from the static screenshot.
- Mobile behavior is hypothesis-only because no mobile screenshot was provided.
