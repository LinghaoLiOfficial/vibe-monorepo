---
name: template-prep-design-system-structurizer
description: Convert visual and UI/UX abstractions into a template-level design system specification (tokens, type scale, spacing, component baselines). Use when downstream implementation needs a normalized style contract with explicit reuse constraints and responsive token guidance. 适用于生成模板级设计系统规范以支持后续实现。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `templates/<template-name-slug>/01-page-visual-parse.md`
- `templates/<template-name-slug>/02-uiux-design-language.md`

# Outputs
- `templates/<template-name-slug>/03-design-system.md`

# Execution
1. define tokens (color/type/spacing/radius/shadow)
2. define component baselines and reuse constraints
3. define responsive token behavior

# Skill-Specific Gates
- Missing global palette or missing token mapping sections is `P1`.
