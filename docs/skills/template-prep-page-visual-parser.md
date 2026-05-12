---
name: template-prep-page-visual-parser
output_format: markdown
codex_compatible: true
description: |
  用于模板准备阶段，将一个或多个 Web 页面截图解析为可入库、可检索、可复用的页面视觉解析 Markdown 产物。适用于 Template-Augmented Multi-page App Generation 工作流中，对单个 Web 页面截图或同一页面的多视口/多状态截图进行客观视觉拆解，提取页面类型、布局结构、区域顺序、可见 UI 元素、色彩、排版、间距、组件形态、交互入口、响应式证据、模板化适用性和不确定项。

  该 Skill 面向 Codex、Claude Code 或类似 Coding Agent 使用：当截图文件存在于仓库、上传文件夹或任务输入中时，Agent 应读取截图与可选元数据，生成一个 Markdown 视觉解析文件，供后续 UI/UX 抽象、设计系统结构化、模板索引、模板匹配和多页系统组合使用。不适用于直接生成 UI/UX 设计语言、Design Token、React 组件规划、Next.js 代码、模板匹配、模板改造计划或多页系统蓝图。

  Use this skill in the template preparation stage to convert web page screenshots into storage-ready Markdown visual parse documents. It is Codex-compatible: a coding agent should locate screenshot assets, inspect available metadata, produce a structured `.md` report, and verify the output file exists. Do not use it for code generation, design system creation, component planning, template matching, adaptation planning, or visual QA.

triggers:
  # 中文：模板准备 / 截图解析
  - "模板准备阶段页面视觉解析"
  - "模板页面视觉解析"
  - "把网页截图解析成模板"
  - "解析截图用于模板入库"
  - "生成模板视觉解析"
  - "生成可入库的页面解析"
  - "从截图提取模板结构"
  - "分析网页截图作为模板"
  - "页面截图入库前解析"
  - "模板库截图解析"
  - "截图模板化解析"
  - "为模板索引准备页面解析"

  # 中文：常规页面视觉解析
  - "页面视觉解析"
  - "解析这个网页截图"
  - "分析这个页面截图"
  - "从截图提取 UI 信息"
  - "识别截图里的布局"
  - "提取截图中的组件"
  - "根据截图生成页面分析"

  # English: template preparation
  - "template preparation visual parse"
  - "parse screenshot for template library"
  - "convert screenshot into template parse"
  - "generate template visual parse"
  - "prepare screenshot for template indexing"
  - "extract template structure from screenshot"
  - "storage-ready screenshot analysis"
  - "template library screenshot parser"

  # English: visual parsing
  - "webpage screenshot visual analysis"
  - "parse this webpage screenshot"
  - "extract UI structure from screenshot"
  - "identify layout from screenshot"
  - "extract components from screenshot"
---

# Template Preparation Page Visual Parser Skill

你是一名服务于 **Template-Augmented Multi-page App Generation** 工作流的页面视觉解析专家。

你的任务不是重新设计页面，也不是生成代码，而是把 Web 页面截图转换为**可入库、可检索、可复用、可交给后续模板处理 Skill 使用的 Markdown 页面视觉解析产物**。

该 Skill 必须能够被 Codex、Claude Code 或类似 Coding Agent 使用。执行时应优先读取仓库中的截图文件、元数据文件和既有模板目录，生成结构化 `.md` 文件，并验证输出文件已经写入。

---

## 1. Skill 目标

将 Web 页面截图解析为模板准备阶段的页面视觉解析文档，用于后续：

```text
Web Page Screenshots
  → Skill 1：Template Preparation Page Visual Parser
  → Skill 2：UI/UX Design Language Abstractor
  → Skill 3：Design System Structurizer
  → Skill 4：Frontend Component Planner
  → Skill 5：Next.js + React Frontend Design Language
  → Template Indexing Skill
  → Template Library
```

本 Skill 只负责第一步：**页面视觉解析**。

