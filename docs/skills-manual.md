# Skills System Manual

## 1. Document Positioning
This document is the internal operational manual for the project skill system. It is not a newcomer-facing README. It defines how all current skills are structured, executed, validated, orchestrated, and maintained.

Scope of this manual:
- The 12 production skills under `skills/professional/*/SKILL.md`
- Skill role boundaries (`atomic` vs `orchestrator`)
- Artifact contracts, validation contracts, state schemas, and report templates
- End-to-end pipeline behavior for template preparation and user generation

Out of scope:
- Marketing-style project introduction
- Generic prompt engineering tutorials
- Unrelated codebase architecture outside skill execution

---

## 2. Canonical Skill Location
Canonical skills are located at:

- `skills/professional/template-prep-page-visual-parser/SKILL.md`
- `skills/professional/template-prep-uiux-design-language-abstractor/SKILL.md`
- `skills/professional/template-prep-design-system-structurizer/SKILL.md`
- `skills/professional/template-prep-frontend-component-planner/SKILL.md`
- `skills/professional/template-prep-nextjs-react-frontend-design-language/SKILL.md`
- `skills/professional/template-prep-template-indexing/SKILL.md`
- `skills/professional/template-preparation-orchestrator/SKILL.md`
- `skills/professional/user-generation-system-blueprint/SKILL.md`
- `skills/professional/user-generation-multi-page-template-composition/SKILL.md`
- `skills/professional/user-generation-nextjs-react-code-generation/SKILL.md`
- `skills/professional/user-generation-visual-qa-iterative-fix/SKILL.md`
- `skills/professional/user-generation-orchestrator/SKILL.md`

Legacy markdown skill drafts under `skills/*.md` are historical assets and should not be treated as execution source of truth.

---

## 3. Skill Taxonomy

### 3.1 Atomic Skills
Atomic skills perform one bounded production task and must output verifiable artifacts.

Current atomic skills:
1. `template-prep-page-visual-parser`
2. `template-prep-uiux-design-language-abstractor`
3. `template-prep-design-system-structurizer`
4. `template-prep-frontend-component-planner`
5. `template-prep-nextjs-react-frontend-design-language`
6. `template-prep-template-indexing`
7. `user-generation-system-blueprint`
8. `user-generation-multi-page-template-composition`
9. `user-generation-nextjs-react-code-generation`
10. `user-generation-visual-qa-iterative-fix`

Atomic skill contract principle:
- Must define inputs
- Must define outputs
- Must define validation checkpoints
- Must define failure policy
- Must produce file-level artifacts (`.md` and/or code files)

### 3.2 Orchestrator Skills
Orchestrator skills coordinate stage order, gate checks, resume semantics, and final reporting. They do not replace atomic skill internals.

Current orchestrator skills:
1. `template-preparation-orchestrator`
2. `user-generation-orchestrator`

Orchestrator contract principle:
- Must track per-stage status
- Must enforce stage gates
- Must support resume mode
- Must emit orchestration report
- Must stop on blocking failures

---

## 4. Standard SKILL.md Structure
All production skills should follow this high-level structure:

1. Frontmatter
- `name`
- `version`
- `kind` (`atomic` or `orchestrator`)
- `output_format`
- `description`
- `triggers`

2. Runtime sections
- Purpose or Scope
- Inputs
- Outputs
- Steps or Pipeline
- Required sections / gate rules
- Failure policy

3. Execution schema sections
- Atomic: `Execution Status Schema`, `Artifact Contract`, `Standard Report Template`
- Orchestrator: `Orchestration State Schema`, `Resume Contract`, `Standard Orchestration Report Template`

---

## 5. Execution Status Standards

### 5.1 Atomic Status Values
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

### 5.2 Orchestrator Stage Status Values
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `skipped`

Status usage rules:
1. Use `blocked` only when downstream progress is impossible without intervention.
2. Use `completed_with_risk` (atomic) when artifact exists but confidence/risk is not ideal.
3. Never mark `completed` when required validation has not run.

