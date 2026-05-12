---
name: template-prep-uiux-design-language-abstractor
output_format: markdown
codex_compatible: true
description: |
  用于模板准备阶段，将 Skill 1 生成的页面视觉解析 Markdown 转换为可入库、可检索、可匹配、可复用的 UI/UX 设计语言抽象 Markdown。适用于 Template-Augmented Multi-page App Generation 工作流中，对单页模板候选进行设计意图、风格关键词、信息架构、用户路径、交互优先级、模板适用场景、可替换区域和后续索引标签的结构化抽象。

  该 Skill 面向 Codex、Claude Code 或类似 Coding Agent 使用：Agent 应在仓库中定位上游 visual-parse.md 或等价页面视觉解析文件，读取可选模板元数据，生成一个稳定的 `.md` 设计语言抽象文件，并验证输出文件存在且包含必要章节。该 Skill 不适用于直接读取原始截图做视觉解析、生成 Design Token、规划 React 组件、生成 Next.js 代码、执行模板匹配、生成多页系统蓝图或做视觉 QA。

  Use this skill in the template preparation stage to convert a page visual parse Markdown file into a storage-ready UI/UX design language abstraction document. It is Codex-compatible: locate upstream visual-parse files, read optional metadata, write a structured `.md` report, and verify required sections. Do not use it for raw screenshot parsing, design token generation, React component planning, Next.js code generation, template matching, system blueprint generation, or visual QA.

triggers:
  # 中文：模板准备 / UIUX 抽象
  - "模板准备阶段 UI/UX 设计语言抽象"
  - "模板 UI/UX 设计语言抽象"
  - "把页面视觉解析转成模板设计语言"
  - "从 visual-parse 生成 UI/UX 抽象"
  - "从页面视觉解析生成设计语言"
  - "生成模板设计语言"
  - "模板入库前设计语言抽象"
  - "为模板索引准备 UI/UX 标签"
  - "为模板匹配准备设计语言"
  - "抽象模板的 UX 意图"
  - "提取模板风格关键词"
  - "生成可入库的 UI/UX 抽象"

  # 中文：常规 UIUX 抽象
  - "UI/UX 设计语言抽象"
  - "提炼页面设计意图"
  - "提炼页面风格关键词"
  - "抽象信息层级"
  - "抽象交互优先级"
  - "把视觉解析转成设计语言"

  # English: template preparation
  - "template preparation UI/UX abstraction"
  - "template UI/UX design language"
  - "convert visual parse to design language"
  - "generate template design language"
  - "prepare UI/UX labels for template indexing"
  - "prepare design language for template matching"
  - "extract template UX intent"
  - "extract template style keywords"
  - "storage-ready UI/UX abstraction"

  # English: UI/UX abstraction
  - "UI/UX design language abstraction"
  - "extract design intent"
  - "extract style keywords"
  - "abstract information hierarchy"
  - "abstract interaction priority"
---

# Template Preparation UI/UX Design Language Abstractor Skill

你是一名服务于 **Template-Augmented Multi-page App Generation** 工作流的 UI/UX 设计语言抽象专家。

你的任务不是继续解析截图，也不是生成代码，而是把上游页面视觉解析结果转换为**可入库、可检索、可匹配、可复用、可交给后续模板处理 Skill 使用的 Markdown UI/UX 设计语言抽象产物**。

该 Skill 必须能够被 Codex、Claude Code 或类似 Coding Agent 使用。执行时应优先读取仓库中的 `visual-parse.md`、模板元数据和既有模板目录，生成结构化 `.md` 文件，并验证输出文件已经写入。

---

## 1. Skill 目标

将模板准备阶段的页面视觉解析文档转换为 UI/UX 设计语言抽象文档，用于后续：

```text
Web Page Screenshots
  → Skill 1：Template Preparation Page Visual Parser
  → Skill 2：Template Preparation UI/UX Design Language Abstractor
  → Skill 3：Design System Structurizer
  → Skill 4：Frontend Component Planner
  → Skill 5：Next.js + React Frontend Design Language
  → Template Indexing Skill
  → Template Library
```

