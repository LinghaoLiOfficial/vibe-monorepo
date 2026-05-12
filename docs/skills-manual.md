# Skills System Manual

## 1. Purpose
This manual defines the execution source of truth, role boundaries, contracts, stage gates, and maintenance rules for all current production skills.

## 2. Source of Truth
Canonical production skills are under `.codex/skills`:

1. `.codex/skills/template-prep-page-visual-parser/SKILL.md`
2. `.codex/skills/template-prep-uiux-design-language-abstractor/SKILL.md`
3. `.codex/skills/template-prep-design-system-structurizer/SKILL.md`
4. `.codex/skills/template-prep-frontend-component-planner/SKILL.md`
5. `.codex/skills/template-prep-nextjs-react-frontend-design-language/SKILL.md`
6. `.codex/skills/template-prep-template-indexing/SKILL.md`
7. `.codex/skills/template-preparation-orchestrator/SKILL.md`
8. `.codex/skills/user-generation-system-blueprint/SKILL.md`
9. `.codex/skills/user-generation-multi-page-template-composition/SKILL.md`
10. `.codex/skills/user-generation-nextjs-react-code-generation/SKILL.md`
11. `.codex/skills/user-generation-visual-qa-iterative-fix/SKILL.md`
12. `.codex/skills/user-generation-orchestrator/SKILL.md`

Any historical drafts outside `.codex/skills/*/SKILL.md` are reference-only and must not be treated as execution truth.

## 3. Skill Taxonomy

### 3.1 Atomic skills (10)
- `template-prep-page-visual-parser`
- `template-prep-uiux-design-language-abstractor`
- `template-prep-design-system-structurizer`
- `template-prep-frontend-component-planner`
- `template-prep-nextjs-react-frontend-design-language`
- `template-prep-template-indexing`
- `user-generation-system-blueprint`
- `user-generation-multi-page-template-composition`
- `user-generation-nextjs-react-code-generation`
- `user-generation-visual-qa-iterative-fix`

### 3.2 Orchestrator skills (2)
- `template-preparation-orchestrator`
- `user-generation-orchestrator`

## 4. Cross-Skill Baseline Contracts

### 4.1 Naming convention baseline (template-prep flow)
- Use `<template-name-slug>` (human-readable kebab-case) for all paths and identifiers.
- Do not use hash/code-like IDs as template naming.
- If upstream artifacts are hash/code-like, stop and request normalization before continuing.

### 4.2 Default frontend delivery baseline
- Default stack: Next.js + React + TypeScript + Tailwind CSS + shadcn/ui.
- Default responsive target:
1. Desktop baseline (`>=1200px`)
2. Mobile baseline (`<=767px`)
3. Recommended tablet checkpoint (`768-1199px`)
- Desktop-only delivery is allowed only when explicitly required by user requirements.

### 4.3 Fixed path contracts
- Template-prep artifacts are generated under `templates/<template-name-slug>/...`.
- User-generation requirement/report artifacts are generated under `/user-requirements/`.
- User-generation frontend code output/fixes must be under `frontend/` only.

## 5. Standard SKILL.md Structure
Each SKILL.md should include:

1. Frontmatter:
- `name`
- `description`

2. Runtime contract:
- Purpose/Scope or Pipeline
- Inputs
- Outputs
- Required Sections / Validation checklist / Gate rules
- Failure policy

3. Execution schema:
- Atomic: `Execution Status Schema`, `Artifact Contract`, `Standard Report Template`
- Orchestrator: `Orchestration State Schema`, `Resume Contract`, `Standard Orchestration Report Template`

## 6. Status Conventions

### 6.1 Atomic status values
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

### 6.2 Orchestrator stage values
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `skipped`

## 7. Artifact Contract Baseline (Atomic)
Recommended baseline fields:
- `artifact_path`
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `confidence` (`high|medium|low`)
- `blocking_reason`

Known skill-specific extensions:
- `template-prep-page-visual-parser`: `saved_screenshot_paths`, `saved_screenshots_exist`
- `user-generation-system-blueprint`: `component_layout_section_ok`, `hex_palette_section_ok`
- `user-generation-nextjs-react-code-generation`: `component_layout_section_ok`, `hex_palette_section_ok`

## 8. Resume and Gate Rules

