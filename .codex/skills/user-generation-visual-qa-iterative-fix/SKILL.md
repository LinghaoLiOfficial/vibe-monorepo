---
name: user-generation-visual-qa-iterative-fix
description: Run iterative visual QA after fullstack integration acceptance and apply minimal UI-focused fixes until responsive and presentation gates pass. Use when frontend-first fullstack runs already passed integration QA and need final visual-quality closure. 适用于全栈联调通过后的视觉验收与最小修复闭环。
---

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`
- `/user-requirements/code-generation-report.md`
- `/user-requirements/fullstack-integration-qa-report.md`
- Project codebase

# Outputs
- Frontend-focused minimal code fixes
- `/user-requirements/visual-qa-iterative-fix-report.md`

# Path Contract
- Frontend code fixes must be applied under `frontend/` only unless integration report proves backend-side fix is strictly required for visual correctness.
- Requirement/report artifacts must be written under `/user-requirements/`.

# Precondition Gate
- `fullstack-integration-qa` must be completed first.
- Missing `/user-requirements/fullstack-integration-qa-report.md` is `P1` and blocks this stage.

# Loop
1. Detect visual/responsive issues (P0/P1/P2).
2. Apply minimal scoped fix.
3. Re-run available checks.
4. Repeat until pass or blocker.

# Required QA Coverage
- Validate desktop and mobile by default (unless explicitly desktop-only requirement).
- Minimum viewport checks:
- Desktop: one representative width `>=1200px`
- Mobile: one representative width `<=767px`
- Recommended: tablet check `768-1199px`
- Responsive regressions that break task-critical flow are at least `P1`.
- Desktop root/shell must fill viewport width by default; fixed/max-width gutters are at least `P1` unless explicitly required.
- Validate final report keeps explicit final template disclosure (`template_id` + `template_name` + concise reason).
- Validate shadcn/ui adoption evidence against composition and code-generation reports.
- Validate required markdown structure/depth checks still pass (component layout + hex palette).
- Validate one-step theme switching remains valid after fixes.

# Report
- Issue list by severity
- Fixes applied
- Validation results
- Remaining risks
- Viewports checked and per-viewport pass/fail summary
- shadcn/ui verification summary (pass/fail + evidence)
- markdown artifact structure and detail-depth verification summary
- one-step theme switching verification
- dependency check result for `fullstack-integration-qa-report.md`

# Execution Status Schema
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

# Artifact Contract
- `artifact_path`
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `integration_precondition_ok`
- `confidence`
- `blocking_reason`

## Professional Notes

### Scope And Non-Goals
- Focus on visual and responsive polish after integration acceptance.
- Do not re-open backend architecture or broad contract redesign in this stage.

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Integration precondition and responsive/visual constraints are verified.
- P2: Remaining risks and fallback actions are explicit.
