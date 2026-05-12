---
name: user-generation-multi-page-template-composition
description: Compose a multi-page template strategy by matching system blueprint requirements with template indices using explainable scoring. Use when selecting a final best-fit template, mapping routes to template regions, and defining adaptation plans with responsive and component-level constraints. 适用于多页面模板选型、映射与适配规划。
---


# Inputs
- `/user-requirements/system-blueprint.md`
- template index files under `templates/*/template-index.md`

# Output
- `/user-requirements/multi-page-template-composition.md`

# Path Contract
- Requirement-related artifacts must be written under a fixed requirements folder.
- Fixed requirements folder: `/user-requirements/`
- Do not write this skill output to `docs/` by default.

# Required Sections
- `## Final Selected Template`
- `## Visual Anchor`
- `## Route To Template Mapping`
- `## Matching Scores`
- `## Adaptation Plan`
- `## Per-page Component Layout`
- `## Global Hex Color Palette`
- `## Responsive Adaptation Matrix`
- `## shadcn/ui Component Mapping`
- `## shadcn/ui Evaluation Matrix`
- `## Risks And Fallbacks`

# Final Template Disclosure Contract
- Must explicitly identify the final best-fit template for this run.
- In `## Final Selected Template`, include at least:
- `template_id`
- `template_name`
- `selection_reason` (why this is the best fit for current user requirements)
- `alternative_templates_considered` (with concise tradeoffs)
- This section is mandatory and user-facing; do not hide final selection only in internal notes.

# Responsive Adaptation Matrix Contract
- Must map each route to desktop/mobile adaptation decisions.
- Per route, include:
- Shell behavior (sidebar/header/tabs/drawer)
- Layout transform (columns to stacked flow)
- High-density widget strategy (table/chart/list fallback pattern)
- Interaction adjustments (touch targets, gesture/scroll constraints)

# shadcn/ui Component Mapping Contract
- Must map each route to concrete shadcn/ui primitives and intended usage.
- Per route, include:
- interactive_components_detected (boolean + concise evidence)
- required_components (for example `Button`, `Input`, `Textarea`, `Card`, `Tabs`, `Sheet`, `Table`)
- fallback_policy when shadcn/ui is intentionally not used for a block (must include reason)
- no_component_exemption when route has no suitable interactive components

# Section Detail Depth Template
- For `## Per-page Component Layout`, each route must include at least:
- region_partition: shell regions and functional zones
- component_tree: route-level component hierarchy and key reusable blocks
- breakpoint_changes: desktop/tablet/mobile structural transformation
- interaction_states: key interactive states for major components
- shadcn_mapping_link: link to corresponding entries in `## shadcn/ui Component Mapping`
- For `## Global Hex Color Palette`, include at least:
- semantic_tokens with explicit hex values
- token_usage_by_route: token application per route or shared shell
- emphasis_and_feedback_colors: accent/success/warning/error hex and usage boundaries
- contrast_notes for primary text/background and CTA pairs

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

## Professional Notes

### Scope And Non-Goals
- Produce explainable composition strategy; do not generate frontend code.
- Follow `system-blueprint` as hard constraint for route responsibilities.

### Execution Workflow
1. Build matching strategy and scoring dimensions.
2. Select final visual anchor template and per-route structural templates.
3. Define global style unification and shared component strategy.

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Evidence traceability, boundary compliance, and responsive assumptions are explicit.
- P2: Downstream-ready handoff notes are concise, actionable, and risk-labeled.
### Downstream Handoff
- Provide only actionable artifacts required by the immediate next stage.
- Keep assumptions, confidence, and risk flags explicit for downstream validation.