### 8.1 Resume
- `resume_from` must match a known stage name.
- Prior stages must have valid artifacts before resume.
- If prior artifacts are invalid, rollback to earliest invalid stage.

### 8.2 Generic gate pass conditions
A stage passes when all are true:
1. Expected artifact path exists.
2. Artifact is non-empty.
3. Required sections/checkpoints are satisfied.
4. No unresolved blocking issue remains.

## 9. End-to-End Pipelines

### 9.1 Template Preparation pipeline
Stage order:
1. `template-prep-page-visual-parser`
2. `template-prep-uiux-design-language-abstractor`
3. `template-prep-design-system-structurizer`
4. `template-prep-frontend-component-planner`
5. `template-prep-nextjs-react-frontend-design-language`
6. `template-prep-template-indexing`

Coordinator: `template-preparation-orchestrator`

Typical outputs:
- `templates/<template-name-slug>/01-page-visual-parse.md`
- `templates/<template-name-slug>/02-uiux-design-language.md`
- `templates/<template-name-slug>/03-design-system.md`
- `templates/<template-name-slug>/04-frontend-component-plan.md`
- `templates/<template-name-slug>/05-nextjs-react-frontend-language.md`
- `templates/<template-name-slug>/template-index.md`
- `templates/<template-name-slug>/preparation-report.md`

Template-prep gate specifics:
- Visual parser must persist canonical screenshots under `template-preparation/inputs/screenshots/`.
- If mobile screenshot evidence is missing, allowed in hypothesis mode with `completed_with_risk`.

### 9.2 User Generation pipeline
Stage order:
1. `user-generation-system-blueprint`
2. `user-generation-multi-page-template-composition`
3. `user-generation-nextjs-react-code-generation`
4. `user-generation-visual-qa-iterative-fix`

Coordinator: `user-generation-orchestrator`

Typical outputs:
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`
- code files under `frontend/` only
- `/user-requirements/code-generation-report.md`
- `/user-requirements/visual-qa-iterative-fix-report.md`
- `/user-requirements/user-generation-orchestration-report.md`

User-generation gate specifics:
- Missing mobile adaptation evidence is `P1` gate failure unless desktop-only is explicitly requested.
- Desktop shell/root non-full-width (left-right gutters from fixed/max-width root constraints) is `P1` unless explicitly required.
- Missing explicit final selected template disclosure (`template_id` + `template_name`) is `P1`.
- Missing required per-page component layout detail depth is `P1`.
- Missing required global hex color palette detail depth is `P1`.
- Inability to switch global palette by editing one primary theme file is `P1`.
- Missing shadcn/ui evaluation evidence is `P1`.
- Missing shadcn/ui adoption for suitable interactive components is `P1` unless explicitly opted out.

## 10. Required Section Deltas (Current)
- `template-prep-page-visual-parser` requires `## Desktop Evidence` and `## Mobile Evidence Or Hypothesis`.
- `template-prep-nextjs-react-frontend-design-language` requires `## TypeScript Contract` and `## shadcn/ui Adoption Plan`.
- `user-generation-system-blueprint` requires `## Responsive Strategy` and `## Frontend Stack Contract`.
- `user-generation-multi-page-template-composition` requires `## Final Selected Template` and explicit best-fit decision evidence.
- `user-generation-nextjs-react-code-generation` enforces stack compliance reporting and `frontend/`-only output.
- `user-generation-visual-qa-iterative-fix` enforces full-width desktop QA gate and final-template disclosure QA check.
- `user-generation-orchestrator` enforces final-template disclosure fields and related gate failure rules in orchestration reports.

## 11. Section Detail Depth Contract (User-Generation)
Required depth fields across required markdown artifacts:

For `## Per-page Component Layout`:
- `region_partition`
- `component_tree`
- `breakpoint_changes`
- `interaction_states`

For `## Global Hex Color Palette`:
- `semantic_tokens`
- `hex_values`
- `usage_rules`
- `contrast_notes`

## 12. Change Management
When updating skills:
1. Update the target `SKILL.md` first.
2. Sync this manual (EN + zh-CN) whenever contracts, paths, statuses, gate rules, or stage responsibilities change.
3. Keep wording deterministic and verifiable.
4. Prefer additive changes unless explicit deprecation is required.
