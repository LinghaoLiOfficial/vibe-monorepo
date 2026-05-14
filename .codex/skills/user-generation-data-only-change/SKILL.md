---
name: user-generation-data-only-change
description: Perform data-only modifications such as seed updates, corrective SQL, or backfill adjustments with idempotent execution evidence, safety checks, and rollback readiness, without changing application code or schema definitions. Use when users request database content updates only. 适用于仅数据库数据修订与回填场景。
---

# Shared Baseline
- Reuse `.codex/skills/_shared/SKILL_WORKFLOW_BASELINE.md`.

# Inputs
- Data change request with target tables/entities and constraints.
- Environment scope (`dev`, `test`, `staging`, or local).
- Current data scripts/migrations directories in repository.

# Outputs
- data-only script or query artifact under repository conventions
- `/user-requirements/data-only-change-report.md`

# Boundary Contract
- allowed changes: data updates/backfills/seeds/fixes.
- disallowed changes in this workflow: schema migration, backend runtime logic changes, frontend code changes.
- if schema or code changes are needed, escalate to `user-generation-fullstack-requirement-evolution`.

# Execution
1. define target rows and safety predicates.
2. prepare idempotent data-change script/query.
3. run precheck counts/sample verification.
4. execute change and run postcheck verification.
5. document rollback strategy and residual risk.

# Safety Contract
- require explicit `WHERE`/scope predicates for mutating statements.
- include precheck and postcheck evidence (counts or keyed samples).
- include rollback method (inverse script, snapshot restore, or compensating update).

# Skill-Specific Gates
- Must provide idempotency statement and proof approach.
- Must provide precheck/postcheck evidence summary.
- Missing rollback plan or unconstrained mutation scope is `P1`.
- Any schema/code change request discovered is `P1` until escalated.

# Validation Modes
- `quick`: dry-run style precheck only; cannot mark final `completed`.
- `full`: requires execution evidence or explicit approved simulation evidence.

# Report Minimum
- target scope and predicates
- idempotency statement
- precheck/postcheck evidence
- rollback plan and escalation decision
