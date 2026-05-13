---
name: frontend-project-structure-contract
description: Define and enforce a canonical frontend project directory contract for Next.js + React + TypeScript + Tailwind outputs in this repository. Use when template-preparation or user-generation runs must keep generated frontend code aligned to the actual minimal skeleton under frontend/src. 适用于对齐当前仓库前端最小骨架的目录契约。
---

# Inputs
- Optional upstream artifacts:
- `templates/<template-name-slug>/04-frontend-component-plan.md`
- `templates/<template-name-slug>/05-nextjs-react-frontend-language.md`
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`

# Output
- Contract section(s) inserted into current stage artifact(s), or explicit contract block for downstream handoff.

# Canonical Structure Baseline (Current Repo)
- Use `frontend/` as root for all frontend code.
- Baseline directories:
- `frontend/src/app/`
- `frontend/src/lib/`
- `frontend/public/` (optional when no static assets yet)

# Extendable Directories (Optional, Add When Needed)
- `frontend/src/styles/`
- `frontend/src/components/`
- `frontend/src/components/ui/`
- `frontend/src/features/`
- `frontend/src/hooks/`
- `frontend/src/types/`

# Placement Rules
- Route files and route-level layouts must be placed under `frontend/src/app/`.
- Shared infra utilities (api client, providers, env helpers) must be placed under `frontend/src/lib/`.
- Frontend HTTP client wrappers should be placed under `frontend/src/lib/api/`; do not create `frontend/src/api/` to avoid ambiguity with App Router `app/api`.
- The single global style entrypoint must be `frontend/src/app/globals.css` and must be imported by root layout.
- `frontend/src/styles/` may be used for split theme tokens or modular style files, but must not replace the global entrypoint.
- If `components`/`features` are introduced, domain-specific logic must stay in `features`, shared UI in `components`.

# Good/Bad Examples
- Good: `frontend/src/app/dashboard/page.tsx` (route page), `frontend/src/lib/api/users.ts` (client wrapper), `frontend/src/features/auth/login-form.tsx` (domain UI logic).
- Bad: `frontend/src/components/dashboard/page.tsx` (route misplaced), `frontend/src/api/users.ts` (ambiguous with App Router API routes), `frontend/src/styles/theme.css` as global entrypoint replacement.

# Theme Single-Source Rule
- Require one primary global theme file for one-step palette switching.
- Fixed path for this repository: `frontend/src/app/globals.css`.
- Alternative global entrypoint paths are not allowed to avoid drift from the minimal skeleton.

# Required Contract Fields
When emitting the contract, include:
- `canonical_directory_tree`
- `route_placement_rules`
- `shared_vs_feature_boundary_rules`
- `theme_entrypoint_path`
- `allowed_alternatives_and_rationale` (must state `none` for global style entrypoint path)

# Validation Checklist
- Current-repo baseline directories are present in the contract.
- Route placement rule is explicit and unambiguous.
- Theme single-source path is explicit and equals `frontend/src/app/globals.css`.
- Any optional structure extensions are documented and justified.
- API wrapper placement rule explicitly distinguishes `src/lib/api` from App Router `src/app/api`.

# Failure Policy
- Missing required contract fields is `P1`.
- Route placement undefined/conflicting with App Router baseline is `P1`.
- Theme single-source path missing is `P1`.
- Defining frontend HTTP wrappers under `frontend/src/api/` is `P2`.

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
- `structure_contract_ok`
- `confidence`
- `blocking_reason`
