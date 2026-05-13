---
name: user-generation-system-blueprint
description: Convert product requirements into an implementation-grade multi-page system blueprint for frontend-first fullstack delivery. Use when a project needs scoped routes, roles, core flows, responsive strategy, frontend stack contracts, and backend domain/API assumptions before template composition and implementation. 适用于前端优先全栈流程中的需求蓝图建模。
---

# Inputs
- `/user-requirements/user-requirement.md` (or equivalent requirement doc)
- Optional: template library context

# Required Companion Tool Skill
- Use `frontend-project-structure-contract` to produce `## Frontend Project Structure Contract` with complete required fields.
- If companion-skill fields are incomplete, treat required-sections validation as failed.

# Frontend Spec Alignment (Mandatory)
- Read `docs/FRONTEND_SPEC.md` before blueprinting.
- Ensure blueprint reflects:
- desktop-first then mobile adaptation strategy
- server/client boundary intent at page level
- one-step theme switch path (`frontend/src/styles/theme.css`)

# Output
- `/user-requirements/system-blueprint.md`

# Path Contract
- Requirement-related artifacts must be written under `/user-requirements/`.

# Required Sections
- `## Scope`
- `## Requirement Slice Definition`
- `## Roles`
- `## Page Inventory`
- `## Route Map`
- `## Core Flows`
- `## Per-page Component Layout`
- `## Frontend Project Structure Contract`
- `## Cross-page Consistency Rules`
- `## Global Hex Color Palette`
- `## Responsive Strategy`
- `## Frontend Stack Contract`
- `## Backend Readiness Assumptions`
- `## Frontend Spec Alignment`
- `## Assumptions`

# Requirement Slice Definition Contract
- Define one default slice for this run:
- `slice_id`
- `slice_goal`
- `in_scope`
- `out_of_scope`
- `acceptance_signals`

# Backend Readiness Assumptions Contract
- Include frontend-derived backend hints only, not backend implementation details.
- Must include:
- `candidate_entities`
- `candidate_permissions`
- `candidate_api_domains`
- `data_consistency_risks`

# Responsive Defaults
- Unless explicitly overridden by user requirement, define dual-target delivery:
- Desktop: `>=1200px`
- Mobile: `<=767px`
- Optional but recommended: tablet `768-1199px`

# Executable Validation (Mandatory)
- Run these checks before stage completion:
```bash
scripts/check_structure_contracts.sh
```

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
- `component_layout_section_ok`: `true|false`
- `hex_palette_section_ok`: `true|false`
- `frontend_spec_alignment_ok`: `true|false`
- `structure_consistency_ok`: `true|false`
- `confidence`: `high|medium|low`
- `blocking_reason`: empty when not blocked

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
- Convert requirements into an implementation-grade blueprint for frontend-first execution.
- Do not perform template matching or backend implementation.

### Quality Gates
- P0: Required output artifact exists, is non-empty, and passes required-section checks.
- P1: Required slice definition, frontend spec alignment, and structure consistency are explicit.
- P2: Downstream handoff fields are actionable for composition and contract design.
