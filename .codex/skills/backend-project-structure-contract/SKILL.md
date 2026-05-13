---
name: backend-project-structure-contract
description: Define and enforce a canonical backend project directory contract for iterative fullstack delivery. Use when API-contract, backend code-generation, and integration QA stages must share stable backend boundaries for modules, migrations, shared contracts, and test layout. 适用于后端目录与边界契约统一。
---

# Inputs
- Optional upstream artifacts:
- `/user-requirements/system-blueprint.md`
- `/user-requirements/frontend-api-contract-input.md`
- `/user-requirements/api-contract.md`

# Output
- Contract section(s) inserted into current stage artifact(s), or explicit contract block for downstream handoff.

# Canonical Structure Baseline
- Use `backend/` as root for backend code.
- Baseline directories:
- `backend/src/modules/`
- `backend/src/shared/`
- `backend/src/contracts/`
- `backend/src/app/`
- `backend/migrations/` (or documented ORM migration directory)
- `backend/tests/`

# Placement Rules
- Domain modules must be placed under `backend/src/modules/<domain>/`.
- Cross-domain utilities (errors, logger, config, auth core) must be under `backend/src/shared/`.
- API contracts and DTO schemas must be under `backend/src/contracts/`.
- App bootstrap and server wiring must be under `backend/src/app/`.
- Migration files must be generated under migration directory only.
- Integration/e2e tests must be under `backend/tests/`.

# Required Contract Fields
- `canonical_directory_tree`
- `module_boundary_rules`
- `contract_ownership_rules`
- `migration_policy`
- `test_layout_rules`
- `allowed_alternatives_and_rationale`

# Validation Checklist
- Canonical directories are present in contract (or alternatives documented).
- Module/shared boundaries are explicit.
- Contract ownership and migration policy are explicit.

# Failure Policy
- Missing required contract fields is `P1`.
- Missing module boundary or migration policy is `P1`.

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
