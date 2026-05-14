---
name: user-generation-fullstack-requirement-evolution
description: Implement incremental requirement changes that may modify frontend, backend, and database while preserving frontend-first contract discipline, migration safety, and fullstack acceptance evidence. Use when users add or revise business requirements that cross UI, API, and persistence boundaries after initial generation. 适用于新增需求导致前后端与数据库联动变更的增量全栈实现。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Upstream Skills To Reuse
1. `user-generation-nextjs-react-code-generation`
2. `user-generation-api-contract-design`
3. `user-generation-backend-code-generation`
4. `user-generation-fullstack-integration-qa`

# Inputs
- Change request slice and acceptance criteria.
- Existing `/user-requirements/api-contract.md` if present.
- Existing frontend/backend reports for impact analysis.

# Outputs
- updated frontend/backend/database artifacts for current slice
- `/user-requirements/fullstack-requirement-evolution-report.md`
- `/user-requirements/frontend-architecture.md`
- `/user-requirements/backend-architecture.md`
- `/user-requirements/database-architecture.md`

# Architecture Snapshot Contract
- Refresh the three architecture snapshots after implementation and verification.
- Use the same fixed dimensions required by orchestrator skills.
- `## Metadata` must include `last_updated` (ISO-8601), `change_summary`, and `open_risks`.

# Execution
1. scope delta and identify impacted UI/API/DB entities.
2. implement frontend delta and refresh frontend-derived API intent.
3. update API contract with compatibility analysis.
4. implement backend and migration/data changes for the same slice only.
5. run integration QA and fullstack startup verification.

# Database Change Policy
- if schema changes are required, add explicit migration and rollback notes.
- if only data corrections are required, provide deterministic script/query evidence.
- every DB-touching change must include impact scope and recovery steps.

# Skill-Specific Gates
- Must run `scripts/check_structure_contracts.sh`.
- Must run frontend checks in `frontend/`: `pnpm type-check`, `pnpm build`.
- Must run backend checks in `backend/`: `uv run ruff check .`, `uv run ruff format --check .`, `uv run mypy app tests`, `uv run pytest -q`.
- Must verify root fullstack startup contract: `docker compose up --build`.
- Missing contract update, migration safety evidence, or integration evidence is `P1`.
- Missing or non-conforming architecture snapshots is `P1`.

# Validation Modes
- `quick`: allow targeted checks for iteration loops; must list skipped checks explicitly.
- `full`: required for completion.

# Report Minimum
- delta scope map (`frontend`, `api`, `backend`, `database`)
- compatibility decision (`compatible` or `breaking` with migration action)
- command evidence with exit codes
- blocker/risk summary and next handoff
