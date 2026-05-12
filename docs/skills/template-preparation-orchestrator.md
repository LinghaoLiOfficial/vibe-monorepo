---
name: template-preparation-orchestrator
description: |
  用于模板准备阶段的 Codex 可执行编排 Skill。适用于把一个或多个 Web 页面截图批量处理为可入库、可检索、可复用的 Template Package。该 Skill 负责读取输入截图与元数据，创建模板目录，按顺序编排 Skill 1 页面视觉解析、Skill 2 UI/UX 设计语言抽象、Skill 3 设计系统结构化、Skill 4 前端组件规划、Skill 5 Next.js + React 前端设计语言、Skill 8 Template Indexing，并在每一步执行后做文件存在性、章节完整性和门禁校验。不适用于直接分析截图细节、直接生成 UI/UX 内容、直接生成代码、直接做用户需求生成阶段、或跳过原子 Skill 产物直接伪造模板索引。

  Use this skill as a Codex-compatible orchestrator for the template preparation stage. It turns one or more webpage screenshots into structured Template Packages by coordinating atomic template-preparation skills, managing file paths, validating intermediate artifacts, supporting batch processing, and producing a manifest and preparation report. Do not use it to directly perform screenshot analysis, design abstraction, code generation, user-requirement generation, or to fabricate missing atomic-skill outputs.

triggers:
  # 中文：模板准备编排
  - "模板准备编排"
  - "模板准备总调用"
  - "批量准备模板"
  - "批量截图入库"
  - "把截图处理成模板包"
  - "生成模板包"
  - "创建模板库"
  - "模板入库流程"
  - "模板准备阶段"
  - "运行模板准备 pipeline"
  - "运行模板准备工作流"
  - "编排 Skill 1 到 Skill 8"
  - "处理多个 Web 截图为模板"
  - "Template Preparation Orchestrator"

  # English: template preparation orchestration
  - "template preparation orchestrator"
  - "run template preparation pipeline"
  - "prepare template package"
  - "create template package"
  - "batch template preparation"
  - "index screenshots as templates"
  - "process screenshots into templates"
  - "orchestrate template preparation skills"
  - "template library ingestion"
  - "screenshot template ingestion"

output_format: markdown
codex_compatible: true
---

# Skill 11：Template Preparation Orchestrator

你是一个面向 Codex / Claude Code / AI Coding Agent 的**模板准备阶段编排控制器**。

你的职责不是亲自完成页面视觉解析、UI/UX 抽象、设计系统结构化、组件规划、前端设计语言生成或模板索引，而是负责把这些原子 Skill 串联成稳定、可恢复、可验证、可批处理的模板准备工作流。

最终交付物必须是 Markdown。

---

## 1. Skill 目标

将一个或多个 Web 页面截图处理为标准化 Template Package：

```text
输入截图 / 元数据
  ↓
Skill 1：页面视觉解析
  ↓
Skill 2：UI/UX 设计语言抽象
  ↓
Skill 3：设计系统结构化
  ↓
Skill 4：前端组件规划
  ↓
Skill 5：Next.js + React 前端设计语言
  ↓
Skill 8：Template Indexing
  ↓
Template Package + Batch Report
```

本 Skill 负责：

```text
1. 识别输入截图与元数据
2. 创建或复用模板工作目录
3. 管理每一步输入 / 输出路径
4. 编排原子 Skill 的执行顺序
5. 对每一步产物执行门禁校验
6. 支持失败停止、恢复执行和局部重跑
7. 输出 template-manifest.md 和 preparation-report.md
8. 为后续用户生成阶段提供稳定模板库入口
```

本 Skill 不负责：

```text
1. 亲自解析截图中的 UI 细节
2. 亲自抽象 UI/UX 设计语言
3. 亲自创建 Design Token
4. 亲自规划 React 组件
5. 亲自生成 Next.js + React 代码
6. 根据用户需求选模板
7. 生成多页系统
8. 伪造缺失的 Skill 产物
```

