---
name: template-prep-nextjs-react-frontend-design-language
description: Produce implementation-oriented Next.js + React + TypeScript + Tailwind + shadcn/ui frontend language specs from template prep outputs. Use when engineering teams need explicit app-router structure, server/client boundaries, token mappings, and adaptation constraints before coding. 适用于代码生成前的前端实现规范沉淀。
---


# Inputs

# Naming Convention (Mandatory)
- Use <template-name-slug> (human-readable kebab-case) for all paths and identifiers.
- Do not use hash/code-like IDs as template naming.
- If upstream artifacts use hash/code-like naming, stop and request normalization to <template-name-slug> before continuing.

- `templates/<template-name-slug>/03-design-system.md`
- `templates/<template-name-slug>/04-frontend-component-plan.md`
- Optional: `02-uiux-design-language.md`, `01-page-visual-parse.md`

# Output
- `templates/<template-name-slug>/05-nextjs-react-frontend-language.md`

# Required Sections
- `## App Router Structure Suggestion`
- `## Server Client Component Boundaries`
- `## Props And Data Contracts`
- `## Tailwind Token Mapping`
- `## TypeScript Contract`
- `## shadcn/ui Adoption Plan`
- `## Responsive Implementation Notes`
- `## Adaptation Constraints`

# Failure Policy
- If template naming is not <template-name-slug> consistent across required inputs/outputs: stop and request rename normalization.
- If component plan missing: stop.
- If responsive assumptions are based on desktop-only evidence, mark `completed_with_risk` and enumerate verification gaps.
- If Tailwind mapping, TypeScript contract, or shadcn/ui plan is missing, fail required-sections validation.

# Execution Status Schema
Use these statuses in run logs or reports:
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

# Artifact Contract
- `artifact_path`: absolute or repo-relative output file path
- `artifact_exists`: `true|false`
- `artifact_non_empty`: `true|false`
- `required_sections_ok`: `true|false`
- `confidence`: `high|medium|low`
- `blocking_reason`: empty when not blocked

# Standard Report Template
```markdown
# <skill-name> Execution Report

## 1. Run Metadata
- skill_name:
- template_name_slug:
- status:

## 2. Inputs
- files_read:
- missing_inputs:

## 3. Outputs
- artifact_path:
- artifact_exists:
- artifact_non_empty:
- required_sections_ok:

## 4. Validation
- checks_run:
- checks_passed:
- checks_failed:

## 5. Risks And Uncertainties
- confidence:
- assumptions:
- unresolved_items:

## 6. Next Handoff
- next_skill:
- handoff_notes:
```

## Professional Notes

### Scope And Non-Goals
- Output implementation language specification, not runtime source code.
- Use upstream artifacts as source of truth; avoid speculative redesign.

### Execution Workflow
1. Define App Router structure and server/client component boundaries.
2. Specify TypeScript contracts and Tailwind-token mapping strategy.
3. Declare adaptation constraints (preserve/replace/extend/avoid/not-suitable).

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Evidence traceability, boundary compliance, and responsive assumptions are explicit.
- P2: Downstream-ready handoff notes are concise, actionable, and risk-labeled.
### Downstream Handoff
- Provide only actionable artifacts required by the immediate next stage.
- Keep assumptions, confidence, and risk flags explicit for downstream validation.

