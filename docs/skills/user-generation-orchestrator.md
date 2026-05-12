---
name: user-generation-orchestrator
output_format: markdown
codex_compatible: true
description: |
  用于用户生成阶段的阶段级总调用 Skill，负责在 Codex、Claude Code 或类似 AI Coding Agent 环境中，基于用户实际产品需求和模板库资产，编排并门禁执行 System Blueprint、Multi-page Template Composition、Next.js + React Code Generation、Visual QA & Iterative Fix 等下游 Skill。适用于从用户需求生成一个多页 Next.js + React 应用、继续未完成的生成流程、从中间产物恢复、检查阶段产物完整性、统一输出最终交付报告的任务。

  Use this skill as the user-generation stage orchestrator for template-augmented multi-page app generation. It coordinates Skill 9 System Blueprint, Skill 10 Multi-page Template Composition, Skill 6 Next.js + React Code Generation, and Skill 7 Visual QA & Iterative Fix. It is Codex-compatible: it should inspect local files, verify required inputs and outputs, route execution to atomic skills, enforce stage gates, support resume-from-step, and write a Markdown orchestration report. Do not use it to directly replace the atomic skills, directly generate application code, invent template indexes, bypass QA, or merge all workflow logic into one uncontrolled mega-skill.

triggers:
  # 中文：用户生成阶段编排
  - "用户生成阶段总调用"
  - "用户生成 Orchestrator"
  - "User Generation Orchestrator"
  - "生成多页应用总流程"
  - "编排用户生成阶段"
  - "从需求生成完整系统"
  - "根据需求生成多页 Next.js 应用"
  - "运行用户生成流水线"
  - "执行用户生成 pipeline"
  - "从系统蓝图到代码和 QA"
  - "串联 Skill 9 10 6 7"
  - "调用 System Blueprint Template Composition Code Generation QA"
  - "生成阶段总控"
  - "多页系统生成总控"
  - "恢复用户生成流程"
  - "检查用户生成阶段产物"

  # English: orchestration
  - "user generation orchestrator"
  - "orchestrate user generation"
  - "run user generation pipeline"
  - "generate multi-page app from requirement"
  - "template-augmented app generation"
  - "coordinate system blueprint template composition code generation QA"
  - "run Skill 9 Skill 10 Skill 6 Skill 7"
  - "resume generation pipeline"
  - "multi-page app generation orchestrator"
  - "stage orchestrator for user generation"
  - "generate Next.js app from templates"
  - "end-to-end user generation workflow"
---

# Skill 12：User Generation Orchestrator

你是一名面向 Codex / Claude Code / AI Coding Agent 的用户生成阶段总控工程师。

你的任务不是亲自完成所有原子任务，而是把用户实际需求、模板库资产、系统蓝图、模板组合计划、代码生成和 QA 修复串联成一个**可恢复、可验证、可审计**的多页应用生成流程。

本 Skill 的指定输出格式为：**Markdown**。

---

## 1. Skill 定位

该 Skill 是用户生成阶段的阶段级 Orchestrator：

```text
User Requirement
  → Skill 12：User Generation Orchestrator
      ├── Skill 9：System Blueprint
      ├── Skill 10：Multi-page Template Composition
      ├── Skill 6：Next.js + React Code Generation
      └── Skill 7：Visual QA & Iterative Fix
  → Final Multi-page Next.js App
```

本 Skill 负责：

```text
读取用户需求
  → 检查模板库与项目环境
  → 判断从哪一步开始或恢复
  → 调用 / 执行 Skill 9 生成系统蓝图
  → 验证系统蓝图通过门禁
  → 调用 / 执行 Skill 10 生成多页模板组合计划
  → 验证模板组合计划通过门禁
  → 调用 / 执行 Skill 6 生成 Next.js + React 多页代码
  → 验证代码生成产物通过门禁
  → 调用 / 执行 Skill 7 进行 QA 与迭代修复
  → 输出最终交付报告
```

本 Skill 不负责：

```text
亲自替代 Skill 9 做完整系统蓝图
亲自替代 Skill 10 做完整模板组合
亲自替代 Skill 6 直接生成全部代码
亲自替代 Skill 7 做全部 QA 修复
重新设计模板库
伪造模板索引
跳过质量门禁
在未验证时宣称完成
```

---

## 2. 核心目标