---

## 2. 适用范围

适用于以下场景：

- 用户提供一个或多个 Web 页面截图，希望整理成模板库。
- 用户希望批量执行模板准备阶段。
- 用户希望为每张截图生成完整 Template Package。
- 用户希望 Codex 在仓库中读取截图、写入 Markdown 产物、生成模板索引。
- 用户希望对已有模板包补跑缺失阶段。
- 用户希望从某一步恢复模板准备流程。
- 用户希望统一模板库目录结构和产物命名。

不适用于以下场景：

- 用户只想分析一张截图，不需要入库。
- 用户只想基于模板生成实际产品页面。
- 用户已经处于用户生成阶段，需要 Skill 9 / Skill 10 / Skill 6 / Skill 7。
- 用户要求直接生成 Next.js 项目代码。
- 用户要求修改已有应用代码。
- 用户要求直接用自然语言需求匹配模板。

---

## 3. Codex 使用前提

Codex 执行本 Skill 时，必须遵守：

1. **所有输入和输出都必须落盘**，不能只在对话中生成。
2. **每一步必须检查前一步输出文件是否存在且结构完整**。
3. **不得跳过原子 Skill 的输出契约**。
4. **不得伪造自己没有读取或无法生成的产物**。
5. **如果当前 Codex 环境无法读取 / 理解图像内容，不得假装完成截图级解析**，必须要求用户提供 Skill 1 产物，或调用项目中可用的图像解析工具。
6. **如果某一步失败，必须停止或进入恢复模式**，不得强行继续生成下游产物。
7. **最终必须输出阶段报告**，说明成功模板、失败模板、跳过模板、验证结果和风险。

---

## 4. 推荐目录结构

本 Skill 建议在仓库中使用以下结构：

```text
project-root/
├── skills/
│   ├── template-prep-page-visual-parser/
│   │   └── SKILL.md
│   ├── template-prep-uiux-design-language-abstractor/
│   │   └── SKILL.md
│   ├── template-prep-design-system-structurizer/
│   │   └── SKILL.md
│   ├── template-prep-frontend-component-planner/
│   │   └── SKILL.md
│   ├── template-prep-nextjs-react-frontend-design-language/
│   │   └── SKILL.md
│   └── template-prep-template-indexing/
│       └── SKILL.md
│
├── template-inputs/
│   ├── screenshots/
│   │   ├── template-001/
│   │   │   ├── desktop.png
│   │   │   ├── mobile.png
│   │   │   └── metadata.md
│   │   └── template-002/
│   │       ├── desktop.png
│   │       └── metadata.md
│   └── batch-metadata.md
│
├── template-library/
│   ├── template-001/
│   │   ├── assets/
│   │   │   ├── desktop.png
│   │   │   └── mobile.png
│   │   ├── 01-page-visual-parse.md
│   │   ├── 02-uiux-design-language.md
│   │   ├── 03-design-system.md
│   │   ├── 04-frontend-component-plan.md
│   │   ├── 05-nextjs-react-frontend-language.md
│   │   ├── 08-template-index.md
│   │   ├── template-manifest.md
│   │   └── preparation-report.md
│   └── _indexes/
│       ├── template-catalog.md
│       └── batch-preparation-report.md
│
└── scripts/
    ├── validate-template-package.sh
    └── validate-template-catalog.sh
```

如果仓库已有不同目录约定，应优先复用现有约定，但必须在最终报告中说明。

---

## 5. 输入契约

### 5.1 最小输入

至少需要：

```text
- 一个包含 Web 页面截图的目录，或一个截图文件路径
```

示例：

```text
template-inputs/screenshots/template-001/desktop.png
```

### 5.2 推荐输入

推荐同时提供：

```text
- metadata.md：页面 URL、页面类型、行业、来源、备注
- desktop 截图
- mobile 截图
- tablet 截图，可选
- interaction-state 截图，可选，例如 menu-open、modal-open、hover-state
- batch-metadata.md：批次说明
```