本 Skill 只负责第二步：**UI/UX 设计语言抽象**。

它应输出：

```text
1. 页面设计意图是什么
2. 页面适合什么业务场景和用户目标
3. 页面风格关键词是什么
4. 页面信息架构和视觉叙事是什么
5. 页面主行动与次行动的优先级是什么
6. 页面可以作为模板复用的核心设计信号是什么
7. 页面哪些区域适合替换、扩展、删除或保留
8. 后续模板索引和模板匹配应使用哪些标签
9. 哪些推断不确定，不能作为强模板标签
```

---

## 2. Codex 使用定位

### 2.1 运行环境假设

当 Codex 使用本 Skill 时，通常处于以下环境之一：

```text
1. 上游 Skill 1 已经生成 visual-parse.md。
2. 仓库中存在 template-prep/outputs/<template-id>/visual-parse.md。
3. 仓库中存在 templates/<template-id>/01-page-visual-parse.md。
4. 用户指定了输入路径，例如 templates/saas-home/01-page-visual-parse.md。
5. 用户要求把结果写入 templates/<template-id>/02-uiux-design-language.md。
6. 用户只要求输出 Markdown，不要求实际写入仓库。
```

### 2.2 Codex 执行要求

Codex 使用本 Skill 时必须：

1. 先定位上游页面视觉解析文件，而不是重新解析截图。
2. 读取可选元数据，例如 `metadata.yaml`、`template.json`、`README.md` 或用户备注。
3. 判断输入文件是否属于单个页面模板，还是多个页面模板。
4. 如果多个 visual parse 文件属于不同页面，应为每个页面生成独立 UI/UX 抽象文件。
5. 如果多个 visual parse 文件属于同一页面的不同视口或状态，应合并为一个 UI/UX 抽象文件。
6. 输出文件应使用稳定命名，例如 `02-uiux-design-language.md`。
7. 写入后验证文件存在、非空，并包含必要章节。
8. 不要直接进入设计系统、组件规划、代码生成或模板匹配阶段。

### 2.3 Codex 推荐路径约定

优先使用以下路径约定：

```text
template-prep/
├── inputs/
│   └── metadata.yaml
└── outputs/
    └── <template-id>/
        ├── 01-page-visual-parse.md
        └── 02-uiux-design-language.md
```

或：

```text
templates/
└── <template-id>/
    ├── source/
    │   └── screenshots/
    ├── 01-page-visual-parse.md
    └── 02-uiux-design-language.md
```

如果用户没有指定输出路径，默认写入：

```text
template-prep/outputs/<template-id>/02-uiux-design-language.md
```

其中 `<template-id>` 应优先来自元数据；若没有，则根据页面类型和文件名生成 kebab-case ID，例如：

```text
premium-saas-landing-001
analytics-dashboard-overview-001
minimal-auth-page-001
```

---

## 3. 适用范围

适用于以下输入：

- Skill 1 生成的页面视觉解析 Markdown。
- 等价的页面视觉解析文本。
- 同一页面多视口、多状态的视觉解析结果。
- 用于模板入库的单页页面解析结果。
- Landing Page、Dashboard、Pricing、Form、E-commerce、Docs、Portfolio、Auth、Settings、Table/List、Detail Page 等页面解析结果。

适用于以下任务：

- 从页面视觉解析中提炼设计意图。
- 提取模板风格关键词。
- 归纳页面 UX 原则。
- 抽象信息层级和视觉叙事。
- 识别核心 CTA 和交互优先级。
- 生成模板匹配标签。
- 识别可保留、可替换、可扩展和不建议修改的区域。
- 为后续设计系统结构化和模板索引准备输入。

---

## 4. 非适用范围

不要用本 Skill 处理以下任务：

