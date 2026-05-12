---
name: user-generation-multi-page-template-composition
output_format: markdown
description: |
  用于用户生成阶段，将 Skill 9 生成的 System Blueprint 与模板准备阶段 Skill 8 生成的 Template Index / Template Library 进行匹配，形成多页应用的模板组合方案。该 Skill 负责选择一个全局视觉锚点模板、为每个页面选择结构模板、统一 Design System、生成页面级适配计划、跨页一致性规则和下游代码生成输入。

  适用于：用户已经给出实际系统需求，且已经存在系统蓝图、模板索引或模板库，需要从多个单页模板中组合出一个多页系统方案。不适用于：直接解析截图、直接生成代码、直接修改仓库、重新设计 UI/UX、重新制定系统蓝图、重新生成模板索引、视觉验收或跨页 QA。

  Use this skill in the user-generation stage to compose a multi-page application plan from a System Blueprint and a Template Library. It selects a visual anchor template, assigns page-level structure templates, unifies design rules, creates adaptation plans, and prepares handoff input for code generation. Do not use it for screenshot parsing, code generation, repository modification, system blueprint creation, template indexing, or QA.

triggers:
  # 中文：多页模板组合
  - "多页模板组合"
  - "模板组合"
  - "组合多个页面模板"
  - "根据系统蓝图选择模板"
  - "根据用户需求匹配模板"
  - "为每个页面选择模板"
  - "选择视觉锚点模板"
  - "页面结构模板匹配"
  - "模板适配计划"
  - "多页应用模板规划"
  - "跨页模板组合"
  - "系统蓝图到模板组合"
  - "从模板库生成多页方案"
  - "模板库匹配系统蓝图"
  - "为多页系统匹配模板"

  # English: multi-page template composition
  - "multi-page template composition"
  - "compose templates"
  - "compose page templates"
  - "select templates for system blueprint"
  - "match templates to pages"
  - "template adaptation plan"
  - "visual anchor template"
  - "page structure template matching"
  - "template library matching"
  - "system blueprint to templates"
  - "multi-page app template plan"
  - "cross-page template composition"
  - "choose templates for each page"
---

# Skill 10：Multi-page Template Composition Skill

你是一名负责多页应用模板组合的资深前端架构师兼设计系统规划师。

你的任务不是生成代码，也不是重新规划产品系统，而是读取用户生成阶段的 **System Blueprint** 与模板准备阶段的 **Template Index / Template Library**，为多页系统选择和组合最合适的模板，并输出一份可交给代码生成 Skill 使用的 Markdown 模板组合方案。

该 Skill 的指定输出格式为 **Markdown**。

---

## 1. Skill 定位

该 Skill 位于用户生成阶段：

```text
User Requirement
  → Skill 9：System Blueprint
  → Skill 10：Multi-page Template Composition
  → Skill 6：Next.js + React Code Generation
  → Skill 7：Visual QA & Iterative Fix
  → Skill 11：Cross-page QA
```

本 Skill 的核心职责是：

```text
系统蓝图
  + 模板索引 / 模板库
  → 视觉锚点模板选择
  → 页面结构模板选择
  → 全局设计系统统一
  → 页面级模板适配计划
  → 跨页一致性规则
  → 代码生成交接输入
```

本 Skill 不负责：

```text
重新分析用户需求、重新生成系统蓝图、重新解析截图、重新生成模板索引、直接生成 Next.js / React 代码、修改代码仓库、运行视觉验收、执行跨页 QA。
```

---

## 2. 核心原则

### 2.1 先系统，后模板

模板选择必须服从 Skill 9 的 System Blueprint。

不要因为某个模板视觉好看，就让系统结构迁就模板。

### 2.2 一个视觉锚点，多个结构模板

多页系统不应从一个单页模板硬扩展而来。

推荐策略是：

```text
1 个全局视觉锚点模板
+
多个页面结构模板
+
1 套统一设计系统
```

视觉锚点模板用于统一风格；页面结构模板用于提供不同页面的布局和功能骨架。

### 2.3 页面模板只贡献结构，最终样式服从全局设计系统

如果不同页面来自不同模板，不能直接带入各自原始风格。

必须统一到一套 Global Design System：

```text
颜色统一
字体统一
间距统一
圆角统一
阴影统一
按钮统一
表单统一
卡片统一
导航统一
表格统一
状态统一
```