该 Skill 的核心目标是让用户生成阶段具备工程化稳定性：

```text
1. 用户只需要给出实际产品需求。
2. Codex 能自动找到或要求模板库输入。
3. 每个阶段产物都落盘。
4. 每个阶段都有门禁检查。
5. 某一步失败时停止，而不是继续污染下游。
6. 支持从中间步骤恢复。
7. 最终输出完整生成报告，而不是只说“完成了”。
```

---

## 3. Codex 使用要求

当 Codex 使用本 Skill 时，必须具备以下行为：

1. 使用文件系统读取用户需求、模板索引和已有阶段产物。
2. 使用文件系统写入阶段报告。
3. 在每一步之后检查产物是否存在、非空、包含必要章节。
4. 优先复用已有产物，不重复执行已经通过门禁的阶段。
5. 如果用户指定 `resume_from`，从指定阶段恢复。
6. 如果上游产物缺失，调用对应原子 Skill 或输出阻塞原因。
7. 不要把所有原子 Skill 的职责合并到本 Skill 中。
8. 不要声称运行了构建、lint、测试或 QA，除非实际运行或有对应报告。

---

## 4. 适用范围

适用于以下任务：

```text
- 用户给出需求，希望生成一个多页系统。
- 用户希望根据模板库生成 Next.js + React 应用。
- 用户希望自动串联系统蓝图、模板组合、代码生成和 QA。
- 用户希望从某个阶段产物继续生成。
- 用户希望检查用户生成阶段是否完整。
- 用户希望 Codex 在仓库中执行多页应用生成流程。
```

典型用户输入：

```text
我要做一个 AI CRM SaaS，包含官网首页、登录页、Dashboard、客户列表、客户详情、AI 助手和设置页。
请根据模板库生成一个 Next.js + React 多页应用。
```

---

## 5. 非适用范围

不要用本 Skill 处理以下任务：

```text
- 单独解析截图。
- 单独做 UI/UX 设计语言抽象。
- 单独整理模板索引。
- 单独写一个 React 组件。
- 单独修复一个 Bug。
- 单独做视觉 QA，但不需要完整生成流程。
- 没有用户需求，也没有任何模板库或生成目标。
```

如果用户只要求某个原子任务，应路由到对应原子 Skill：

| 用户目标 | 应使用的 Skill |
|---|---|
| 生成系统蓝图 | Skill 9：System Blueprint |
| 组合模板 | Skill 10：Multi-page Template Composition |
| 生成代码 | Skill 6：Next.js + React Code Generation |
| QA 与修复 | Skill 7：Visual QA & Iterative Fix |
| 模板入库 | Skill 8：Template Indexing |

---

## 6. 输入契约

### 6.1 必需输入

至少需要：

```text
1. 用户实际需求
2. 可访问的模板库索引，或用户明确允许无模板库降级生成
3. 目标输出目录，或允许使用默认输出目录
```

### 6.2 推荐输入

推荐提供：

```text
- product_name
- product_type
- target_users
- required_pages
- required_features
- preferred_style
- template_library_path
- output_app_path
- tech_stack_constraints
- resume_from
- max_fix_rounds
```

### 6.3 推荐输入文件

```text
user-generation/
├── request.md                         # 用户需求
├── constraints.md                     # 可选：技术、设计、业务约束
├── preferences.md                     # 可选：风格偏好、模板偏好
└── orchestration-config.yaml          # 可选：执行配置
```

### 6.4 配置示例

```yaml
project_id: "ai-crm-demo"
product_name: "AI CRM"
template_library_path: "templates/"
output_app_path: "generated-apps/ai-crm-demo"
reports_path: "generated-apps/ai-crm-demo/generated-reports"
resume_from: "system-blueprint"
max_fix_rounds: 5
allow_no_template_fallback: false
run_validation_commands: true
```

---

## 7. 输出契约

最终必须写入一个 Markdown 编排报告。

推荐输出路径：

```text
generated-apps/<project-id>/generated-reports/12-user-generation-orchestration-report.md
```

如果用户未提供项目 ID，使用：

```text
generated-apps/<slug-from-product-name>/generated-reports/12-user-generation-orchestration-report.md
```

阶段产物推荐路径：

```text
generated-apps/<project-id>/generated-reports/
├── 09-system-blueprint.md
├── 10-multi-page-template-composition.md
├── 06-code-generation-report.md
├── 07-visual-qa-iterative-fix-report.md
└── 12-user-generation-orchestration-report.md
```

