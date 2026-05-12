---
name: user-generation-orchestrator
description: Orchestrate the complete user-generation pipeline from requirements to QA-verified delivery with gate controls and resume support. Use when teams need reliable stage-by-stage execution across blueprinting, template composition, code generation, and iterative visual QA. 适用于用户生成全链路编排、恢复与交付控制。
---


# Pipeline
1. system-blueprint
2. multi-page-template-composition
3. nextjs-react-code-generation
4. visual-qa-iterative-fix

# Output
- `/user-requirements/user-generation-orchestration-report.md`

# Global Path Contract
- Frontend code outputs from this orchestrator pipeline must be generated under `frontend/` only.
- User-requirement artifacts (input requirement docs, blueprint/composition/reports) must be generated under a fixed requirements folder:
- Fixed requirements folder: `/user-requirements/`
- Gate failure: any artifact path violating this contract is `P1` and blocks stage completion.

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
- Treat desktop non-full-width shell/layout (visible left-right blank gutters caused by fixed/max container constraints) as gate failure (P1), unless user explicitly requires centered narrow layout.
- Treat missing explicit final-template disclosure to user as gate failure (P1).
- Treat missing explicit per-page component layout details in required markdown artifacts as gate failure (P1).
- Treat missing explicit global hex color palette in required markdown artifacts as gate failure (P1).
- Treat inability to switch global palette by editing one primary theme file as gate failure (P1).
- Treat missing shadcn/ui evaluation evidence as gate failure (P1).
- Treat missing shadcn/ui adoption on suitable interactive components as gate failure (P1), unless user explicitly overrides stack constraints.
- If a page has no suitable interactive components, shadcn/ui is optional for that page but exemption evidence is required.

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

# Standard Detail Depth Template Contract
- All required markdown artifacts in this orchestration must follow the same minimum detail depth for:
- `## Per-page Component Layout`
- `## Global Hex Color Palette`
- If any required depth item is missing, treat as `P1` gate failure.

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
- shadcn_ui_gate:
- shadcn_ui_evaluation_gate:
- component_layout_markdown_gate:
- hex_palette_markdown_gate:
- one_step_theme_switch_gate:

## 4. Outputs
- report_path:
- produced_artifacts:

## 5. Final Template Disclosure (User-Facing)
- selected_template_id:
- selected_template_name:
- source_artifact: `/user-requirements/multi-page-template-composition.md`
- concise_reason:
- alternatives_considered:

## 6. Risks
- unresolved_risks:
- fallback_actions:

## 7. Recommended Next Step
- next_command_or_skill:
```

## Professional Notes

### Orchestration Principles
- Coordinate stages 9->10->6->7 with strict artifact gate enforcement.
- Never claim completion without verified stage outputs.
- Support `resume_from` only when prior artifacts are validated.

### Stage Contract
- Stage outputs must include required depth fields for layout and palette contracts.
- Treat missing required markdown structure as P1 gate failure.
- Record stage status, blockers, and next action in orchestration report.

### Recovery Policy
- If any stage fails validation, halt and report earliest invalid stage.
- Resume from earliest invalid stage after remediation, not from later stage.

### Quality Gates
- P0: Every stage produces required artifacts and passes stage-level validation before progression.
- P1: Cross-stage consistency (naming, path contracts, responsive assumptions) is validated.
- P2: Orchestration report includes blocker context, next action, and resume readiness.

### Downstream Handoff
- Provide only actionable artifacts required by the immediate next stage.
- Keep assumptions, confidence, and risk flags explicit for downstream validation.