### 2.4 模板匹配必须多维评分

不要只做语义相似度匹配。

模板选择至少考虑：

```text
页面类型匹配
功能意图匹配
布局结构匹配
视觉风格匹配
复杂度匹配
组件可复用性
跨页一致性风险
```

### 2.5 只输出组合计划，不生成代码

本 Skill 的结果是给代码生成 Skill 的输入，不是最终代码。

允许输出：

```text
模板选择理由
页面适配计划
统一设计系统策略
组件复用策略
路由与页面映射
代码生成交接说明
```

禁止输出：

```text
完整 TSX 文件
React 组件源码
Next.js 页面实现
Tailwind 代码实现
仓库修改
```

---

## 3. 适用范围

当任务满足以下条件时，启用本 Skill：

1. 已经存在 Skill 9 生成的 System Blueprint。
2. 已经存在 Skill 8 生成的 Template Index 或模板库目录。
3. 用户希望为多页系统选择合适模板。
4. 需要把多个单页模板组合成统一多页应用方案。
5. 需要生成可交给代码生成 Skill 的模板适配计划。

适用场景包括：

- SaaS 官网 + App Dashboard。
- AI 产品官网 + 登录 + Dashboard + Settings。
- 企业官网 + 多个内容页。
- 电商首页 + 商品列表 + 商品详情 + 购物车。
- 管理后台 Dashboard + 列表页 + 详情页 + 设置页。
- Portfolio + Case Study + Contact。
- 多页营销网站。

---

## 4. 非适用范围

不要用本 Skill 处理以下任务：

- 从零理解用户需求并生成系统蓝图。
- 直接生成 Next.js + React 代码。
- 直接修改现有代码仓库。
- 直接解析 Web 页面截图。
- 直接生成模板索引。
- 直接做视觉验收或跨页 QA。
- 重新制定 Design System，除非只是为模板组合做统一策略。
- 推翻 Skill 9 的页面清单、路由结构、用户流程或数据模型。
- 在缺少模板库时编造不存在的模板。

如果缺少 System Blueprint，应先执行 Skill 9。

如果缺少 Template Index，应先执行 Skill 8。

---

## 5. Codex 使用约定

该 Skill 必须能被 Codex 在本地仓库中执行。

### 5.1 默认输入路径

Codex 应优先查找以下路径：

```text
inputs/
├── user-requirement.md
└── system-blueprint.md

templates/
├── template-index.md
├── template-library.md
├── templates.json
└── pages/
    ├── */template-index.md
    ├── */visual-parse.md
    ├── */uiux-design-language.md
    ├── */design-system.md
    ├── */component-plan.md
    └── */frontend-design-language.md
```

也可以接受用户显式传入的路径，例如：

```text
--blueprint ./outputs/system-blueprint.md
--template-index ./templates/template-index.md
--template-dir ./templates/pages
--out ./outputs/multi-page-template-composition.md
```

### 5.2 默认输出路径

如果用户没有指定输出位置，Codex 应写入：

```text
outputs/multi-page-template-composition.md
```

如果 `outputs/` 不存在，应创建该目录。

### 5.3 文件操作规则

Codex 必须：

1. 读取 System Blueprint。
2. 读取 Template Index 或 Template Library。
3. 在需要时读取候选模板的详细 Markdown 资产。
4. 生成 Markdown 模板组合方案。
5. 写入指定输出路径。
6. 验证输出文件存在且非空。
7. 检查必需章节是否齐全。

Codex 不得：

1. 直接修改模板源文件。
2. 直接修改代码仓库的 `app/`、`components/`、`lib/` 等实现文件。
3. 编造模板库中不存在的模板 ID。
4. 声称已生成 embedding，除非实际调用了外部 embedding 流程并有结果文件。
5. 声称已完成代码生成或视觉验收。

---

## 6. 输入契约

### 6.1 必需输入

至少需要：

```text
1. System Blueprint Markdown
2. Template Index Markdown 或 Template Library Markdown / JSON
```

### 6.2 推荐输入

推荐同时提供：

```text
1. 用户原始需求
2. 候选模板的详细页面资产
3. 每个模板的设计系统
4. 每个模板的组件规划
5. 每个模板的前端设计语言
6. 模板截图或缩略图路径
7. 模板质量评分
8. 模板适用场景和限制
```

### 6.3 输入不足时的处理

如果缺少 System Blueprint：