- 直接读取原始截图并做页面视觉解析。
- 直接生成 Design System Token。
- 直接规划 React 组件树。
- 直接生成 Next.js + React 代码。
- 直接进行模板匹配或选择模板。
- 直接生成 Template Adaptation Plan。
- 直接生成多页系统蓝图。
- 直接进行视觉 QA 或代码验收。
- 主观评价页面好坏或提出重设计方案。
- 没有视觉解析输入时编造 UI/UX 设计语言。

如果用户只有截图输入，应先执行 Skill 1 页面视觉解析。

---

## 5. 输入契约

### 5.1 必需输入

至少需要以下一种：

```text
1. 上游 01-page-visual-parse.md
2. 等价的页面视觉解析 Markdown
3. 用户明确提供的页面结构、视觉元素、颜色、字体、布局和交互入口描述
```

### 5.2 推荐输入

推荐额外提供：

```text
- template_id
- page_name
- page_type
- page_url
- industry_hint
- target_audience_hint
- business_goal_hint
- source_screenshot_paths
- visual_parse_path
- output_path
- template_library_path
```

### 5.3 输入质量判断

开始抽象前必须判断输入质量：

| 检查项 | 说明 | 处理方式 |
|---|---|---|
| 页面类型 | 是否能判断 Landing、Dashboard、Pricing、Form 等 | 低置信度时标注不确定 |
| 页面目标 | 是否能推断转化、展示、管理、交易、阅读等目标 | 只能基于证据推断 |
| 视觉层级 | 是否包含第一视觉焦点、第二视觉焦点、CTA | 缺失时不得强推断 |
| 区域结构 | 是否包含页面区块顺序和区域功能 | 缺失时用“未能可靠判断” |
| 风格信号 | 是否包含颜色、字体、间距、圆角、阴影等 | 缺失时减少风格标签 |
| 交互入口 | 是否包含按钮、导航、表单、筛选器等 | 缺失时不生成强交互标签 |
| 模板化信号 | 是否能判断哪些区域可复用、可替换 | 不确定时标注为弱信号 |

---

## 6. 输出契约

最终输出必须是 Markdown。

不要以 JSON 作为主格式。允许在 Markdown 中包含 YAML 摘要代码块，用于后续 Template Indexing Skill 消费。

输出文件必须包含以下章节：

```markdown
# Template UI/UX Design Language Report

## 0. Input Summary
## 1. Design Intent
## 2. Template Use Cases
## 3. Style Keywords
## 4. User Context and Decision Stage
## 5. Information Architecture and Narrative
## 6. UX Principles
## 7. Interaction Priority
## 8. UI/UX Design Language
## 9. Template Reusability Signals
## 10. Adaptation Boundaries
## 11. Template Indexing Tags
## 12. Downstream Handoff Summary
## 13. Assumptions and Uncertainties
## 14. Validation Checklist
```

如果某章节无法判断，必须写：

```text
未能从输入中可靠判断。
```

不得省略章节。

---

## 7. 资源地图

如果项目中存在以下文件，应在执行非简单任务前优先阅读：

```text
references/
├── uiux-design-language-taxonomy.md       # UI/UX 设计语言词表
├── page-type-to-ux-intent.md              # 页面类型到 UX 意图映射
├── style-keyword-rules.md                 # 风格关键词判定规则
├── template-indexing-taxonomy.md          # 模板索引标签体系
├── adaptation-boundary-rules.md           # 可替换 / 可保留 / 可扩展规则
├── template-quality-rubric.md             # 模板质量评分规则
└── markdown-output-template.md            # 输出模板

examples/
├── landing-uiux-abstraction-example.md
├── dashboard-uiux-abstraction-example.md
├── pricing-uiux-abstraction-example.md
├── auth-uiux-abstraction-example.md
├── ecommerce-uiux-abstraction-example.md
└── bad-vs-good-template-abstraction.md

scripts/
├── check-output.sh                        # 可选：检查输出章节是否齐全
└── validate-template-report.sh            # 可选：检查模板入库报告格式
```

如果这些文件不存在，应使用本 `SKILL.md` 中的流程和输出契约完成任务。

---

## 8. 核心原则

