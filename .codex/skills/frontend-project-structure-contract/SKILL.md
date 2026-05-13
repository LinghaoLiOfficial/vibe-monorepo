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

# Gate
- Any placement or ownership violation is `P1`.
