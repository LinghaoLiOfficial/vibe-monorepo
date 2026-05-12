---
name: template-preparation-orchestrator
description: Orchestrate template-preparation atomic skills (01-05 + indexing) with stage gates and resumable execution.
---


# Scope
Coordinate atomic skills only; do not replace their detailed logic.

# Naming Convention (Mandatory)
- Use `<template-name-slug>` for all paths and identifiers in this pipeline.
- `<template-name-slug>` must be human-readable kebab-case (example: `clinicgo-dashboard`).
- Do not use hash/code-like IDs (example: `0b07bf359d8fa5eb208cd0d5bcab6c87`) as template naming.
- If the input source filename is hash/code-like, the orchestrator must resolve or request a template name slug, then persist outputs using the slug.

# Pipeline
1. page-visual-parser
2. uiux-design-language-abstractor
3. design-system-structurizer
4. frontend-component-planner
5. nextjs-react-frontend-design-language
6. template-indexing

# Output
- `templates/<template-name-slug>/preparation-report.md`
- `templates/<template-name-slug>/orchestration-state.json`
- Optional aggregate: `templates/catalog.md`

# Default Delivery Mode
- Default to dual-target preparation:
- Desktop Evidence (`>=1200px`)
- Mobile Hypothesis (`<=767px`) when mobile screenshot evidence is missing
- If mobile screenshot evidence is provided, produce Mobile Evidence instead of hypothesis.

# Gate Rules
- Each stage must produce its expected file and required headings.
- Stop on P0 failure; record blocker.
- Support `resume_from` stage.
- Missing mobile screenshot is not a hard blocker by itself; continue with explicit assumptions and set run/status to `completed_with_risk`.
- If mobile-required sections are missing from stage artifacts, treat as gate failure (P1) unless user explicitly requested desktop-only preparation.
- All stage artifacts and screenshot paths must use `<template-name-slug>` naming consistently; any hash/code-like naming is a gate failure (P1).

# Orchestration State Schema
Track each stage with:
- `stage_name`
- `status`: `not_started|in_progress|blocked|completed|skipped`
- `artifact_path`
- `artifact_validated`: `true|false`
- `blocking_reason`
- `next_action`

Run-level fields required in `orchestration-state.json`:
- `orchestrator`
- `run_mode`: `fresh|resume`
- `resume_from`
- `final_status`: `completed|completed_with_risk|blocked|failed`
- `stages`: array of stage state objects above

# State Persistence Rules
- Initialize `orchestration-state.json` before stage 1 with all stages `not_started`.
- On each stage transition, update state immediately:
  - entering stage: set `status=in_progress`.
  - stage pass: set `status=completed`, set `artifact_validated=true`.
  - stage blocked/fail: set `status=blocked`, set `blocking_reason`.
- Persist file after every transition; never only at the end.

# Resume Contract
- `resume_from` must match a known stage name.
- Prior stages must have validated artifacts before resume.
- If prior artifacts are invalid, reset resume point to earliest invalid stage.
- On resume, preserve previous stage states; only update resumed and downstream stages.

# Standard Orchestration Report Template
```markdown
# <orchestrator-name> Report

## 1. Run Metadata
- orchestrator:
- run_mode: fresh|resume
- resume_from:
- final_status:

## 2. Stage Status Table
| Stage | Status | Artifact | Validated | Notes |
|---|---|---|---|---|

## 3. Gate Validation Summary
- passed_gates:
- failed_gates:
- blocked_stage:

## 4. Outputs
- report_path:
- state_path: templates/<template-name-slug>/orchestration-state.json
- produced_artifacts:

## 5. Risks
- unresolved_risks:
- fallback_actions:

## 6. Recommended Next Step
- next_command_or_skill:
```
