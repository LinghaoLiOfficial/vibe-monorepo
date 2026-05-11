---
name: user-generation-visual-qa-iterative-fix
version: 1.0.0
kind: atomic
output_format: markdown
description: Run visual/code QA on generated multi-page app and iteratively apply minimal fixes.
triggers:
  - visual qa iterative fix
  - 视觉验收迭代修复
---

# Inputs
- `docs/system-blueprint.md`
- `docs/multi-page-template-composition.md`
- `docs/code-generation-report.md`
- Project codebase

# Outputs
- Code fixes
- `docs/visual-qa-iterative-fix-report.md`

# Loop
1. Detect issues (P0/P1/P2).
2. Apply minimal scoped fix.
3. Re-run available checks.
4. Repeat until pass or blocker.

# Report
- Issue list by severity
- Fixes applied
- Validation results
- Remaining risks

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
