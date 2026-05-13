---
name: frontend-project-structure-contract
description: Define and enforce a canonical frontend project directory contract for Next.js + React + TypeScript + Tailwind outputs in this repository. Use when template-preparation or user-generation runs must keep generated frontend code aligned to the actual minimal skeleton under frontend/src. 适用于对齐当前仓库前端最小骨架的目录契约。
---

# Purpose
Define canonical frontend structure boundaries and validate generated artifacts against them.

# Inputs
- frontend outputs and route/component plans

# Outputs
- structure contract validation evidence in stage report

# Contract Highlights
- frontend code in `frontend/` only
- route and component placement aligned to project skeleton
- enforce one-file global theme switch path when required

# Theme Switch Contract
- one-file switch location must be declared in report as `theme_switch_file`
- report must include `theme_switch_file_exists` and `theme_switch_import_trace_ok`

# Validation Evidence
- include `validation_mode` (`quick|full`) in report
- include executed commands and exit codes
- include explicit placement check result for:
- `frontend/src/app`
- `frontend/src/components`
- `frontend/src/lib`

# Suggested Commands
- `scripts/check_structure_contracts.sh`
- `cd frontend && pnpm type-check && pnpm build`

# Gate
- Any placement or ownership violation is `P1`.
