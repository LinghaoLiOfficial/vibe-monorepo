---
name: user-generation-visual-qa-iterative-fix
description: Run iterative visual QA after fullstack integration acceptance and apply minimal UI-focused fixes until responsive and presentation gates pass. Use when frontend-first fullstack runs already passed integration QA and need final visual-quality closure. 适用于全栈联调通过后的视觉验收与最小修复闭环。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- `/user-requirements/system-blueprint.md`
- `/user-requirements/code-generation-report.md`
- `/user-requirements/fullstack-integration-qa-report.md`

# Outputs
- minimal frontend visual fixes
- `/user-requirements/visual-qa-report.md`

# Visual Severity Rubric
- `P1`: layout break, unreadable content, blocked interaction, mobile unusable issue
- `P2`: significant spacing/alignment inconsistency affecting scanability
- `P3`: minor polish issue without functional impact

# Evidence Minimum
- before/after evidence for each fixed issue
- route + viewport coverage list
- unresolved items with owner and follow-up stage

# Execution
1. run responsive visual checks on key routes
2. record presentation issues by severity
3. apply minimal, non-regressive fixes
4. rerun until pass or accepted risk

# Skill-Specific Gates
- Missing mobile adaptation evidence is `P1` unless user requested desktop-only.
- Missing before/after validation evidence is `P1`.