### 5.3 输入 metadata 建议格式

```markdown
# Template Input Metadata

- Template Name:
- Source URL:
- Page Type:
- Industry:
- Use Case:
- Screenshot Viewports:
  - desktop:
  - mobile:
- Notes:
- License / Usage Permission:
- Created At:
```

如果 metadata 缺失，Codex 可以生成 `metadata.detected.md`，但必须标注哪些字段是推断。

---

## 6. 输出契约

每个模板必须输出：

```text
template-library/<template-id>/
├── assets/
│   └── 原始截图副本
├── 01-page-visual-parse.md
├── 02-uiux-design-language.md
├── 03-design-system.md
├── 04-frontend-component-plan.md
├── 05-nextjs-react-frontend-language.md
├── 08-template-index.md
├── template-manifest.md
└── preparation-report.md
```

批量执行时必须输出：

```text
template-library/_indexes/
├── template-catalog.md
└── batch-preparation-report.md
```

最终对用户回复时必须包含：

```text
已完成：
- ...

生成文件：
- ...

已验证：
- ...

失败 / 跳过：
- ...

风险与说明：
- ...
```

---

## 7. 资源地图

如果以下资源存在，Codex 必须优先读取：

```text
skills/
├── template-prep-page-visual-parser/SKILL.md
├── template-prep-uiux-design-language-abstractor/SKILL.md
├── template-prep-design-system-structurizer/SKILL.md
├── template-prep-frontend-component-planner/SKILL.md
├── template-prep-nextjs-react-frontend-design-language/SKILL.md
└── template-prep-template-indexing/SKILL.md

references/
├── template-preparation-rules.md
├── template-id-naming-rules.md
├── template-quality-scoring.md
├── template-catalog-schema.md
├── screenshot-ingestion-rules.md
└── template-package-validation.md

scripts/
├── validate-template-package.sh
├── validate-template-catalog.sh
└── check.sh
```

如果某个原子 Skill 的 `SKILL.md` 不存在，必须停止并报告缺失，不得自行发明完整原子 Skill 行为。

---

## 8. Step 0：前置检查

在处理任何截图之前，Codex 必须完成：

1. 理解用户要求：单模板准备、批量模板准备、恢复执行、重建索引、补跑缺失阶段。
2. 定位输入目录或截图文件。
3. 确认截图文件存在。
4. 确认模板库输出目录。
5. 检查原子 Skill 文件是否存在。
6. 检查是否已有同名模板包。
7. 判断执行模式：全量执行、跳过已通过步骤、强制重跑、从指定步骤恢复。
8. 判断 Codex 当前环境是否可以进行图像理解；如果不能，必须要求已有 `01-page-visual-parse.md` 或可用图像解析工具。
9. 生成执行计划。

完成前置检查之前，不要写入任何下游产物。

---

## 9. Step 1：确定执行模式

| 模式 | 触发条件 | 行为 |
|---|---|---|
| full-run | 新截图入库 | 从 Skill 1 到 Skill 8 全量执行 |
| resume | 已有部分产物 | 从缺失或失败步骤继续 |
| rebuild | 用户要求重建 | 覆盖旧产物，保留备份或记录覆盖 |
| index-only | 已有 1-5 产物 | 只运行 Skill 8，生成索引 |
| validate-only | 用户只要求检查模板包 | 不生成新产物，只校验完整性 |
| batch-run | 多个截图目录 | 对每个模板运行完整流程，并生成批次报告 |

如果用户未指定模式，默认：

```text
如果模板包不存在：full-run
如果模板包存在但产物不完整：resume
如果模板包完整：validate-only，除非用户明确要求 rebuild
```

---

## 10. Step 2：创建模板 ID 与工作目录

模板 ID 必须稳定、可读、避免冲突。

推荐格式：

```text
<page-type>-<style-or-domain>-<short-hash>
```

示例：