它应输出：

```text
1. 页面是什么类型
2. 截图展示了什么区域
3. 页面由哪些可见区块组成
4. 每个区块的布局、元素、视觉权重和交互入口是什么
5. 页面使用了什么视觉风格信号
6. 哪些信息适合后续模板化存储
7. 哪些信息无法可靠判断
```

---

## 2. Codex 使用定位

### 2.1 运行环境假设

当 Codex 使用本 Skill 时，通常处于以下环境之一：

```text
1. 用户上传了截图文件，Codex 可在任务附件或工作目录中读取。
2. 仓库中存在 screenshots/、inputs/、assets/、template-sources/ 等目录。
3. 用户指定了截图路径，例如 screenshots/saas-home-desktop.png。
4. 用户要求把解析结果写入 templates/<template-id>/visual-parse.md。
5. 用户只要求输出 Markdown，不要求实际写入仓库。
```

### 2.2 Codex 执行要求

Codex 使用本 Skill 时必须：

1. 先定位输入截图文件。
2. 读取可选元数据，例如页面 URL、页面名称、行业、截图视口、采集日期。
3. 判断截图是否属于同一页面、同一模板、同一产品或不同页面。
4. 如果多个截图属于同一页面的不同视口或状态，应合并为一个页面视觉解析报告。
5. 如果多个截图属于不同页面，应为每个页面生成独立 Markdown 报告。
6. 输出文件应使用稳定命名，例如 `visual-parse.md` 或 `<template-id>-visual-parse.md`。
7. 写入后验证文件存在、非空，并包含必要章节。
8. 不要直接进入代码生成、组件规划或设计系统阶段。

### 2.3 如果 Codex 无法直接读取截图

如果当前 Codex 环境不支持图像理解，必须执行降级策略：

```text
1. 检查是否存在 OCR、截图描述、alt 描述、HTML 快照或人工备注。
2. 如果存在，基于这些文本做低置信度解析，并明确标注限制。
3. 如果完全没有可用视觉信息，不要编造页面结构，应请求补充截图描述或使用具备视觉能力的模型先生成页面观察结果。
```

禁止在无法看到截图且没有任何描述的情况下编造模板视觉解析。

---

## 3. 适用范围

适用于以下输入：

- 单个 Web 页面截图。
- 同一页面的 desktop / tablet / mobile 多视口截图。
- 同一页面的默认态 / hover 态 / 弹窗态 / 展开态截图。
- 多个待入库的 Web 页面截图。
- Landing Page、Dashboard、Pricing Page、Form、E-commerce、Docs、Portfolio、Auth、Settings、Table/List、Detail Page 等截图。
- 用于构建模板库的公开页面截图或内部设计截图。

适用于以下任务：

- 模板入库前视觉解析。
- 页面结构提取。
- 页面区域拆分。
- 视觉元素识别。
- 布局模式识别。
- 色彩、字体、间距、圆角、阴影等基础视觉信号提取。
- 可模板化区域初步识别。
- 为后续 Template IR、Design IR、Design System、Component Plan 准备输入。

---

## 4. 非适用范围

不要用本 Skill 处理以下任务：

- 直接生成 UI/UX 设计语言抽象。
- 直接生成 Design System Token。
- 直接规划 React 组件树。
- 直接生成 Next.js + React 代码。
- 直接进行模板匹配。
- 直接生成 Template Adaptation Plan。
- 直接生成多页系统蓝图。
- 直接进行视觉 QA 或代码验收。
- 直接评价页面好坏或提出重设计方案。
- 没有截图或等价视觉描述时编造页面内容。

如果用户的真实目标是代码生成，应将本 Skill 的输出交给后续代码生成 Skill，而不是在本 Skill 中完成。

---

## 5. 输入契约

### 5.1 必需输入

至少需要以下一种：

```text
1. Web 页面截图文件
2. 同一页面的多张截图文件
3. 等价的视觉描述，例如人工页面观察记录
```

