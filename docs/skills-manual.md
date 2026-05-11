# Skills System Manual

## 1. Purpose
This is the operational manual for the current project skill system. It defines the execution source of truth, role boundaries, contracts, stage gates, and maintenance rules for all production skills.

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

Atomic skills must define input, output, validation, failure policy, and produce verifiable artifacts.

### 3.2 Orchestrator skills (2)
- `template-preparation-orchestrator`
- `user-generation-orchestrator`

Orchestrators coordinate sequencing, gate checks, resume, and reporting. They do not replace atomic internals.

## 3.3 Default Frontend Delivery Baseline
- Default frontend stack for generation-oriented flow:
- Next.js + React + TypeScript + Tailwind CSS + shadcn/ui
- Default responsive delivery target:
- Desktop baseline (`>=1200px`)
- Mobile baseline (`<=767px`)
- Recommended checkpoint: tablet (`768-1199px`)
- Desktop-only delivery is allowed only when explicitly requested by the user requirement.

## 4. Standard SKILL.md Structure
Each SKILL.md should include:

1. Frontmatter:
- `name`
- `version`
- `kind` (`atomic` or `orchestrator`)
- `output_format`
- `description`
- `triggers`

2. Runtime contract:
- Purpose/Scope
- Inputs
- Outputs
- Steps/Pipeline
- Validation checklist or gate rules
- Failure policy

3. Execution schema:
- Atomic: `Execution Status Schema`, `Artifact Contract`, `Standard Report Template`
- Orchestrator: `Orchestration State Schema`, `Resume Contract`, `Standard Orchestration Report Template`

## 5. Status Conventions

### 5.1 Atomic status values
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

### 5.2 Orchestrator stage values
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `skipped`

Rules:
1. Use `blocked` only when forward progress is impossible.
2. Use `completed_with_risk` when output exists but uncertainty remains.
3. Never mark `completed` without running required validation.

## 6. Artifact Contract Baseline (Atomic)
Recommended baseline fields:
- `artifact_path`
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `confidence` (`high|medium|low`)
- `blocking_reason`

Skill-specific fields are allowed and should be documented in each SKILL.md.

Example now in production:
- `template-prep-page-visual-parser` additionally tracks:
- `saved_screenshot_paths`
- `saved_screenshots_exist`

## 7. Resume and Gate Rules

### 7.1 Resume
- `resume_from` must match a known stage name.
- Prior stages must have valid artifacts.
- If prior artifacts are invalid, rollback to earliest invalid stage.

### 7.2 Gate pass conditions
A stage passes when all are true:
1. Expected artifact path exists.
2. Artifact is non-empty.
3. Required sections/checkpoints are satisfied.
4. No unresolved blocking issue remains.

On gate failure:
- Stop downstream execution.
- Record blocker and recovery action.
- Emit report with next recommended step.

## 8. End-to-End Pipelines

### 8.1 Template Preparation pipeline
Stage order:
1. `template-prep-page-visual-parser`
2. `template-prep-uiux-design-language-abstractor`
3. `template-prep-design-system-structurizer`
4. `template-prep-frontend-component-planner`
5. `template-prep-nextjs-react-frontend-design-language`
6. `template-prep-template-indexing`

Coordinator: `template-preparation-orchestrator`

Typical outputs:
- `01-page-visual-parse.md`
- `02-uiux-design-language.md`
- `03-design-system.md`
- `04-frontend-component-plan.md`
- `05-nextjs-react-frontend-language.md`
- `template-index.md`
- `preparation-report.md`

Screenshot handling requirement:
- Visual parser must persist input screenshot(s) into `template-preparation/inputs/screenshots/` with canonical naming.

Responsive evidence requirement:
- Template preparation defaults to dual-target output:
- Desktop Evidence
- Mobile Evidence or Mobile Hypothesis
- If mobile screenshot evidence is missing, pipeline can continue with explicit assumptions and should use `completed_with_risk` where applicable.
- If mobile-required sections are missing from artifacts (and user did not request desktop-only), gate should fail.

### 8.2 User Generation pipeline
Stage order:
1. `user-generation-system-blueprint`
2. `user-generation-multi-page-template-composition`
3. `user-generation-nextjs-react-code-generation`
4. `user-generation-visual-qa-iterative-fix`

Coordinator: `user-generation-orchestrator`

Typical outputs:
- `docs/system-blueprint.md`
- `docs/multi-page-template-composition.md`
- Generated application code files
- `docs/code-generation-report.md`
- `docs/visual-qa-iterative-fix-report.md`
- orchestration report artifact

Stack and responsive delivery requirement:
- Default implementation stack: Next.js + React + TypeScript + Tailwind CSS + shadcn/ui.
- User-generation flow must validate both desktop and mobile by default unless desktop-only is explicitly required.
- Code-generation and QA reports should include responsive coverage and stack-compliance notes.

## 9. Operational Boundaries by Skill
- `template-prep-page-visual-parser`: visual structure extraction + screenshot persistence only.
- `template-prep-uiux-design-language-abstractor`: UX/interaction abstraction only.
- `template-prep-design-system-structurizer`: design tokens/system rules only.
- `template-prep-frontend-component-planner`: component planning/contracts only.
- `template-prep-nextjs-react-frontend-design-language`: implementation-oriented frontend language spec only.
- `template-prep-template-indexing`: indexing metadata only.
- `template-preparation-orchestrator`: stage sequencing/gates/resume only.
- `user-generation-system-blueprint`: system requirement blueprinting only.
- `user-generation-multi-page-template-composition`: template matching/composition planning only.
- `user-generation-nextjs-react-code-generation`: code generation/modification only.
- `user-generation-visual-qa-iterative-fix`: visual QA and minimal iterative fix only.
- `user-generation-orchestrator`: user-generation flow orchestration only.

## 9.1 Required Section Deltas (Current)
- `user-generation-system-blueprint` now includes:
- `## Responsive Strategy`
- `## Frontend Stack Contract`
- `user-generation-nextjs-react-code-generation` now requires stack-compliance reporting:
- TypeScript usage constraints
- Tailwind tokenized styling constraints
- shadcn/ui adoption summary
- `template-prep-nextjs-react-frontend-design-language` now includes:
- `## TypeScript Contract`
- `## shadcn/ui Adoption Plan`
- `template-prep-page-visual-parser` now includes:
- `## Desktop Evidence`
- `## Mobile Evidence Or Hypothesis`

## 10. Change Management
When updating skills:
1. Update the target `SKILL.md` first.
2. Sync this manual (EN + zh-CN) if contracts, paths, statuses, or stage responsibilities changed.
3. Keep wording deterministic and verifiable.
4. Prefer additive changes to preserve backward compatibility unless deprecation is explicit.