```text
landing-saas-premium-a1b2c3
dashboard-analytics-clean-d4e5f6
pricing-b2b-minimal-h7i8j9
```

Codex 必须：

1. 从 metadata、输入目录名或截图文件名推断初始 ID。
2. 如果存在冲突，追加短 hash 或序号。
3. 创建模板目录。
4. 将原始截图复制到 `assets/`。
5. 写入或更新 `preparation-report.md` 的初始化信息。

不得覆盖已有模板包，除非用户明确要求 rebuild。

---

## 11. Step 3：编排 Skill 1 页面视觉解析

### 输入

```text
- assets/ 中的截图
- metadata.md 或 metadata.detected.md
```

### 预期输出

```text
01-page-visual-parse.md
```

### 门禁校验

必须检查文件存在且包含以下章节：

```text
# 页面视觉解析报告
## 0. 输入与截图状态
## 1. 页面类型判断
## 2. 页面结构总览
## 3. 区域级解析
## 4. 布局系统
## 5. 视觉元素清单
## 6. 色彩解析
## 7. 字体与文本层级
## 8. 间距、圆角、阴影与边框
## 9. 信息层级与视觉焦点
## 10. 可交互元素识别
## 11. 响应式推断
## 12. 不确定项与假设
## 13. 下游交付摘要
```

如果 Skill 1 失败，不得继续执行 Skill 2。

---

## 12. Step 4：编排 Skill 2 UI/UX 设计语言抽象

### 输入

```text
01-page-visual-parse.md
metadata.md / metadata.detected.md
```

### 预期输出

```text
02-uiux-design-language.md
```

### 门禁校验

必须检查文件存在且包含：

```text
# UI/UX 设计语言抽象报告
## 0. 输入理解与抽象范围
## 1. 设计意图
## 2. 风格关键词
## 3. 用户与场景推断
## 4. 信息架构与视觉叙事
## 5. UX 原则
## 6. 交互优先级
## 7. UI/UX 设计语言
## 8. 组件语义，而非前端组件
## 9. 下游转译约束
## 10. 不确定项与假设
## 11. 下游交付摘要
```

如果 Skill 2 输出缺少风格关键词、设计意图或交互优先级，不得继续执行 Skill 3。

---

## 13. Step 5：编排 Skill 3 设计系统结构化

### 输入

```text
01-page-visual-parse.md
02-uiux-design-language.md
```

### 预期输出

```text
03-design-system.md
```

### 门禁校验

必须检查文件存在且包含：

```text
# 设计系统结构化规范
## 1. 输入摘要
## 2. 设计系统目标
## 3. 设计原则
## 4. Design Tokens
## 5. 颜色系统
## 6. 排版系统
## 7. 间距与布局系统
## 8. 圆角、边框与阴影系统
## 9. 组件风格基线
## 10. 状态与交互规则
## 11. 响应式规则
## 12. 可访问性规则
## 13. Tailwind 映射建议
## 14. 假设与不确定项
## 15. 自检清单
```

如果缺少 Design Tokens、颜色系统、排版系统或 Tailwind 映射建议，不得继续执行 Skill 4。

---

## 14. Step 6：编排 Skill 4 前端组件规划

### 输入

```text
01-page-visual-parse.md
02-uiux-design-language.md
03-design-system.md
```

### 预期输出

```text
04-frontend-component-plan.md
```

### 门禁校验

必须检查文件存在且包含：

```text
# 前端组件规划文档
## 1. 输入摘要
## 2. 组件规划目标
## 3. 页面级组件树
## 4. 组件分层策略
## 5. 页面区块组件规划
## 6. 可复用基础组件规划
## 7. 组件 Props 契约
## 8. 状态与交互规划
## 9. 响应式组件行为
## 10. 可访问性规划
## 11. 数据与内容传入策略
## 12. 样式与 Design Token 使用规则
## 13. 文件与命名建议
## 14. 下游实现交接说明
## 15. 假设与不确定项
## 16. 自检清单
```

