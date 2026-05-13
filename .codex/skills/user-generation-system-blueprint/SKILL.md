---
name: user-generation-system-blueprint
description: Convert product requirements into an implementation-grade multi-page system blueprint for frontend-first fullstack delivery. Use when a project needs scoped routes, roles, core flows, responsive strategy, frontend stack contracts, and backend domain/API assumptions before template composition and implementation. 适用于前端优先全栈流程中的需求蓝图建模。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- user requirement statement
- optional domain/context docs

# Outputs
- `/user-requirements/system-blueprint.md`

# Required Sections
- `## Slice Scope`
- `## Actors`
- `## Route Map`
- `## Core Flows`
- `## Responsive Strategy`
- `## Backend Domain/API Assumptions`
- `## Runtime And Delivery Contract`
- `## Open Decisions`
- `## Risks`

# Open Decision Ownership
- each open decision must include:
- `owner`
- `decision_due_stage`
- `impact_if_unresolved`

# Execution
1. define scope, actors, route map, and core flows
2. define responsive strategy and frontend assumptions
3. define backend domains and API assumptions for current slice
4. define runtime and delivery contract with one-command fullstack startup (`docker compose up --build`)
5. annotate risks and open decisions

# Skill-Specific Gates
- Missing route/flow scope or missing backend assumption block is `P1`.
- Blueprint must be directly actionable for template composition and frontend generation.
