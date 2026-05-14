---
name: user-generation-backend-only-iteration
description: Apply backend-only logic, validation, performance, or handler changes within existing module boundaries while maintaining API compatibility and avoiding frontend/database-scope drift unless explicitly escalated. Use when users request server-side behavior updates without intended UI redesign. 适用于仅后端逻辑与接口行为调整场景。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- Backend change request and target modules/endpoints.
- Existing contract artifacts under `/user-requirements/` when available.

# Outputs
- backend code updates under `backend/`
- `/user-requirements/backend-only-iteration-report.md`

# Boundary Contract
- allowed changes: service logic, validators, handlers, internal performance/safety improvements, non-breaking API behavior refinements.
- disallowed changes without escalation: frontend code changes, breaking API contract changes, database schema changes.
- if request implies API contract break or coordinated frontend updates, escalate to `user-generation-fullstack-requirement-evolution`.

# Execution
1. implement minimal backend delta in scoped modules.
2. run compatibility checks against current API expectations.
3. run backend quality/test gates and structure checks.
4. document escalation when backend-only scope is insufficient.

# Skill-Specific Gates
- Must run `scripts/check_structure_contracts.sh`.
- Must run in `backend/`: `uv run ruff check .`, `uv run ruff format --check .`, `uv run mypy app tests`, `uv run pytest -q`.
- Must include API compatibility statement (`compatible` or `breaking`).
- Breaking change without escalation is `P1`.

# Validation Modes
- `quick`: allow `uv run ruff check .` + targeted pytest for iteration loops.
- `full`: required for completion.

# Report Minimum
- changed backend modules/endpoints
- compatibility statement and evidence
- validation evidence and command exit codes
- escalation recommendation when applicable
