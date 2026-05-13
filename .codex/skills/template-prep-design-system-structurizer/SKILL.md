---
name: template-prep-design-system-structurizer
description: Convert visual and UI/UX abstractions into a template-level design system specification (tokens, type scale, spacing, component baselines). Use when downstream implementation needs a normalized style contract with explicit reuse constraints and responsive token guidance. 适用于生成模板级设计系统规范以支持后续实现。
---


# Inputs

# Naming Convention (Mandatory)
- Use <template-name-slug> (human-readable kebab-case) for all paths and identifiers.
- Do not use hash/code-like IDs as template naming.
- If upstream artifacts use hash/code-like naming, stop and request normalization to <template-name-slug> before continuing.
- Never overwrite existing output from another page/run; if output path exists, resolve a unique slug (`-v2`, `-v3`, ...) before writing.

- `templates/<template-name-slug>/01-page-visual-parse.md`
- `templates/<template-name-slug>/02-uiux-design-language.md`

# Output
- `templates/<template-name-slug>/03-design-system.md`

# Required Sections
- `## Token Taxonomy`
- `## Color System`
- `## Typography System`
- `## Spacing Radius Shadow Border`
- `## Component Style Baselines`
- `## Responsive Token Considerations`
- `## Reuse Constraints`

# Validation
- File exists and non-empty
- All required sections present

# Failure Policy
- If template naming is not <template-name-slug> consistent across required inputs/outputs: stop and request rename normalization.
- Missing one upstream file: allow degraded output with explicit risk note.
- Missing mobile evidence upstream: allow responsive token assumptions with `completed_with_risk`.

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
- Produce template-level design system contract, not product-wide rebranding.
- Preserve source template character; normalize into reusable tokens.

### Execution Workflow
1. Build token taxonomy and semantic naming conventions.
2. Structure color/typography/spacing/radius/border/shadow/state systems.
3. Define component style baselines and multi-page inheritance guidance.

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Evidence traceability, boundary compliance, and responsive assumptions are explicit.
- P2: Downstream-ready handoff notes are concise, actionable, and risk-labeled.
### Downstream Handoff
- Provide only actionable artifacts required by the immediate next stage.
- Keep assumptions, confidence, and risk flags explicit for downstream validation.
