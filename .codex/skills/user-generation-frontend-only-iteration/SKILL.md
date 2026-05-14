---
name: user-generation-frontend-only-iteration
description: Apply frontend-only page and interaction updates under Next.js + React + TypeScript + Tailwind + shadcn/ui while enforcing strict no-backend and no-database modification boundaries. Use when users request UI/UX, layout, copy, or client-side behavior changes that should not require API or schema updates. 适用于仅前端页面与交互修改场景。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- Frontend change request and affected routes/components.
- Existing frontend artifacts under `frontend/`.

# Outputs
- frontend code updates under `frontend/`
- `/user-requirements/frontend-only-iteration-report.md`

# Boundary Contract
- allowed changes: UI components, routes, styles, client-side state/validation, frontend copy.
- disallowed changes: backend business logic, API surface contract, database schema/data mutation scripts.
- if disallowed changes are required to satisfy request, escalate to `user-generation-fullstack-requirement-evolution`.

# Execution
1. implement minimal frontend delta.
2. verify no backend or DB file changes are needed.
3. run frontend validation and structure checks.
4. emit escalation recommendation if boundaries are violated.

# Skill-Specific Gates
- Must run `scripts/check_structure_contracts.sh`.
- Must run in `frontend/`: `pnpm type-check`, `pnpm build`.
- Must include changed-file scope proof showing frontend-only ownership.
- Any required API/DB change discovered during implementation is `P1` until escalated.

# Validation Modes
- `quick`: may run `pnpm type-check` only for tight loops; cannot mark final `completed`.
- `full`: requires all listed gates and is required for completion.

# Report Minimum
- changed frontend areas
- boundary check result (`pass` or `escalate`)
- validation evidence and command exit codes
- escalation recommendation when applicable