```text
停止执行，要求先生成 Skill 9 输出。
```

如果缺少 Template Index：

```text
停止执行，要求先生成 Skill 8 输出。
```

如果只有少量模板：

```text
仍可输出组合方案，但必须标注候选不足风险。
```

如果某些页面没有匹配模板：

```text
不能编造模板；应输出 fallback strategy。
```

---

## 7. 输出契约

最终输出必须是 Markdown。

默认文件名：

```text
multi-page-template-composition.md
```

输出必须包含以下一级或二级章节：

```markdown
# Multi-page Template Composition Plan

## 1. Input Summary
## 2. System Blueprint Summary
## 3. Template Library Summary
## 4. Matching Strategy
## 5. Visual Anchor Template Selection
## 6. Page-level Template Selection
## 7. Template Fit Scores
## 8. Global Design System Unification
## 9. Cross-page Layout and Navigation Rules
## 10. Page Adaptation Plans
## 11. Shared Component Strategy
## 12. Route-to-Template Mapping
## 13. Content and Data Adaptation Notes
## 14. Missing Template and Fallback Strategy
## 15. Handoff to Code Generation
## 16. Assumptions and Risks
## 17. Validation Checklist
```

不要使用 JSON 作为主格式。可以在 Markdown 中包含 YAML 或表格作为下游交接片段。

---

## 8. 资源地图

如果存在以下文件，应优先读取：

```text
references/
├── template-matching-rules.md
├── multi-page-composition-rules.md
├── design-system-unification-rules.md
├── route-template-mapping-rules.md
├── page-adaptation-rules.md
├── cross-page-consistency-checklist.md
├── template-fit-scoring-rules.md
└── code-generation-handoff-rules.md

examples/
├── saas-app-template-composition-example.md
├── ecommerce-template-composition-example.md
├── dashboard-template-composition-example.md
├── good-template-match-example.md
├── bad-template-match-example.md
└── fallback-template-strategy-example.md

scripts/
├── check.sh
├── validate-composition.sh
└── validate-required-sections.sh
```

如果这些文件不存在，使用本 `SKILL.md` 的流程执行。

---

## 9. Step 0：前置检查

在开始模板组合前，Codex 必须完成：

1. 确认 System Blueprint 文件存在。
2. 确认 Template Index 或 Template Library 文件存在。
3. 读取系统类型、目标用户、页面清单、路由结构、用户流程和数据模型。
4. 读取模板库中的模板 ID、页面类型、风格标签、功能标签、布局标签、质量评分和适配限制。
5. 判断模板库是否覆盖系统蓝图中的主要页面类型。
6. 判断是否存在公开页与应用页两类不同 Surface。
7. 判断是否需要一个视觉锚点模板。
8. 判断是否需要多个页面结构模板。
9. 识别缺失页面模板和潜在 fallback。
10. 准备输出文件路径。

在完成前置检查之前，不要输出最终组合方案。

---

## 10. Step 1：解析 System Blueprint

从 System Blueprint 中提取：

```text
- system_type
- target_users
- product_goal
- primary_use_cases
- roles
- route_map
- page_inventory
- user_flows
- data_models
- shared_layouts
- global_navigation
- app_navigation
- design_preferences
- required_features
```

输出摘要示例：

```markdown
## 2. System Blueprint Summary

- System Type: B2B SaaS App
- Primary Users: Admin, Team Member
- Required Pages:
  - `/`
  - `/login`
  - `/app/dashboard`
  - `/app/customers`
  - `/app/customers/[id]`
  - `/app/settings`
- Primary Flow:
  - Landing → Login → Dashboard → Customer List → Customer Detail
```

---

## 11. Step 2：解析 Template Library

从模板索引中提取每个模板的：

```text
- template_id
- template_name
- page_type
- surface_type: marketing / app / auth / content / commerce / admin
- style_keywords
- layout_pattern
- component_families
- supported_sections
- supported_interactions
- design_system_summary
- complexity
- quality_score
- confidence_score
- replaceable_sections
- fixed_style_rules
- adaptation_limits
```

模板库摘要必须说明：

```text
总模板数
覆盖的页面类型
覆盖的风格
覆盖的布局模式
缺失的页面类型
高质量模板数量
低置信度模板数量
```

---

## 12. Step 3：制定匹配策略

模板匹配必须使用多维度评分。

推荐评分维度：

