---
name: user-generation-backend-code-generation
description: Generate or modify backend code based on approved API contracts for frontend-first iterative fullstack delivery. Use when backend implementation must strictly follow the current slice API contract and backend structure boundaries. 适用于契约驱动的后端代码生成。
---

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/api-contract.md`
- `/user-requirements/frontend-api-contract-input.md`
- Existing backend codebase (if any)

# Required Companion Tool Skill
- Use `backend-project-structure-contract` to validate directory and ownership compliance before finalizing.

# Outputs
- Code files under `backend/` only
- `/user-requirements/backend-code-generation-report.md`

# Path Contract
- All generated or modified backend code must be placed under `backend/`.
- Requirement/report artifacts must be written under `/user-requirements/`.

# Execution Rules
- Implement only current requirement slice scope.
- Follow API contract as source of truth for routes, request/response schema, and error model.
- Implement minimal backend behavior needed for slice acceptance.
- Add migration changes only through migration mechanism.
- Preserve module boundaries from backend structure contract.

# Report Must Include
- Changed files
- Validation commands run
- Contract-to-code mapping summary (endpoint -> handler/service/repository)
- Auth and permission implementation summary
- Migration summary
- Failures and unresolved risks

# Gate Rules
- Contract/backend mismatch is `P1`.
- Backend code outside `backend/` is `P1`.
- Missing report contract-code mapping is `P1`.

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
- `contract_alignment_ok`
- `confidence`
- `blocking_reason`
