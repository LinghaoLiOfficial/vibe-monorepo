# Skills 系统操作手册（中文版）

## 1. 文档定位
本文档是本项目 Skills 系统的内部操作手册，不是面向新用户的 README。它定义当前全部 Skills 的结构、执行、校验、编排与维护规范。

覆盖范围：
- `skills/professional/*/SKILL.md` 下 12 个生产级 Skill
- Skill 角色边界（`atomic` 与 `orchestrator`）
- 产物契约、校验契约、状态字段、报告模板
- 模板准备与用户生成两条端到端流程

不覆盖：
- 项目宣传/介绍型文案
- 通用 Prompt 教程
- 与 Skill 执行无关的代码架构说明

---

## 2. 规范 Skill 目录
当前唯一可信执行源位于：

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

`skills/*.md` 下旧草稿属于历史资产，不应作为执行真源。

---

## 3. Skill 分类体系

### 3.1 原子 Skill（Atomic）
原子 Skill 只做单一边界内任务，且必须产出可验证文件。

当前 10 个原子 Skill：
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

原子 Skill 基础契约：
- 必须定义输入
- 必须定义输出
- 必须定义校验点
- 必须定义失败策略
- 必须落盘产物（`.md` 和/或代码文件）

### 3.2 编排 Skill（Orchestrator）
编排 Skill 负责阶段顺序、门禁校验、恢复执行与最终报告，不替代原子 Skill 细节逻辑。

当前 2 个编排 Skill：
1. `template-preparation-orchestrator`
2. `user-generation-orchestrator`

编排 Skill 基础契约：
- 必须跟踪阶段状态
- 必须执行门禁
- 必须支持 `resume_from`
- 必须输出编排报告
- 必须在阻塞时停止

---

## 4. 标准 SKILL.md 结构
所有生产 Skill 应遵守以下结构：

1. Frontmatter
- `name`
- `version`
- `kind`（`atomic` 或 `orchestrator`）
- `output_format`
- `description`
- `triggers`

2. 运行时章节
- Purpose 或 Scope
- Inputs
- Outputs
- Steps 或 Pipeline
- Required sections / Gate rules
- Failure policy

3. 执行契约章节
- 原子：`Execution Status Schema`、`Artifact Contract`、`Standard Report Template`
- 编排：`Orchestration State Schema`、`Resume Contract`、`Standard Orchestration Report Template`

---

## 5. 执行状态规范

### 5.1 原子 Skill 状态值
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `completed_with_risk`

### 5.2 编排阶段状态值
- `not_started`
- `in_progress`
- `blocked`
- `completed`
- `skipped`

状态使用规则：
1. 仅当确实无法继续下游执行时使用 `blocked`。
2. 原子 Skill 在产物存在但风险未消除时使用 `completed_with_risk`。
3. 未完成必要校验不得标记 `completed`。

---

## 6. 产物契约规范（Atomic）
每次原子 Skill 执行建议记录以下字段：
- `artifact_path`
- `artifact_exists`
- `artifact_non_empty`
- `required_sections_ok`
- `confidence`（`high|medium|low`）
- `blocking_reason`

字段解释规则：
1. `artifact_exists=false` 代表阶段未交付。
2. `artifact_non_empty=false` 视为失败产物。
3. `required_sections_ok=false` 代表契约违规（即使文件存在）。
4. `confidence=low` 必须伴随明确不确定项说明。

---

## 7. 恢复与门禁规则

### 7.1 恢复执行（`resume_from`）
- `resume_from` 必须匹配当前编排器已知阶段名。
- 恢复点之前阶段必须具备“已校验通过”的产物。
- 若前序产物存在无效项，应回退到最早无效阶段重跑。

### 7.2 门禁通过条件
阶段门禁通过必须同时满足：
1. 预期产物路径存在。
2. 产物非空。
3. 必要章节/检查项通过。
4. 无未解决 P0 阻塞。

门禁失败处理：
- 立即停止向前执行。
- 记录阻塞原因与恢复建议。
- 输出报告并给出下一步动作。

---

## 8. 端到端流程

### 8.1 模板准备流程（Template Preparation）
阶段顺序：
1. `template-prep-page-visual-parser`
2. `template-prep-uiux-design-language-abstractor`
3. `template-prep-design-system-structurizer`
4. `template-prep-frontend-component-planner`
5. `template-prep-nextjs-react-frontend-design-language`
6. `template-prep-template-indexing`

编排器：
- `template-preparation-orchestrator`

主要产物：
- `01-page-visual-parse.md`
- `02-uiux-design-language.md`
- `03-design-system.md`
- `04-frontend-component-plan.md`
- `05-nextjs-react-frontend-language.md`
- `template-index.md`
- `preparation-report.md`

### 8.2 用户生成流程（User Generation）
阶段顺序：
1. `user-generation-system-blueprint`
2. `user-generation-multi-page-template-composition`
3. `user-generation-nextjs-react-code-generation`
4. `user-generation-visual-qa-iterative-fix`

