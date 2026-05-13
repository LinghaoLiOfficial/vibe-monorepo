---
name: user-generation-nextjs-react-code-generation
description: Generate or modify frontend code under Next.js + React + TypeScript + Tailwind + shadcn/ui based on blueprint and composition artifacts. Use when converting approved planning outputs into production-style responsive implementation under strict path and tokenization contracts. 适用于依据上游产物进行前端代码落地。
---


# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`
- Optional template artifacts

# Required Companion Tool Skill
- Use `frontend-project-structure-contract` to validate directory and route placement compliance before finalizing.
- If companion-skill validation fails, stage cannot be marked completed.

# Outputs
- Code files under `frontend/` only
- `/user-requirements/code-generation-report.md`

# Path Contract
- All generated or modified frontend-related files must be placed under `frontend/`.
- Requirement/report artifacts for this skill must be written under a fixed requirements folder.
- Fixed requirements folder: `/user-requirements/`
- Writing frontend code outside `frontend/` is a contract violation.
- Frontend implementation must satisfy the canonical structure contract from `/user-requirements/system-blueprint.md` and `/user-requirements/multi-page-template-composition.md`.

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
- Centralize global color theme in one primary theme file defined by `frontend-project-structure-contract` and consume via tokens/variables across pages.
- Support one-step palette replacement by editing the primary theme file only; avoid scattered page-level hex literals for global colors.
- Install and scaffold shadcn/ui in `frontend/` when absent and required by stack contract.
- If shadcn/ui is unavailable or blocked, mark stage `blocked` or `completed_with_risk` with explicit remediation.
- Evaluate each route for suitable interactive components before implementation; adopt shadcn/ui for all suitable interactive components by default.
- If a route has no suitable interactive components, document no-component exemption in report.
- Validate directory structure compliance before finalizing implementation.

# Report Must Include
- Changed files
- Validation commands run
- Failures and unresolved risks
- Final selected template used for implementation (`template_id` + `template_name`)
- Responsive implementation summary by route/component
- Breakpoints tested (at minimum one desktop width and one mobile width)
- TypeScript coverage summary for newly introduced modules/components
- shadcn/ui usage summary (new primitives added or reused)
- shadcn/ui evidence list (component file paths + import references)
- per-route shadcn/ui evaluation results (has_interactive_components, adopted_components, exemptions)
- per-route implemented component layout details
- global hex color palette implemented in code (tokens/variables + usage paths)
- primary theme file path for one-step palette switching
- one-step palette switching instruction (which section/keys to edit)
- per-route layout depth checklist (`region_partition`, `component_tree`, `breakpoint_changes`, `interaction_states`)
- hex palette depth checklist (`semantic_tokens`, `hex_values`, `usage_rules`, `contrast_notes`)
- frontend structure compliance summary (required directories present/missing + deviations)
- route file mapping summary (route -> implemented file path aligned with companion structure contract)

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
- shadcn/ui usage must be evidenced in generated code (imports from `@/components/ui/*` or documented equivalent alias path); otherwise severity at least `P1` unless user explicitly opts out.
- For routes with suitable interactive components, missing shadcn/ui adoption is at least `P1` unless user explicitly opts out.
- Routes with no suitable interactive components may be exempt, but exemption evidence is mandatory.
- Missing required detail depth in component layout or hex palette sections is at least `P1`.
- If global palette cannot be switched by editing one primary theme file, severity is at least `P1`.
- If companion structure contract requirements are not met without documented allowed alternatives, severity is at least `P1`.

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
- `component_layout_section_ok`: `true|false`
- `hex_palette_section_ok`: `true|false`
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
- Implement code from approved planning artifacts; avoid planning-stage rewrites.
- Respect repository conventions and strict `frontend/` output boundary.

### Execution Workflow
1. Read blueprint/composition artifacts and derive implementation checklist.
2. Build shared layout/theme/components first, then route pages.
3. Validate run/build/type/lint where available and record evidence.

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Evidence traceability, boundary compliance, and responsive assumptions are explicit.
- P2: Downstream-ready handoff notes are concise, actionable, and risk-labeled.
### Downstream Handoff
- Provide only actionable artifacts required by the immediate next stage.
- Keep assumptions, confidence, and risk flags explicit for downstream validation.
