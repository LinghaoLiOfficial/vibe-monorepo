---
name: user-generation-orchestrator
description: Orchestrate a frontend-first fullstack user-generation pipeline with strict gates, resumable state, and iterative requirement slicing. Use when teams need single-focus Vibe Coding execution that builds frontend first, derives API contracts from implemented frontend behavior, then implements backend and runs integration + visual QA. 适用于前端优先的全栈编排、恢复执行与渐进式需求闭环。
---

# Pipeline (Frontend-first Linear Loop)
1. system-blueprint
2. multi-page-template-composition
3. nextjs-react-code-generation
4. api-contract-design
5. backend-code-generation
6. fullstack-integration-qa
7. visual-qa-iterative-fix

# Required Companion Tool Skills
- Use `frontend-project-structure-contract` across stages 1-3.
- Use `backend-project-structure-contract` across stages 4-6.
- Stage completion must include companion contract evidence.

# Output
- `/user-requirements/user-generation-orchestration-report.md`

# Global Path Contract
- Frontend code outputs must be generated under `frontend/` only.
- Backend code outputs must be generated under `backend/` only.
- Requirement artifacts must be generated under `/user-requirements/`.
- Gate failure: any path contract violation is `P1` and blocks stage completion.

# Orchestration Mode Contract
- Default execution mode is single-focus linear orchestration.
- Build frontend behavior first, then derive formal API contract from frontend data requirements.
- Backend implementation must follow the API contract generated in this run.
- Do not mark backend stage completed if contract-backend mismatch exists.

# Requirement Slice Contract
- Process one requirement slice at a time by default.
- Each run must identify a slice id/name and scope boundary.
- If requirement is broad, split into smaller slices and complete in separate loop runs.

# Structure Consistency Gate (Mandatory)
- Run `scripts/check_structure_contracts.sh` before marking stages 3, 5, and 6 as completed.
- If structure check fails, stage status must be `blocked`.

# Gate Rules
- Validate each stage artifact before moving on.
- Stop and report blockers if required artifact/check fails.
- Support `resume_from` with prior artifact validation.
- Treat missing mobile adaptation evidence as gate failure (P1), unless user explicitly requests desktop-only.
- Treat desktop non-full-width shell/layout as gate failure (P1), unless user explicitly requires centered narrow layout.
- Treat missing explicit final-template disclosure to user as gate failure (P1).
- Treat missing explicit per-page component layout details in required markdown artifacts as gate failure (P1).
- Treat missing explicit global hex color palette in required markdown artifacts as gate failure (P1).
- Treat inability to switch global palette by editing one primary theme file as gate failure (P1).
- Treat missing shadcn/ui evaluation evidence as gate failure (P1).
- Treat missing frontend structure contract production/alignment/validation evidence as gate failure (P1).
- Treat missing API contract artifact as gate failure (P1).
- Treat backend output generated before API contract stage completion as orchestration violation (`P1`).
- Treat contract/backend mismatch on route, schema, error model, or auth policy as gate failure (P1).
- Treat missing integration QA evidence for at least one core flow as gate failure (P1).
- Treat structure consistency check failure as gate failure (P1).

# Orchestration State Schema
Track each stage with:
- `stage_name`
- `status`: `not_started|in_progress|blocked|completed|skipped`
- `artifact_path`
- `artifact_validated`: `true|false`
- `blocking_reason`
- `next_action`

Run-level fields:
- `orchestrator`
- `run_mode`: `fresh|resume`
- `resume_from`
- `slice_id`
- `slice_scope`
- `final_status`: `completed|completed_with_risk|blocked|failed`

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
- slice_id:
- slice_scope:
- final_status:

## 2. Stage Status Table
| Stage | Status | Artifact | Validated | Notes |
|---|---|---|---|---|

## 3. Gate Validation Summary
- passed_gates:
- failed_gates:
- blocked_stage:
- frontend_structure_contract_gate:
- backend_structure_contract_gate:
- structure_consistency_script_gate:
- api_contract_gate:
- contract_backend_consistency_gate:
- integration_qa_gate:
- visual_qa_gate:

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
- Enforce frontend-first, contract-driven, fullstack loop execution.
- Never claim completion without verified stage outputs and integration evidence.
- Optimize for single-focus Vibe Coding on one slice at a time.

### Quality Gates
- P0: Every stage produces required artifacts and passes stage-level validation before progression.
- P1: Cross-stage consistency (path contracts, frontend-backend contract alignment, responsive assumptions, structure consistency script) is validated.
- P2: Orchestration report includes blocker context, next action, and resume readiness.
