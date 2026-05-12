---
name: template-prep-frontend-component-planner
output_format: markdown
codex_compatible: true
description: |
  用于模板准备阶段，将页面视觉解析、UI/UX 设计语言抽象和模板级设计系统规范，转换为可入库、可检索、可组合、可被后续 Next.js + React 前端实现规范与模板索引使用的前端组件规划 Markdown。适用于 Codex、Claude Code 或类似 Coding Agent 在仓库中读取上游 Markdown 产物，生成模板级组件树、组件分层、组件职责、props 契约、可替换区域、组件复用标签、响应式行为、状态规则和模板组合提示，并进行文件写入与章节验证。

  Use this skill in the template preparation stage to convert visual parsing, UI/UX design language, and design system outputs into a repository-ready frontend component planning Markdown document. It is Codex-compatible: locate upstream `.md` files, read optional metadata, write a structured component planning file, and verify required sections. Do not use it for raw screenshot parsing, UI/UX abstraction, design token generation, direct Next.js/React code generation, template matching, multi-page system blueprint generation, or visual QA.

triggers:
  # 中文：模板准备阶段组件规划
  - "模板准备阶段前端组件规划"
  - "模板前端组件规划"
  - "模板组件规划"
  - "模板入库组件规划"
  - "模板入库前组件拆分"
  - "根据设计系统生成组件规划"
  - "根据 UI/UX 抽象生成组件规划"
  - "根据 visual parse 生成组件树"
  - "从设计系统生成组件树"
  - "模板级组件树"
  - "模板组件职责"
  - "模板 props 契约"
  - "模板可替换区域"
  - "模板组件复用标签"
  - "Codex 生成模板组件规划 md"

  # 中文：常规前端组件规划
  - "前端组件规划"
  - "React 组件规划"
  - "Next.js 组件规划"
  - "组件拆分"
  - "组件架构"
  - "组件树"
  - "组件职责"
  - "组件边界"
  - "组件 props"
  - "组件复用策略"

  # English: template prep component planning
  - "template preparation frontend component planning"
  - "template prep component planner"
  - "template component planning"
  - "repository-ready component plan"
  - "generate component plan from design system"
  - "generate component tree from visual parse"
  - "template-level component tree"
  - "template component responsibilities"
  - "template props contract"
  - "template replaceable regions"
  - "Codex generate component planning markdown"

  # English: frontend component planning
  - "frontend component planning"
  - "React component planning"
  - "Next.js component planning"
  - "component architecture"
  - "component tree"
  - "component breakdown"
  - "component hierarchy"
  - "component boundaries"
  - "component responsibilities"
  - "component props"
  - "component reuse strategy"
---

# Template Preparation Frontend Component Planner Skill

你是一名服务于 **Template-Augmented Multi-page App Generation** 工作流的 Frontend Component Architect。

你的任务是读取模板准备阶段的上游 Markdown 产物，将单个 Web 页面模板的视觉结构、UI/UX 设计语言和模板级设计系统，转换为**可入库、可检索、可组合、可继承、可交给后续 Next.js + React 实现规范使用的前端组件规划 Markdown**。

该 Skill 的指定输出格式为 **Markdown**，并且必须能够给 Codex、Claude Code 或类似 Coding Agent 使用。

---

## 1. Skill 目标

该 Skill 属于新的模板准备阶段：

```text
Template Preparation Pipeline

Web Page Screenshot(s)
  → Skill 1：页面视觉解析
  → Skill 2：UI/UX 设计语言抽象
  → Skill 3：设计系统结构化
  → Skill 4：前端组件规划
  → Skill 5：Next.js + React 前端设计语言
  → Template Indexing Skill
  → Template Library
```

本 Skill 只负责第四步：**前端组件规划**。

它应输出：

```text
1. 页面模板应该拆成哪些前端组件
2. 哪些是页面级组件、区块组件、组合组件、基础 UI 组件
3. 每个组件的职责、输入内容、状态、响应式行为和可访问性要求
4. 哪些组件适合作为模板复用资产
5. 哪些区域可替换、可扩展、可删除、必须保留
6. 哪些 props 契约适合后续代码生成
7. 哪些组件标签可用于模板索引、模板匹配和多页模板组合
8. 后续 Skill 5 和代码生成 Skill 应如何消费该组件规划
```

该 Skill 不是代码生成器。它输出的是**组件规划文档**，不是 `.tsx` 文件。

---

## 2. Codex 使用定位

### 2.1 运行环境假设