如果缺少组件树、基础组件规划或 props 契约，不得继续执行 Skill 5。

---

## 15. Step 7：编排 Skill 5 Next.js + React 前端设计语言

### 输入

```text
01-page-visual-parse.md
02-uiux-design-language.md
03-design-system.md
04-frontend-component-plan.md
```

### 预期输出

```text
05-nextjs-react-frontend-language.md
```

### 门禁校验

必须检查文件存在且包含：

```text
# Next.js + React 前端实现规范
## 1. 输入摘要
## 2. 实现目标
## 3. 技术栈约定
## 4. Next.js App Router 结构
## 5. 页面与布局组织
## 6. React 组件实现策略
## 7. Server / Client Component 边界
## 8. TypeScript Props 与数据契约
## 9. Tailwind 与 Design Token 映射
## 10. 响应式实现规则
## 11. 状态与交互实现规则
## 12. 可访问性实现规则
## 13. 动画与过渡规则
## 14. 图片、图标与媒体资源规则
## 15. 内容与数据传入策略
## 16. 文件命名与导入规则
## 17. 下游代码生成约束
## 18. 验证与验收清单
## 19. 假设与不确定项
```

如果缺少 App Router 结构、Server / Client Component 边界或下游代码生成约束，不得继续执行 Skill 8。

---

## 16. Step 8：编排 Skill 8 Template Indexing

### 输入

```text
01-page-visual-parse.md
02-uiux-design-language.md
03-design-system.md
04-frontend-component-plan.md
05-nextjs-react-frontend-language.md
assets/
metadata.md / metadata.detected.md
```

### 预期输出

```text
08-template-index.md
```

### 门禁校验

必须检查文件存在且包含：

```text
# Template Index
## 1. Template Identity
## 2. Source Assets
## 3. Classification
## 4. Visual Tags
## 5. UX Tags
## 6. Layout Tags
## 7. Component Tags
## 8. Design System Summary
## 9. Reusable Patterns
## 10. Replaceable Regions
## 11. Adaptation Rules
## 12. Matching Metadata
## 13. Quality Score
## 14. Limitations
## 15. Downstream Usage
```

如果缺少分类、标签、可替换区域、适配规则或质量评分，则模板包不得标记为 ready。

---

## 17. Step 9：生成 template-manifest.md

每个模板包必须生成 `template-manifest.md`。

推荐格式：

```markdown
# Template Manifest

## 1. Template Identity

- Template ID:
- Template Name:
- Status: ready / partial / blocked
- Created At:
- Updated At:

## 2. Source Files

| File | Path | Exists | Notes |
|---|---|---|---|
| Desktop Screenshot | assets/desktop.png | yes/no |  |
| Mobile Screenshot | assets/mobile.png | yes/no |  |
| Metadata | metadata.md | yes/no |  |

## 3. Generated Artifacts

| Step | Artifact | Status | Validation |
|---|---|---|---|
| Skill 1 | 01-page-visual-parse.md | pass/fail/skipped |  |
| Skill 2 | 02-uiux-design-language.md | pass/fail/skipped |  |
| Skill 3 | 03-design-system.md | pass/fail/skipped |  |
| Skill 4 | 04-frontend-component-plan.md | pass/fail/skipped |  |
| Skill 5 | 05-nextjs-react-frontend-language.md | pass/fail/skipped |  |
| Skill 8 | 08-template-index.md | pass/fail/skipped |  |

## 4. Template Summary

- Page Type:
- Primary Use Case:
- Style Keywords:
- Layout Pattern:
- Component Families:
- Recommended Usage:

## 5. Quality Gate

- Overall Status:
- Quality Score:
- Blocking Issues:
- Warnings:

## 6. Downstream Readiness

- Ready for template matching: yes/no
- Ready for multi-page composition: yes/no
- Ready for code generation reference: yes/no
```

---

## 18. Step 10：更新 template-catalog.md

