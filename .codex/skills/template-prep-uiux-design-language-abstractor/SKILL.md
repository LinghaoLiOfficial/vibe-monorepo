---
name: template-prep-uiux-design-language-abstractor
version: 1.0.0
kind: atomic
output_format: markdown
description: Abstract UI/UX design language from visual-parse markdown into reusable UX intent and interaction principles.
triggers:
  - uiux design language abstraction
  - UI/UX 设计语言抽象
---

# Inputs
- `templates/<template-id>/01-page-visual-parse.md`

# Output
- `templates/<template-id>/02-uiux-design-language.md`

# Steps
1. Read visual parse.
2. Abstract UX intent, IA signals, interaction priorities, accessibility expectations.
3. Output structured markdown.
4. Validate required sections.

# Required Sections
- `## UX Intent`
- `## Information Architecture Signals`
- `## Interaction Principles`
- `## Assumptions And Uncertainties`

# Failure Policy
- If upstream file missing: stop.
- If evidence insufficient: mark low confidence explicitly.

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
