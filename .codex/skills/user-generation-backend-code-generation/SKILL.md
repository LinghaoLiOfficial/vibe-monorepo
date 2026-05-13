---
name: user-generation-backend-code-generation
description: Generate or modify backend code based on approved API contracts for frontend-first iterative fullstack delivery. Use when backend implementation must strictly follow the current slice API contract and backend structure boundaries. 适用于契约驱动的后端代码生成。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/api-contract.md`
- `/user-requirements/frontend-api-contract-input.md`

# Outputs
- backend code under `backend/`
- `/user-requirements/backend-code-generation-report.md`

# Execution
1. Read `docs/BACKEND_SPEC.md`.
2. Implement only current slice and follow approved API contract.
3. Keep module boundaries and migration mechanism.
4. Run structure and backend quality checks.

# Skill-Specific Gates
- Must run `scripts/check_structure_contracts.sh`.
- Must run `uv run ruff check .`, `uv run ruff format --check .`, `uv run mypy app tests`, `uv run pytest -q` in `backend/`.
- Contract/backend mismatch, missing NFR snapshot, or missing rollback summary is `P1`.
