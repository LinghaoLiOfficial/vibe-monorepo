---
name: template-prep-uiux-design-language-abstractor
description: Abstract UI/UX design language from visual-parse markdown into reusable UX intent and interaction principles.
---


# Inputs

# Naming Convention (Mandatory)
- Use <template-name-slug> (human-readable kebab-case) for all paths and identifiers.
- Do not use hash/code-like IDs as template naming.
- If upstream artifacts use hash/code-like naming, stop and request normalization to <template-name-slug> before continuing.

- `templates/<template-name-slug>/01-page-visual-parse.md`

# Output
- `templates/<template-name-slug>/02-uiux-design-language.md`

# Steps
1. Read visual parse.
2. Abstract UX intent, IA signals, interaction priorities, accessibility expectations.
3. Output structured markdown.
4. Validate required sections.

# Required Sections
- `## UX Intent`
- `## Information Architecture Signals`
- `## Interaction Principles`
- `## Responsive Intent (Desktop + Mobile)`
- `## Assumptions And Uncertainties`

# Failure Policy
- If template naming is not <template-name-slug> consistent across required inputs/outputs: stop and request rename normalization.
- If upstream file missing: stop.
- If evidence insufficient: mark low confidence explicitly.
- If mobile evidence is absent upstream, produce hypothesis-based responsive intent and mark `completed_with_risk`.

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
- template_name_slug:
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
