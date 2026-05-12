---
name: user-generation-system-blueprint
description: Convert user requirements into a system blueprint for multi-page app generation.
---


# Inputs
- `/user-requirements/user-requirement.md` (or equivalent requirement doc)
- Optional: template library context

# Output
- `/user-requirements/system-blueprint.md`

# Path Contract
- Requirement-related artifacts must be written under a fixed requirements folder.
- Fixed requirements folder: `/user-requirements/`
- Do not write this skill output to `docs/` by default.

# Required Sections
- `## Scope`
- `## Roles`
- `## Page Inventory`
- `## Route Map`
- `## Core Flows`
- `## Per-page Component Layout`
- `## Cross-page Consistency Rules`
- `## Global Hex Color Palette`
- `## Responsive Strategy`
- `## Frontend Stack Contract`
- `## Assumptions`

# Responsive Defaults
- Unless explicitly overridden by user requirement, define dual-target delivery:
- Desktop: `>=1200px`
- Mobile: `<=767px`
- Optional but recommended: tablet `768-1199px`
- In `## Responsive Strategy`, include at least:
- Navigation behavior across breakpoints
- Layout stacking/reflow rules per page type
- Data-dense component degradation rules (tables/charts/cards/forms)

# Frontend Stack Contract Defaults
- Unless explicitly overridden by user requirement, define implementation baseline:
- Next.js + React + TypeScript + Tailwind CSS + shadcn/ui
- In `## Frontend Stack Contract`, include at least:
- TypeScript strictness policy and shared type ownership boundaries
- Tailwind token usage constraints (design tokens -> utility mapping)
- shadcn/ui adoption policy (preferred primitives and customization boundaries)
- Required shadcn/ui baseline mapping by page archetype (for example auth form, card grid, list/editor shell)
- Per-page interactive component assessment method (identify suitable interactive components first, then adopt shadcn/ui where applicable; document exemption when no suitable components exist)
- Single-source theme ownership rule: global palette tokens must be owned by one primary theme file and referenced by all routes/components.

# Section Detail Depth Template
- For `## Per-page Component Layout`, each route must include at least:
- region_partition: header/sidebar/main/footer or equivalent zones
- component_tree: page-level to block-level component hierarchy (concise tree)
- breakpoint_changes: desktop/tablet/mobile layout changes
- interaction_states: default/hover/focus/active/disabled/loading/error states (as applicable)
- shadcn_mapping: components used or explicit no-component exemption reason
- For `## Global Hex Color Palette`, include at least:
- semantic_tokens: primary/secondary/accent/background/surface/border/text/success/warning/error
- hex_values: explicit `#RRGGBB` or `#RRGGBBAA` values for each token
- usage_rules: where each token is applied (shell/card/form/nav/feedback)
- contrast_notes: concise accessibility contrast rationale for key text/background pairs
- single_source_theme_file: required path proposal for the one-file theme switch entrypoint

# Execution Status Schema
Use these statuses in run logs or reports:
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

# Artifact Contract
- `artifact_path`: absolute or repo-relative output file path
- `artifact_exists`: `true|false`
- `artifact_non_empty`: `true|false`
- `required_sections_ok`: `true|false`
- `component_layout_section_ok`: `true|false`
- `hex_palette_section_ok`: `true|false`
- `confidence`: `high|medium|low`
- `blocking_reason`: empty when not blocked

# Standard Report Template
```markdown
# <skill-name> Execution Report

## 1. Run Metadata
- skill_name:
- template_id_or_task_id:
- status:

## 2. Inputs
- files_read:
- missing_inputs:

## 3. Outputs
- artifact_path:
- artifact_exists:
- artifact_non_empty:
- required_sections_ok:

## 4. Validation
- checks_run:
- checks_passed:
- checks_failed:

## 5. Risks And Uncertainties
- confidence:
- assumptions:
- unresolved_items:

## 6. Next Handoff
- next_skill:
- handoff_notes:
```
