---
name: user-generation-fullstack-integration-qa
description: Validate frontend-backend integration for the current requirement slice and apply minimal fixes until contract and core flow checks pass. Use when frontend-first runs need objective fullstack acceptance evidence before visual polishing. 适用于全栈联调验收闭环。
---

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/api-contract.md`
- `/user-requirements/code-generation-report.md`
- `/user-requirements/backend-code-generation-report.md`
- Project codebase

# Outputs
- Minimal scoped code fixes (frontend/backend)
- `/user-requirements/fullstack-integration-qa-report.md`

# Loop
1. Validate contract consistency.
2. Run core flow integration checks.
3. Apply minimal scoped fix.
4. Re-run checks until pass or blocker.

# Required QA Coverage
- At least one end-to-end core flow for current slice.
- Contract conformance checks for endpoints in scope.
- Auth/permission checks when flow requires identity.
- Frontend-backend error model consistency checks.

# Report
- Issues by severity
- Fixes applied
- Commands/checks run
- Contract conformance summary
- Core flow pass/fail summary
- Remaining risks

# Gate Rules
- Missing e2e core flow evidence is `P1`.
- Contract conformance failure is `P1`.

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
- `confidence`
- `blocking_reason`