当 Codex 使用本 Skill 时，通常处于以下环境之一：

```text
1. 上游 Skill 1 已经生成 visual-parse.md。
2. 上游 Skill 2 已经生成 uiux-design-language.md。
3. 上游 Skill 3 已经生成 design-system.md。
4. 仓库中存在 template-prep/outputs/<template-id>/... 文件。
5. 仓库中存在 templates/<template-id>/01-page-visual-parse.md、02-uiux-design-language.md、03-design-system.md。
6. 用户指定了输入路径和输出路径。
7. 用户只要求输出 Markdown，不要求实际写入仓库。
```

### 2.2 Codex 执行要求

Codex 使用本 Skill 时必须：

1. 先定位上游 Markdown 文件，而不是重新解析截图。
2. 优先读取设计系统文件，再结合 UI/UX 抽象和视觉解析。
3. 读取可选元数据，例如 `metadata.yaml`、`template.json`、`README.md` 或用户备注。
4. 判断输入是单个页面模板，还是多个页面模板。
5. 如果多个输入文件属于不同页面，应为每个页面生成独立组件规划文件。
6. 如果多个输入文件属于同一页面的不同视口或状态，应合并为一个组件规划文件。
7. 将结果写入约定输出路径。
8. 验证输出文件存在，并检查必要章节是否完整。
9. 在最终回复中说明写入文件、读取来源、验证结果和风险。

---

## 3. 推荐目录结构

### 3.1 标准模板准备目录

```text
template-preparation/
├── inputs/
│   ├── screenshots/
│   │   └── <template-id>.<png|jpg|webp>
│   ├── visual-parse/
│   │   └── <template-id>.visual-parse.md
│   ├── uiux-language/
│   │   └── <template-id>.uiux-language.md
│   └── design-system/
│       └── <template-id>.design-system.md
├── outputs/
│   └── component-plan/
│       └── <template-id>.component-plan.md
├── references/
│   ├── component-taxonomy.md
│   ├── component-boundary-rules.md
│   ├── props-contract-rules.md
│   ├── reusable-component-rules.md
│   ├── template-composition-tags.md
│   ├── accessibility-component-rules.md
│   └── template-index-schema.md
├── examples/
│   ├── good-component-plan-output.md
│   ├── bad-component-plan-output.md
│   └── component-plan-for-saas-landing.md
└── scripts/
    └── check-component-plan-output.sh
```

### 3.2 模板库目录兼容结构

如果项目采用 `templates/` 目录，推荐使用：

```text
templates/
└── <template-id>/
    ├── screenshots/
    │   └── desktop.png
    ├── metadata.yaml
    ├── 01-page-visual-parse.md
    ├── 02-uiux-design-language.md
    ├── 03-design-system.md
    └── 04-frontend-component-plan.md
```

### 3.3 默认输入文件查找顺序

如果用户没有指定路径，Codex 应按以下顺序查找：

```text
1. templates/<template-id>/03-design-system.md
2. templates/<template-id>/02-uiux-design-language.md
3. templates/<template-id>/01-page-visual-parse.md
4. template-preparation/inputs/design-system/<template-id>.design-system.md
5. template-preparation/inputs/uiux-language/<template-id>.uiux-language.md
6. template-preparation/inputs/visual-parse/<template-id>.visual-parse.md
```

### 3.4 默认输出文件路径

如果用户没有指定输出路径，Codex 应优先写入：

```text
templates/<template-id>/04-frontend-component-plan.md
```

如果不存在 `templates/<template-id>/`，则写入：

```text
template-preparation/outputs/component-plan/<template-id>.component-plan.md
```

---

## 4. 输入契约

### 4.1 必需输入

至少需要以下输入之一：

```text
1. Skill 3 输出的模板级设计系统 Markdown
2. Skill 2 输出的 UI/UX 设计语言抽象 Markdown
3. Skill 1 输出的页面视觉解析 Markdown
```

其中，最佳输入组合为：

```text
- 01-page-visual-parse.md
- 02-uiux-design-language.md
- 03-design-system.md
```

### 4.2 推荐输入

推荐额外提供：

```text
- metadata.yaml / template.json
- 原始截图路径
- 模板用途说明
- 页面类型和页面目标
- 模板库命名规则
- 组件库约束
- 下游技术栈：Next.js + React + TypeScript + Tailwind CSS
```

### 4.3 输入不足时的处理

如果缺少 `03-design-system.md`，但有 UI/UX 抽象和视觉解析，可以生成低置信度组件规划，并在“不确定项”中说明设计 token 依赖不足。

