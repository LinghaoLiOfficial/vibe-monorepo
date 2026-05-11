---
name: user-generation-orchestrator
version: 1.2.0
kind: orchestrator
output_format: markdown
description: Orchestrate user-generation atomic skills with stage gates, resume support, and final delivery report.
triggers:
  - user generation orchestrator
  - 用户生成编排
---

# Pipeline
1. system-blueprint
2. multi-page-template-composition
3. nextjs-react-code-generation
4. visual-qa-iterative-fix

# Output
- `docs/12-user-generation-orchestration-report.md`

# Default Delivery Mode
- Deliver responsive web by default for both:
- PC desktop baseline (`>=1200px`)
- Mobile baseline (`<=767px`)
- Recommended additional checkpoint: tablet (`768-1199px`)
- Default frontend stack:
- Next.js + React + TypeScript + Tailwind CSS + shadcn/ui

# Gate Rules
- Validate each stage artifact before moving on.
- Stop and report blockers if required artifact/check fails.
- Support `resume_from` with prior artifact validation.
- Treat missing mobile adaptation evidence as gate failure (P1), unless user explicitly requests desktop-only.

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