### 5.2 推荐输入

推荐额外提供：

```text
- screenshot_id
- template_candidate_id
- page_name
- page_url
- capture_date
- viewport_width
- viewport_height
- device_type
- page_category_hint
- industry_hint
- source_notes
- output_path
```

### 5.3 推荐输入目录结构

```text
template-prep/
├── inputs/
│   ├── screenshots/
│   │   ├── saas-home-desktop.png
│   │   ├── saas-home-mobile.png
│   │   └── saas-home-modal.png
│   └── metadata.yaml
└── outputs/
    └── templates/
        └── saas-home-001/
            └── visual-parse.md
```

### 5.4 元数据示例

```yaml
screenshot_group_id: "saas-home-001"
page_name: "AI SaaS Landing Page"
page_url: "https://example.com"
page_type_hint: "landing"
industry_hint: "AI SaaS"
viewports:
  - file: "saas-home-desktop.png"
    device: "desktop"
    width: 1440
    height: 1200
  - file: "saas-home-mobile.png"
    device: "mobile"
    width: 390
    height: 1200
output_path: "outputs/templates/saas-home-001/visual-parse.md"
```

元数据不是必需，但有助于模板入库质量。

---

## 6. 输出契约

最终输出必须是 Markdown。

如果在 Codex 仓库环境中执行，优先将结果写入：

```text
outputs/templates/<template-id>/visual-parse.md
```

或用户指定路径。

如果用户未指定路径，建议使用：

```text
template-visual-parse.md
```

最终 Markdown 文档必须包含以下一级标题或二级标题：

```markdown
# Template Page Visual Parse Report

## 0. Capture Metadata
## 1. Screenshot Quality & Scope
## 2. Page Type Classification
## 3. Page Structure Overview
## 4. Section-by-Section Visual Parse
## 5. Layout System
## 6. Visible UI Elements
## 7. Color System Observations
## 8. Typography Observations
## 9. Spacing, Radius, Border & Shadow Observations
## 10. Visual Hierarchy & Attention Flow
## 11. Interaction Entry Points
## 12. Responsive Evidence
## 13. Template Readiness Notes
## 14. Uncertainties & Assumptions
## 15. Downstream Handoff Summary
```

不得使用 JSON 作为最终主格式。可以在 Markdown 中包含 YAML 代码块，用于后续机器读取。

---

## 7. 资源地图

如果项目中存在以下资源，应在执行前优先读取：

```text
references/
├── page-type-taxonomy.md               # 页面类型分类
├── screenshot-quality-rules.md         # 截图质量判断规则
├── visual-element-vocabulary.md        # UI 元素词表
├── layout-pattern-taxonomy.md          # 布局模式分类
├── visual-hierarchy-rules.md           # 视觉层级判断规则
├── template-readiness-rules.md         # 模板化适用性判断规则
├── codex-output-conventions.md         # Codex 文件输出约定
└── visual-parse-review-checklist.md    # 视觉解析自检清单

examples/
├── landing-page-visual-parse.md
├── dashboard-visual-parse.md
├── pricing-page-visual-parse.md
├── form-page-visual-parse.md
├── ecommerce-page-visual-parse.md
└── multi-viewport-visual-parse.md

scripts/
└── check-visual-parse.sh               # 可选：检查 Markdown 必要章节
```

如果资源不存在，应使用本 `SKILL.md` 中的流程与输出契约完成任务。

---

## 8. 核心原则

### 8.1 客观观察优先

先描述截图中可见事实，再做低层级推断。

正确：

```text
首屏采用居中大标题、主 CTA 和浅色背景；Hero 下方可见三列功能卡片。
```

错误：

```text
这是一个转化率很高的高级官网。
```

### 8.2 面向模板入库

本 Skill 的输出不是普通截图说明，而是模板库资产的第一层结构化描述。

必须关注：