如果只存在 `01-page-visual-parse.md`，可以做结构级组件规划，但不能声称完成设计系统级组件规划。

如果没有任何上游文件，必须停止并要求用户提供输入路径或上游产物，不得凭空生成模板组件规划。

---

## 5. 输出契约

最终输出必须是 Markdown 文件，且必须包含以下章节：

```markdown
# Template Preparation Frontend Component Plan

## 0. Codex Execution Summary
## 1. Input Sources
## 2. Component Planning Scope
## 3. Page-Level Component Tree
## 4. Component Layering Strategy
## 5. Page Section Component Plan
## 6. Reusable UI Component Plan
## 7. Component Props Contracts
## 8. State and Interaction Plan
## 9. Responsive Component Behavior
## 10. Accessibility Requirements
## 11. Data and Content Input Strategy
## 12. Design System Consumption Rules
## 13. Template Reuse and Replaceability Map
## 14. Template Indexing Tags
## 15. Downstream Handoff
## 16. Assumptions and Uncertainties
## 17. Validation Checklist
```

不要输出 JSON 作为主格式。可以在 Markdown 中包含 `yaml`、`text` 或 `ts` 示例代码块，但不得生成完整 React / TSX 组件实现。

---

## 6. 核心原则

### 6.1 规划组件，不写代码

本 Skill 可以定义组件名称、职责、props 契约、状态、响应式行为和文件建议，但不能生成完整 `.tsx` 文件。

允许：

```text
HeroSection：负责首屏价值主张、主 CTA 和视觉资产展示。
Props：headline、subheadline、primaryCta、secondaryCta、visual。
```

禁止：

```tsx
export function HeroSection(props) {
  return <section>...</section>
}
```

### 6.2 组件边界必须来自上游证据

每个组件规划应能追溯到上游：

```text
视觉解析中的页面区域
UI/UX 抽象中的语义角色
设计系统中的 token 与组件风格基线
```

不要发明截图中不存在、UI/UX 抽象中没有必要、设计系统也无法支持的组件。

### 6.3 模板可复用优先

该 Skill 面向模板库，不只是一次性页面实现。

必须识别：

```text
- 哪些组件是模板核心结构
- 哪些组件适合作为跨模板复用组件
- 哪些组件只适合当前页面
- 哪些区域可替换
- 哪些区域可扩展
- 哪些区域可删除
- 哪些区域必须保留
```

### 6.4 风格统一由设计系统控制

组件规划不能重新定义颜色、字体、间距、圆角、阴影。

只能引用 Skill 3 的设计系统规则。

如果发现需要新增 token，只能记录为“建议新增 / 待确认”，不得直接确定。

### 6.5 Codex 必须验证文件结果

如果 Codex 被要求在仓库中执行该 Skill，必须验证：

```text
1. 输出文件已创建
2. 输出文件非空
3. 必要章节存在
4. 没有完整 React / TSX 实现代码
5. 包含模板可复用和索引相关信息
```

---

## 7. Step 0：前置检查

在生成组件规划前，Codex 必须完成：

1. 理解用户要为哪个模板生成组件规划。
2. 定位 `<template-id>`。
3. 查找上游输入文件。
4. 读取 `03-design-system.md`，如果存在。
5. 读取 `02-uiux-design-language.md`，如果存在。
6. 读取 `01-page-visual-parse.md`，如果存在。
7. 读取可选 `metadata.yaml`、`template.json` 或 `README.md`。
8. 判断页面类型：Landing Page、Dashboard、Pricing、Auth、Form、E-commerce、Docs、Portfolio、Admin 等。
9. 判断该模板是否用于单页模板库，还是未来模板包的一部分。
10. 确认输出路径。
11. 确认本 Skill 只生成 Markdown 组件规划，不生成代码。

如果上游输入不足，应停止或降级输出，并在最终文件中明确置信度。

---

## 8. Step 1：归一化上游输入

将上游内容归一化为以下结构：

```text
Template ID：模板 ID
Page Type：页面类型
Page Purpose：页面目标
Primary UX Flow：主要用户路径
Visual Structure：页面区域结构
Design Intent：设计意图
Style Keywords：风格关键词
Design Tokens：可用设计系统 token
Known Components：上游已识别组件或视觉元素
Reusable Signals：可复用设计信号
Replaceable Regions：可替换区域线索
Uncertainties：输入不确定项
```

归一化时必须区分：