编排器：
- `user-generation-orchestrator`

主要产物：
- `docs/system-blueprint.md`
- `docs/multi-page-template-composition.md`
- 应用代码目录下实际代码文件
- `docs/code-generation-report.md`
- `docs/visual-qa-iterative-fix-report.md`
- `docs/12-user-generation-orchestration-report.md`

---

## 9. 各 Skill 操作说明（12 项）

### 9.1 template-prep-page-visual-parser（原子）
任务：
- 将页面截图转为结构化视觉解析文档。

边界：
- 不负责设计系统输出。
- 不负责组件规划。

常见阻塞：
- 无截图输入。
- 截图不可识别。

### 9.2 template-prep-uiux-design-language-abstractor（原子）
任务：
- 从视觉解析中抽象 UX 意图和交互语言。

边界：
- 不做原始截图解析。
- 不做 token 结构化与代码生成。

### 9.3 template-prep-design-system-structurizer（原子）
任务：
- 输出模板级设计系统文档。

边界：
- 不生成 React 代码。
- 不做系统蓝图规划。

### 9.4 template-prep-frontend-component-planner（原子）
任务：
- 定义组件层级、边界、职责与契约。

边界：
- 仅规划，不生成 `.tsx`。

### 9.5 template-prep-nextjs-react-frontend-design-language（原子）
任务：
- 产出 Next.js + React 实现规范文档。

边界：
- 仅规范文档，不直接写业务代码。

### 9.6 template-prep-template-indexing（原子）
任务：
- 将模板准备产物索引为可检索元数据。

边界：
- 不做模板组合与应用代码生成。

### 9.7 template-preparation-orchestrator（编排）
任务：
- 串联模板准备阶段，执行门禁与恢复。

边界：
- 不替代原子 Skill 内容生产。

### 9.8 user-generation-system-blueprint（原子）
任务：
- 将需求转为系统级蓝图。

边界：
- 不做模板选择和代码生成。

### 9.9 user-generation-multi-page-template-composition（原子）
任务：
- 基于蓝图完成路由-模板映射与可解释评分。

边界：
- 本阶段不做代码改动。

### 9.10 user-generation-nextjs-react-code-generation（原子）
任务：
- 按上游规划生成/修改真实项目代码。

边界：
- 未运行的校验不得宣称通过。

### 9.11 user-generation-visual-qa-iterative-fix（原子）
任务：
- 执行 QA 循环、最小修复、复验。

边界：
- 不负责重新规划全系统。

### 9.12 user-generation-orchestrator（编排）
任务：
- 串联用户生成阶段并输出最终编排报告。

边界：
- 必须执行阶段门禁与阻塞上报。

---

## 10. 报告规范

### 10.1 原子报告最低要求
每次原子执行报告应包含：
1. 运行元数据
2. 输入与缺失输入
3. 产物校验结果
4. 验证结果摘要
5. 风险与假设
6. 下游交接信息

### 10.2 编排报告最低要求
每次编排执行报告应包含：
1. 运行模式与时间
2. 阶段状态表
3. 门禁汇总
4. 产物列表
5. 阻塞/风险
6. 建议下一步

---

## 11. 质量与治理规则
1. 禁止伪造验证结果。
2. 禁止伪造输入证据。
3. 严格遵守阶段边界，避免职责泄漏。
4. 优先使用确定性输出路径。
5. 对不确定内容必须显式标注。
6. 产物必须可版本管理、可审查。

---

## 12. 迁移与维护策略

### 12.1 旧版清理建议
- 以 `skills/professional/*/SKILL.md` 作为唯一执行源。
- 在确认无引用后再移除或归档 `skills/*.md` 旧稿。

### 12.2 版本管理
- 行为变化时提升 frontmatter `version`。
- 文案/说明优化用 patch 版本。
- 契约变更用 minor 版本。

### 12.3 变更检查清单
Skill 更新前应确认：
1. Frontmatter 合法。
2. `kind` 分类正确。
3. 输入输出明确。
4. 校验与失败策略明确。
5. 状态/报告模板章节未丢失。

---

## 13. 运行实践建议
1. 每次运行绑定一个任务标识。
2. 报告尽量与产物同目录存储。
3. 前序有效时优先 `resume`，避免全量重跑。
4. 阻塞尽早上报并给出可执行下一步。
5. 编排器保持轻量，原子 Skill 保持深入。

---

## 14. 快速索引表

| Skill | 类型 | 核心产物 |
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
| user-generation-nextjs-react-code-generation | atomic | 代码 + `docs/code-generation-report.md` |
| user-generation-visual-qa-iterative-fix | atomic | 代码修复 + `docs/visual-qa-iterative-fix-report.md` |
| user-generation-orchestrator | orchestrator | `docs/12-user-generation-orchestration-report.md` |

