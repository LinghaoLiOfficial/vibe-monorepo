---
name: user-generation-nextjs-react-code-generation
description: Generate or modify frontend code under Next.js + React + TypeScript + Tailwind + shadcn/ui, then emit frontend-derived API contract inputs for downstream backend implementation. Use when converting approved planning outputs into frontend-first production code under strict path and tokenization contracts. 适用于前端优先实现与后端契约输入沉淀。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`
- optional template artifacts

# Outputs
- frontend code under `frontend/`
- `/user-requirements/code-generation-report.md`
- `/user-requirements/frontend-api-contract-input.md`

# Execution
1. Read `docs/FRONTEND_SPEC.md`.
2. Build shared layout/components and route pages from composition.
3. Implement responsive behavior (desktop + mobile by default).
4. Derive API intent from implemented UI.
5. Validate structure + quality commands.

# Skill-Specific Gates
- Must run `scripts/check_structure_contracts.sh`.
- Must run `pnpm type-check` and `pnpm build` in `frontend/`.
- Missing `/user-requirements/frontend-api-contract-input.md` or required sections is `P1`.