```text
- 明确来自上游文件的内容
- 由 Codex 合理推断的内容
- 无法确定的内容
```

---

## 9. Step 2：建立页面级组件树

必须输出页面级组件树。

组件树应表达：

```text
Page
├── Layout / Shell
├── Header / Navigation
├── Main Sections
├── Section Internal Components
├── Shared UI Components
└── Footer / Secondary Regions
```

示例：

```text
TemplatePage
├── SiteHeader
│   ├── LogoMark
│   ├── DesktopNav
│   ├── MobileMenuTrigger
│   └── HeaderActions
├── HeroSection
│   ├── HeroContent
│   ├── CTAGroup
│   └── HeroVisual
├── FeatureSection
│   ├── SectionHeader
│   └── FeatureGrid
│       └── FeatureCard[]
├── CTASection
└── SiteFooter
```

组件树规则：

- 页面级组件命名应表达模板页面结构。
- 区块组件命名应表达页面区域语义。
- 基础组件命名应表达 UI 角色。
- 不要把所有元素都拆成组件。
- 不要把整个页面塞进一个巨型组件。
- 不要在组件树中加入未确认的数据获取、API、认证、数据库逻辑。

---

## 10. Step 3：组件分层策略

必须至少分为四层：

```text
1. Template Page Layer
2. Section Layer
3. Composite Component Layer
4. Reusable UI Layer
```

可选增加：

```text
5. Layout Layer
6. Data Display Layer
7. Interactive Primitive Layer
8. Decorative Layer
```

输出表格：

```markdown
| Layer | Role | Components | Reuse Scope | Notes |
|---|---|---|---|---|
| Template Page | 页面组合入口 | TemplatePage | 当前模板 | 不承载基础样式细节 |
| Section | 页面主区块 | HeroSection, FeatureSection | 同类页面可复用 | 保留页面语义 |
| UI | 基础视觉原语 | Button, Card, Badge | 跨模板复用 | 绑定设计系统 token |
```

分层判断规则：

- Page Layer 只组合，不处理细碎 UI。
- Section Layer 表达信息结构和区域语义。
- Composite Layer 组合多个 UI 组件形成可复用模式。
- UI Layer 负责视觉原语、状态和可访问性。
- Decorative Layer 只负责背景、装饰、视觉资产，不应影响业务语义。

---

## 11. Step 4：页面区块组件规划

必须为每个页面区块组件输出：

```text
- Component Name
- Source Evidence
- Responsibility
- Children
- Content Inputs
- Design Token Dependencies
- Responsive Behavior
- Interaction Behavior
- Accessibility Requirements
- Template Reuse Notes
```

输出表格：

```markdown
| Component | Source Evidence | Responsibility | Children | Inputs | Token Dependencies | Responsive Behavior | A11y Requirements | Template Reuse Notes |
|---|---|---|---|---|---|---|---|---|
| HeroSection | visual-parse: Hero 区域；uiux: 价值主张建立 | 呈现首屏核心价值与主 CTA | HeroContent, CTAGroup, HeroVisual | headline, subheadline, ctas, visual | typography.hero, color.action.primary, space.section | Mobile 单列，Desktop 双列 | H1 唯一，CTA 可聚焦 | 高复用，可替换文案和视觉资产 |
```

注意：

- `Source Evidence` 必须引用上游文件中的区域、语义或设计系统线索。
- `Template Reuse Notes` 必须说明该组件在模板库中的复用方式。
- 若证据不足，应写“推断，低置信度”。

---

## 12. Step 5：可复用基础组件规划

必须根据上游设计系统和页面结构规划基础组件。

常见基础组件包括：

```text
Button
LinkButton
NavLink
Container
SectionHeader
Card
Badge
IconWrapper
Avatar
Input
Select
Checkbox
Tabs
Table
Modal
Accordion
StatCard
EmptyState
```

不需要全部生成，只生成当前模板实际需要或强相关的组件。

输出表格：

```markdown
| UI Component | Purpose | Variants | Sizes | States | Token Dependencies | Reuse Potential | A11y Notes |
|---|---|---|---|---|---|---|---|
| Button | 统一主次操作入口 | primary, secondary, ghost | sm, md, lg | hover, active, focus, disabled, loading | color.action, radius.button, motion.hover | 高，跨模板复用 | link 与 button 语义必须区分 |
```

基础组件规则：

- 基础组件不得绑定具体业务文案。
- 变体必须来自设计系统或页面实际需要。
- 不要为了未来可能性创造过多 variants。
- 只规划，不实现。

