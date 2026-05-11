---
name: template-prep-frontend-component-planner
version: 1.0.0
kind: atomic
output_format: markdown
description: Plan component architecture, boundaries, props contracts, states, and replaceable regions for a template page.
triggers:
  - template component planning
  - 前端组件规划
---

# Inputs
- `templates/<template-id>/01-page-visual-parse.md`
- `templates/<template-id>/02-uiux-design-language.md`
- `templates/<template-id>/03-design-system.md`

# Output
- `templates/<template-id>/04-frontend-component-plan.md`

# Required Sections
- `## Component Tree`
- `## Layering And Boundaries`
- `## Component Contracts`
- `## State And Interaction Rules`
- `## Responsive Behavior`
- `## Replaceable Regions`

# Failure Policy
- If no upstream artifacts: stop, do not generate from scratch.

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
- started_at:
- finished_at:
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