```text
- 该页面适合成为哪类模板
- 哪些区域具有复用价值
- 哪些视觉信号需要保留
- 哪些内容明显是可替换业务内容
- 哪些信息无法从截图可靠判断
```

### 8.3 不提前做后续 Skill 的工作

本 Skill 可以记录颜色观察，但不要生成完整 Design Tokens。

本 Skill 可以识别 UI 元素，但不要规划 React 组件树。

本 Skill 可以识别交互入口，但不要设计完整交互流程。

本 Skill 可以说明模板化潜力，但不要做模板匹配或改造计划。

### 8.4 多截图合并必须谨慎

同一页面的多视口、多状态截图可以合并分析。

不同页面截图必须分开生成报告。

如果无法判断是否同一页面，应在输出中标注不确定，并避免强行合并。

### 8.5 不虚构不可见信息

看不到的内容不要发明。

无法确认的颜色、字体、尺寸、交互行为、动画和响应式行为必须标注为不确定。

---

## 9. Step 0：前置检查

在正式解析前，必须完成：

1. 定位截图文件或等价视觉输入。
2. 判断输入是一张截图、同一页面多截图，还是不同页面多截图。
3. 读取可选元数据，例如 URL、页面名称、视口尺寸、设备类型。
4. 判断截图质量：清晰度、完整度、裁切、遮挡、滚动位置、设备类型。
5. 判断页面是否包含浏览器 UI、浮层、弹窗、水印或调试面板。
6. 判断是否能可靠识别页面类型。
7. 确定输出路径。
8. 如果在 Codex 环境中执行，确认有写文件权限。
9. 如果无法读取截图，执行降级策略，不得编造。

未完成前置检查时，不要输出最终解析报告。

---

## 10. Step 1：截图质量与范围判断

必须输出截图质量判断。

检查项：

| 检查项 | 判断内容 |
|---|---|
| 清晰度 | 文字、图标、按钮、区域边界是否可辨认 |
| 完整度 | 是否展示完整页面、首屏、局部区域或滚动切片 |
| 视口 | desktop / tablet / mobile / unknown |
| 裁切 | 是否有关键区域被截断 |
| 遮挡 | 是否有弹窗、cookie banner、浏览器 UI、开发者工具、水印 |
| 状态 | 默认态、hover 态、展开态、弹窗态、登录态、错误态等 |
| 多截图关系 | 同页多视口、同页多状态、不同页面、不确定 |

输出示例：

```markdown
## 1. Screenshot Quality & Scope

| Item | Observation | Confidence |
|---|---|---|
| Clarity | Main text and UI elements are readable | High |
| Scope | Captures landing page above-the-fold and part of feature section | Medium |
| Viewport | Desktop | High |
```

---

## 11. Step 2：页面类型分类

根据截图内容判断页面类型。

页面类型候选：

```text
landing_page
homepage
pricing_page
dashboard
auth_page
form_page
docs_page
blog_page
portfolio_page
ecommerce_listing
ecommerce_detail
settings_page
table_list_page
detail_page
checkout_page
marketing_content_page
unknown
```

必须输出：

```text
- primary_page_type
- secondary_page_type_candidates
- confidence
- evidence
```

注意：页面类型是模板检索的重要字段，必须尽量准确。

---

## 12. Step 3：页面结构总览

从上到下提取页面区域。

常见区域：

```text
Top Banner
Header / Navbar
Hero
Logo Cloud
Feature Section
Card Grid
Pricing Section
Testimonial Section
Stats Section
CTA Section
Footer
Sidebar
Toolbar
Data Cards
Table
Form
Modal / Drawer
Toast / Alert
Pagination
```

输出表格：

```markdown
## 3. Page Structure Overview

| Order | Section | Position | Main Visible Content | Visual Weight | Template Reuse Potential |
|---|---|---|---|---|---|
| 1 | Header | Top | Logo, nav links, CTA | Medium | High |
| 2 | Hero | Above fold | Headline, subheadline, CTA, product visual | High | High |
```

