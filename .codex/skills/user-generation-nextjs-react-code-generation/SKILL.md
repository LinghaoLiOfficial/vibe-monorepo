---
name: user-generation-nextjs-react-code-generation
description: Generate or modify frontend code under Next.js + React + TypeScript + Tailwind + shadcn/ui, then emit frontend-derived API contract inputs for downstream backend implementation. Use when converting approved planning outputs into frontend-first production code under strict path and tokenization contracts. 适用于前端优先实现与后端契约输入沉淀。
---

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`
- Optional template artifacts

# Required Companion Tool Skill
- Use `frontend-project-structure-contract` to validate directory and route placement compliance before finalizing.

# Outputs
- Code files under `frontend/` only
- `/user-requirements/code-generation-report.md`
- `/user-requirements/frontend-api-contract-input.md`

# Path Contract
- Frontend code must be placed under `frontend/` only.
- Requirement artifacts must be written under `/user-requirements/`.

# Execution Rules
- Reuse existing project conventions.
- Implement shared layout/components first.
- Add/modify routes and pages per composition plan.
- Use final selected template as baseline.
- Implement responsive behavior for desktop + mobile by default unless user explicitly requests desktop-only.
- Use Next.js + React + TypeScript + Tailwind CSS + shadcn/ui unless user explicitly overrides.
- Centralize global color theme in one primary theme file and support one-step palette replacement.
- Evaluate each route for suitable interactive components; adopt shadcn/ui for suitable interactive components.
- Derive API intent from implemented frontend behavior and persist as contract input artifact.
- Run `scripts/check_structure_contracts.sh` before stage completion.

# Frontend API Contract Input Contract
`/user-requirements/frontend-api-contract-input.md` must include:
- `## Slice Context`
- `## Route Interaction Inventory`
- `## Data Query And Mutation Intents`
- `## Candidate Endpoint Drafts`
- `## Request Field Draft`
- `## Response Field Draft`
- `## Error And Empty State Expectations`
- `## Auth And Permission Expectations`
- `## Idempotency And Concurrency Notes`

# Report Must Include
- Changed files
- Validation commands run
- Failures and unresolved risks
- Final selected template used for implementation (`template_id` + `template_name`)
- Responsive implementation summary by route/component
- shadcn/ui usage summary and evidence
- Per-route implemented component layout details
- Primary theme file path for one-step palette switching
- Generated API contract input artifact path and completeness result
- Structure consistency script result

# Gate Rules
- Missing `/user-requirements/frontend-api-contract-input.md` is `P1` and blocks stage completion.
- Missing required sections in contract input artifact is `P1`.
- Failing `scripts/check_structure_contracts.sh` is `P1`.

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
- `frontend_api_contract_input_ok`: `true|false`
- `structure_consistency_ok`: `true|false`
- `confidence`: `high|medium|low`
- `blocking_reason`: empty when not blocked

## Professional Notes

### Scope And Non-Goals
- Implement frontend from approved planning artifacts and produce backend-facing contract input.
- Do not implement backend in this stage.

### Quality Gates
- P0: Required outputs exist and pass required-section checks.
- P1: Frontend structure/path compliance, structure consistency script, and contract-input completeness are validated.
- P2: Handoff is actionable for `api-contract-design` stage.
