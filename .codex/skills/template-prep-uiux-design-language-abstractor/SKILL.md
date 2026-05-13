---
name: template-prep-uiux-design-language-abstractor
description: Abstract UX intent and interaction principles from visual-parse artifacts into reusable UI/UX design language. Use when a template needs product-level design rationale (IA, interaction rules, accessibility and responsive intent) derived from observed evidence rather than arbitrary invention. 适用于从视觉解析结果抽象可复用 UI/UX 设计语言。
---


# Inputs

# Naming Convention (Mandatory)
- Use <template-name-slug> (human-readable kebab-case) for all paths and identifiers.
- Do not use hash/code-like IDs as template naming.
- If upstream artifacts use hash/code-like naming, stop and request normalization to <template-name-slug> before continuing.
- Never overwrite existing output from another page/run; if output path exists, resolve a unique slug (`-v2`, `-v3`, ...) before writing.

- `templates/<template-name-slug>/01-page-visual-parse.md`

# Output
- `templates/<template-name-slug>/02-uiux-design-language.md`

# Steps
1. Read visual parse.
2. Abstract UX intent, IA signals, interaction priorities, accessibility expectations.
3. Output structured markdown.
4. Validate required sections.

# Required Sections
- `## UX Intent`
- `## Information Architecture Signals`
- `## Interaction Principles`
- `## Responsive Intent (Desktop + Mobile)`
- `## Assumptions And Uncertainties`

# Failure Policy
- If template naming is not <template-name-slug> consistent across required inputs/outputs: stop and request rename normalization.
- If upstream file missing: stop.
- If evidence insufficient: mark low confidence explicitly.
- If mobile evidence is absent upstream, produce hypothesis-based responsive intent and mark `completed_with_risk`.

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
- Abstract UX intent and interaction language from upstream visual evidence.
- Do not rewrite visual parse facts, do not generate component code.

### Execution Workflow
1. Normalize upstream observations into intent, IA signals, interaction priorities.
2. Produce adaptation boundaries (`must_preserve`, `can_replace`, `can_extend`, `avoid`).
3. Add reusable tags for template indexing and downstream design-system consumption.

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Evidence traceability, boundary compliance, and responsive assumptions are explicit.
- P2: Downstream-ready handoff notes are concise, actionable, and risk-labeled.
### Downstream Handoff
- Provide only actionable artifacts required by the immediate next stage.
- Keep assumptions, confidence, and risk flags explicit for downstream validation.
