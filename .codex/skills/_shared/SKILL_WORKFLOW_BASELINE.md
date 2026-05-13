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

## Gate Severity
- `P0`: missing mandatory output artifact.
- `P1`: cross-stage mismatch, contract violation, or required validation failure.
- `P2`: non-blocking quality/readability risks.

## Source Of Truth Rule
- Keep global shared rules in this file.
- Keep only skill-specific rules in each `SKILL.md`.
- If a rule is reused by 3+ skills, move it here.