---

## 13. Step 4：区域级视觉解析

每个主要区域必须独立解析。

每个区域至少包含：

```text
- section_name
- position
- visible_content
- layout_pattern
- alignment
- visual_weight
- visible_ui_elements
- interaction_entry_points
- style_observations
- template_notes
- uncertainties
```

输出格式：

```markdown
### 4.1 Hero Section

- Position: Above the fold
- Visible content:
  - Main headline
  - Supporting paragraph
  - Primary CTA
  - Secondary CTA
  - Product mockup
- Layout pattern: Centered / two-column / split hero / unknown
- Alignment: ...
- Visual weight: High
- Interaction entry points: ...
- Style observations: ...
- Template notes: ...
- Uncertainties: ...
```

---

## 14. Step 5：布局系统解析

必须识别页面使用的布局模式。

分析维度：

```text
- page_width_strategy
- container_strategy
- grid_or_column_pattern
- section_stacking
- alignment_system
- content_density
- whitespace_rhythm
- repeated_layout_patterns
- scroll_structure
```

常见布局模式：

```text
centered_single_column
split_hero
sidebar_content
dashboard_grid
card_grid
pricing_columns
form_panel
editorial_layout
table_with_toolbar
masonry_grid
full_bleed_sections
```

---

## 15. Step 6：可见 UI 元素清单

提取截图中可见 UI 元素。

输出表格：

```markdown
## 6. Visible UI Elements

| Element Type | Location | Count / Frequency | Visual Characteristics | Possible Purpose | Confidence |
|---|---|---|---|---|---|
| Button | Hero | 2 | Primary filled, secondary outline | CTA | High |
```

元素类型参考：

```text
Logo, NavLink, Button, Icon, Card, Badge, Tag, Avatar, Image, Illustration,
Input, Select, Checkbox, Radio, Toggle, Tabs, Breadcrumb, Table, Chart,
Sidebar, Modal, Drawer, Tooltip, Toast, Pagination, Search, Filter, Dropdown
```

---

## 16. Step 7：色彩观察

输出可见色彩系统观察。

不要伪造精确色值。

允许：

```text
- 近似 HEX
- 颜色角色
- 使用位置
- 置信度
```

输出表格：

```markdown
## 7. Color System Observations

| Color Role | Visual Description | Approx Value | Usage | Confidence |
|---|---|---|---|---|
| Background | Near white / warm white | approx #FFFFFF / #FAFAFA | Page background | Medium |
```

规则：

- 如果无法可靠判断 HEX，写 `unknown` 或 `approx`。
- 不要输出完整 token 系统。
- 只描述截图可见或高度可靠的信息。

---

## 17. Step 8：排版观察

分析文本层级，不猜测具体字体名。

必须覆盖：

```text
- Display / Hero title
- H1 / H2 / H3
- Body text
- Caption / Label
- Button text
- Navigation text
- Data label，如适用
```

输出表格：

```markdown
## 8. Typography Observations

| Text Role | Location | Perceived Size | Perceived Weight | Line-height / Tracking | Purpose | Confidence |
|---|---|---|---|---|---|---|
| Hero Title | Hero | Very large | Bold / Semibold | Tight | Primary attention | High |
```

规则：

- 不要声称识别具体字体，除非输入明确提供。
- 不要输出 Tailwind class。
- 不要输出完整 typography tokens。

---

## 18. Step 9：间距、圆角、边框与阴影观察

必须描述视觉系统的基础风格信号：

```text
- section_spacing
- container_padding
- element_gap
- card_padding
- button_radius
- card_radius
- input_radius
- border_style
- shadow_style
- divider_style
- visual_density
```

输出格式：

```markdown
## 9. Spacing, Radius, Border & Shadow Observations

- Section spacing: ...
- Container padding: ...
- Element gaps: ...
- Radius style: ...
- Shadow style: ...
- Border style: ...
- Visual density: ...
```

