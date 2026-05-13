---
name: frontend-project-structure-contract
description: Define and enforce a canonical frontend project directory contract for Next.js + React + TypeScript + Tailwind + shadcn/ui outputs. Use when multiple template-preparation or user-generation runs must keep a consistent frontend structure (for example frontend/src/app, components, features, styles), route-to-file placement rules, and shared-vs-feature ownership boundaries.
---

# Inputs
- Optional upstream artifacts:
- `templates/<template-name-slug>/04-frontend-component-plan.md`
- `templates/<template-name-slug>/05-nextjs-react-frontend-language.md`
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`

# Output
- Contract section(s) inserted into current stage artifact(s), or explicit contract block for downstream handoff.

# Canonical Structure Baseline
- Use `frontend/` as root for all frontend code.
- Baseline directories (unless repository conventions require a documented alternative):
- `frontend/src/app/`
- `frontend/src/components/`
- `frontend/src/components/ui/`
- `frontend/src/features/`
- `frontend/src/lib/`
- `frontend/src/hooks/`
- `frontend/src/styles/`
- `frontend/src/types/`
- `frontend/public/`

# Placement Rules
- Route files and route-level layouts must be placed under `frontend/src/app/`.
- Cross-route reusable components must be placed under `frontend/src/components/`.
- shadcn/ui primitives must be placed under `frontend/src/components/ui/` (or documented alias).
- Domain-specific UI and logic must be placed under `frontend/src/features/<domain>/`.
- Shared utilities and clients must be placed under `frontend/src/lib/`.
- Cross-feature reusable hooks must be placed under `frontend/src/hooks/`.
- Shared type contracts must be placed under `frontend/src/types/`.
- Global theme and style entrypoints must be placed under `frontend/src/styles/`.

# Theme Single-Source Rule
- Require one primary global theme file for one-step palette switching.
- Default path: `frontend/src/styles/theme.css`.
- If a different path is used, document the exact alternative path and rationale.

# Required Contract Fields
When emitting the contract, include:
- `canonical_directory_tree`
- `route_placement_rules`
- `shared_vs_feature_boundary_rules`
- `theme_entrypoint_path`
- `allowed_alternatives_and_rationale`

# Validation Checklist
- All canonical directories are present in the contract (or alternatives documented).
- Route placement rule is explicit and unambiguous.
- Shared-vs-feature ownership boundaries are explicit.
- Theme single-source path is explicit.
- Any deviations from baseline structure are justified and mapped.

# Failure Policy
- If required contract fields are missing, mark validation failure (`P1`).
- If route placement is undefined or conflicts with App Router baseline, mark validation failure (`P1`).
- If theme single-source path is missing, mark validation failure (`P1`).

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
- `structure_contract_ok`: `true|false`
- `confidence`: `high|medium|low`
- `blocking_reason`: empty when not blocked

## Professional Notes

### Scope And Non-Goals
- Define/enforce project structure contract; do not generate full frontend runtime code by itself.
- Preserve repository conventions while maintaining enforceable structure boundaries.

### Execution Workflow
1. Read available upstream artifact(s).
2. Emit or validate canonical structure contract fields.
3. Report deviations and acceptance conditions for downstream stages.

### Quality Gates
- P0: Contract block exists and is non-empty.
- P1: Structure contract fields are complete and enforceable.
- P2: Deviations and alternatives are traceable and actionable.
