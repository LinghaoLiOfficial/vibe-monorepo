# Frontend Architecture Spec

## Scope
This spec is the frontend single source of truth for this repository.
Applies to all frontend generation and refactor tasks under `frontend/`.

## Stack Baseline
- Next.js App Router
- React + TypeScript (strict)
- Tailwind CSS
- Optional shadcn/ui for interactive primitives

## Collaboration Mode (Frontend-first)
This repository follows frontend-first iterative fullstack delivery.
Mandatory frontend sequence for each requirement slice:
1. Build/adjust frontend behavior first.
2. Emit `/user-requirements/frontend-api-contract-input.md`.
3. Hand off contract intent to `api-contract-design`.
4. Integrate with backend and close via integration + visual QA.

Forbidden:
- Skipping `frontend-api-contract-input` for slices with data interaction.
- Ad-hoc frontend-backend contract changes without contract artifact updates.

## Directory Contract
Frontend code must stay under:
- `frontend/src/app`
- `frontend/src/lib`
- `frontend/src/styles`
- `frontend/public` (optional)

Optional extension directories (when needed):
- `frontend/src/components`
- `frontend/src/components/ui`
- `frontend/src/features`
- `frontend/src/hooks`
- `frontend/src/types`

## Server/Client Boundary Rules
- Default to Server Components in route/page composition.
- Add client components only when browser interactivity is required.
- Avoid broad `'use client'` at page/layout root unless strictly necessary.

## Responsive Baseline
- Desktop-first implementation baseline (`>=1200px`), then mobile adaptation (`<=767px`).
- Recommended tablet checkpoint (`768-1199px`).
- Desktop shell should fill width by default unless explicitly constrained by requirement.

## Theme And Design Token Rules
- Keep one primary global theme entrypoint at `frontend/src/styles/theme.css`.
- Global palette changes should be possible by editing that file only.
- Avoid scattered hardcoded global hex values across route files.

## Type And Validation Rules
- Do not use untyped external payloads directly.
- Prefer explicit request/response types aligned with contract artifacts.
- For user input and boundary validation, use explicit schema validation strategy.

## Quality Gate Commands
Must pass for frontend stage completion:
```bash
cd frontend
pnpm type-check
pnpm build
```

## Visual QA Baseline
Frontend visual QA report must include:
- viewport pass/fail summary (desktop + mobile)
- layout and interaction regression notes
- one-step theme switch verification

## Release And Rollback Baseline
Frontend slice delivery report must include:
- changed route/component list
- interaction risk summary
- rollback instruction