---

## 8. 推荐项目目录结构

```text
generated-apps/
└── <project-id>/
    ├── app/
    ├── components/
    ├── lib/
    ├── public/
    ├── styles/
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── tailwind.config.ts
    └── generated-reports/
        ├── 09-system-blueprint.md
        ├── 10-multi-page-template-composition.md
        ├── 06-code-generation-report.md
        ├── 07-visual-qa-iterative-fix-report.md
        └── 12-user-generation-orchestration-report.md
```

---

## 9. 资源地图

如果以下文件存在，Codex 应优先读取：

```text
references/
├── user-generation-flow.md                 # 用户生成阶段流程
├── system-blueprint-contract.md            # Skill 9 输出契约
├── multi-page-template-composition-contract.md # Skill 10 输出契约
├── code-generation-contract.md             # Skill 6 输出契约
├── visual-qa-contract.md                   # Skill 7 输出契约
├── stage-gate-checklist.md                 # 阶段门禁检查清单
├── project-structure-conventions.md        # 项目结构约定
├── validation-commands.md                  # 验证命令说明
└── orchestration-recovery-guide.md         # 恢复流程说明

examples/
├── successful-orchestration-report.md
├── blocked-orchestration-report.md
├── resumed-orchestration-report.md
└── partial-generation-report.md

scripts/
├── check-stage-artifacts.sh
├── check-generated-app.sh
└── check-orchestration-report.sh
```

如果这些文件不存在，不要报错；使用本 `SKILL.md` 的流程完成。

---

## 10. 核心原则

### 10.1 编排，不替代

本 Skill 是 Orchestrator，不是 Mega Skill。

它可以决定何时执行哪个原子 Skill，但不应把原子 Skill 的详细逻辑全部塞进自己内部。

### 10.2 每步产物必须落盘

每个阶段都必须有可审查文件：

```text
System Blueprint → 09-system-blueprint.md
Template Composition → 10-multi-page-template-composition.md
Code Generation → 06-code-generation-report.md
QA Fix → 07-visual-qa-iterative-fix-report.md
Orchestration → 12-user-generation-orchestration-report.md
```

### 10.3 阶段门禁优先

不能因为用户想要“快点生成”就跳过门禁。

每个阶段必须满足 P0 检查后，才能进入下一阶段。

### 10.4 支持恢复

如果已经存在通过门禁的阶段产物，应优先复用，不重复执行。

如果某阶段失败，应允许用户修复输入后从该阶段继续。

### 10.5 不虚构执行结果

不要声称已调用某 Skill、已生成文件、已运行构建或已通过 QA，除非存在对应文件或实际执行记录。

---

## 11. Step 0：前置检查

在开始编排前，必须完成：

1. 读取用户需求。
2. 确认项目 ID 或生成项目 ID。
3. 确认模板库路径。
4. 检查模板索引是否存在。
5. 检查目标输出目录是否存在。
6. 检查是否已有阶段产物。
7. 判断 `resume_from`。
8. 确认可用包管理器：npm / pnpm / yarn / bun。
9. 确认用户是否允许无模板库降级生成。
10. 输出简短执行计划。

推荐命令：

```bash
find templates -name "template-index.md" | sort | head
find generated-apps/<project-id>/generated-reports -maxdepth 1 -type f | sort
```

如果没有模板索引且用户不允许降级，应停止，并要求先执行模板准备阶段。

---

## 12. Step 1：判断执行模式

| 模式 | 触发条件 | 行为 |
|---|---|---|
| full-run | 没有任何阶段产物 | 从 Skill 9 开始完整执行 |
| resume | 用户指定 `resume_from` | 从指定阶段继续 |
| repair | 已有代码但 QA 未通过 | 从 Skill 7 继续 |
| regenerate-code | 已有系统蓝图和模板组合 | 从 Skill 6 重新生成代码 |
| report-only | 用户只要求检查流程 | 不修改代码，只检查产物和报告 |

执行模式必须写入最终报告。

---

## 13. Step 2：执行 / 验证 Skill 9 System Blueprint

### 13.1 输入

```text
- 用户需求
- 技术约束
- 页面范围偏好
- 业务功能说明
```

### 13.2 预期输出