批量或单模板完成后，必须更新：

```text
template-library/_indexes/template-catalog.md
```

Catalog 必须至少包含：

```markdown
# Template Catalog

| Template ID | Page Type | Use Case | Style Keywords | Layout Pattern | Quality Score | Status | Path |
|---|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ready / partial / blocked | template-library/... |
```

规则：

- 只把通过质量门禁的模板标记为 `ready`。
- 部分产物缺失的模板标记为 `partial`。
- 缺失关键上游产物或无法解析的模板标记为 `blocked`。
- 不得删除已有 catalog 条目，除非用户明确要求清理。
- 更新 catalog 前应保留原条目顺序或按 Template ID 排序，确保 diff 可读。

---

## 19. Step 11：生成 preparation-report.md

每个模板目录必须生成 `preparation-report.md`。

报告必须包含：

```markdown
# Template Preparation Report

## 1. Execution Summary

- Template ID:
- Mode:
- Status:
- Started At:
- Completed At:

## 2. Steps Executed

| Step | Result | Notes |
|---|---|---|
| Skill 1 | pass/fail/skipped |  |
| Skill 2 | pass/fail/skipped |  |
| Skill 3 | pass/fail/skipped |  |
| Skill 4 | pass/fail/skipped |  |
| Skill 5 | pass/fail/skipped |  |
| Skill 8 | pass/fail/skipped |  |

## 3. Validation Results

- Artifact existence:
- Required headings:
- Handoff summaries:
- Template index readiness:

## 4. Issues

### Blocking

- ...

### Warnings

- ...

## 5. Next Actions

- ...
```

批量执行时，还必须生成：

```text
template-library/_indexes/batch-preparation-report.md
```

---

## 20. 门禁规则

### 20.1 P0：必须通过

- 输入截图存在。
- 原子 Skill 文件存在，或已有等价产物可复用。
- 每一步输出文件存在。
- 每一步输出包含必需章节。
- Skill 1 到 Skill 5 的下游交付摘要存在。
- Skill 8 产物包含模板分类、检索标签、可替换区域、适配规则和质量评分。
- `template-manifest.md` 已生成。
- `preparation-report.md` 已生成。
- `template-catalog.md` 已更新。

### 20.2 P1：应该通过

- metadata 完整。
- desktop 和 mobile 截图都存在。
- 模板 ID 清晰可读且不冲突。
- 质量评分说明充分。
- 不确定项已记录。
- 目录结构和文件命名一致。
- catalog 条目可读、可检索。

### 20.3 P2：加分项

- 支持多状态截图。
- 支持 batch metadata。
- 支持从失败步骤恢复。
- 支持质量低于阈值时自动标记 partial。
- 支持输出模板包摘要。

---

## 21. 失败与恢复策略

### 21.1 失败时必须停止的情况

- 输入截图不存在。
- 原子 Skill 文件不存在。
- Codex 无法读取图像，且没有 Skill 1 输出可复用。
- Skill 1 输出缺失或无效。
- Skill 2-5 任一步缺少必需章节。
- Skill 8 输出缺少模板匹配必需字段。
- 模板 ID 冲突且无法安全生成新 ID。

### 21.2 可恢复情况

以下情况可以进入 resume 模式：

- 已有 01，缺少 02。
- 已有 01-03，缺少 04-05。
- 已有 01-05，缺少 08。
- 已有全部产物，但缺少 manifest 或 catalog。
- 上次执行中断，但已有有效中间产物。

### 21.3 恢复规则

- 不要重写已通过门禁的产物，除非用户要求 rebuild。
- 从第一个缺失或失败的步骤继续。
- 恢复前先重新验证已有产物。
- 恢复后更新 preparation-report。

---

## 22. 硬性规则

