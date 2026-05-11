---
name: user-generation-nextjs-react-code-generation
version: 1.1.0
kind: atomic
output_format: markdown
description: Generate/modify Next.js + React code according to blueprint and template composition outputs.
triggers:
  - nextjs react code generation
  - 代码生成
---

# Inputs
- `docs/system-blueprint.md`
- `docs/multi-page-template-composition.md`
- Optional template artifacts

# Outputs
- Code files under project source directories
- `docs/code-generation-report.md`

# Execution Rules
- Reuse existing project conventions.
- Implement shared layout/components first.
- Add/modify routes and pages per composition plan.
- Run available validations.
- Implement responsive behavior for desktop + mobile by default unless user explicitly requests desktop-only.
- Use explicit breakpoint behavior for shell, page grids, and data-heavy components.

# Report Must Include
- Changed files
- Validation commands run
- Failures and unresolved risks
- Responsive implementation summary by route/component
- Breakpoints tested (at minimum one desktop width and one mobile width)

# Responsive Implementation Minimum
- Navigation shell adapts across breakpoints (for example sidebar -> drawer/sheet on mobile).
- Data tables provide mobile fallback (horizontal scroll, cardified rows, or prioritized columns).
- Charts remain legible on mobile (resized, simplified labels, or alternate summary views).
- Touch targets and spacing are adjusted for mobile usability.

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