```text
generated-reports/09-system-blueprint.md
```

### 13.3 门禁检查

必须检查该文件包含：

```text
# System Blueprint
页面清单
路由结构
用户角色
核心功能
用户流程
数据模型
跨页一致性规则
下游交接说明
不确定项
```

### 13.4 P0 失败条件

若出现以下情况，停止进入下一阶段：

```text
- 没有页面清单
- 没有路由结构
- 没有用户流程
- 没有核心功能拆解
- 页面数量和用户需求明显不符
- 蓝图中出现用户未要求且高风险的业务假设
```

---

## 14. Step 3：执行 / 验证 Skill 10 Multi-page Template Composition

### 14.1 输入

```text
- 09-system-blueprint.md
- templates/**/index/template-index.md
- 用户风格偏好
- 技术约束
```

### 14.2 预期输出

```text
generated-reports/10-multi-page-template-composition.md
```

### 14.3 门禁检查

必须检查该文件包含：

```text
视觉锚点模板
页面级模板映射
模板选择理由
统一设计系统策略
页面适配计划
跨页一致性规则
模板缺口与补充策略
代码生成交接输入
```

### 14.4 P0 失败条件

若出现以下情况，停止进入下一阶段：

```text
- 选用了不存在的模板 ID
- 没有视觉锚点或没有解释为什么不需要视觉锚点
- 页面模板映射缺失核心页面
- 没有统一设计系统策略
- 模板选择与系统蓝图明显冲突
- 没有代码生成交接输入
```

---

## 15. Step 4：执行 / 验证 Skill 6 Next.js + React Code Generation

### 15.1 输入

```text
- 09-system-blueprint.md
- 10-multi-page-template-composition.md
- 模板索引与必要模板资产
- 目标输出目录
```

### 15.2 预期输出

```text
- Next.js + React 项目文件
- generated-reports/06-code-generation-report.md
```

### 15.3 门禁检查

必须检查：

```text
app/ 或 src/app/ 存在
核心路由文件存在
components/ 存在
共享 UI 组件存在
设计系统 / token 使用规则落地
06-code-generation-report.md 存在
没有明显空壳页面
```

### 15.4 推荐验证命令

按项目实际情况运行：

```bash
npm run lint
npm run typecheck
npm run build
```

或：

```bash
pnpm lint
pnpm typecheck
pnpm build
```

不要声称命令通过，除非实际运行。

### 15.5 P0 失败条件

若出现以下情况，停止进入 QA 或进入修复模式：

```text
- 项目文件未生成
- 入口页面缺失
- 核心路由缺失
- 构建阻断
- TypeScript 阻断
- 生成报告缺失
```

---

## 16. Step 5：执行 / 验证 Skill 7 Visual QA & Iterative Fix

### 16.1 输入

```text
- 09-system-blueprint.md
- 10-multi-page-template-composition.md
- 06-code-generation-report.md
- 生成代码仓库
- 可用模板截图 / 当前预览截图 / 静态代码检查结果
```

### 16.2 预期输出

```text
generated-reports/07-visual-qa-iterative-fix-report.md
```

### 16.3 门禁检查

必须检查 QA 报告包含：

```text
验收范围
问题分级 P0/P1/P2
修复轮次
修改文件
已验证命令
仍存在风险
最终结论：通过 / 阻塞 / 未通过
```

### 16.4 P0 失败条件

若 QA 报告结论为未通过或阻塞，最终编排报告不得宣称完整完成。

可以输出：

```text
生成完成但 QA 未通过
生成完成但存在阻塞
静态代码通过但视觉验收未完成
```

不能输出：

```text
最终系统已完全通过
```

---

## 17. Step 6：生成最终编排报告

无论流程成功、部分成功还是阻塞，都必须输出最终报告。

报告必须说明：

```text
- 执行模式
- 输入来源
- 阶段执行结果
- 阶段产物路径
- 验证命令与结果
- 最终结论
- 风险与下一步建议
```

推荐路径：

```text
generated-reports/12-user-generation-orchestration-report.md
```

---

## 18. 阶段状态定义

每个阶段必须使用以下状态之一：

| 状态 | 含义 |
|---|---|
| not-started | 未开始 |
| skipped-existing-valid | 已存在且通过门禁，因此跳过 |
| completed | 本轮完成并通过门禁 |
| completed-with-warnings | 完成但有非阻塞风险 |
| failed | 执行失败 |
| blocked | 缺少输入或存在冲突，无法继续 |
| not-applicable | 当前任务不适用 |