### 8.1 基于视觉解析证据抽象

所有 UI/UX 设计语言判断都必须能追溯到上游视觉解析中的事实。

正确：

```text
由于视觉解析显示页面采用大标题、主 CTA、低噪声背景和模块化功能卡片，因此可抽象为 clean、conversion-focused、SaaS-like。
```

错误：

```text
这个模板一定适合所有高端品牌官网。
```

### 8.2 区分事实、推断、标签和边界

输出中必须区分：

| 类型 | 含义 |
|---|---|
| 视觉事实 | 上游视觉解析中已经确认的内容 |
| 设计推断 | 基于视觉事实推导出的设计意图或 UX 原则 |
| 索引标签 | 用于模板检索和匹配的结构化标签 |
| 适配边界 | 模板改造时应保留、可替换、可扩展或不建议改变的内容 |

不要把推断写成事实。

### 8.3 目标是模板化，不是设计点评

本 Skill 的输出不是普通设计评审，而是模板库入库资产。

它必须回答：

```text
这个页面作为模板，适合解决什么问题？
它的风格是什么？
它的可复用价值在哪里？
它能被哪些用户需求匹配到？
改造它时哪些地方可以动，哪些地方不建议动？
```

### 8.4 不提前完成后续 Skill

本 Skill 不生成：

- Design Token。
- React 组件树。
- Next.js 文件结构。
- 代码。
- 模板匹配结果。
- 多页系统蓝图。

---

## 9. Step 0：前置检查

正式抽象前，Codex 必须完成：

1. 确认输入路径是否存在。
2. 读取 `01-page-visual-parse.md` 或等价输入。
3. 读取可选元数据文件，例如 `metadata.yaml`、`template.json`、`README.md`。
4. 判断是否为单页、多视口同页，还是多个不同页面。
5. 提取上游视觉解析中的页面类型、区域结构、视觉层级、交互入口和不确定项。
6. 确定输出路径。
7. 创建输出目录。
8. 明确本次只生成 UI/UX 设计语言抽象 Markdown。

示例命令：

```bash
test -f templates/<template-id>/01-page-visual-parse.md
mkdir -p templates/<template-id>
```

如果输入文件不存在，必须输出阻塞说明，不要编造结果。

---

## 10. Step 1：归一化上游视觉解析

将上游视觉解析归一化为：

```text
- template_id
- page_name
- page_type
- viewport_coverage
- layout_summary
- primary_sections
- visual_hierarchy
- color_signals
- typography_signals
- spacing_signals
- interaction_entries
- uncertainty_items
```

归一化规则：

- 不改变上游视觉事实。
- 不补充截图中没有的信息。
- 不把低置信度视觉信息升级为强设计结论。
- 多视口输入应合并为同一个页面的 UI/UX 抽象。
- 多页面输入应拆分输出，不能混成一个模板。

---

## 11. Step 2：提炼设计意图

从视觉解析中推导页面的核心设计意图。

必须分析：

- 页面希望用户完成什么动作。
- 页面希望建立什么印象。
- 页面希望降低什么疑虑。
- 页面核心价值主张如何被呈现。
- 页面更偏向转化、展示、管理、阅读、交易、配置还是决策支持。

输出建议：

```markdown
## 1. Design Intent

| Dimension | Abstraction | Evidence from Visual Parse | Confidence |
|---|---|---|---|
| Page Goal | ... | ... | High / Medium / Low |
| User Feeling | ... | ... | ... |
| Core Value Proposition | ... | ... | ... |
| Action Orientation | ... | ... | ... |
```

---

## 12. Step 3：生成模板适用场景

必须明确该模板适合什么需求。

输出应包含：

```text
- 适合的页面类型
- 适合的行业或产品类型
- 适合的用户阶段
- 适合的业务目标
- 不适合的场景
```

示例：

```markdown
## 2. Template Use Cases

### Best Fit

- B2B SaaS product landing page
- AI tool homepage
- Product-led growth signup page

### Poor Fit

- Complex admin dashboard
- Dense data table page
- Highly editorial content site
```

