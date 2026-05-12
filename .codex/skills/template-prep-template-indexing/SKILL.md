---
name: template-prep-template-indexing
description: Index template prep artifacts into searchable template metadata for matching and composition.
---


# Inputs

# Naming Convention (Mandatory)
- Use <template-name-slug> (human-readable kebab-case) for all paths and identifiers.
- Do not use hash/code-like IDs as template naming.
- If upstream artifacts use hash/code-like naming, stop and request normalization to <template-name-slug> before continuing.

- `templates/<template-name-slug>/01-page-visual-parse.md`
- `templates/<template-name-slug>/02-uiux-design-language.md`
- `templates/<template-name-slug>/03-design-system.md`
- `templates/<template-name-slug>/04-frontend-component-plan.md`
- `templates/<template-name-slug>/05-nextjs-react-frontend-language.md`

# Output
- `templates/<template-name-slug>/template-index.md`

# Required Sections
- `## Template Identity`
- `## Retrieval Tags`
- `## Matching Signals`
- `## Must Preserve / Can Replace / Can Extend`
- `## Responsive Coverage`
- `## Reuse Recommendation`

# Failure Policy
- If template naming is not <template-name-slug> consistent across required inputs/outputs: stop and request rename normalization.
- Fewer than 3 artifacts: allow low-confidence index with explicit blockers.
- If mobile evidence is hypothesis-only, keep indexing allowed but mark low-confidence responsive tags.

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