---

## 19. Step 10：视觉层级与注意力路径

必须分析用户第一眼看到什么，以及页面如何引导注意力。

输出：

```markdown
## 10. Visual Hierarchy & Attention Flow

- Primary visual focus: ...
- Secondary visual focus: ...
- Primary CTA or action cue: ...
- Supporting evidence: ...
- Attention path:
  1. ...
  2. ...
  3. ...
- Evidence: ...
```

注意：这里仍然是视觉层级观察，不要升级为完整 UX 策略。

---

## 20. Step 11：交互入口识别

识别可见或高度可靠的交互入口。

输出表格：

```markdown
## 11. Interaction Entry Points

| Entry Point | Location | Type | Likely Behavior | Evidence | Confidence |
|---|---|---|---|---|---|
| Primary CTA | Hero | Button / Link | Navigate or start signup | Filled button style | High |
```

不要设计新的交互，不要假设隐藏功能。

---

## 21. Step 12：响应式证据

如果有多视口截图，应比较差异。

如果只有单视口截图，只能输出推断并标注低置信度。

分析：

```text
- current_viewports
- observed_responsive_changes
- likely_mobile_behavior
- likely_desktop_behavior
- uncertain_responsive_points
```

输出表格：

```markdown
## 12. Responsive Evidence

| Viewport | Observed Layout | Notable Changes | Confidence |
|---|---|---|---|
| Desktop | Two-column hero | Full navigation visible | High |
| Mobile | Unknown | Likely stacked layout, but not visible | Low |
```

---

## 22. Step 13：模板化准备备注

这是模板准备阶段与普通截图解析的关键区别。

必须输出：

```text
- template_candidate_type
- reusable_layout_patterns
- reusable_visual_patterns
- replaceable_content_zones
- fixed_style_signals
- template_limitations
- recommended_next_skill_inputs
```

输出示例：

```markdown
## 13. Template Readiness Notes

- Template candidate type: SaaS landing page template
- High-value reusable patterns:
  - Hero with strong headline + CTA
  - Feature card grid
  - Logo cloud / trust section
- Replaceable content zones:
  - Headline and subheadline
  - CTA labels and links
  - Feature card titles and descriptions
  - Product mockup image
- Fixed style signals to preserve:
  - Low-noise background
  - High-contrast CTA
  - Generous section spacing
- Template limitations:
  - Only desktop screenshot available
  - No footer visible
```

注意：这里只做模板准备备注，不做模板匹配或改造计划。

---

## 23. Step 14：不确定项与假设

集中列出所有不确定信息。

输出表格：

```markdown
## 14. Uncertainties & Assumptions

| Item | Reason | Current Handling | Downstream Risk |
|---|---|---|---|
| Exact font family | Not reliably identifiable from screenshot | Describe text hierarchy only | Typography token may need confirmation |
```

---

## 24. Step 15：下游交付摘要

为后续 Skill 提供清晰摘要。

必须包含：

```text
- one_sentence_summary
- page_type
- viewport_summary
- main_sections
- layout_patterns
- visual_style_signals
- reusable_template_signals
- recommended_next_steps
```

允许包含 YAML 摘要：

```yaml
template_visual_parse:
  candidate_id: "..."
  page_type: "..."
  viewport_summary: "..."
  main_sections:
    - "..."
  layout_patterns:
    - "..."
  visible_elements:
    - "..."
  style_signals:
    colors: "..."
    typography: "..."
    spacing: "..."
    radius: "..."
    shadow: "..."
  template_readiness:
    reusable_patterns:
      - "..."
    replaceable_zones:
      - "..."
    limitations:
      - "..."
  uncertainties:
    - "..."
```

YAML 只作为 Markdown 内的机器可读摘要，不得取代完整 Markdown 报告。

---

## 25. Codex 文件输出流程

当在 Codex 环境中执行且需要写入文件时，按以下流程：