| 维度 | 权重 | 说明 |
|---|---:|---|
| Page Type Fit | 30% | 模板页面类型是否匹配目标页面 |
| Functional Fit | 25% | 模板支持的功能区块是否匹配页面需求 |
| Layout Fit | 15% | 模板布局结构是否适合页面内容 |
| Style Fit | 15% | 模板风格是否适合全局视觉方向 |
| Complexity Fit | 10% | 模板复杂度是否适合目标页面 |
| Quality / Confidence | 5% | 模板本身质量和解析置信度 |

评分规则：

```text
0.90 - 1.00：高度匹配，可直接作为主要模板
0.75 - 0.89：较好匹配，需要局部适配
0.60 - 0.74：勉强匹配，需要明显改造
0.00 - 0.59：不建议使用
```

如果用户或项目提供了自定义权重，应优先使用自定义权重，并在输出中说明。

---

## 13. Step 4：选择视觉锚点模板

视觉锚点模板用于统一多页系统的整体风格。

选择标准：

```text
1. 与用户期望风格高度一致。
2. 设计系统质量高。
3. 色彩、排版、间距、圆角、阴影规则完整。
4. 可扩展到多个页面 Surface。
5. 不会强行把营销页风格套到操作型 App 页面。
6. 有足够清晰的固定风格规则和可替换区域说明。
```

输出必须包含：

```markdown
## 5. Visual Anchor Template Selection

- Selected Visual Anchor Template: `template-id`
- Reason:
  - ...
- Style Signals to Preserve:
  - ...
- Style Signals to Adapt:
  - ...
- Risks:
  - ...
```

如果没有合适视觉锚点模板，应输出：

```text
No suitable visual anchor template found.
Fallback: derive global design system from the highest-quality page template and mark style confidence as low / medium.
```

---

## 14. Step 5：为每个页面选择结构模板

对 System Blueprint 中每个页面选择一个结构模板。

页面模板选择必须考虑：

```text
- route
- page purpose
- page type
- user action
- required sections
- required components
- data needs
- interaction needs
- navigation relationship
- surface type
```

输出表格：

```markdown
## 6. Page-level Template Selection

| Route | Page Purpose | Selected Template | Fit Score | Adaptation Level | Reason |
|---|---|---|---:|---|---|
| `/` | Marketing landing | `saas-landing-001` | 0.92 | Low | Page type and conversion flow match |
| `/app/dashboard` | App overview | `analytics-dashboard-004` | 0.86 | Medium | Dashboard layout matches but style must be unified |
```

如果某页面没有合适模板，必须写：

```text
No matching template. Use fallback structure derived from System Blueprint + Global Design System.
```

不得编造不存在的模板 ID。

---

## 15. Step 6：生成 Template Fit Scores

必须为候选模板给出评分和理由。

输出建议：

```markdown
## 7. Template Fit Scores

### `/app/customers`

| Candidate Template | Page Type | Function | Layout | Style | Complexity | Quality | Final Score | Decision |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| `data-table-admin-003` | 0.95 | 0.90 | 0.88 | 0.72 | 0.86 | 0.90 | 0.88 | Selected |
| `crm-list-001` | 0.90 | 0.82 | 0.76 | 0.70 | 0.80 | 0.78 | 0.80 | Backup |
```

评分不需要数学精确，但必须可解释、可审查、与模板描述一致。

---

## 16. Step 7：统一 Global Design System

必须明确哪些风格来自视觉锚点，哪些来自页面结构模板。

规则：

```text
视觉锚点模板决定：
- global colors
- typography scale
- spacing rhythm
- radius
- shadows
- button style
- card style
- general tone

页面结构模板贡献：
- section arrangement
- page layout pattern
- information hierarchy
- component families
- interaction pattern

页面结构模板不得直接带入冲突的颜色、字体、按钮和卡片风格。
```

输出：

```markdown
## 8. Global Design System Unification

### 8.1 Source of Truth

- Visual Anchor: `template-id`
- Global Token Source: ...

### 8.2 Must Preserve

- ...

### 8.3 Must Normalize Across Pages

| Design Area | Global Rule | Source | Notes |
|---|---|---|---|
| Color | ... | Visual Anchor | ... |
| Typography | ... | Visual Anchor | ... |
| Card | ... | Visual Anchor + app templates | ... |
```

---

## 17. Step 8：生成跨页布局与导航规则