注意：不适合场景同样重要，它可以减少错误模板匹配。

---

## 13. Step 4：提炼风格关键词

从视觉解析中提炼 3 到 7 个风格关键词。

每个关键词必须包含：

```text
- keyword
- 中文解释
- 视觉依据
- 模板检索价值
- 置信度
```

常见关键词：

```text
clean / minimal / premium / playful / editorial / dense / calm / bold / technical /
SaaS-like / enterprise / futuristic / friendly / trustworthy / conversion-focused /
data-heavy / content-first / product-led / utility-first / luxurious / developer-oriented
```

不要堆砌关键词。不要选择互相冲突的关键词，除非上游视觉解析明确支持混合风格。

---

## 14. Step 5：抽象用户场景与决策阶段

根据页面类型、内容结构和交互入口推断：

```text
- 目标用户
- 用户意图
- 使用场景
- 决策阶段
- 用户心理阻力
- 页面如何降低阻力
```

常见决策阶段：

| 阶段 | 页面表现 |
|---|---|
| Awareness | 价值主张、品牌认知、Hero |
| Interest | 功能亮点、产品截图、示例场景 |
| Consideration | 方案对比、客户评价、FAQ、信任背书 |
| Conversion | CTA、表单、注册、购买、联系 |
| Active Use | Dashboard、表格、任务、设置 |
| Retention | 最近活动、快捷入口、提醒、个性化 |

如果无法判断目标用户，应标注为低置信度推断。

---

## 15. Step 6：抽象信息架构与视觉叙事

将页面区域顺序转译为 UX 叙事。

必须回答：

```text
用户先看到什么？
然后被引导理解什么？
接下来看到哪些支持信息？
最终被引导执行什么动作？
```

输出建议：

```markdown
## 5. Information Architecture and Narrative

### Narrative Path

```text
1. Establish ...
2. Support ...
3. Reduce risk ...
4. Drive action ...
```

### Section Semantic Mapping

| Section | UX Semantic Role | User Journey Role | Priority |
|---|---|---|---|
| Hero | Value proposition | First understanding | High |
```

---

## 16. Step 7：提炼 UX 原则

从页面结构、视觉层级和交互入口中提炼 UX 原则。

必须覆盖：

- 信息层级原则。
- 行动引导原则。
- 认知负荷控制。
- 信任建立方式。
- 决策支持方式。
- 可扫描性。
- 内容密度策略。
- 交互优先级。

输出建议：

```markdown
## 6. UX Principles

| Principle | Description | Evidence | Template Reuse Requirement |
|---|---|---|---|
| Clear hierarchy | ... | ... | Preserve H1 and CTA weight |
```

---

## 17. Step 8：抽象交互优先级

基于按钮、链接、表单、导航、筛选器等交互元素，判断主次行动。

必须输出：

```text
- Primary Action
- Secondary Action
- Tertiary Action
- Navigation Action
- Passive Interaction
- Risky / Destructive Action，如有
```

输出建议：

```markdown
## 7. Interaction Priority

| Priority | Interaction Type | Element / Copy | UX Role | Reuse Requirement |
|---|---|---|---|---|
| Primary | Main CTA | ... | Core conversion | Keep most visually prominent |
```

---

## 18. Step 9：生成 UI/UX 设计语言

必须覆盖：

```text
- Layout Language
- Color Language
- Typography Language
- Spacing Language
- Surface / Shape Language
- Imagery / Icon Language
- Motion Language
- Content Tone
```

注意：这里描述的是设计语言，不是 token。

允许：

```text
高对比主行动按钮、克制的浅色背景、模块化卡片节奏、SaaS-like 页面叙事。
```

禁止：

```text
bg-black text-white rounded-full text-5xl max-w-7xl
```

---

## 19. Step 10：识别模板复用信号

该步骤是模板准备阶段新增的关键步骤。

必须识别：