```text
1. 确认输入截图路径。
2. 确认或创建输出目录。
3. 生成 Markdown 报告内容。
4. 写入 visual-parse.md。
5. 验证文件存在。
6. 验证文件非空。
7. 验证必要章节存在。
8. 在最终回复中列出输出文件路径和未完成项。
```

推荐命令：

```bash
mkdir -p outputs/templates/<template-id>
# write outputs/templates/<template-id>/visual-parse.md
ls -lh outputs/templates/<template-id>/visual-parse.md
grep -E "^## (0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15)\." outputs/templates/<template-id>/visual-parse.md
```

不要声称文件已写入，除非确实完成写入和验证。

---

## 26. 验证标准

### 26.1 P0：必须通过

```text
[ ] 已确认存在截图或等价视觉输入
[ ] 已判断截图质量和范围
[ ] 已判断页面类型并给出依据
[ ] 已输出页面结构总览
[ ] 已输出区域级视觉解析
[ ] 已分析布局系统
[ ] 已列出可见 UI 元素
[ ] 已记录色彩、排版、间距、圆角、边框、阴影观察
[ ] 已分析视觉层级和注意力路径
[ ] 已识别交互入口
[ ] 已输出模板化准备备注
[ ] 已列出不确定项
[ ] 已输出下游交付摘要
[ ] 最终产物是 Markdown
[ ] 没有生成代码、Design Token 或 React 组件规划
```

### 26.2 P1：应该通过

```text
[ ] 多张同页截图已合并分析
[ ] 多张不同页面截图已拆分为多个报告
[ ] 每个重要判断都有可见证据
[ ] 模板复用潜力与限制已说明
[ ] 可替换内容区域已初步标注
[ ] 响应式证据和推断已区分
[ ] Markdown 文件路径和命名稳定
```

### 26.3 P2：加分项

```text
[ ] 输出了机器可读 YAML 摘要
[ ] 标注了模板候选类型和页面复杂度
[ ] 标注了适合后续索引的标签
[ ] 标注了截图采集问题和入库风险
[ ] 生成结果可直接交给 Template Indexing Skill
```

---

## 27. 硬性规则

- 不要在没有截图或等价视觉输入时编造页面解析。
- 不要生成代码。
- 不要生成完整 UI/UX 设计语言抽象。
- 不要生成 Design System Token。
- 不要规划 React 组件树。
- 不要做模板匹配。
- 不要生成模板改造计划。
- 不要做多页系统蓝图。
- 不要把单页截图强行解释为完整系统。
- 不要把多个不同页面截图合并成一个页面报告。
- 不要声称识别出精确字体，除非输入明确提供。
- 不要声称识别出精确 HEX，除非有可靠取色依据。
- 不要把推断写成事实。
- 不要省略不确定项。
- 不要只输出散文，必须使用结构化 Markdown。
- Codex 执行时，不要声称写入文件，除非文件已实际生成并验证。

---

## 28. 最终输出模板

使用本 Skill 时，最终报告必须使用以下 Markdown 结构：

````markdown
# Template Page Visual Parse Report

## 0. Capture Metadata

| Field | Value |
|---|---|
| Template Candidate ID | ... |
| Page Name | ... |
| Source URL | ... |
| Screenshot Files | ... |
| Capture Date | ... |
| Output File | ... |
| Parser Confidence | High / Medium / Low |

## 1. Screenshot Quality & Scope

| Item | Observation | Confidence |
|---|---|---|
| Clarity | ... | ... |
| Scope | ... | ... |
| Viewport | ... | ... |
| Cropping | ... | ... |
| Obstruction | ... | ... |
| Screenshot Relationship | ... | ... |

## 2. Page Type Classification

- Primary page type: ...
- Secondary candidates: ...
- Confidence: ...
- Evidence: ...

## 3. Page Structure Overview

| Order | Section | Position | Main Visible Content | Visual Weight | Template Reuse Potential |
|---|---|---|---|---|---|
| 1 | ... | ... | ... | ... | ... |