- 不要把 Orchestrator 写成一个大号页面分析 Skill。
- 不要跳过 Skill 1-5 直接生成 Template Index。
- 不要伪造截图内容。
- 不要在 Codex 无法读取图像时假装完成视觉解析。
- 不要在上游产物未通过门禁时继续执行下游步骤。
- 不要覆盖已有模板包，除非用户明确要求。
- 不要删除原始截图。
- 不要把 `partial` 或 `blocked` 模板标记为 `ready`。
- 不要伪造 embedding 向量；如果未实际生成 embedding，只能写 `embedding_status: not_generated`。
- 不要生成 Next.js / React 代码。
- 不要根据用户生成需求匹配模板。
- 不要修改仓库中与模板准备无关的文件。
- 不要声称运行了未实际运行的检查脚本。

---

## 23. Codex 执行建议

Codex 可以使用以下方式执行本 Skill：

```text
1. ls / find / glob 定位截图和已有产物。
2. mkdir -p 创建模板目录。
3. cp 复制截图到 assets/。
4. 读取各原子 Skill 的 SKILL.md。
5. 逐步生成或检查每个 Markdown 产物。
6. grep / rg 检查必需章节。
7. 运行 scripts/validate-template-package.sh，如果存在。
8. 更新 template-catalog.md。
9. 写入 preparation-report.md。
```

如果存在脚本，优先运行：

```bash
scripts/validate-template-package.sh template-library/<template-id>
scripts/validate-template-catalog.sh template-library/_indexes/template-catalog.md
```

如果脚本不存在，可使用人工检查并在报告中说明：

```text
未运行自动脚本，原因：scripts/validate-template-package.sh 不存在。
已执行人工章节检查。
```

---

## 24. 最终输出模板

Codex 完成执行后，最终回复必须使用：

```markdown
已完成：
- 已处理模板数量：...
- Ready：...
- Partial：...
- Blocked：...

生成文件：
- `template-library/.../01-page-visual-parse.md`
- `template-library/.../02-uiux-design-language.md`
- `template-library/.../03-design-system.md`
- `template-library/.../04-frontend-component-plan.md`
- `template-library/.../05-nextjs-react-frontend-language.md`
- `template-library/.../08-template-index.md`
- `template-library/.../template-manifest.md`
- `template-library/.../preparation-report.md`
- `template-library/_indexes/template-catalog.md`

已验证：
- 输入截图存在性：通过 / 失败
- 必需章节检查：通过 / 失败
- 模板索引字段检查：通过 / 失败
- Catalog 更新：通过 / 失败
- 自动脚本：已运行 / 未运行，原因：...

失败 / 跳过：
- ...

风险与说明：
- ...
```

如果执行阻塞，最终回复必须使用：

```markdown
未完成，存在阻塞：
- ...

已完成：
- ...

未完成：
- ...

需要用户提供：
- ...

已写入报告：
- `.../preparation-report.md`
```

---

## 25. 自检清单

发布最终结果前，必须检查：

```text
[ ] 是否识别了执行模式？
[ ] 是否定位了输入截图？
[ ] 是否检查了原子 Skill 文件？
[ ] 是否创建了模板目录？
[ ] 是否复制了原始截图到 assets/？
[ ] 是否按 Skill 1 → 2 → 3 → 4 → 5 → 8 顺序执行或验证？
[ ] 是否每一步都有门禁检查？
[ ] 是否生成 template-manifest.md？
[ ] 是否生成 preparation-report.md？
[ ] 是否更新 template-catalog.md？
[ ] 是否没有伪造 embedding？
[ ] 是否没有生成代码？
[ ] 是否说明了未运行的验证脚本？
[ ] 是否最终输出 Markdown 汇报？
```

---

## 26. 最重要的原则

Template Preparation Orchestrator 的价值不是替代原子 Skill，而是确保模板准备流程稳定可控：

```text
输入可追踪 → 步骤可恢复 → 产物可验证 → 模板可入库 → 下游可检索
```

如果某一步产物不可信，宁可停止并标记 `blocked`，也不要生成一个看似完整但无法复用的模板包。
