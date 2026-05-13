---
name: user-generation-fullstack-integration-qa
description: Validate frontend-backend integration for the current requirement slice and apply minimal fixes until contract and core flow checks pass. Use when frontend-first runs need objective fullstack acceptance evidence before visual polishing. 适用于全栈联调验收闭环。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/api-contract.md`
- `/user-requirements/code-generation-report.md`
- `/user-requirements/backend-code-generation-report.md`

# Outputs
- minimal scoped fixes (frontend/backend)
- `/user-requirements/fullstack-integration-qa-report.md`

# E2E Evidence Minimum
- include tested flow list with pass/fail
- include request/response evidence summary for contract-critical endpoints
- include timestamps and environment metadata
- include final conformance statement

# Execution Loop
1. validate contract consistency
2. run core flow checks
3. apply minimal fix
4. rerun until pass or blocker

# Skill-Specific Gates
- Must run `scripts/check_structure_contracts.sh`.
- Must run baseline backend integration checks (`test_health`, `test_exception_handlers`, `test_metrics`).
- Missing e2e evidence, conformance failure, or missing NFR snapshot is `P1`.
