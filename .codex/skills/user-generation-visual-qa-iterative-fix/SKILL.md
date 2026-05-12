---
name: user-generation-visual-qa-iterative-fix
description: Run iterative visual and code QA on generated multi-page frontend output, then apply minimal scoped fixes until acceptance gates pass. Use when validating desktop/mobile behavior, detecting regressions, and producing risk-prioritized remediation evidence. 适用于多页前端验收与最小修复闭环。
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
- Validate shadcn/ui adoption evidence against composition and code-generation reports; missing or unverifiable evidence is at least `P1` unless user explicitly opts out.
- Validate per-route shadcn/ui evaluation first; then ensure suitable interactive components use shadcn/ui. If route has no suitable interactive components, verify documented exemption.
- Validate that all required output markdown artifacts explicitly include per-page component layout details and a global hex color palette; missing either is at least `P1`.
- Validate required detail-depth fields exist in layout/palette sections:
- layout: `region_partition`, `component_tree`, `breakpoint_changes`, `interaction_states`
- palette: `semantic_tokens`, `hex_values`, `usage_rules`, `contrast_notes`
- Validate one-step theme switching: global palette changes should be achievable via one primary theme file without multi-file edits.

# Report
- Issue list by severity
- Fixes applied
- Validation results
- Remaining risks
- Viewports checked and per-viewport pass/fail summary
- shadcn/ui verification summary (pass/fail + evidence)
- per-route shadcn/ui evaluation and exemption verification table
- markdown artifact structure verification (component layout + hex palette pass/fail)
- markdown detail-depth verification (field-level pass/fail per artifact)
- one-step theme switching verification (primary file path + pass/fail + evidence)

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

## Professional Notes

### Scope And Non-Goals
- Validate generated app and apply minimal fixes; do not re-architect system from zero.
- Keep fix scope narrow and evidence-based.

### Execution Workflow
1. Run desktop/mobile (and recommended tablet) QA checks.
2. Classify issues by P0/P1/P2 and execute minimal scoped fixes.
3. Re-validate and iterate until pass or explicit blocker.

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Evidence traceability, boundary compliance, and responsive assumptions are explicit.
- P2: Downstream-ready handoff notes are concise, actionable, and risk-labeled.
### Downstream Handoff
- Provide only actionable artifacts required by the immediate next stage.
- Keep assumptions, confidence, and risk flags explicit for downstream validation.