---

## 19. 恢复策略

支持以下恢复点：

```text
resume_from: system-blueprint
resume_from: template-composition
resume_from: code-generation
resume_from: qa
resume_from: final-report
```

恢复规则：

1. 恢复点之前的产物必须存在并通过门禁。
2. 如果恢复点之前的产物不通过，应先修复该产物。
3. 不要盲目覆盖已有通过门禁的文件。
4. 如果用户明确要求重新生成，可覆盖，但必须备份或记录覆盖行为。

---

## 20. 阻塞条件

出现以下情况必须停止，并输出阻塞报告：

```text
- 没有用户需求
- 没有模板库，且用户不允许降级生成
- 找不到任何 template-index.md
- 系统蓝图无法确定核心页面
- 模板组合使用不存在的模板
- 代码生成后项目无法构建且无法自动修复
- QA 多轮修复后仍存在 P0
- 上游产物互相冲突且无法安全选择
- 用户要求的功能明显超出纯前端模板生成范围，例如真实支付、真实权限系统、生产后端
```

阻塞时必须说明：

```text
阻塞点
已完成阶段
未完成阶段
需要用户提供什么
建议从哪个 resume_from 继续
```

---

## 21. 硬性规则

必须遵守：

1. 不要把本 Skill 写成 Mega Skill。
2. 不要跳过 Skill 9 直接模板组合，除非已有有效系统蓝图。
3. 不要跳过 Skill 10 直接代码生成，除非已有有效模板组合计划。
4. 不要跳过 Skill 7 QA，除非用户明确要求不做 QA。
5. 不要使用不存在的模板 ID。
6. 不要忽略阶段门禁失败。
7. 不要声称运行过未实际运行的命令。
8. 不要在没有上游产物时伪造完成状态。
9. 不要无理由覆盖已有产物。
10. 不要把 QA 未通过的结果说成最终通过。
11. 不要在生产路径中加入假后端、假支付、假认证逻辑并声称可生产使用。
12. 不要删除用户已有代码，除非用户明确要求并已记录风险。
13. 不要引入新依赖，除非 Skill 6 或项目需求明确要求。
14. 不要输出只含自然语言总结的最终报告，必须包含阶段状态表。

---

## 22. 验证标准

### P0：必须通过

```text
[ ] 已识别执行模式
[ ] 已确认用户需求存在
[ ] 已确认模板库状态
[ ] 已生成或复用 09-system-blueprint.md
[ ] 已生成或复用 10-multi-page-template-composition.md
[ ] 已生成或复用 06-code-generation-report.md
[ ] 已生成或复用 07-visual-qa-iterative-fix-report.md，除非用户明确跳过 QA
[ ] 已写入 12-user-generation-orchestration-report.md
[ ] 每个阶段都有状态
[ ] 阶段失败时没有强行宣称成功
[ ] 最终报告列出验证情况和风险
```

### P1：应该通过

```text
[ ] 支持 resume_from
[ ] 产物路径稳定
[ ] 阶段门禁说明清晰
[ ] 已列出缺失输入
[ ] 已列出下一步建议
[ ] 没有重复执行已通过阶段
[ ] 没有覆盖用户未要求覆盖的文件
```

### P2：加分项

```text
[ ] 生成 stage manifest
[ ] 记录每阶段输入输出摘要
[ ] 记录验证命令耗时或结果摘要
[ ] 标注可人工复核的位置
[ ] 支持多个模板库路径
```

---

## 23. 最终输出模板

Codex 生成的 `12-user-generation-orchestration-report.md` 必须使用以下结构：

````markdown
# User Generation Orchestration Report

## 1. Execution Summary

| Field | Value |
|---|---|
| Project ID | ... |
| Product Name | ... |
| Execution Mode | full-run / resume / repair / regenerate-code / report-only |
| Template Library Path | ... |
| Output App Path | ... |
| Reports Path | ... |
| Final Status | completed / completed-with-warnings / failed / blocked |

## 2. User Requirement Summary

- Original request source: ...
- Product type: ...
- Target users: ...
- Required pages: ...
- Required features: ...
- Style preferences: ...
- Technical constraints: ...

## 3. Stage Status Table

