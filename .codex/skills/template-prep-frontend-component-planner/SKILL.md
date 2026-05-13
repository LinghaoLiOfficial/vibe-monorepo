---
name: template-prep-frontend-component-planner
description: Plan frontend component architecture from prep artifacts, including component tree, boundaries, props contracts, state/interaction rules, and replaceable regions. Use when turning design-language outputs into implementation-ready component decomposition with responsive behavior expectations. 适用于将设计产物转译为组件规划与契约。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `templates/<template-name-slug>/02-uiux-design-language.md`
- `templates/<template-name-slug>/03-design-system.md`

# Outputs
- `templates/<template-name-slug>/04-frontend-component-plan.md`

# Required Sections
- `## Page To Component Tree`
- `## Boundary Decisions`
- `## Props/State Contracts`
- `## Interaction Contracts`
- `## Replaceable Regions`
- `## Responsive Behavior`

# Component Granularity Rules
- avoid page-level god components; split when a component handles more than one independent interaction concern
- each page must map to at least one layout component and one content component

# Execution
1. define component tree and boundaries
2. define props/state/interaction contracts
3. define replaceable regions and responsive behavior

# Skill-Specific Gates
- Missing per-page component layout detail is `P1`.
