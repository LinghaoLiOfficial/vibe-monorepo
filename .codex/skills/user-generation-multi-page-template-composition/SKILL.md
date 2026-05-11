---
name: user-generation-multi-page-template-composition
version: 1.1.0
kind: atomic
output_format: markdown
description: Compose a multi-page template plan from blueprint + template index with explainable matching.
triggers:
  - multi-page template composition
  - 多页模板组合
---

# Inputs
- `docs/system-blueprint.md`
- template index files under `templates/*/template-index.md`

# Output
- `docs/multi-page-template-composition.md`

# Required Sections
- `## Visual Anchor`
- `## Route To Template Mapping`
- `## Matching Scores`
- `## Adaptation Plan`
- `## Responsive Adaptation Matrix`
- `## Risks And Fallbacks`

# Responsive Adaptation Matrix Contract
- Must map each route to desktop/mobile adaptation decisions.
- Per route, include:
- Shell behavior (sidebar/header/tabs/drawer)
- Layout transform (columns to stacked flow)
- High-density widget strategy (table/chart/list fallback pattern)
- Interaction adjustments (touch targets, gesture/scroll constraints)

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