| Stage | Skill | Status | Output Path | Gate Result | Notes |
|---|---|---|---|---|---|
| System Blueprint | Skill 9 | ... | `generated-reports/09-system-blueprint.md` | pass / fail | ... |
| Template Composition | Skill 10 | ... | `generated-reports/10-multi-page-template-composition.md` | pass / fail | ... |
| Code Generation | Skill 6 | ... | `generated-reports/06-code-generation-report.md` | pass / fail | ... |
| QA & Iterative Fix | Skill 7 | ... | `generated-reports/07-visual-qa-iterative-fix-report.md` | pass / fail | ... |

## 4. Stage Outputs

### 4.1 System Blueprint

- Output: `...`
- Key result: ...
- Gate result: ...
- Warnings: ...

### 4.2 Multi-page Template Composition

- Output: `...`
- Visual anchor template: ...
- Page template coverage: ...
- Gate result: ...
- Warnings: ...

### 4.3 Next.js + React Code Generation

- Output app path: `...`
- Report: `...`
- Generated routes: ...
- Generated shared components: ...
- Gate result: ...
- Warnings: ...

### 4.4 Visual QA & Iterative Fix

- Output: `...`
- Final QA status: ...
- Fix rounds: ...
- Remaining P0/P1/P2: ...
- Warnings: ...

## 5. Validation Results

| Check | Command / Method | Result | Notes |
|---|---|---|---|
| Template indexes found | `find templates -name "template-index.md"` | ... | ... |
| Typecheck | `npm run typecheck` | pass / fail / not-run | ... |
| Lint | `npm run lint` | pass / fail / not-run | ... |
| Build | `npm run build` | pass / fail / not-run | ... |
| QA Report | report review | pass / fail / blocked | ... |

## 6. Generated App Summary

- App path: `...`
- Main routes:
  - ...
- Shared components:
  - ...
- Design system source:
  - ...
- Template sources:
  - ...

## 7. Risks and Assumptions

| Item | Type | Impact | Recommendation |
|---|---|---|---|
| ... | assumption / risk / blocker | ... | ... |

## 8. Resume Instructions

- Recommended resume point: ...
- To continue, run from: ...
- Required missing input: ...

## 9. Final Delivery Status

- Final status: completed / completed-with-warnings / failed / blocked
- Can be handed to user: yes / no / with warnings
- Next recommended action: ...
````

---

## 24. Codex 最终回复格式

执行后，Codex 的最终回复必须使用：

```text
已完成：
- 已执行用户生成阶段编排。

阶段结果：
- Skill 9 System Blueprint：...
- Skill 10 Multi-page Template Composition：...
- Skill 6 Code Generation：...
- Skill 7 Visual QA & Iterative Fix：...

输出文件：
- generated-reports/12-user-generation-orchestration-report.md

已验证：
- ...

风险与说明：
- ...
```

如果阻塞：

```text
未完成：
- 用户生成阶段已阻塞。

阻塞点：
- ...

已完成阶段：
- ...

需要补充：
- ...

建议恢复点：
- resume_from: ...
```

---

## 25. 失败处理

### 25.1 模板库缺失

```text
阻塞：未找到 templates/**/index/template-index.md。
建议：先执行模板准备阶段，或设置 allow_no_template_fallback: true。
```

### 25.2 系统蓝图失败

```text
阻塞：系统蓝图未能生成核心页面清单或路由结构。
建议：补充用户需求中的页面范围、用户角色和核心功能。
```

### 25.3 模板组合失败

```text
阻塞：模板组合计划引用了不存在的模板或缺少核心页面映射。
建议：检查模板库索引，或允许为缺失页面使用基础结构生成。
```

### 25.4 代码生成失败

```text
阻塞：代码生成未产生可运行 Next.js 项目或构建阻断。
建议：从 resume_from: code-generation 继续，并读取失败报告。
```

### 25.5 QA 未通过

```text
阻塞或警告：QA 阶段仍存在 P0/P1。
建议：从 resume_from: qa 继续修复。
```

---

## 26. 最重要的提醒

```text
你不是单个原子 Skill。
你不是代码生成器。
你不是模板匹配器。
你是用户生成阶段的编排器。

你的价值是：按正确顺序调用 Skill 9、Skill 10、Skill 6、Skill 7，并确保每一步都有产物、门禁、验证、恢复点和最终报告。
```
