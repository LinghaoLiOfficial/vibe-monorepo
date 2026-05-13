---
name: backend-project-structure-contract
description: Define and enforce a canonical backend project directory contract aligned to this repository's FastAPI minimal skeleton under backend/app. Use when API-contract, backend code-generation, and integration QA stages must keep stable module boundaries and migration/test layout. 适用于对齐当前仓库后端最小骨架的目录契约。
---

# Purpose
Define canonical backend structure boundaries and validate generated backend artifacts.

# Inputs
- backend code outputs
- api-contract artifacts

# Outputs
- structure contract validation evidence in stage report

# Contract Highlights
- backend code in `backend/` only
- stable module boundaries under `backend/app`
- migration/test layout consistency

# Validation Evidence
- include `validation_mode` (`quick|full`) in report
- include executed commands and exit codes
- include explicit boundary check result per directory group:
- `backend/app`, `backend/tests`, `backend/migrations`

# Suggested Commands
- `scripts/check_structure_contracts.sh`
- `cd backend && uv run pytest -q tests/test_health.py tests/test_exception_handlers.py tests/test_metrics.py`

# Gate
- Any boundary or ownership violation is `P1`.
