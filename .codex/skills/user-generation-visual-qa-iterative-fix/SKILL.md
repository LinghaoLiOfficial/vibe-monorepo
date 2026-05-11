---
name: user-generation-visual-qa-iterative-fix
version: 1.1.0
kind: atomic
output_format: markdown
description: Run visual/code QA on generated multi-page app and iteratively apply minimal fixes.
triggers:
  - visual qa iterative fix
  - 视觉验收迭代修复
---

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`
- `/user-requirements/code-generation-report.md`
- Project codebase

# Outputs
- Code fixes
- `/user-requirements/visual-qa-iterative-fix-report.md`

# Path Contract
- Frontend code fixes must be applied under `frontend/` only.
- Requirement/report artifacts for this skill must be written under a fixed requirements folder.
- Fixed requirements folder: `/user-requirements/`

# Loop
1. Detect issues (P0/P1/P2).
2. Apply minimal scoped fix.
3. Re-run available checks.
4. Repeat until pass or blocker.

# Required QA Coverage
- Validate both desktop and mobile by default (unless explicitly desktop-only requirement).
- Minimum viewport checks:
- Desktop: one representative width `>=1200px`
- Mobile: one representative width `<=767px`
- Recommended: tablet check `768-1199px`
- Responsive regressions are at least P1 severity when they break task-critical flow.
- Desktop root/shell must visually fill viewport width by default; left-right blank gutters caused by fixed/max container constraints are at least `P1` unless requirement explicitly mandates centered constrained layout.
- Validate that final user-facing reports explicitly disclose the selected best-fit template (`template_id` + `template_name` + concise reason); missing disclosure is at least `P1`.

# Report
- Issue list by severity
- Fixes applied
- Validation results
- Remaining risks
- Viewports checked and per-viewport pass/fail summary

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
