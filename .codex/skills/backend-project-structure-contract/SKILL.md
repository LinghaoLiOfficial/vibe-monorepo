---
name: backend-project-structure-contract
description: Define and enforce a canonical backend project directory contract aligned to this repository's FastAPI minimal skeleton under backend/app. Use when API-contract, backend code-generation, and integration QA stages must keep stable module boundaries and migration/test layout. 适用于对齐当前仓库后端最小骨架的目录契约。
---

# Inputs
- Optional upstream artifacts:
- `/user-requirements/system-blueprint.md`
- `/user-requirements/frontend-api-contract-input.md`
- `/user-requirements/api-contract.md`

# Output
- Contract section(s) inserted into current stage artifact(s), or explicit contract block for downstream handoff.

# Canonical Structure Baseline (Current Repo)
- Use `backend/` as root for backend code.
- Baseline directories:
- `backend/app/api/`
- `backend/app/application/`
- `backend/app/domain/`
- `backend/app/infrastructure/`
- `backend/app/core/`
- `backend/app/schemas/`
- `backend/alembic/`
- `backend/tests/`

# Extendable Directories (Optional, Add When Needed)
- `backend/app/utils/`
- `backend/app/infrastructure/cache/`
- `backend/app/infrastructure/queue/`
- `backend/app/infrastructure/storage/`

# Placement Rules
- HTTP route handlers and router wiring must be under `backend/app/api/`.
- Use case orchestration, ports, services, and DTOs must be under `backend/app/application/`.
- Business entities/rules/policies must be under `backend/app/domain/`.
- DB repositories and external adapters must be under `backend/app/infrastructure/`.
- App bootstrap/config/logging/middleware/security/observability must be under `backend/app/core/`.
- API request/response schemas must be under `backend/app/schemas/`.
- Migration files must be generated under `backend/alembic/`.
- Unit/integration tests must be under `backend/tests/`.

# Required Contract Fields
- `canonical_directory_tree`
- `layer_boundary_rules`
- `contract_schema_ownership_rules`
- `migration_policy`
- `test_layout_rules`
- `allowed_alternatives_and_rationale`

# Validation Checklist
- Current-repo baseline directories are present in contract.
- Layer boundaries are explicit and enforceable.
- Migration and test policy are explicit.

# Failure Policy
- Missing required contract fields is `P1`.
- Missing layer boundary or migration policy is `P1`.

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