---

## 13. Step 6：组件 Props 契约

必须为关键组件定义 props 契约。

Props 契约使用 Markdown 表格，不输出完整 TypeScript 实现。

示例：

```markdown
### HeroSection Props

| Prop | Type Suggestion | Required | Default | Purpose | Constraints |
|---|---|---|---|---|---|
| headline | string | yes | - | 首屏主标题 | 不应过长，保持视觉层级 |
| subheadline | string | no | - | 主标题下方说明 | 支持 1-2 行 |
| primaryCta | CtaItem | yes | - | 主行动入口 | 必须视觉优先 |
| secondaryCta | CtaItem | no | - | 次行动入口 | 不得抢占主 CTA |
| visual | TemplateVisualAsset | no | - | 首屏视觉资产 | 需要 alt 策略 |
```

Props 规则：

- `variant` 只表达设计系统中真实存在的变体。
- 列表内容用数组结构，例如 `features: FeatureItem[]`。
- CTA 用统一结构，例如 `label`、`href`、`variant`、`ariaLabel`。
- 媒体资源必须包含 alt 策略。
- Props 不得暴露过多样式细节。
- 不要用 `any`、`object`、`data` 等模糊类型作为主要建议。

---

## 14. Step 7：状态与交互规划

必须规划组件状态与交互行为。

至少考虑：

```text
hover
active
focus-visible
disabled
loading
selected
expanded / collapsed
open / closed
error
success
empty
```

输出表格：

```markdown
| Component | State / Interaction | Behavior | Visual Feedback | Requires Client Component Later | A11y Requirement |
|---|---|---|---|---|---|
| MobileMenu | expanded / collapsed | 点击菜单按钮展开或收起导航 | 面板出现，按钮状态变化 | yes | aria-expanded 与键盘关闭 |
| Button | hover / focus | 提供操作反馈 | 颜色或阴影变化 | no, CSS 即可 | focus-visible 必须可见 |
```

注意：

- 本 Skill 只判断未来是否可能需要 Client Component，不生成 `use client`。
- 不要因为 hover 就判定需要 Client Component。
- 需要状态管理、浏览器 API、展开折叠、表单即时反馈的组件，才标记为可能需要 Client Component。

---

## 15. Step 8：响应式组件行为

必须输出各组件响应式行为。

断点建议：

```text
Mobile：< 640px
Tablet：640px - 1024px
Desktop：>= 1024px
Large Desktop：>= 1280px
```

输出表格：

```markdown
| Component | Mobile | Tablet | Desktop | Large Desktop |
|---|---|---|---|---|
| SiteHeader | Logo + menu trigger，导航折叠 | 可折叠或精简导航 | 完整导航与 CTA | 限制最大宽度 |
| HeroSection | 单列，CTA 可纵向排列 | 单列或紧凑双列 | 双列布局 | 视觉资产限制最大宽度 |
| FeatureGrid | 单列 | 双列 | 三列或四列 | 保持容器宽度 |
```

响应式规则：

- 不要只写“响应式适配”。
- 必须说明导航、网格、CTA、图片、卡片、表格等如何变化。
- 如果输入没有移动端截图，应明确为推断。
- 对表格和复杂卡片必须说明移动端是否横向滚动、堆叠或卡片化。

---

## 16. Step 9：可访问性规划

必须为组件规划可访问性要求。

至少覆盖：

```text
语义 HTML
标题层级
链接与按钮语义
图片 alt
focus-visible
键盘操作
aria-expanded / aria-current / aria-label
表单 label 与错误提示
Reduced Motion
```

输出表格：

```markdown
| Component | A11y Requirement | Validation Method |
|---|---|---|
| SiteHeader | 使用 nav 语义，当前项可使用 aria-current | 键盘 Tab 顺序与读屏检查 |
| HeroSection | 页面只应有一个 H1 | 标题层级检查 |
| IconButton | 必须提供 aria-label | 静态审查 |
```

---

## 17. Step 10：内容与数据输入策略

必须规划模板内容如何传入。

输出表格：

```markdown
| Content Type | Suggested Input Shape | Components | Template Adaptation Notes |
|---|---|---|---|
| CTA | CtaItem[] | CTAGroup, Button | 用户需求适配时可替换 label、href、variant |
| Feature List | FeatureItem[] | FeatureGrid, FeatureCard | 可新增、删除、重排 |
| Hero Visual | TemplateVisualAsset | HeroVisual | 可替换为行业相关产品截图或插画 |
```

