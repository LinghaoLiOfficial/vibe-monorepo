---
name: template-preparation-orchestrator
version: 1.0.0
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

# Resume Contract
- `resume_from` must match a known stage name.
- Prior stages must have validated artifacts before resume.
- If prior artifacts are invalid, reset resume point to earliest invalid stage.

# Standard Orchestration Report Template
```markdown
# <orchestrator-name> Report

## 1. Run Metadata
- orchestrator:
- run_mode: fresh|resume
- resume_from:
- started_at:
- finished_at:
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
- produced_artifacts:

## 5. Risks
- unresolved_risks:
- fallback_actions:

## 6. Recommended Next Step
- next_command_or_skill:
```
