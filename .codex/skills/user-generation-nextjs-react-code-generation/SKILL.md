---
name: user-generation-nextjs-react-code-generation
version: 1.2.0
kind: atomic
output_format: markdown
description: Generate/modify Next.js + React + TypeScript + Tailwind CSS + shadcn/ui code according to blueprint and template composition outputs.
triggers:
  - nextjs react code generation
  - 代码生成
---

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`
- Optional template artifacts

# Outputs
- Code files under `frontend/` only
- `/user-requirements/code-generation-report.md`

# Path Contract
- All generated or modified frontend-related files must be placed under `frontend/`.
- Requirement/report artifacts for this skill must be written under a fixed requirements folder.
- Fixed requirements folder: `/user-requirements/`
- Writing frontend code outside `frontend/` is a contract violation.

# Execution Rules
- Reuse existing project conventions.
- Implement shared layout/components first.
- Add/modify routes and pages per composition plan.
- Run available validations.
- Use the final best-fit template explicitly selected in `/user-requirements/multi-page-template-composition.md` as implementation baseline.
- Implement responsive behavior for desktop + mobile by default unless user explicitly requests desktop-only.
- Use explicit breakpoint behavior for shell, page grids, and data-heavy components.
- Default implementation stack is Next.js + React + TypeScript + Tailwind CSS + shadcn/ui unless user explicitly overrides.
- Prefer TypeScript-first component and data contracts; avoid introducing untyped API surfaces.
- Prefer shadcn/ui primitives before custom base components when requirements are compatible.
- Use Tailwind utility + token mapping from design artifacts; avoid hardcoded visual values when token exists.

# Report Must Include
- Changed files
- Validation commands run
- Failures and unresolved risks
- Final selected template used for implementation (`template_id` + `template_name`)
- Responsive implementation summary by route/component
- Breakpoints tested (at minimum one desktop width and one mobile width)
- TypeScript coverage summary for newly introduced modules/components
- shadcn/ui usage summary (new primitives added or reused)

# Responsive Implementation Minimum
- Navigation shell adapts across breakpoints (for example sidebar -> drawer/sheet on mobile).
- Data tables provide mobile fallback (horizontal scroll, cardified rows, or prioritized columns).
- Charts remain legible on mobile (resized, simplified labels, or alternate summary views).
- Touch targets and spacing are adjusted for mobile usability.
- Desktop (`>=1200px`) shell/page root should be full-width by default (fill viewport width).
- Do not keep fixed `max-width` or centered container constraints at app shell/root level unless requirement explicitly asks for a constrained centered layout.

# Stack Compliance Minimum
- TypeScript is enabled for new/modified React modules; avoid `any` unless justified in report.
- Tailwind CSS drives layout/spacing/typography/color decisions aligned to tokens.
- shadcn/ui components are used for common primitives (button, input, dialog/sheet, table, select) unless existing design system requires alternatives.

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
