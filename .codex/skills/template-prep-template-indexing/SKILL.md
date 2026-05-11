---
name: template-prep-template-indexing
version: 1.0.0
kind: atomic
output_format: markdown
description: Index template prep artifacts into searchable template metadata for matching and composition.
triggers:
  - template indexing
  - 模板索引
---

# Inputs
- `templates/<template-id>/01-page-visual-parse.md`
- `templates/<template-id>/02-uiux-design-language.md`
- `templates/<template-id>/03-design-system.md`
- `templates/<template-id>/04-frontend-component-plan.md`
- `templates/<template-id>/05-nextjs-react-frontend-language.md`

# Output
- `templates/<template-id>/template-index.md`

# Required Sections
- `## Template Identity`
- `## Retrieval Tags`
- `## Matching Signals`
- `## Must Preserve / Can Replace / Can Extend`
- `## Reuse Recommendation`

# Failure Policy
- Fewer than 3 artifacts: allow low-confidence index with explicit blockers.

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
- template_id_or_task_id:
- started_at:
- finished_at:
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

# Runtime Metadata Policy (Mandatory)
- `started_at` and `finished_at` must be real runtime timestamps in ISO8601 with timezone offset.
- Never use hard-coded or placeholder timestamps.
- If execution status is terminal (`completed|completed_with_risk|blocked`), include `duration_ms` computed from timestamps.
- If status is `not_started`, use `null` for `started_at`, `finished_at`, `duration_ms`.
