---
name: template-prep-template-indexing
description: Index completed template-prep artifacts into searchable metadata for retrieval, matching, and reuse decisions. Use when templates need consistent identity tags, matching signals, preserve/replace boundaries, and confidence-aware responsive coverage labels. 适用于模板入库检索、匹配与复用索引。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- completed prep artifacts `01` to `05`

# Outputs
- `templates/<template-name-slug>/index.json`
- optional update to `templates/catalog.md`

# Execution
1. extract identity and matching metadata
2. record preserve/replace boundaries
3. record confidence and responsive coverage labels
4. update index artifacts

# Skill-Specific Gates
- Missing traceability to source prep artifacts is `P1`.
