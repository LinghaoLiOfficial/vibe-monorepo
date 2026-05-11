---
name: user-generation-system-blueprint
version: 1.0.0
kind: atomic
output_format: markdown
description: Convert user requirements into a system blueprint for multi-page app generation.
triggers:
  - system blueprint
  - 系统蓝图
---

# Inputs
- `inputs/user-requirement.md` (or equivalent requirement doc)
- Optional: template library context

# Output
- `docs/system-blueprint.md`

# Required Sections
- `## Scope`
- `## Roles`
- `## Page Inventory`
- `## Route Map`
- `## Core Flows`
- `## Cross-page Consistency Rules`
- `## Assumptions`

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
