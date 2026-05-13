# Skill Workflow Baseline

## Objective
Provide a single shared baseline for status semantics, artifact checks, and reporting expectations across `.codex/skills/*/SKILL.md`.

## Status Model
Use only:
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

## Common Artifact Checks
All skill outputs should be validated with these booleans when applicable:
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `blocking_reason` (empty when not blocked)
- `confidence` (`high|medium|low`)

## Evidence Contract
All reports should include machine-readable validation evidence:
- `validation_mode`: `quick|full`
- `commands`: executed command list
- `exit_codes`: command => exit code map
- `artifacts_checked`: artifact => check booleans
- `timestamps`: start/end in ISO-8601
- `summary`: concise pass/fail statement

## Path And Ownership Baseline
- Frontend code outputs must stay under `frontend/`.
- Backend code outputs must stay under `backend/`.
- Requirement/report artifacts must stay under `/user-requirements/` unless skill-specific output paths define otherwise.

## Minimal Report Contract
Each execution report should include:
- `Inputs`
- `Outputs`
- `Validation`
- `Risks`
- `Next handoff`

## Required Sections Template
Unless a skill explicitly requires more, each report should include these headings:
- `## Inputs`
- `## Outputs`
- `## Validation`
- `## Risks`
- `## Next handoff`

## Validation Modes
- `quick`: fastest confidence check for iteration loops; may skip expensive checks but must declare skipped checks explicitly.
- `full`: release-grade validation with all required gates.
- Any stage completion marked `completed` must use `full`, unless the orchestrator explicitly marks `completed_with_risk`.

## Gate Severity
- `P0`: missing mandatory output artifact.
- `P1`: cross-stage mismatch, contract violation, or required validation failure.
- `P2`: non-blocking quality/readability risks.

## Risk Ownership
- Any `completed_with_risk` status must include:
- `risk_owner`
- `risk_acceptance`
- `recovery_plan`
- `target_resolution_stage`

## Source Of Truth Rule
- Keep global shared rules in this file.
- Keep only skill-specific rules in each `SKILL.md`.
- If a rule is reused by 3+ skills, move it here.