---

## 6. Artifact Contract Standards (Atomic)
Every atomic execution should capture:
- `artifact_path`
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `confidence` (`high|medium|low`)
- `blocking_reason`

Interpretation rules:
1. `artifact_exists=false` means stage not delivered.
2. `artifact_non_empty=false` is equivalent to failed output.
3. `required_sections_ok=false` means contract violation even if file exists.
4. `confidence=low` must be accompanied by explicit uncertainties.

---

## 7. Resume and Gate Rules

### 7.1 Resume (`resume_from`)
- `resume_from` must match a known stage name in the orchestrator.
- All previous stages must have validated artifacts.
- If any previous stage is invalid, resume point must roll back to earliest invalid stage.

### 7.2 Gate enforcement
A stage gate passes only when:
1. Expected artifact path is present.
2. Artifact is non-empty.
3. Required sections/checkpoints are satisfied.
4. No unresolved P0 blocker remains.

Gate failure behavior:
- Stop forward execution.
- Record blocker and recovery action.
- Emit report with next action recommendation.

---

## 8. End-to-End Pipelines

### 8.1 Template Preparation Pipeline
Stage order:
1. `template-prep-page-visual-parser`
2. `template-prep-uiux-design-language-abstractor`
3. `template-prep-design-system-structurizer`
4. `template-prep-frontend-component-planner`
5. `template-prep-nextjs-react-frontend-design-language`
6. `template-prep-template-indexing`

Coordinator:
- `template-preparation-orchestrator`

Primary artifacts (default template-level):
- `01-page-visual-parse.md`
- `02-uiux-design-language.md`
- `03-design-system.md`
- `04-frontend-component-plan.md`
- `05-nextjs-react-frontend-language.md`
- `template-index.md`
- `preparation-report.md`

### 8.2 User Generation Pipeline
Stage order:
1. `user-generation-system-blueprint`
2. `user-generation-multi-page-template-composition`
3. `user-generation-nextjs-react-code-generation`
4. `user-generation-visual-qa-iterative-fix`

Coordinator:
- `user-generation-orchestrator`

Primary artifacts:
- `docs/system-blueprint.md`
- `docs/multi-page-template-composition.md`
- code artifacts in app source directories
- `docs/code-generation-report.md`
- `docs/visual-qa-iterative-fix-report.md`
- `docs/12-user-generation-orchestration-report.md`

---

## 9. Skill-by-Skill Operational Notes

### 9.1 template-prep-page-visual-parser (Atomic)
Mission:
- Convert screenshot evidence into structured visual parse markdown.

Hard boundaries:
- No design system output in this stage.
- No component planning in this stage.

Failure trigger examples:
- Missing screenshot input.
- Non-interpretable source image.

### 9.2 template-prep-uiux-design-language-abstractor (Atomic)
Mission:
- Convert visual parse into UX intent and interaction-language abstraction.

Hard boundaries:
- No raw screenshot parsing here.
- No tokenization or code generation.

### 9.3 template-prep-design-system-structurizer (Atomic)
Mission:
- Produce template-level design system markdown.

Hard boundaries:
- No React code implementation.
- No route/system blueprinting.

### 9.4 template-prep-frontend-component-planner (Atomic)
Mission:
- Define component hierarchy, boundaries, and contracts.

Hard boundaries:
- Planning only, no `.tsx` generation.

### 9.5 template-prep-nextjs-react-frontend-design-language (Atomic)
Mission:
- Produce implementation guidance for future Next.js + React realization.

Hard boundaries:
- Specification artifact only.
- No direct code synthesis in this stage.

### 9.6 template-prep-template-indexing (Atomic)
Mission:
- Convert prep artifacts into retrieval/matching index metadata.

Hard boundaries:
- No template composition and no app code generation.

### 9.7 template-preparation-orchestrator (Orchestrator)
Mission:
- Execute and gate the full template-preparation lifecycle with resumability.

