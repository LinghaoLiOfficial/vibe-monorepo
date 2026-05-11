---
name: template-prep-page-visual-parser
version: 1.0.0
kind: atomic
output_format: markdown
description: Parse webpage screenshot(s) into a structured visual analysis markdown for downstream template-preparation skills.
triggers:
  - template prep visual parse
  - 页面视觉解析
  - parse template screenshot
---

# Purpose
Convert screenshot evidence into a reusable page-level visual parse document, and persist the input screenshot(s) into the standardized screenshots directory for later stages.

# Inputs
- Primary: `template-preparation/inputs/screenshots/<template-id>.(png|jpg|webp)`
- External input accepted: user-provided screenshot path(s) or image attachment(s) from the current task
- Optional metadata: `templates/<template-id>/metadata.yaml`, `README.md`

# Output
- `templates/<template-id>/01-page-visual-parse.md`
- Saved screenshot(s): `template-preparation/inputs/screenshots/<template-id>[-<index>].(png|jpg|webp)`
- Fallback: `template-preparation/outputs/visual-parse/<template-id>.visual-parse.md`

# Steps
1. Resolve `template-id` and screenshot source path(s).
2. If screenshot source is outside `template-preparation/inputs/screenshots/`, copy and persist it into `template-preparation/inputs/screenshots/` with canonical naming `<template-id>[-<index>]`.
3. Inspect the persisted screenshot(s) and extract structure, hierarchy, layout, visual tokens, interaction cues.
4. Write markdown with stable sections: Summary, Page Type, Region Breakdown, Visual Signals, Interaction Signals, Uncertainties.
5. Validate parse file exists, non-empty, and required headings present; also validate persisted screenshot file(s) exist.

# Validation Checklist
- File written
- Contains `## Region Breakdown`
- Contains `## Visual Signals`
- Contains `## Uncertainties`
- Screenshot(s) persisted under `template-preparation/inputs/screenshots/`

# Failure Policy
- If no screenshot is available: stop and request input path.
- If screenshot cannot be persisted: stop and report the blocking path/permission issue.
- If uncertain (font/size/motion): record as uncertainty, do not fabricate.

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
- `saved_screenshot_paths`: list of saved screenshot path(s)
- `saved_screenshots_exist`: `true|false`
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
- saved_screenshot_paths:
- saved_screenshots_exist:

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