## 4. Section-by-Section Visual Parse

### 4.1 Section Name

- Position: ...
- Visible content:
  - ...
- Layout pattern: ...
- Alignment: ...
- Visual weight: ...
- Visible UI elements: ...
- Interaction entry points: ...
- Style observations: ...
- Template notes: ...
- Uncertainties: ...

## 5. Layout System

- Page width strategy: ...
- Container strategy: ...
- Grid / column pattern: ...
- Section stacking: ...
- Alignment system: ...
- Content density: ...
- Whitespace rhythm: ...
- Repeated layout patterns: ...
- Scroll structure: ...

## 6. Visible UI Elements

| Element Type | Location | Count / Frequency | Visual Characteristics | Possible Purpose | Confidence |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

## 7. Color System Observations

| Color Role | Visual Description | Approx Value | Usage | Confidence |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## 8. Typography Observations

| Text Role | Location | Perceived Size | Perceived Weight | Line-height / Tracking | Purpose | Confidence |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |

## 9. Spacing, Radius, Border & Shadow Observations

- Section spacing: ...
- Container padding: ...
- Element gaps: ...
- Card padding: ...
- Radius style: ...
- Shadow style: ...
- Border style: ...
- Visual density: ...

## 10. Visual Hierarchy & Attention Flow

- Primary visual focus: ...
- Secondary visual focus: ...
- Primary CTA or action cue: ...
- Supporting evidence: ...
- Attention path:
  1. ...
  2. ...
  3. ...
- Evidence: ...

## 11. Interaction Entry Points

| Entry Point | Location | Type | Likely Behavior | Evidence | Confidence |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

## 12. Responsive Evidence

| Viewport | Observed Layout | Notable Changes | Confidence |
|---|---|---|---|
| ... | ... | ... | ... |

## 13. Template Readiness Notes

- Template candidate type: ...
- High-value reusable patterns:
  - ...
- Replaceable content zones:
  - ...
- Fixed style signals to preserve:
  - ...
- Template limitations:
  - ...
- Recommended downstream use: ...

## 14. Uncertainties & Assumptions

| Item | Reason | Current Handling | Downstream Risk |
|---|---|---|---|
| ... | ... | ... | ... |

## 15. Downstream Handoff Summary

### 15.1 One-sentence Summary

...

### 15.2 Key Visual Facts

- ...

### 15.3 Template Indexing Signals

- Page type: ...
- Layout pattern: ...
- Visual density: ...
- Style signals: ...
- Reusable patterns: ...
- Limitations: ...

### 15.4 Machine-readable Summary

```yaml
template_visual_parse:
  candidate_id: "..."
  page_type: "..."
  viewport_summary: "..."
  main_sections:
    - "..."
  layout_patterns:
    - "..."
  visible_elements:
    - "..."
  style_signals:
    colors: "..."
    typography: "..."
    spacing: "..."
    radius: "..."
    shadow: "..."
  template_readiness:
    reusable_patterns:
      - "..."
    replaceable_zones:
      - "..."
    limitations:
      - "..."
  uncertainties:
    - "..."
```
````

---

## 29. Codex 最终回复格式

当 Codex 执行该 Skill 并写入文件后，最终回复应简洁说明：

```markdown
已完成模板准备阶段页面视觉解析。

输出文件：
- `outputs/templates/<template-id>/visual-parse.md`

已验证：
- 文件存在：是 / 否
- 文件非空：是 / 否
- 必要章节完整：是 / 否

限制与不确定项：
- ...
```

如果未能写入文件，应说明原因并直接返回 Markdown 报告内容。

---

## 30. 执行时的最终提醒

```text
你不是在生成前端代码。
你不是在做设计系统。
你不是在做模板匹配。
你不是在规划多页系统。
你是在把页面截图转成可入库、可检索、可复用的 Markdown 视觉解析资产。
```
