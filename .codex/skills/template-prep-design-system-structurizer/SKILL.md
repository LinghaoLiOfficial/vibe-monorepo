---
name: template-prep-design-system-structurizer
version: 1.0.0
kind: atomic
output_format: markdown
description: Convert visual parse + UI/UX abstraction into template-level design system tokens and style rules.
triggers:
  - template design system structuring
  - 模板设计系统结构化
---

# Inputs
- `templates/<template-id>/01-page-visual-parse.md`
- `templates/<template-id>/02-uiux-design-language.md`

# Output
- `templates/<template-id>/03-design-system.md`

# Required Sections
- `## Token Taxonomy`
- `## Color System`
- `## Typography System`
- `## Spacing Radius Shadow Border`
- `## Component Style Baselines`
- `## Reuse Constraints`

# Validation
- File exists and non-empty
- All required sections present

# Failure Policy
- Missing one upstream file: allow degraded output with explicit risk note.

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
