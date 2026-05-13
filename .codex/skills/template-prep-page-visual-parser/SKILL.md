---
name: template-prep-page-visual-parser
description: Parse desktop/mobile webpage screenshots into a reusable, evidence-based visual analysis artifact for template preparation. Use when converting raw screenshot inputs into structured page understanding (layout hierarchy, visual tokens, interaction cues), with canonical screenshot persistence and uncertainty labeling. 适用于模板准备阶段的页面截图结构化解析与证据沉淀。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- screenshot path(s) or image attachments
- optional metadata

# Outputs
- `templates/<template-name-slug>/01-page-visual-parse.md`
- persisted screenshots under `template-preparation/inputs/screenshots/`

# Execution
1. resolve `<template-name-slug>` and canonical screenshot names
2. persist screenshots without overwriting existing files
3. parse structure, hierarchy, visual and interaction signals
4. write markdown with desktop evidence + mobile evidence/hypothesis + uncertainties

# Skill-Specific Gates
- No screenshot input or persist failure is blocking.
- Hash/code-like naming for template slug is `P1`.
- Missing mobile screenshot is `completed_with_risk`.
- `completed_with_risk` must include `risk_owner`, `risk_acceptance`, and `recovery_plan`.