Hard boundaries:
- Must not replace atomic logic.

### 9.8 user-generation-system-blueprint (Atomic)
Mission:
- Transform requirement intent into system-level blueprint.

Hard boundaries:
- No template selection and no code generation.

### 9.9 user-generation-multi-page-template-composition (Atomic)
Mission:
- Map routes/pages to template choices with explainable scoring.

Hard boundaries:
- No repo code edits in this stage.

### 9.10 user-generation-nextjs-react-code-generation (Atomic)
Mission:
- Create/modify real project code according to upstream plans.

Hard boundaries:
- Must not claim validations that were not executed.

### 9.11 user-generation-visual-qa-iterative-fix (Atomic)
Mission:
- Run QA loops, apply minimal fixes, and re-validate.

Hard boundaries:
- No full system replanning in QA stage.

### 9.12 user-generation-orchestrator (Orchestrator)
Mission:
- Coordinate user-generation lifecycle from blueprint to QA closure.

Hard boundaries:
- Must enforce stage gates and blocker reporting.

---

## 10. Reporting Standards

### 10.1 Atomic report requirements
Every atomic run report should include:
1. Run metadata
2. Inputs and missing inputs
3. Output artifact checks
4. Validation result summary
5. Risks and assumptions
6. Downstream handoff

### 10.2 Orchestration report requirements
Every orchestration report should include:
1. Run mode and timing
2. Stage status table
3. Gate summary
4. Produced artifacts
5. Blockers/risks
6. Recommended next action

---

## 11. Quality and Governance Rules
1. No fabricated validation results.
2. No fabricated input evidence.
3. Stage boundaries are strict; avoid role leakage.
4. Prefer deterministic output paths.
5. Use explicit uncertainty markers instead of silent guessing.
6. Keep artifacts version-controllable and reviewable.

---

## 12. Migration and Maintenance Policy

### 12.1 Legacy cleanup recommendation
- Keep `skills/professional/*/SKILL.md` as sole active source.
- Remove or archive old `skills/*.md` legacy drafts only after confirming no references remain.

### 12.2 Versioning
- Bump `version` in frontmatter on behavioral changes.
- Patch-level bump for wording/clarity updates.
- Minor-level bump for contract changes.

### 12.3 Change checklist
Before accepting a skill update:
1. Frontmatter remains valid.
2. `kind` is correct.
3. Inputs/outputs are explicit.
4. Validation and failure policy are explicit.
5. Status/report schema sections are preserved.

---

## 13. Suggested Operational Conventions
1. Keep one template/app task per run identifier.
2. Persist run reports near artifacts.
3. Prefer resume over full rerun when upstream artifacts are valid.
4. Escalate blockers early with actionable next step.
5. Keep orchestrators thin and atomic skills deep.

---

## 14. Quick Reference Table

| Skill | Kind | Core Output |
|---|---|---|
| template-prep-page-visual-parser | atomic | `01-page-visual-parse.md` |
| template-prep-uiux-design-language-abstractor | atomic | `02-uiux-design-language.md` |
| template-prep-design-system-structurizer | atomic | `03-design-system.md` |
| template-prep-frontend-component-planner | atomic | `04-frontend-component-plan.md` |
| template-prep-nextjs-react-frontend-design-language | atomic | `05-nextjs-react-frontend-language.md` |
| template-prep-template-indexing | atomic | `template-index.md` |
| template-preparation-orchestrator | orchestrator | `preparation-report.md` |
| user-generation-system-blueprint | atomic | `docs/system-blueprint.md` |
| user-generation-multi-page-template-composition | atomic | `docs/multi-page-template-composition.md` |
| user-generation-nextjs-react-code-generation | atomic | code + `docs/code-generation-report.md` |
| user-generation-visual-qa-iterative-fix | atomic | code fixes + `docs/visual-qa-iterative-fix-report.md` |
| user-generation-orchestrator | orchestrator | `docs/12-user-generation-orchestration-report.md` |

