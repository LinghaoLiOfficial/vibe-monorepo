---
name: user-generation-api-contract-design
description: Convert frontend-derived API intent into an implementation-grade backend API contract artifact with schema, error model, auth policy, and compatibility notes. Use when frontend-first runs need a strict backend contract before backend coding. 适用于前端优先流程中的 API 契约定稿。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/frontend-api-contract-input.md`

# Outputs
- `/user-requirements/api-contract.md`

# Required Sections
- `## Endpoint Surface`
- `## Request Schemas`
- `## Response Schemas`
- `## Error Model`
- `## Auth Policy`
- `## Compatibility And Versioning`

# Compatibility Matrix
- include at minimum:
- `change_type`
- `backward_compatible` (`yes|no`)
- `client_impact`
- `migration_action`

# Execution
1. normalize endpoint intents into concrete API surface
2. define request/response schemas
3. define error model and auth policy
4. capture compatibility and versioning notes

# Skill-Specific Gates
- Missing schema/error/auth sections is `P1`.
- Contract must be implementable without adding unstated assumptions.
