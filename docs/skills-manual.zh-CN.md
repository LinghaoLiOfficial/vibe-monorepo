# Skills 系统操作手册（中文版）

## 1. 文档目的
本文档定义当前生产 Skills 的执行真源、角色边界、契约、阶段门禁和维护规则。

## 2. 执行真源（Source of Truth）
生产级 Skills 统一位于 `.codex/skills`：

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

除 `.codex/skills/*/SKILL.md` 外的历史草稿仅可参考，不作为执行标准。

## 3. Skill 分类

### 3.1 原子 Skill（10 个）
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

### 3.2 编排 Skill（2 个）
- `template-preparation-orchestrator`
- `user-generation-orchestrator`

## 4. 跨 Skill 基线契约

### 4.1 命名规范基线（template-prep 流程）
- 所有路径和标识符统一使用 `<template-name-slug>`（可读 kebab-case）。
- 禁止使用 hash/code-like ID 作为模板命名。
- 若上游产物使用 hash/code-like 命名，应先阻塞并要求命名归一化。

### 4.2 默认前端交付基线
- 默认技术栈：Next.js + React + TypeScript + Tailwind CSS + shadcn/ui。
- 默认响应式目标：
1. Desktop 基线（`>=1200px`）
2. Mobile 基线（`<=767px`）
3. 建议补充 Tablet 检查（`768-1199px`）
- 仅当需求明确要求 desktop-only 时，才允许不交付移动端。

### 4.3 固定路径契约
- template-prep 产物位于 `templates/<template-name-slug>/...`。
- user-generation 的需求/报告产物位于 `/user-requirements/`。
- user-generation 的前端代码输出与修复仅允许在 `frontend/` 下。

## 5. 标准 SKILL.md 结构
每个 SKILL.md 应包含：

1. Frontmatter：
- `name`
- `description`

2. 运行契约：
- Purpose/Scope 或 Pipeline
- Inputs
- Outputs
- Required Sections / Validation Checklist / Gate Rules
- Failure Policy

3. 执行 Schema：
- 原子 Skill：`Execution Status Schema`、`Artifact Contract`、`Standard Report Template`
- 编排 Skill：`Orchestration State Schema`、`Resume Contract`、`Standard Orchestration Report Template`

## 6. 状态约定

### 6.1 原子状态
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

### 6.2 编排阶段状态
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `skipped`

## 7. 原子产物契约基线
基础字段：
- `artifact_path`
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `confidence`（`high|medium|low`）
- `blocking_reason`

当前已知扩展字段：
- `template-prep-page-visual-parser`：`saved_screenshot_paths`、`saved_screenshots_exist`
- `user-generation-system-blueprint`：`component_layout_section_ok`、`hex_palette_section_ok`
- `user-generation-nextjs-react-code-generation`：`component_layout_section_ok`、`hex_palette_section_ok`

## 8. 恢复与门禁规则

### 8.1 恢复执行
- `resume_from` 必须匹配已知阶段名。
- 恢复点之前阶段必须已有有效产物。
- 若前序产物无效，应回退至最早无效阶段。

### 8.2 通用门禁通过条件
同时满足以下条件才可通过：
1. 预期产物路径存在。
2. 产物非空。
3. 必需章节/检查项满足。
4. 无未解决阻塞问题。

## 9. 端到端流程

### 9.1 模板准备流程（Template Preparation）
阶段顺序：
1. `template-prep-page-visual-parser`
2. `template-prep-uiux-design-language-abstractor`
3. `template-prep-design-system-structurizer`
4. `template-prep-frontend-component-planner`
5. `template-prep-nextjs-react-frontend-design-language`
6. `template-prep-template-indexing`

编排器：`template-preparation-orchestrator`

常见产物：
- `templates/<template-name-slug>/01-page-visual-parse.md`
- `templates/<template-name-slug>/02-uiux-design-language.md`
- `templates/<template-name-slug>/03-design-system.md`
- `templates/<template-name-slug>/04-frontend-component-plan.md`
- `templates/<template-name-slug>/05-nextjs-react-frontend-language.md`
- `templates/<template-name-slug>/template-index.md`
- `templates/<template-name-slug>/preparation-report.md`

模板准备特定门禁：
- 视觉解析阶段必须将截图按规范持久化到 `template-preparation/inputs/screenshots/`。
- 若缺少移动端截图证据，允许以 hypothesis 模式继续，但应使用 `completed_with_risk`。

### 9.2 用户生成流程（User Generation）
阶段顺序：
1. `user-generation-system-blueprint`
2. `user-generation-multi-page-template-composition`
3. `user-generation-nextjs-react-code-generation`
4. `user-generation-visual-qa-iterative-fix`

编排器：`user-generation-orchestrator`

常见产物：
- `/user-requirements/system-blueprint.md`
- `/user-requirements/multi-page-template-composition.md`
- 仅位于 `frontend/` 下的代码文件
- `/user-requirements/code-generation-report.md`
- `/user-requirements/visual-qa-iterative-fix-report.md`
- `/user-requirements/user-generation-orchestration-report.md`

用户生成特定门禁：
- 缺少移动端适配证据：`P1` 门禁失败（除非明确 desktop-only）。
- 桌面端根级/壳层非全宽（由固定/最大宽约束导致左右留白）：`P1`（除非需求明确要求）。
- 缺少最终模板显式披露（`template_id` + `template_name`）：`P1`。
- 缺少每页组件布局必需细节深度：`P1`。
- 缺少全局 Hex 调色板必需细节深度：`P1`。
- 无法通过编辑一个主主题文件完成全局配色切换：`P1`。
- 缺少 shadcn/ui 评估证据：`P1`。
- 适用交互组件未采用 shadcn/ui：`P1`（除非明确豁免）。

## 10. 当前必需章节增量
- `template-prep-page-visual-parser` 必需：`## Desktop Evidence`、`## Mobile Evidence Or Hypothesis`。
- `template-prep-nextjs-react-frontend-design-language` 必需：`## TypeScript Contract`、`## shadcn/ui Adoption Plan`。
- `user-generation-system-blueprint` 必需：`## Responsive Strategy`、`## Frontend Stack Contract`。
- `user-generation-multi-page-template-composition` 必需：`## Final Selected Template`（含最终最优模板决策证据）。
- `user-generation-nextjs-react-code-generation` 强制技术栈合规报告与 `frontend/` 单一路径约束。
- `user-generation-visual-qa-iterative-fix` 强制桌面全宽 QA 门禁与最终模板披露校验。
- `user-generation-orchestrator` 在编排报告中强制最终模板披露字段与关联门禁。

## 11. 章节细节深度契约（User-Generation）
必需 markdown 产物中以下字段必须具备：

`## Per-page Component Layout`：
- `region_partition`
- `component_tree`
- `breakpoint_changes`
- `interaction_states`

`## Global Hex Color Palette`：
- `semantic_tokens`
- `hex_values`
- `usage_rules`
- `contrast_notes`

## 12. 变更维护规则
更新 Skill 时：
1. 先更新目标 `SKILL.md`。
2. 只要契约、路径、状态、门禁规则、职责有变化，就同步更新本手册中英文版本。
3. 文案保持可验证、可执行、少歧义。
4. 除非明确废弃，优先做增量兼容更新。
