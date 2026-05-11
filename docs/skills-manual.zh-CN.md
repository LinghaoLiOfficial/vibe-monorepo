# Skills 系统操作手册（中文版）

## 1. 文档目的
本文档是当前项目 Skills 系统的操作规范，定义执行真源、角色边界、契约、阶段门禁与维护规则。

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

除 `.codex/skills/*/SKILL.md` 外的历史草稿，仅可参考，不作为执行标准。

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

原子 Skill 必须定义输入、输出、校验、失败策略，并产出可验证文件。

### 3.2 编排 Skill（2 个）
- `template-preparation-orchestrator`
- `user-generation-orchestrator`

编排 Skill 负责阶段顺序、门禁、恢复与报告，不替代原子 Skill 内部逻辑。

### 3.3 默认前端交付基线
- 面向生成链路的默认前端技术栈：
- Next.js + React + TypeScript + Tailwind CSS + shadcn/ui
- 默认响应式交付目标：
- Desktop 基线（`>=1200px`）
- Mobile 基线（`<=767px`）
- 建议补充检查：Tablet（`768-1199px`）
- 仅当用户需求明确要求 desktop-only 时，才可不交付移动端。

## 4. 标准 SKILL.md 结构
每个 SKILL.md 建议包含：

1. Frontmatter：
- `name`
- `version`
- `kind`（`atomic` 或 `orchestrator`）
- `output_format`
- `description`
- `triggers`

2. 运行契约：
- Purpose/Scope
- Inputs
- Outputs
- Steps/Pipeline
- Validation Checklist 或 Gate Rules
- Failure Policy

3. 执行 Schema：
- 原子：`Execution Status Schema`、`Artifact Contract`、`Standard Report Template`
- 编排：`Orchestration State Schema`、`Resume Contract`、`Standard Orchestration Report Template`

## 5. 状态约定

### 5.1 原子状态
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

### 5.2 编排阶段状态
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `skipped`

规则：
1. 仅当无法继续推进时使用 `blocked`。
2. 产物存在但不确定性较高时使用 `completed_with_risk`。
3. 未完成必要校验不得标记为 `completed`。

## 6. 原子产物契约基线
建议基础字段：
- `artifact_path`
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `confidence`（`high|medium|low`）
- `blocking_reason`

允许各 Skill 扩展字段，并在对应 SKILL.md 中明确。

当前生产示例：
- `template-prep-page-visual-parser` 额外追踪：
- `saved_screenshot_paths`
- `saved_screenshots_exist`

## 7. 恢复与门禁规则

### 7.1 恢复执行
- `resume_from` 必须匹配已知阶段名。
- 恢复点之前阶段必须有有效产物。
- 若前序阶段无效，应回退到最早无效阶段重跑。

### 7.2 门禁通过条件
以下条件同时满足才可通过：
1. 预期产物路径存在。
2. 产物非空。
3. 必要章节/检查项通过。
4. 不存在未解决阻塞问题。

门禁失败时：
- 立即停止下游阶段。
- 记录阻塞原因与恢复建议。
- 输出报告并给出下一步建议。

## 8. 端到端流程

### 8.1 模板准备流程
阶段顺序：
1. `template-prep-page-visual-parser`
2. `template-prep-uiux-design-language-abstractor`
3. `template-prep-design-system-structurizer`
4. `template-prep-frontend-component-planner`
5. `template-prep-nextjs-react-frontend-design-language`
6. `template-prep-template-indexing`

编排器：`template-preparation-orchestrator`

常见产物：
- `01-page-visual-parse.md`
- `02-uiux-design-language.md`
- `03-design-system.md`
- `04-frontend-component-plan.md`
- `05-nextjs-react-frontend-language.md`
- `template-index.md`
- `preparation-report.md`

截图处理要求：
- 视觉解析阶段必须将输入截图落盘到 `template-preparation/inputs/screenshots/` 并使用规范命名。

响应式证据要求：
- 模板准备默认输出双目标内容：
- Desktop Evidence
- Mobile Evidence 或 Mobile Hypothesis
- 若缺少移动端截图证据，可继续执行，但必须显式记录假设，并在适用阶段使用 `completed_with_risk`。
- 若产物缺少移动端必需章节（且用户未明确 desktop-only），应判定门禁失败。

### 8.2 用户生成流程
阶段顺序：
1. `user-generation-system-blueprint`
2. `user-generation-multi-page-template-composition`
3. `user-generation-nextjs-react-code-generation`
4. `user-generation-visual-qa-iterative-fix`

编排器：`user-generation-orchestrator`

常见产物：
- `docs/system-blueprint.md`
- `docs/multi-page-template-composition.md`
- 应用代码文件
- `docs/code-generation-report.md`
- `docs/visual-qa-iterative-fix-report.md`
- 编排报告产物

技术栈与响应式交付要求：
- 默认实现栈：Next.js + React + TypeScript + Tailwind CSS + shadcn/ui。
- 用户生成流程默认需要同时验证 desktop 与 mobile，除非用户明确要求 desktop-only。
- 代码生成与 QA 报告应包含响应式覆盖与技术栈合规说明。

## 9. 各 Skill 边界摘要
- `template-prep-page-visual-parser`：只做视觉结构解析与截图持久化。
- `template-prep-uiux-design-language-abstractor`：只做 UX/交互抽象。
- `template-prep-design-system-structurizer`：只做设计系统/Token 规则。
- `template-prep-frontend-component-planner`：只做组件规划与契约。
- `template-prep-nextjs-react-frontend-design-language`：只做实现导向规范文档。
- `template-prep-template-indexing`：只做索引元数据。
- `template-preparation-orchestrator`：只做流程编排/门禁/恢复。
- `user-generation-system-blueprint`：只做系统蓝图定义。
- `user-generation-multi-page-template-composition`：只做模板匹配组合规划。
- `user-generation-nextjs-react-code-generation`：只做代码生成与修改。
- `user-generation-visual-qa-iterative-fix`：只做视觉 QA 与最小修复。
- `user-generation-orchestrator`：只做用户生成流程编排。

## 9.1 当前必需章节增量
- `user-generation-system-blueprint` 新增：
- `## Responsive Strategy`
- `## Frontend Stack Contract`
- `user-generation-nextjs-react-code-generation` 新增技术栈合规报告要求：
- TypeScript 使用约束
- Tailwind token 化样式约束
- shadcn/ui 采用情况摘要
- `template-prep-nextjs-react-frontend-design-language` 新增：
- `## TypeScript Contract`
- `## shadcn/ui Adoption Plan`
- `template-prep-page-visual-parser` 新增：
- `## Desktop Evidence`
- `## Mobile Evidence Or Hypothesis`

## 10. 变更维护规则
更新 Skill 时：
1. 先更新目标 `SKILL.md`。
2. 若涉及路径、契约、状态、职责变化，同步更新本手册中英文版本。
3. 文案保持可验证、可执行、少歧义。
4. 非必要不做破坏式改动；若废弃旧规则需显式标注。
