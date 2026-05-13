---
name: user-generation-multi-page-template-composition
description: Compose a multi-page template strategy by matching system blueprint requirements with template indices using explainable scoring. Use when selecting a final best-fit template, mapping routes to template regions, and defining adaptation plans with responsive and component-level constraints. 适用于多页面模板选型、映射与适配规划。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `/user-requirements/system-blueprint.md`
- template index artifacts

# Outputs
- `/user-requirements/multi-page-template-composition.md`

# Execution
1. score candidate templates against blueprint needs
2. choose best-fit template and record rationale
3. map routes to template regions/components
4. define adaptation constraints (desktop/mobile)

# Skill-Specific Gates
- Missing explicit selected template disclosure is `P1`.
- Missing per-page component layout mapping is `P1`.
