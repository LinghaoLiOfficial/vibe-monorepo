---
name: template-preparation-orchestrator
description: Orchestrate the full template-preparation pipeline (01-05 + indexing) with stage gates, resumable state, and artifact validation. Use when end-to-end template preparation must be executed reliably across atomic skills with explicit blocker handling and delivery reporting. 适用于模板准备全流程编排与门禁控制。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Pipeline
1. page-visual-parser
2. uiux-design-language-abstractor
3. design-system-structurizer
4. frontend-component-planner
5. nextjs-react-frontend-design-language
6. template-indexing

# Naming And Path Contract
- Use `<template-name-slug>` (kebab-case, human-readable).
- Never overwrite existing artifacts; allocate `-v2`, `-v3` when needed.
- Persist mapping in `templates/<template-name-slug>/orchestration-state.json`.

# Outputs
- `templates/<template-name-slug>/preparation-report.md`
- `templates/<template-name-slug>/orchestration-state.json`

# Skill-Specific Gates
- Stage artifact existence + required headings are mandatory.
- Stage 5 must include frontend structure-contract evidence.
- Missing mobile screenshot is `completed_with_risk`, not immediate block.
- Hash/code-like naming in paths is `P1`.

# Resume Rules
- `resume_from` must be valid.
- Prior artifacts must validate before resume.

# Report Minimum
- run metadata, stage table, gate summary, output list, risks, next step.