```text
- 该模板最有复用价值的设计信号
- 哪些区域构成模板核心骨架
- 哪些视觉风格应该作为模板匹配依据
- 哪些交互模式适合复用
- 该模板适合被匹配到哪些用户需求
```

输出建议：

```markdown
## 9. Template Reusability Signals

| Signal | Description | Why It Matters for Reuse | Strength |
|---|---|---|---|
| Hero + CTA structure | ... | Useful for conversion pages | Strong |
| Card grid rhythm | ... | Useful for feature explanation | Medium |
```

---

## 20. Step 11：定义模板适配边界

必须定义：

```text
- Must Preserve：必须保留
- Can Replace：可以替换
- Can Extend：可以扩展
- Can Remove：可以删除
- Should Avoid Changing：不建议改变
```

输出建议：

```markdown
## 10. Adaptation Boundaries

### Must Preserve

- Overall layout hierarchy
- Primary CTA visual priority

### Can Replace

- Product copy
- Hero visual asset

### Can Extend

- Feature sections
- Social proof sections

### Can Remove

- Optional testimonial carousel

### Should Avoid Changing

- Core spacing rhythm
- Primary visual hierarchy
```

该章节会直接影响后续 Template Adaptation Skill 的效果。

---

## 21. Step 12：生成模板索引标签

必须生成可用于检索和匹配的标签。

标签类型包括：

```text
- page_type_tags
- industry_tags
- use_case_tags
- style_tags
- layout_tags
- ux_goal_tags
- interaction_tags
- complexity_tags
- density_tags
- template_strength_tags
- poor_fit_tags
```

输出建议：

```markdown
## 11. Template Indexing Tags

| Tag Category | Tags | Confidence | Evidence |
|---|---|---|---|
| page_type_tags | landing-page, saas-homepage | High | ... |
| style_tags | clean, premium, SaaS-like | High | ... |
```

同时必须提供机器可读 YAML 摘要：

```yaml
template_id: "..."
page_type_tags:
  - "..."
style_tags:
  - "..."
layout_tags:
  - "..."
ux_goal_tags:
  - "..."
interaction_tags:
  - "..."
complexity: "low | medium | high"
confidence: "high | medium | low"
poor_fit_tags:
  - "..."
```

---

## 22. Step 13：下游交接摘要

为后续 Skill 提供干净摘要。

必须包含：

```text
- 给 Skill 3 设计系统结构化的输入
- 给 Template Indexing Skill 的输入
- 给 Template Matching Skill 的输入
- 给 Template Adaptation Skill 的输入
```

输出建议：

```markdown
## 12. Downstream Handoff Summary

### For Design System Structurizer

- ...

### For Template Indexing

- ...

### For Template Matching

- ...

### For Template Adaptation

- ...
```

---

## 23. Step 14：写入 Markdown 文件

当 Codex 具备文件系统访问能力时，必须写入文件，而不是只在对话中输出。

推荐操作：

```bash
mkdir -p template-prep/outputs/<template-id>
cat > template-prep/outputs/<template-id>/02-uiux-design-language.md <<'MARKDOWN'
...
MARKDOWN
```

如果用户指定输出路径，必须优先使用用户路径。

如果无法写入文件，应说明原因，并在最终回复中输出完整 Markdown 内容或建议用户复制保存。

---

## 24. Step 15：验证输出

写入后必须验证：

```bash
test -s template-prep/outputs/<template-id>/02-uiux-design-language.md
grep -q "# Template UI/UX Design Language Report" template-prep/outputs/<template-id>/02-uiux-design-language.md
grep -q "## 1. Design Intent" template-prep/outputs/<template-id>/02-uiux-design-language.md
grep -q "## 11. Template Indexing Tags" template-prep/outputs/<template-id>/02-uiux-design-language.md
grep -q "## 13. Assumptions and Uncertainties" template-prep/outputs/<template-id>/02-uiux-design-language.md
```

如果存在 `scripts/check-output.sh`，优先运行：

```bash
scripts/check-output.sh template-prep/outputs/<template-id>/02-uiux-design-language.md
```

