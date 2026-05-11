---
name: template-preparation-orchestrator
version: 1.1.0
kind: orchestrator
output_format: markdown
description: Orchestrate template-preparation atomic skills (01-05 + indexing) with stage gates and resumable execution.
triggers:
  - template preparation orchestrator
  - 模板准备编排
---

# Scope
Coordinate atomic skills only; do not replace their detailed logic.

# Pipeline
1. page-visual-parser
2. uiux-design-language-abstractor
3. design-system-structurizer
4. frontend-component-planner
5. nextjs-react-frontend-design-language
6. template-indexing

# Output
- `templates/<template-id>/preparation-report.md`
- `templates/<template-id>/orchestration-state.json`
- Optional aggregate: `templates/catalog.md`

# Gate Rules
- Each stage must produce its expected file and required headings.
- Stop on P0 failure; record blocker.
- Support `resume_from` stage.

# Orchestration State Schema
Track each stage with:
- `stage_name`
- `status`: `not_started|in_progress|blocked|completed|skipped`
- `artifact_path`
- `artifact_validated`: `true|false`
- `blocking_reason`
- `next_action`
- `started_at`: ISO8601 timestamp with timezone offset
- `finished_at`: ISO8601 timestamp with timezone offset
- `duration_ms`: integer, `finished_at - started_at`

Run-level fields required in `orchestration-state.json`:
- `orchestrator`
- `run_mode`: `fresh|resume`
- `resume_from`
- `started_at`: ISO8601 timestamp with timezone offset
- `finished_at`: ISO8601 timestamp with timezone offset
- `duration_ms`: integer
- `final_status`: `completed|completed_with_risk|blocked|failed`
- `stages`: array of stage state objects above

# Timestamp Policy (Mandatory)
- All `started_at`/`finished_at` values must be real runtime timestamps in ISO8601 with timezone offset.
- Placeholder or hard-coded timestamps (for example `2026-05-11T00:00:00+08:00`) are forbidden.
- `finished_at` must be greater than or equal to `started_at`.
- `duration_ms` must be computed from timestamps, not estimated.
- If a stage is `not_started`, keep `started_at`, `finished_at`, `duration_ms` as `null`.

# State Persistence Rules
- Initialize `orchestration-state.json` before stage 1 with all stages `not_started`.
- On each stage transition, update state immediately:
  - entering stage: set `status=in_progress`, set stage `started_at`.
  - stage pass: set `status=completed`, set `artifact_validated=true`, set stage `finished_at`, `duration_ms`.
  - stage blocked/fail: set `status=blocked`, set `blocking_reason`, set stage `finished_at`, `duration_ms`.
- Persist file after every transition; never only at the end.

# Resume Contract
- `resume_from` must match a known stage name.
- Prior stages must have validated artifacts before resume.
- If prior artifacts are invalid, reset resume point to earliest invalid stage.
- On resume, preserve previous stage timestamps and durations; only update resumed and downstream stages.

# Standard Orchestration Report Template
```markdown
# <orchestrator-name> Report

## 1. Run Metadata
- orchestrator:
- run_mode: fresh|resume
- resume_from:
- started_at: ISO8601 (real runtime)
- finished_at: ISO8601 (real runtime)
- duration_ms:
- final_status:

## 2. Stage Status Table
| Stage | Status | Artifact | Validated | Stage Started At | Stage Finished At | Duration(ms) | Notes |
|---|---|---|---|---|---|---|---|

## 3. Gate Validation Summary
- passed_gates:
- failed_gates:
- blocked_stage:

## 4. Outputs
- report_path:
- state_path: templates/<template-id>/orchestration-state.json
- produced_artifacts:

## 5. Risks
- unresolved_risks:
- fallback_actions:

## 6. Recommended Next Step
- next_command_or_skill:
```
