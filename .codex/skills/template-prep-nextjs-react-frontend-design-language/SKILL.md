---
name: template-prep-nextjs-react-frontend-design-language
description: Produce implementation-oriented Next.js + React + TypeScript + Tailwind + shadcn/ui frontend language specs from template prep outputs. Use when engineering teams need explicit app-router structure, server/client boundaries, token mappings, and adaptation constraints before coding. 适用于代码生成前的前端实现规范沉淀。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `templates/<template-name-slug>/03-design-system.md`
- `templates/<template-name-slug>/04-frontend-component-plan.md`

# Required Companion
- `frontend-project-structure-contract`

# Outputs
- `templates/<template-name-slug>/05-nextjs-react-frontend-design-language.md`

# Execution
1. define app-router and server/client boundaries
2. map design tokens into frontend theme strategy
3. map components into Next.js implementation layout
4. include structure-contract alignment section

# Boundary Verification
- for each route segment, declare `server_or_client` with a one-line reason
- list any client components that require browser-only APIs
- list cross-boundary data flow assumptions

# Skill-Specific Gates
- Missing structure-contract block is `P1`.
- Missing one-file theme switch strategy is `P1`.
