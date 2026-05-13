---
name: user-generation-multi-page-template-composition
description: Compose a multi-page template strategy by matching system blueprint requirements with template indices using explainable scoring. Use when selecting a final best-fit template, mapping routes to template regions, and defining adaptation plans with responsive and component-level constraints. 适用于多页面模板选型、映射与适配规划。
---

# Inputs
- `/user-requirements/system-blueprint.md`
- template index files under `templates/*/template-index.md`

# Required Companion Tool Skill
- Use `frontend-project-structure-contract` to align output with the blueprint structure contract.
- If alignment evidence is missing, treat section validation as failed.

# Frontend Spec Alignment (Mandatory)
- Read `docs/FRONTEND_SPEC.md` before composition.
- Ensure composition reflects:
- desktop-first information hierarchy
- mobile adaptation matrix completeness
- server/client boundary assumptions at route level

# Output
- `/user-requirements/multi-page-template-composition.md`

# Path Contract
- Requirement-related artifacts must be written under `/user-requirements/`.

# Required Sections
- `## Final Selected Template`
- `## Visual Anchor`
- `## Route To Template Mapping`
- `## Matching Scores`
- `## Adaptation Plan`
- `## Per-page Component Layout`
- `## Frontend Project Structure Alignment`
- `## Frontend Spec Alignment`
- `## Global Hex Color Palette`
- `## Responsive Adaptation Matrix`
- `## shadcn/ui Component Mapping`
- `## shadcn/ui Evaluation Matrix`
- `## Risks And Fallbacks`

# Final Template Disclosure Contract
- Must explicitly identify the final best-fit template for this run.
- In `## Final Selected Template`, include at least:
- `template_id`
- `template_name`
- `selection_reason`
- `alternative_templates_considered`

# Executable Validation (Mandatory)
- Run these checks before stage completion:
```bash
scripts/check_structure_contracts.sh
```

# Execution Status Schema
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

# Artifact Contract
- `artifact_path`
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `component_layout_section_ok`
- `hex_palette_section_ok`
- `frontend_spec_alignment_ok`
- `structure_consistency_ok`
- `confidence`
- `blocking_reason`

# Standard Report Template
```markdown
# <skill-name> Execution Report

## 1. Run Metadata
- skill_name:
- slice_id:
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
- frontend_spec_alignment_ok:
- structure_consistency_ok:

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
- Produce explainable composition strategy; do not generate frontend code.
- Follow `system-blueprint` as hard constraint for route responsibilities.

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Frontend spec alignment and structure consistency are explicit.
- P2: Downstream handoff notes are concise and actionable.