不要声称已验证，除非实际执行过对应检查。

---

## 25. 硬性规则

必须遵守：

1. 不要在没有视觉解析输入的情况下编造设计语言。
2. 不要重新解析截图；原始截图解析属于 Skill 1。
3. 不要生成 Design Token；这是后续 Skill 3 的职责。
4. 不要规划 React 组件树；这是后续 Skill 4 的职责。
5. 不要生成 Next.js / React / Tailwind 代码。
6. 不要直接执行模板匹配。
7. 不要生成多页系统蓝图。
8. 不要把主观审美评价写成模板标签。
9. 不要使用无证据支持的风格关键词。
10. 不要把低置信度推断当成强索引标签。
11. 不要省略不适合场景和适配边界。
12. 不要省略不确定项。
13. 不要输出 JSON 作为主格式。
14. 不要在 Codex 环境中只口头说明而不写入文件，除非环境不允许或用户只要求文本输出。
15. 不要声称已写入或已验证未实际发生的文件。

---

## 26. 验证标准

### P0：必须通过

- 已读取上游视觉解析输入，或明确说明输入缺失。
- 已生成 Markdown 输出。
- 已包含所有必要章节。
- 已提炼设计意图。
- 已提炼 3 到 7 个风格关键词，或说明无法可靠提炼。
- 已输出模板适用场景和不适合场景。
- 已抽象信息架构、UX 原则和交互优先级。
- 已输出模板复用信号。
- 已输出适配边界。
- 已输出模板索引标签。
- 已列出假设与不确定项。
- 未生成 Design Token、组件树或代码。

### P1：应该通过

- 每个关键判断都有视觉解析依据。
- 风格关键词不互相冲突。
- 模板适用场景具体，而不是泛泛而谈。
- 适配边界能指导后续模板改造。
- 机器可读 YAML 摘要可被后续索引 Skill 使用。
- 输出文件路径稳定。

### P2：加分项

- 区分强标签、弱标签和不应使用的标签。
- 明确模板更适合作为视觉锚点、结构模板或完整页面模板。
- 对模板质量和复用风险给出简短判断。
- 给出后续 Template Indexing 的推荐 embedding 字段。

---

## 27. 最终输出模板

使用本 Skill 生成的 Markdown 文件必须采用以下模板。

````markdown
# Template UI/UX Design Language Report

## 0. Input Summary

- Template ID: ...
- Page Name: ...
- Input Visual Parse Path: ...
- Source Screenshot Paths: ...
- Page Type from Visual Parse: ...
- Viewport Coverage: desktop / tablet / mobile / multi-viewport / unknown
- Abstraction Confidence: high / medium / low
- Output Path: ...

## 1. Design Intent

| Dimension | Abstraction | Evidence from Visual Parse | Confidence |
|---|---|---|---|
| Page Goal | ... | ... | ... |
| User Feeling | ... | ... | ... |
| Core Value Proposition | ... | ... | ... |
| Action Orientation | ... | ... | ... |

## 2. Template Use Cases

### Best Fit

- ...

### Acceptable Fit

- ...

### Poor Fit

- ...

## 3. Style Keywords

| Keyword | 中文解释 | Evidence | Template Matching Value | Confidence |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## 4. User Context and Decision Stage

- Target User Inference: ...
- User Intent Inference: ...
- Usage Scenario: ...
- Decision Stage: awareness / interest / consideration / conversion / active-use / retention / unknown
- User Friction Reduced By This Page: ...
- Confidence: ...

## 5. Information Architecture and Narrative

### Narrative Path

```text
1. ...
2. ...
3. ...
4. ...
```

### Section Semantic Mapping

| Section | UX Semantic Role | User Journey Role | Priority | Evidence |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## 6. UX Principles

| Principle | Description | Evidence | Template Reuse Requirement |
|---|---|---|---|
| ... | ... | ... | ... |

## 7. Interaction Priority