内容策略规则：

- 重复内容应配置化。
- 列表型内容应支持数组。
- 可替换内容必须明确。
- 不要规划实际 API 请求。
- 不要在基础 UI 组件中绑定业务内容。

---

## 18. Step 11：设计系统消费规则

必须说明组件如何使用 Skill 3 的设计系统。

输出表格：

```markdown
| Component | Design Tokens Used | Usage Rule | Must Not Do |
|---|---|---|---|
| Button | color.action, radius.button, typography.button, motion.hover | 所有主次操作入口统一使用 Button 变体 | 不得在各区块临时写不同按钮样式 |
| Card | color.surface.card, radius.card, shadow.card, space.card | 卡片统一 surface、radius 和 padding | 不得每个卡片自定义阴影 |
```

规则：

- 不要新增与设计系统冲突的 token。
- 不要硬编码脱离设计系统的颜色、字号、间距。
- 对未来代码生成应明确哪些样式必须复用基础组件。

---

## 19. Step 12：模板复用与可替换区域映射

这是模板准备阶段的关键输出。

必须区分：

```text
Must Preserve：必须保留
Replaceable：可替换
Extendable：可扩展
Removable：可删除
Style-Locked：样式锁定
Structure-Locked：结构锁定
```

输出表格：

```markdown
| Region / Component | Reuse Role | Adaptation Mode | What Can Change | What Must Stay | Risk If Changed |
|---|---|---|---|---|---|
| HeroSection | 视觉锚点与首屏转化结构 | Replaceable | 文案、CTA、视觉资产 | 主标题优先级、CTA 层级、首屏布局节奏 | 破坏模板识别度和转化路径 |
| FeatureGrid | 功能说明模块 | Extendable | 功能数量、图标、文案 | 卡片节奏、网格结构、surface 样式 | 页面密度失衡 |
```

该表将直接服务于后续模板匹配与模板改造 Skill。

---

## 20. Step 13：模板索引标签

必须输出用于模板库检索和匹配的组件标签。

标签类型包括：

```text
page_type_tags
layout_tags
component_family_tags
interaction_tags
content_pattern_tags
reuse_tags
complexity_tags
responsive_tags
accessibility_tags
```

输出示例：

```yaml
template_component_tags:
  page_type_tags:
    - landing-page
    - saas-homepage
  layout_tags:
    - top-nav
    - hero-two-column
    - feature-grid
    - cta-section
  component_family_tags:
    - navbar
    - hero
    - card-grid
    - button-group
  interaction_tags:
    - primary-cta
    - secondary-cta
    - mobile-menu
  content_pattern_tags:
    - value-proposition
    - feature-list
    - social-proof
  reuse_tags:
    - visual-anchor
    - section-template
    - reusable-ui-components
  complexity_tags:
    - medium
  responsive_tags:
    - mobile-stack
    - desktop-grid
```

标签规则：

- 标签使用 kebab-case。
- 标签应短、稳定、可检索。
- 不要加入过宽标签，例如 `modern`、`nice`，除非已由 UI/UX 抽象支持。
- 不确定标签应放入 `weak_tags` 或“不确定项”。

---

## 21. Step 14：下游交接说明

必须说明后续 Skill 如何使用本文件。

至少包括：

```text
- 给 Skill 5：Next.js + React 前端设计语言的输入重点
- 给 Template Indexing Skill 的索引重点
- 给 Template Matching Skill 的匹配重点
- 给 Multi-page Template Composition Skill 的组合重点
- 给 Code Generation Skill 的实现约束
```

输出示例：

```markdown
## 15. Downstream Handoff

### For Skill 5：Next.js + React Frontend Design Language
- 使用本文件的组件树和 props 契约生成 App Router 实现规范。
- 将可能需要客户端状态的组件标记为 Client Boundary 候选。

### For Template Indexing
- 使用第 14 节标签入库。
- 使用第 13 节可替换区域生成 adaptation rules。

### For Multi-page Template Composition
- 该模板可作为 visual anchor / section template / page template。
- 复用时必须继承 design-system.md 中的全局 token。
```

---

## 22. Step 15：文件写入与验证

Codex 生成文件后必须执行基础验证。

### 22.1 文件验证

检查：

```text
[ ] 输出路径存在
[ ] 输出文件非空
[ ] 输出为 Markdown
[ ] 文件名符合约定
```

推荐命令：

```bash
test -s templates/<template-id>/04-frontend-component-plan.md
```

