# Backend Architecture Spec

## Scope
This spec is the backend single source of truth for this repository.
Applies to all backend generation and refactor tasks under `backend/`.

## Stack Baseline
- Python `>=3.12`
- FastAPI + Uvicorn
- SQLAlchemy 2.x + Alembic
- PostgreSQL (dev/test/prod consistency)
- `uv` package manager
- `ruff` + `mypy` + `pytest`

## Collaboration Mode (Frontend-first, Contract-driven)
This repository follows frontend-first iterative fullstack delivery.
Mandatory backend collaboration sequence for each requirement slice:
1. Frontend implementation outputs `/user-requirements/frontend-api-contract-input.md`.
2. Contract design outputs `/user-requirements/api-contract.md`.
3. Backend implementation must follow the approved `api-contract`.
4. Integration QA validates contract conformance and core flow.

Forbidden:
- Implementing backend endpoints for a slice before `api-contract` exists.
- Silent backend contract changes without updating `api-contract`.

## Layering Contract
Mandatory dependency direction:
- `api -> application -> domain`
- `infrastructure -> application/domain`

Forbidden:
- `domain` importing `infrastructure`
- `api` directly using repository implementations or external SDK

## Directory Contract
Backend code must stay under:
- `backend/app/api`
- `backend/app/application`
- `backend/app/domain`
- `backend/app/infrastructure`
- `backend/app/core`
- `backend/app/schemas`
- `backend/alembic`
- `backend/tests`

## API Contract Rules
- Prefix all business routes with `/api/v1`
- Use explicit request/response schemas in `backend/app/schemas`
- Enforce stable error model and request id in error response
- Keep contract compatibility per slice; incompatible changes require explicit migration note

## Quality Gate Commands
Must pass for backend stage completion:
```bash
cd backend
uv run ruff check .
uv run ruff format --check .
uv run mypy app tests
uv run pytest -q
```

## Integration Baseline
Must keep at least these integration tests green:
- `backend/tests/integration/test_health.py`
- `backend/tests/integration/test_exception_handlers.py`
- `backend/tests/integration/test_metrics.py`

Recommended command:
```bash
cd backend
uv run pytest -q tests/integration/test_health.py
uv run pytest -q tests/integration/test_exception_handlers.py
uv run pytest -q tests/integration/test_metrics.py
```

## NFR Baseline (Execution-level)
For each slice, backend report should include:
- Latency snapshot for at least one core endpoint (p95 target <= 500ms in local baseline)
- Error budget snapshot (5xx rate should remain 0 in integration baseline run)
- Timeout strategy evidence for external calls (explicit timeout present)

If NFR snapshot cannot be produced, mark `completed_with_risk` with explicit remediation.

## Auth And Permission Baseline
- Auth and permission policy must be declared in `api-contract` before backend implementation.
- Any endpoint requiring identity must have explicit unauthorized/forbidden behavior.
- Missing auth/permission decision for protected endpoint is `P1`.

## Migration Rules
- Use Alembic for all schema changes
- Never modify schema manually in DB and skip migration
- Keep upgrade/downgrade paths executable
- Migration PR/report must state rollback path (`downgrade` command and expected scope)

## Release And Rollback Baseline
Backend slice delivery report must include:
- Changed endpoint list
- Migration impact summary
- Rollback instruction
- Known risks and fallback action
