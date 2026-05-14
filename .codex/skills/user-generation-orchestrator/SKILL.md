---
name: user-generation-orchestrator
description: Orchestrate a frontend-first fullstack user-generation pipeline with strict gates, resumable state, and iterative requirement slicing. Use when teams need single-focus Vibe Coding execution that builds frontend first, derives API contracts from implemented frontend behavior, then implements backend and runs integration + visual QA. 适用于前端优先的全栈编排、恢复执行与渐进式需求闭环。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Pipeline
1. system-blueprint
2. multi-page-template-composition
3. nextjs-react-code-generation
4. api-contract-design
5. backend-code-generation
6. fullstack-integration-qa
7. visual-qa-iterative-fix

# Required Inputs
- User requirement slice and scope.
- `docs/FRONTEND_SPEC.md` for stages 1-3 and 7.
- `docs/BACKEND_SPEC.md` for stages 4-6.
- root `docker-compose.yml` must exist and support fullstack one-command startup.

# Outputs
- `/user-requirements/user-generation-orchestration-report.md`
- `/user-requirements/frontend-architecture.md`
- `/user-requirements/backend-architecture.md`
- `/user-requirements/database-architecture.md`
- `/user-requirements/master-requirements.md`

# Master Requirements Contract
- Maintain `/user-requirements/master-requirements.md` as the single source of truth for current final requirement state.
- Refresh it on every run completion, even when only part of the system changed.
- Keep it synchronized with architecture snapshots, API contract artifacts, and current implemented behavior.

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

# Architecture Snapshot Contract
- Refresh all three architecture snapshots at the end of every successful run.
- Keep snapshots aligned with implemented code and current runtime behavior, not planned-only intent.
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

# Skill-Specific Gates
- Enforce frontend-first sequence; backend cannot start before API contract stage completes.
- Run `scripts/check_structure_contracts.sh` before completing stages 3, 5, and 6.
- Require CI-equivalent evidence:
```bash
cd frontend && pnpm type-check && pnpm build
cd backend && uv run ruff check . && uv run ruff format --check . && uv run mypy app tests && uv run pytest -q
```
- Require one-command fullstack run contract:
```bash
docker compose up --build
```
- If `docker-compose.yml` missing or cannot start frontend/backend/database together, mark run as blocked (`P1`) and fix before final completion.
- Missing API contract, contract/backend mismatch, or missing integration evidence is `P1`.
- Missing or stale architecture snapshots is `P1`.
- Missing, stale, or non-conforming `master-requirements.md` is `P1`.

# Validation Mode Policy
- intermediate loop checks may use `validation_mode=quick` with explicit skipped checks
- stage completion requires `validation_mode=full`

# Cross-Stage Field Contract
- each stage report must declare:
- `stage_name`
- `inputs`
- `outputs`
- `status`
- `validation_mode`
- `confidence`
- orchestrator report must include an aggregated stage contract table

# Resume Rules
- `resume_from` must be a valid stage name.
- Prior stages must have validated artifacts; otherwise resume resets to earliest invalid stage.

# Report Minimum
- run metadata (`run_mode`, `slice_id`, `slice_scope`, `final_status`)
- stage status table
- gate pass/fail summary
- master requirements update summary
- architecture snapshot update summary (frontend/backend/database)
- produced artifacts and blocker/next action
- mandatory final user reminder line: `使用 docker compose up --build 一键运行全栈程序。`