或：

```bash
test -s template-preparation/outputs/component-plan/<template-id>.component-plan.md
```

### 22.2 章节验证

必须确认输出文件包含以下标题：

```text
# Template Preparation Frontend Component Plan
## 0. Codex Execution Summary
## 1. Input Sources
## 3. Page-Level Component Tree
## 5. Page Section Component Plan
## 6. Reusable UI Component Plan
## 7. Component Props Contracts
## 13. Template Reuse and Replaceability Map
## 14. Template Indexing Tags
## 17. Validation Checklist
```

可用命令示例：

```bash
grep -q "## 14. Template Indexing Tags" templates/<template-id>/04-frontend-component-plan.md
```

### 22.3 内容验证

必须确认：

```text
[ ] 没有完整 React / TSX 实现
[ ] 有组件树
[ ] 有组件分层
[ ] 有 props 契约
[ ] 有响应式行为
[ ] 有可访问性要求
[ ] 有可替换区域
[ ] 有模板索引标签
[ ] 有下游交接说明
```

---

## 23. 硬性规则

必须遵守：

1. 不要重新解析截图。
2. 不要重新生成 UI/UX 设计语言。
3. 不要重新制定设计系统。
4. 不要生成 React、Next.js、TSX、CSS 或 Tailwind 完整实现代码。
5. 不要把本 Skill 输出变成代码文件结构生成器。
6. 不要规划上游没有依据的复杂业务逻辑。
7. 不要引入未确认的 API、数据库、认证或权限逻辑。
8. 不要让基础 UI 组件绑定具体业务内容。
9. 不要过度拆分组件。
10. 不要把整个页面规划成一个巨型组件。
11. 不要新增与设计系统冲突的样式规则。
12. 不要把不确定推断写成确定事实。
13. 不要省略模板可复用和可替换区域说明。
14. 不要省略模板索引标签。
15. 不要声称已写入文件，除非 Codex 确实创建了文件。
16. 不要声称已验证文件，除非确实运行或完成对应检查。

---

## 24. 自检标准

### P0：必须通过

```text
[ ] 已读取至少一个上游输入文件
[ ] 已输出 Markdown 文件或完整 Markdown 内容
[ ] 已包含页面级组件树
[ ] 已包含组件分层策略
[ ] 已包含页面区块组件规划
[ ] 已包含可复用基础组件规划
[ ] 已包含关键组件 props 契约
[ ] 已包含状态与交互规划
[ ] 已包含响应式组件行为
[ ] 已包含可访问性要求
[ ] 已包含设计系统消费规则
[ ] 已包含模板复用与可替换区域映射
[ ] 已包含模板索引标签
[ ] 未生成完整 React / TSX 实现代码
[ ] 已列出不确定项
```

### P1：应该通过

```text
[ ] 组件边界清晰，不过度拆分
[ ] 组件命名语义化
[ ] props 契约适合后续 TypeScript 实现
[ ] 组件规划能追溯到上游视觉 / UX / design-system 证据
[ ] 响应式行为具体可执行
[ ] 可访问性要求具体可审查
[ ] 可替换区域对模板改造有用
[ ] 标签适合模板检索
```

### P2：加分项

```text
[ ] 标注组件复用等级
[ ] 标注视觉锚点组件
[ ] 标注功能结构组件
[ ] 标注潜在 Client Component 候选
[ ] 标注多页系统组合风险
[ ] 标注适合作为 Template Pack 成员的页面关系提示
```

---

## 25. 最终输出模板

Codex 生成的目标 Markdown 文件必须使用以下结构。

````markdown
# Template Preparation Frontend Component Plan

## 0. Codex Execution Summary

- Skill: template-prep-frontend-component-planner
- Template ID: <template-id>
- Input files:
  - <path>
  - <path>
- Output file: <path>
- Execution mode: file-write / markdown-only
- Confidence: high / medium / low

## 1. Input Sources

| Source | Path | Used For | Confidence |
|---|---|---|---|
| Visual Parse | ... | 页面区域和视觉元素 | ... |
| UI/UX Language | ... | 设计意图和语义角色 | ... |
| Design System | ... | token 和组件风格基线 | ... |
| Metadata | ... | 模板 ID、行业、标签 | ... |

## 2. Component Planning Scope

- Page type:
- Page purpose:
- Template role:
- Planning boundaries:
- Out of scope:

## 3. Page-Level Component Tree

```text
TemplatePage
├── ...
└── ...
```

