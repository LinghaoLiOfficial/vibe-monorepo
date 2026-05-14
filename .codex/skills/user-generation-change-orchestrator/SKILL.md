---
name: user-generation-change-orchestrator
description: Orchestrate post-initial project changes by routing requests into fullstack requirement evolution, frontend-only iteration, backend-only iteration, or data-only change workflows with strict boundary checks, escalation rules, and resumable reporting. Use when users request subsequent modifications after initial generation and the scope must be classified and executed safely. 适用于初次生成后的需求变更分流编排与边界升级。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Routed Workflows
1. `user-generation-fullstack-requirement-evolution`
2. `user-generation-frontend-only-iteration`
3. `user-generation-backend-only-iteration`
4. `user-generation-data-only-change`

# Inputs
- Change request text and explicit scope hints from user.
- Existing artifacts under `/user-requirements/` when available.
- Current repository state under `frontend/`, `backend/`, and database migration/data directories.

# Outputs
- `/user-requirements/change-orchestration-report.md`
- `/user-requirements/frontend-architecture.md`
- `/user-requirements/backend-architecture.md`
- `/user-requirements/database-architecture.md`
- `/user-requirements/master-requirements.md`

# Master Requirements Contract
- Maintain `/user-requirements/master-requirements.md` as the single source of truth for current final requirement state.
- Refresh it on every run completion, including scoped frontend-only, backend-only, and data-only runs.
- Keep it synchronized with architecture snapshots, route outcomes, and final implemented behavior after escalation.

# Master Requirements Required Sections
- `## Metadata`
- `## Product Goals`
- `## Scope`
- `## Functional Requirements`
- `## Non-Functional Requirements`
- `## Frontend Requirements Summary`
- `## Backend Requirements Summary`
- `## Database Requirements Summary`
- `## API Contract Summary`
- `## Acceptance Criteria`
- `## Change History (Recent)`
- `## Open Risks`

# Classification Contract
- classify as exactly one initial route:
- `fullstack_requirement_evolution`
- `frontend_only_iteration`
- `backend_only_iteration`
- `data_only_change`
- include `classification_reason` and `assumptions`.

# Escalation Rules
- escalate `frontend_only_iteration` to `fullstack_requirement_evolution` if UI change requires new endpoint, schema, auth, or DB shape changes.
- escalate `backend_only_iteration` to `fullstack_requirement_evolution` if API response/request compatibility would break existing frontend assumptions.
- escalate `data_only_change` to `fullstack_requirement_evolution` if requested change actually requires schema migration or application logic change.
- keep original route only when boundary checks pass.

# Architecture Snapshot Contract
- Refresh all three architecture snapshots after every completed run, including scoped runs.
- Apply minimal updates for unchanged layers but do not skip timestamp and consistency checks.
- Each snapshot must include fixed dimensions using these required section headings.

# Frontend Snapshot Required Sections
- `## Metadata`
- `## Route/Page Map`
- `## Component Architecture`
- `## State & Data Flow`
- `## External Integrations`
- `## Frontend Constraints`
- `## Test & Validation Snapshot`
- `## Change Log (Recent)`

# Backend Snapshot Required Sections
- `## Metadata`
- `## Module Boundaries`
- `## Endpoint Surface`
- `## Service/Repository Contract`
- `## Runtime Policies`
- `## Config & Dependencies`
- `## Test & Validation Snapshot`
- `## Change Log (Recent)`

# Database Snapshot Required Sections
- `## Metadata`
- `## Logical Entities`
- `## Relationships`
- `## Migration State`
- `## Seed/Backfill Notes`
- `## Data Safety Rules`
- `## Verification Snapshot`
- `## Change Log (Recent)`

# Metadata Minimum
- `## Metadata` must include `last_updated` (ISO-8601), `change_summary`, and `open_risks`.

# Execution
1. classify change request and declare assumptions.
2. run selected workflow.
3. evaluate boundary checks and trigger escalation when needed.
4. enforce route-specific gates and collect evidence.
5. refresh architecture snapshots and write orchestration report.

# Skill-Specific Gates
- Must include route decision, escalation decisions, and final route outcome.
- Must include evidence of route-specific validation commands and exit codes.
- Missing route rationale or escalation rationale is `P1`.
- Missing or stale architecture snapshots is `P1`.
- Missing, stale, or non-conforming `master-requirements.md` is `P1`.

# Report Minimum
- run metadata (`request_id`, `initial_route`, `final_route`, `final_status`)
- route decision table (`route`, `selected`, `rejected_reason`)
- escalation log (`trigger`, `from`, `to`, `reason`)
- master requirements update summary
- architecture snapshot update summary (frontend/backend/database)
- validation evidence summary by final route
- produced artifacts and next handoff