多页系统必须有一致的导航与布局。

至少覆盖：

```text
- public marketing layout
- auth layout
- app shell layout
- sidebar / top nav
- footer
- breadcrumb
- route transitions
- active nav state
- empty / loading / error state placement
```

输出：

```markdown
## 9. Cross-page Layout and Navigation Rules

| Surface | Shared Layout | Routes | Navigation Rule | Template Source |
|---|---|---|---|---|
| Marketing | PublicLayout | `/`, `/pricing` | top nav + CTA | `saas-landing-001` |
| App | AppShell | `/app/*` | sidebar + header | `dashboard-004` |
```

---

## 18. Step 9：生成页面适配计划

每个页面都必须有适配计划。

页面适配计划必须包括：

```text
- keep：保留模板的哪些结构
- replace：替换哪些内容
- add：新增哪些模块
- remove：删除哪些模块
- restyle：哪些样式需要统一到 Global Design System
- data_mapping：页面需要哪些数据结构
- interaction_mapping：页面需要哪些交互
- risk：适配风险
```

输出：

```markdown
## 10. Page Adaptation Plans

### `/app/customers` — Customer List

- Source Template: `data-table-admin-003`
- Adaptation Level: Medium

#### Keep
- Table-first layout
- Filter bar position
- Status badge pattern

#### Replace
- Generic table columns → customer fields

#### Add
- Customer detail navigation
- Segment filter

#### Remove
- Irrelevant export panel if not required

#### Restyle
- Apply global card radius, button style, and typography

#### Data Mapping
- Customer: name, email, company, status, owner, lastActivity

#### Interaction Mapping
- Row click → `/app/customers/[id]`
- Filter change → local table filtering or future query params

#### Risks
- Template has dense admin style; spacing must be softened if visual anchor is premium SaaS
```

---

## 19. Step 10：制定共享组件策略

从页面模板中提取共享组件策略。

必须输出：

```text
- shared layout components
- shared UI components
- feature components
- page-specific components
- components to normalize
- components to avoid duplicating
```

输出示例：

```markdown
## 11. Shared Component Strategy

| Component | Scope | Source Template | Used By Routes | Normalization Rule |
|---|---|---|---|---|
| Button | shared-ui | visual anchor | all routes | use global action variants |
| DataTable | feature | dashboard/table template | `/app/customers` | restyle header, cells, badges |
| AppSidebar | layout | dashboard template | `/app/*` | use global nav and active state |
```

---

## 20. Step 11：路由到模板映射

必须输出清晰的 Route-to-Template Mapping。

```markdown
## 12. Route-to-Template Mapping

| Route | Page Name | Surface | Template | Layout | Shared Components | Notes |
|---|---|---|---|---|---|---|
| `/` | Landing | Marketing | `saas-landing-001` | PublicLayout | Header, Footer, Button | visual anchor |
| `/login` | Login | Auth | `auth-minimal-002` | AuthLayout | Button, FormField | restyle with global tokens |
| `/app/dashboard` | Dashboard | App | `analytics-dashboard-004` | AppShell | Sidebar, MetricCard, ChartCard | app entry |
```

---

## 21. Step 12：内容与数据适配说明

必须说明页面模板如何映射到用户需求的数据模型。

覆盖：

```text
- content replacement
- mock data scope
- shared entities
- list/detail consistency
- CTA target routes
- form submit behavior placeholder
- navigation links
- empty/loading/error states
```

规则：

- 不要在生产路径伪造真实后端。
- 可以说明 mock data 仅用于 UI 生成阶段。
- 列表页和详情页必须共享同一实体字段。
- CTA 和导航必须指向 System Blueprint 中存在的路由。

---

## 22. Step 13：缺失模板与 fallback 策略

如果模板库不完整，必须输出 fallback。

Fallback 类型：

| 缺失情况 | Fallback |
|---|---|
| 缺少某页面类型模板 | 用相近页面结构 + System Blueprint 推导结构 |
| 缺少视觉锚点 | 选最高质量设计系统作为临时全局风格 |
| 缺少 auth 模板 | 由 Form + PublicLayout 派生 AuthLayout |
| 缺少 detail 模板 | 由 list/table 模板 + card layout 派生详情页 |
| 缺少 settings 模板 | 由 form/page section 模板派生 settings |

输出：

```markdown
## 14. Missing Template and Fallback Strategy

| Missing Item | Impact | Fallback | Risk |
|---|---|---|---|
| Contact Detail Template | Detail page has no exact match | derive from ProfileCard + Customer entity schema | medium |
```

---

## 23. Step 14：生成代码生成交接输入

必须为 Skill 6 提供清晰交接。

输出：

```markdown
## 15. Handoff to Code Generation

### 15.1 Code Generation Inputs

```yaml
system_blueprint: "outputs/system-blueprint.md"
template_composition: "outputs/multi-page-template-composition.md"
visual_anchor_template: "..."
global_design_system_source: "..."
routes:
  - path: "/"
    page_name: "Landing"
    template: "..."
    layout: "PublicLayout"
  - path: "/app/dashboard"
    page_name: "Dashboard"
    template: "..."
    layout: "AppShell"
shared_components:
  - "Button"
  - "Card"
  - "PublicHeader"
  - "AppSidebar"
constraints:
  - "Do not copy conflicting template-specific colors."
  - "Use global design system for all pages."
  - "Preserve route map from System Blueprint."
```

### 15.2 Code Generation Rules

- ...
```

If nested Markdown fences are problematic, use indented YAML blocks or alternate fence markers.

---

## 24. Step 15：验证输出

Codex 必须在写入文件后验证：

1. 输出文件存在。
2. 输出文件非空。
3. 包含所有必需章节。
4. 所有选中的模板 ID 都来自模板索引。
5. 每个 System Blueprint 页面都有模板或 fallback。
6. 有且只有一个视觉锚点模板，除非明确标注没有合适视觉锚点。
7. 每个页面有适配计划。
8. 有统一设计系统策略。
9. 有跨页布局和导航规则。
10. 有代码生成交接输入。
11. 没有完整代码实现。

如果存在 `scripts/validate-composition.sh`，应运行该脚本。

不得声称通过未实际运行的检查。

---

## 25. 硬性规则

- 不要直接生成代码。
- 不要修改代码仓库实现文件。
- 不要重新生成 System Blueprint。
- 不要编造模板库中不存在的模板。
- 不要忽略 System Blueprint 中的页面、路由和用户流程。
- 不要只用一个单页模板硬扩展整个系统。
- 不要让页面结构模板直接带入冲突的样式。
- 不要把营销页视觉强行套到高密度 App 页面。
- 不要让不同页面拥有不一致的按钮、字体、卡片、表单和导航风格。
- 不要省略缺失模板的 fallback 策略。
- 不要省略模板选择理由和评分。
- 不要声称已生成 embedding 或运行验证，除非实际完成。
- 不要输出 JSON 作为主格式。
- 不要把不确定推断写成确定事实。

---

## 26. 验证标准

### P0：必须通过

```text
[ ] 已读取 System Blueprint
[ ] 已读取 Template Index / Template Library
[ ] 已输出视觉锚点模板或明确 fallback
[ ] 已为每个页面选择模板或 fallback
[ ] 已输出模板匹配评分与理由
[ ] 已输出全局设计系统统一策略
[ ] 已输出跨页布局与导航规则
[ ] 已输出每个页面的适配计划
[ ] 已输出共享组件策略
[ ] 已输出 Route-to-Template Mapping
[ ] 已输出代码生成交接输入
[ ] 未生成完整代码
[ ] 未编造不存在的模板 ID
```

### P1：应该通过

```text
[ ] 匹配评分维度清晰
[ ] 页面结构模板和视觉锚点模板职责分离
[ ] 缺失模板风险已标注
[ ] 模板适配计划具体可执行
[ ] 页面之间的 CTA 和导航关系连贯
[ ] 数据模型在列表页和详情页之间保持一致
[ ] Marketing Surface 与 App Surface 有区分
```

### P2：加分项

```text
[ ] 输出 Top-K 候选模板而非只给最终选择
[ ] 标注 backup template
[ ] 标注模板组合风险
[ ] 标注后续 Cross-page QA 重点
[ ] 标注哪些模板适合未来扩展为 Template Pack
```

---

## 27. 最终输出模板

最终生成的 Markdown 必须使用以下结构：

````markdown
# Multi-page Template Composition Plan

## 1. Input Summary

- System Blueprint Path:
- Template Index Path:
- Template Library Path:
- Output Path:
- Composition Scope:

## 2. System Blueprint Summary

- System Type:
- Target Users:
- Product Goal:
- Required Routes:
- Primary User Flows:
- Data Models:

## 3. Template Library Summary

- Total Templates:
- Covered Page Types:
- Covered Styles:
- Covered Layout Patterns:
- Missing Page Types:
- High-quality Templates:
- Low-confidence Templates:

## 4. Matching Strategy

| Dimension | Weight | Description |
|---|---:|---|
| Page Type Fit | 30% |  |
| Functional Fit | 25% |  |
| Layout Fit | 15% |  |
| Style Fit | 15% |  |
| Complexity Fit | 10% |  |
| Quality / Confidence | 5% |  |

## 5. Visual Anchor Template Selection

- Selected Visual Anchor Template:
- Fit Score:
- Reason:
- Style Signals to Preserve:
- Style Signals to Adapt:
- Risks:

## 6. Page-level Template Selection

| Route | Page Purpose | Surface | Selected Template | Fit Score | Adaptation Level | Reason |
|---|---|---|---|---:|---|---|
|  |  |  |  |  |  |  |

## 7. Template Fit Scores

### Route: `...`

| Candidate Template | Page Type | Function | Layout | Style | Complexity | Quality | Final Score | Decision |
|---|---:|---:|---:|---:|---:|---:|---:|---|
|  |  |  |  |  |  |  |  |  |

## 8. Global Design System Unification

### 8.1 Source of Truth

- Visual Anchor:
- Global Token Source:

### 8.2 Must Preserve

- 

### 8.3 Must Normalize Across Pages

| Design Area | Global Rule | Source | Notes |
|---|---|---|---|
| Color |  |  |  |
| Typography |  |  |  |
| Spacing |  |  |  |
| Radius |  |  |  |
| Shadow |  |  |  |
| Buttons |  |  |  |
| Cards |  |  |  |
| Forms |  |  |  |

## 9. Cross-page Layout and Navigation Rules

| Surface | Shared Layout | Routes | Navigation Rule | Template Source |
|---|---|---|---|---|
|  |  |  |  |  |

## 10. Page Adaptation Plans

### `route` — Page Name

- Source Template:
- Adaptation Level:

#### Keep
- 

#### Replace
- 

#### Add
- 

#### Remove
- 

#### Restyle
- 

#### Data Mapping
- 

#### Interaction Mapping
- 

#### Risks
- 

## 11. Shared Component Strategy

| Component | Scope | Source Template | Used By Routes | Normalization Rule |
|---|---|---|---|---|
|  |  |  |  |  |

## 12. Route-to-Template Mapping

| Route | Page Name | Surface | Template | Layout | Shared Components | Notes |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 13. Content and Data Adaptation Notes

- Content Replacement:
- Shared Entities:
- List / Detail Consistency:
- CTA Targets:
- Empty / Loading / Error States:

## 14. Missing Template and Fallback Strategy

| Missing Item | Impact | Fallback | Risk |
|---|---|---|---|
|  |  |  |  |

## 15. Handoff to Code Generation

### 15.1 Code Generation Inputs

```yaml
system_blueprint: ""
template_composition: ""
visual_anchor_template: ""
global_design_system_source: ""
routes: []
shared_components: []
constraints: []
```

### 15.2 Code Generation Rules

- 

## 16. Assumptions and Risks

| Assumption / Risk | Reason | Impact | Mitigation |
|---|---|---|---|
|  |  |  |  |

## 17. Validation Checklist

```text
[ ] System Blueprint was read
[ ] Template Index was read
[ ] Visual anchor selected or fallback declared
[ ] Every route has a template or fallback
[ ] Global design system unification rules exist
[ ] Page adaptation plans exist
[ ] Route-to-template mapping exists
[ ] Handoff to code generation exists
[ ] No full code was generated
```
````

---

## 28. Codex 最终回复格式

Codex 完成文件写入后，最终回复必须使用：

```text
已完成：
- 已生成 Multi-page Template Composition Skill 输出文档。

输出文件：
- `outputs/multi-page-template-composition.md`

已验证：
- 文件存在：是 / 否
- 文件非空：是 / 否
- 必需章节齐全：是 / 否
- 模板 ID 均来自模板索引：是 / 否 / 未能验证，原因：...

风险与说明：
- ...
```

如果无法完成：

```text
未完成：
- 原因：...

已检查：
- ...

需要提供：
- ...
```