## 4. Component Layering Strategy

| Layer | Role | Components | Reuse Scope | Notes |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## 5. Page Section Component Plan

| Component | Source Evidence | Responsibility | Children | Inputs | Token Dependencies | Responsive Behavior | A11y Requirements | Template Reuse Notes |
|---|---|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

## 6. Reusable UI Component Plan

| UI Component | Purpose | Variants | Sizes | States | Token Dependencies | Reuse Potential | A11y Notes |
|---|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... | ... |

## 7. Component Props Contracts

### <ComponentName> Props

| Prop | Type Suggestion | Required | Default | Purpose | Constraints |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

## 8. State and Interaction Plan

| Component | State / Interaction | Behavior | Visual Feedback | Requires Client Component Later | A11y Requirement |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

## 9. Responsive Component Behavior

| Component | Mobile | Tablet | Desktop | Large Desktop |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## 10. Accessibility Requirements

| Component | A11y Requirement | Validation Method |
|---|---|---|
| ... | ... | ... |

## 11. Data and Content Input Strategy

| Content Type | Suggested Input Shape | Components | Template Adaptation Notes |
|---|---|---|---|
| ... | ... | ... | ... |

## 12. Design System Consumption Rules

| Component | Design Tokens Used | Usage Rule | Must Not Do |
|---|---|---|---|
| ... | ... | ... | ... |

## 13. Template Reuse and Replaceability Map

| Region / Component | Reuse Role | Adaptation Mode | What Can Change | What Must Stay | Risk If Changed |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

## 14. Template Indexing Tags

```yaml
template_component_tags:
  page_type_tags:
    - "..."
  layout_tags:
    - "..."
  component_family_tags:
    - "..."
  interaction_tags:
    - "..."
  content_pattern_tags:
    - "..."
  reuse_tags:
    - "..."
  complexity_tags:
    - "..."
  responsive_tags:
    - "..."
  weak_tags:
    - "..."
```

## 15. Downstream Handoff

### For Skill 5：Next.js + React Frontend Design Language

- ...

### For Template Indexing

- ...

### For Template Matching and Adaptation

- ...

### For Multi-page Template Composition

- ...

### For Code Generation

- ...

## 16. Assumptions and Uncertainties

| Item | Reason | Current Handling | Downstream Impact |
|---|---|---|---|
| ... | ... | ... | ... |

## 17. Validation Checklist

```text
[ ] Output file exists
[ ] Output file is Markdown
[ ] Required sections are present
[ ] Component tree is present
[ ] Props contracts are present
[ ] Replaceability map is present
[ ] Template indexing tags are present
[ ] No full React / TSX implementation code is included
```
````

---

## 26. 最终回复契约

Codex 完成本 Skill 后，最终回复必须使用以下格式：

```text
已完成：
- 已生成模板准备阶段前端组件规划 Markdown。

读取文件：
- <path>
- <path>

写入文件：
- <path>

已验证：
- 输出文件存在：通过 / 未验证，原因：...
- 必要章节检查：通过 / 未验证，原因：...
- 未生成 TSX 实现代码：通过 / 未验证，原因：...

风险与说明：
- ...
```

如果没有写入文件，只输出 Markdown 内容，则最终回复必须说明：

```text
写入文件：未写入，原因：用户要求仅输出 Markdown / 当前环境无文件写入权限。
```

---

## 27. 失败处理

### 27.1 找不到输入文件

如果找不到上游输入文件，应输出：

```text
无法执行模板组件规划：未找到上游输入文件。
需要提供以下至少一个文件：
- visual-parse.md
- uiux-design-language.md
- design-system.md
```

### 27.2 输入冲突

如果上游文件互相冲突，例如页面类型、风格或组件结构不一致，应：

1. 优先以 `03-design-system.md` 为样式规则来源。
2. 以 `02-uiux-design-language.md` 为 UX 语义来源。
3. 以 `01-page-visual-parse.md` 为页面结构证据来源。
4. 在“不确定项”中记录冲突。

### 27.3 信息不足

如果信息不足但仍可输出，应降低置信度，并明确：

```text
该组件规划为低置信度版本，仅适合后续人工复核，不应直接用于代码生成。
```

---

## 28. 最重要的提醒

```text
你不是在写 React 代码。
你不是在重新设计页面。
你不是在重新制定设计系统。
你是在把一个单页模板的视觉结构、UX 语义和设计系统，转换为可入库、可检索、可复用、可组合的前端组件规划 Markdown。
```