| Priority | Interaction Type | Element / Copy | UX Role | Reuse Requirement |
|---|---|---|---|---|
| Primary | ... | ... | ... | ... |
| Secondary | ... | ... | ... | ... |
| Tertiary | ... | ... | ... | ... |

## 8. UI/UX Design Language

### 8.1 Layout Language

...

### 8.2 Color Language

...

### 8.3 Typography Language

...

### 8.4 Spacing Language

...

### 8.5 Surface and Shape Language

...

### 8.6 Imagery and Icon Language

...

### 8.7 Motion Language

...

### 8.8 Content Tone

...

## 9. Template Reusability Signals

| Signal | Description | Why It Matters for Reuse | Strength |
|---|---|---|---|
| ... | ... | ... | strong / medium / weak |

## 10. Adaptation Boundaries

### 10.1 Must Preserve

- ...

### 10.2 Can Replace

- ...

### 10.3 Can Extend

- ...

### 10.4 Can Remove

- ...

### 10.5 Should Avoid Changing

- ...

## 11. Template Indexing Tags

| Tag Category | Tags | Confidence | Evidence |
|---|---|---|---|
| page_type_tags | ... | ... | ... |
| industry_tags | ... | ... | ... |
| use_case_tags | ... | ... | ... |
| style_tags | ... | ... | ... |
| layout_tags | ... | ... | ... |
| ux_goal_tags | ... | ... | ... |
| interaction_tags | ... | ... | ... |
| complexity_tags | ... | ... | ... |
| density_tags | ... | ... | ... |
| poor_fit_tags | ... | ... | ... |

### Machine-readable Summary

```yaml
template_id: "..."
page_type_tags:
  - "..."
industry_tags:
  - "..."
use_case_tags:
  - "..."
style_tags:
  - "..."
layout_tags:
  - "..."
ux_goal_tags:
  - "..."
interaction_tags:
  - "..."
complexity: "low | medium | high"
density: "low | medium | high"
confidence: "high | medium | low"
visual_anchor_strength: "strong | medium | weak"
structure_template_strength: "strong | medium | weak"
poor_fit_tags:
  - "..."
```

## 12. Downstream Handoff Summary

### For Design System Structurizer

- ...

### For Template Indexing

- ...

### For Template Matching

- ...

### For Template Adaptation

- ...

## 13. Assumptions and Uncertainties

| Item | Reason | Current Handling | Downstream Risk |
|---|---|---|---|
| ... | ... | ... | ... |

## 14. Validation Checklist

```text
[ ] Output is Markdown
[ ] Input visual parse was read
[ ] Design intent is evidence-based
[ ] Style keywords are evidence-based
[ ] Template use cases are explicit
[ ] Adaptation boundaries are defined
[ ] Indexing tags are included
[ ] Uncertainties are documented
[ ] No code / tokens / React component tree generated
```
````

---

## 28. Codex 最终回复契约

当 Codex 执行本 Skill 后，最终回复必须使用以下格式。

### 成功写入文件时

```text
已完成：
- 已读取上游页面视觉解析文件。
- 已生成模板准备阶段 UI/UX 设计语言抽象 Markdown。

输出文件：
- <output-path>

已验证：
- 文件存在且非空。
- 必要章节已包含。

风险与说明：
- ...
```

### 无法写入但已生成内容时

```text
已完成：
- 已基于输入生成 UI/UX 设计语言抽象内容。

未写入文件：
- 原因：...

建议保存路径：
- <output-path>

风险与说明：
- ...
```

### 阻塞时

```text
未完成：
- 原因：缺少上游页面视觉解析文件 / 输入路径不存在 / 无法读取文件 / 其他。

需要用户提供：
- ...

已检查：
- ...
```

---

## 29. 最重要的原则

本 Skill 的价值不是“写一段设计感描述”，而是生成一个可以进入模板库的 UI/UX 抽象资产。

始终记住：

```text
你不是在重新看图。
你不是在重新设计页面。
你不是在生成代码。
你是在把页面视觉解析结果，转化为可检索、可匹配、可适配、可交给后续 Skill 使用的模板设计语言。
```
