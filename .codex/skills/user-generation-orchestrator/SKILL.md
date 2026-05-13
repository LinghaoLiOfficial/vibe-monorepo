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

# Outputs
- `/user-requirements/user-generation-orchestration-report.md`

# Skill-Specific Gates
- Enforce frontend-first sequence; backend cannot start before API contract stage completes.
- Run `scripts/check_structure_contracts.sh` before completing stages 3, 5, and 6.
- Require CI-equivalent evidence:
```bash
cd frontend && pnpm type-check && pnpm build
cd backend && uv run ruff check . && uv run ruff format --check . && uv run mypy app tests && uv run pytest -q
```
- Missing API contract, contract/backend mismatch, or missing integration evidence is `P1`.

# Resume Rules
- `resume_from` must be a valid stage name.
- Prior stages must have validated artifacts; otherwise resume resets to earliest invalid stage.

# Report Minimum
- run metadata (`run_mode`, `slice_id`, `slice_scope`, `final_status`)
- stage status table
- gate pass/fail summary
- produced artifacts and blocker/next action
