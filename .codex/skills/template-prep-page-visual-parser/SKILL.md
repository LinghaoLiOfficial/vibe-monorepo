---
name: template-prep-page-visual-parser
version: 1.2.0
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

# Naming Convention (Mandatory)
- Use `<template-name-slug>` (human-readable kebab-case) for all paths and identifiers.
- Do not use hash/code-like IDs as template naming.
- If input screenshot filename is hash/code-like, resolve or request `<template-name-slug>` first, then persist canonical files using the slug.

# Inputs
- Primary: `template-preparation/inputs/screenshots/<template-name-slug>.(png|jpg|webp)`
- External input accepted: user-provided screenshot path(s) or image attachment(s) from the current task
- Optional metadata: `templates/<template-name-slug>/metadata.yaml`, `README.md`
- Optional mobile screenshot(s): `template-preparation/inputs/screenshots/<template-name-slug>-mobile[-<index>].(png|jpg|webp)`

# Output
- `templates/<template-name-slug>/01-page-visual-parse.md`
- Saved screenshot(s): `template-preparation/inputs/screenshots/<template-name-slug>[-<index>].(png|jpg|webp)`
- Fallback: `template-preparation/outputs/visual-parse/<template-name-slug>.visual-parse.md`

# Steps
1. Resolve `template-name-slug` and screenshot source path(s).
2. If screenshot source is outside `template-preparation/inputs/screenshots/`, copy and persist it into `template-preparation/inputs/screenshots/` with canonical naming `<template-name-slug>[-<index>]`.
3. Inspect the persisted screenshot(s) and extract structure, hierarchy, layout, visual tokens, interaction cues.
4. Write markdown with stable sections: Summary, Page Type, Desktop Evidence, Mobile Evidence Or Hypothesis, Region Breakdown, Visual Signals, Interaction Signals, Uncertainties.
5. Validate parse file exists, non-empty, and required headings present; also validate persisted screenshot file(s) exist.

# Validation Checklist
- File written
- Contains `## Desktop Evidence`
- Contains `## Mobile Evidence Or Hypothesis`
- Contains `## Region Breakdown`
- Contains `## Visual Signals`
- Contains `## Uncertainties`
- Screenshot(s) persisted under `template-preparation/inputs/screenshots/`
- Naming uses `<template-name-slug>` consistently (no hash/code-like ID paths)

# Failure Policy
- If no screenshot is available: stop and request input path.
- If screenshot cannot be persisted: stop and report the blocking path/permission issue.
- If uncertain (font/size/motion): record as uncertainty, do not fabricate.
- If mobile screenshot is missing: continue with hypothesis mode and mark `completed_with_risk`.
- If `<template-name-slug>` is unknown and cannot be inferred reliably: stop and request template name.

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
