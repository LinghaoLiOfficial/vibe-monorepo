---
name: user-generation-api-contract-design
description: Convert frontend-derived API intent into an implementation-grade backend API contract artifact with schema, error model, auth policy, and compatibility notes. Use when frontend-first runs need a strict backend contract before backend coding. 适用于前端优先流程中的 API 契约定稿。
---

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/frontend-api-contract-input.md`
- `/user-requirements/code-generation-report.md`

# Required Companion Tool Skill
- Use `backend-project-structure-contract` to align contract ownership and backend path policy.

# Backend Spec Alignment (Mandatory)
- Read `docs/BACKEND_SPEC.md` before writing contract artifact.
- Ensure API contract follows:
- versioned route strategy (`/api/v1`)
- schema ownership under backend schemas contract
- stable error model and request id policy

# Output
- `/user-requirements/api-contract.md`

# Required Sections
- `## Slice Context`
- `## API Domain And Resource Boundaries`
- `## Endpoint Contract Table`
- `## Request Schemas`
- `## Response Schemas`
- `## Error Model`
- `## Auth And Permission Policy`
- `## Validation Rules`
- `## Idempotency And Concurrency Policy`
- `## Versioning And Compatibility`
- `## Backend Structure Contract Alignment`
- `## Backend Spec Alignment`

# Executable Validation (Mandatory)
- Run these checks before stage completion:
```bash
scripts/check_structure_contracts.sh
```

# Gate Rules
- Missing input `frontend-api-contract-input.md` is `P1`.
- Missing required sections is `P1`.
- Missing backend spec alignment evidence is `P1`.
- Failing `scripts/check_structure_contracts.sh` is `P1`.

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
- `backend_spec_alignment_ok`
- `structure_consistency_ok`
- `confidence`
- `blocking_reason`

# Standard Report Template
```markdown
# <skill-name> Execution Report

## 1. Run Metadata
- skill_name:
- slice_id:
- status:

## 2. Inputs
- files_read:
- missing_inputs:

## 3. Outputs
- artifact_path:
- artifact_exists:
- artifact_non_empty:
- required_sections_ok:

## 4. Validation
- checks_run:
- checks_passed:
- checks_failed:
- backend_spec_alignment_ok:
- structure_consistency_ok:

## 5. Risks And Uncertainties
- confidence:
- assumptions:
- unresolved_items:

## 6. Next Handoff
- next_skill:
- handoff_notes:
```
