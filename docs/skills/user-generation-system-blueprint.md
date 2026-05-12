---
name: user-generation-system-blueprint
output_format: markdown
description: |
  用于 Template-Augmented Multi-page App Generation 的用户生成阶段，将用户的自然语言需求、业务目标、页面范围、功能要求、风格偏好和可选模板库上下文，转换为可执行、可验证、可交接给后续模板组合与代码生成阶段的 System Blueprint Markdown 文档。

  适用于：用户希望从需求生成一个多页 Web 系统、SaaS 应用、Dashboard、管理后台、营销型网站、电商系统、内容站、Portfolio 或多页面产品原型，并且需要先明确系统类型、用户角色、路由结构、页面清单、页面间逻辑、核心流程、数据实体、导航关系、功能优先级和跨页一致性约束。

  不适用于：直接选择模板、直接生成 Next.js/React 代码、直接改造模板、直接做视觉验收、直接设计单页 UI、直接创建数据库或后端 API、执行真实业务逻辑开发，或没有用户需求输入的空泛规划。

  Use this skill to convert user requirements into a system-level blueprint for template-augmented multi-page app generation. It should produce route maps, page inventories, user flows, roles, entities, feature priorities, and cross-page consistency rules in Markdown. Do not use it for direct template matching, code generation, UI implementation, backend development, or visual QA.

triggers:
  # 中文：系统蓝图
  - "系统蓝图"
  - "生成系统蓝图"
  - "多页系统规划"
  - "多页面应用规划"
  - "系统级规划"
  - "根据需求规划页面"
  - "根据需求生成路由结构"
  - "页面清单"
  - "路由地图"
  - "用户流程"
  - "业务流程建模"
  - "数据模型规划"
  - "多页应用 IR"
  - "System Blueprint"
  - "System IR"

  # 中文：用户生成阶段
  - "用户需求转系统蓝图"
  - "用户生成阶段系统规划"
  - "先规划系统再选模板"
  - "为模板组合准备系统蓝图"
  - "为多页代码生成准备蓝图"
  - "从需求到页面结构"
  - "从需求到应用结构"

  # English: system blueprint
  - "system blueprint"
  - "generate system blueprint"
  - "multi-page app planning"
  - "system-level planning"
  - "route map"
  - "page inventory"
  - "user flow"
  - "business flow modeling"
  - "domain model planning"
  - "system IR"
  - "app blueprint"
  - "plan pages from requirements"

  # English: generation phase
  - "requirements to system blueprint"
  - "plan system before template matching"
  - "prepare for template composition"
  - "prepare multi-page generation"
  - "convert requirements to route structure"
---

# Skill 9：System Blueprint Skill

你是一名负责 Template-Augmented Multi-page App Generation 的系统架构规划专家。

你的任务不是选择模板，也不是生成代码，而是把用户的实际需求转换为**系统级蓝图**，让后续 Skill 能够基于该蓝图进行多页面模板组合、统一设计系统继承、代码生成和跨页验收。

该 Skill 的指定输出格式为 **Markdown**，并且必须能够被 Codex 在本地仓库中执行：读取输入文件、生成 Markdown 输出文件、校验章节完整性，并在最终回复中说明写入路径与验证结果。

---

## 1. Skill 定位

该 Skill 位于用户生成阶段的第一步：

```text
User Requirement
  → Skill 9：System Blueprint
  → Skill 10：Multi-page Template Composition
  → Skill 6：Next.js + React Code Generation
  → Skill 7：Visual QA & Iterative Fix
  → Skill 11：Cross-page QA
  → Final Multi-page System
```

本 Skill 只负责：

```text
用户需求 → 系统类型 → 用户角色 → 页面清单 → 路由结构 → 用户流程 → 数据实体 → 功能优先级 → 跨页一致性约束 → 下游交接输入
```

本 Skill 不负责：

```text
模板匹配、模板改造、设计系统生成、代码生成、视觉验收、真实后端建模、数据库实现、权限系统实现、生产级业务逻辑实现。
```

---

## 2. 核心原则

### 2.1 先系统，后页面

不要从某个单页模板直接扩展系统。必须先明确系统结构，再决定每个页面需要什么。

正确顺序：

```text
需求理解 → 系统目标 → 用户角色 → 页面地图 → 业务流程 → 页面职责 → 数据关系 → 下游模板组合输入
```

错误顺序：

```text
用户需求 → 直接找一个页面模板 → 硬扩展成整个系统
```

### 2.2 页面必须有职责

每个页面都必须说明：

```text
为什么需要这个页面？
它服务哪个用户角色？
它承载什么任务？
它从哪里进入？
它通向哪里？
它需要哪些数据或组件？
```

不要生成一堆没有逻辑关系的页面名。

### 2.3 跨页逻辑优先于视觉细节

本 Skill 不定义具体视觉样式，但必须定义跨页一致性要求，例如：

- 公共导航。
- App Layout。
- Marketing Layout。
- Auth Layout。
- Sidebar 与 Header 的使用边界。
- 列表页与详情页的数据字段一致性。
- CTA 与目标路由一致性。
- 空状态、错误状态、加载状态的全局处理要求。

### 2.4 明确事实、推断和假设

用户明确说出的需求是事实。
基于产品类型合理补全的是推断。
缺少信息但为了继续规划而设置的是假设。

三者必须在输出中区分，不要把假设伪装成用户需求。

### 2.5 面向模板组合与代码生成

输出不是产品方案散文，而是给后续 Skill 使用的结构化 Markdown。

后续 Skill 应该能直接根据本蓝图完成：

```text
模板组合、页面模板选择、统一设计系统应用、多页代码生成、跨页 QA。
```

---

## 3. 适用范围

适用于以下任务：

- 根据用户需求规划多页 Web 系统。
- 根据用户需求生成页面清单。
- 根据用户需求生成路由结构。
- 根据用户需求生成用户流程。
- 根据用户需求抽象角色和权限边界。
- 根据用户需求规划列表页、详情页、设置页、表单页、Dashboard 等页面关系。
- 为模板组合阶段提供系统级输入。
- 为多页 Next.js App 生成提供前置系统蓝图。

典型系统类型：

| 系统类型 | 示例 |
|---|---|
| Marketing Website | SaaS 官网、企业官网、产品官网、Portfolio |
| SaaS App | Dashboard、团队管理、设置、账单、数据页 |
| Admin System | 管理后台、审核系统、用户管理、订单管理 |
| E-commerce | 首页、商品列表、详情、购物车、结账、订单 |
| Content Site | 博客、文档站、课程站、知识库 |
| Marketplace | 供需列表、详情页、发布页、账户页 |
| Internal Tool | 数据录入、审批流、报表、配置台 |

---

## 4. 非适用范围

不要用本 Skill 做以下任务：

- 直接生成 React、Next.js、TSX、CSS 或 Tailwind 代码。
- 直接选择具体模板。
- 直接改造模板。
- 直接进行 UI 视觉设计。
- 直接生成 Design Token。
- 直接进行数据库建表或后端 API 实现。
- 直接编写真正的权限逻辑、支付逻辑、实时协作逻辑。
- 直接做视觉 QA 或代码 QA。
- 只针对一个页面的视觉解析。

如果用户只要求单页设计，应转交给页面级 Pipeline，而不是使用本 Skill。

---

## 5. Codex 执行约定

### 5.1 默认输入路径

Codex 执行时，应优先查找以下文件：

```text
inputs/user-requirement.md
inputs/product-brief.md
inputs/requirements.md
inputs/style-preferences.md
templates/template-index.md
templates/template-library-index.md
template-library/index.md
artifacts/template-index.md
artifacts/template-prep/template-index.md
```

如果用户在对话中直接提供需求，则以对话中的最新需求为最高优先级。

### 5.2 默认输出路径

默认将系统蓝图写入：

```text
outputs/system-blueprint.md
```

如果项目已有约定，则可以写入：

```text
artifacts/user-generation/system-blueprint.md
artifacts/system-blueprint.md
blueprints/system-blueprint.md
```

必须在最终回复中说明实际写入路径。

### 5.3 文件写入要求

Codex 必须：

1. 创建输出目录，如果不存在。
2. 写入完整 Markdown 文件。
3. 不覆盖用户已有文件，除非用户明确要求；若文件已存在，优先创建带时间戳或序号的新文件。
4. 写入后检查文件是否存在。
5. 检查 Markdown 中必要章节是否存在。
6. 最终回复说明写入路径、已验证项和风险。

### 5.4 不要求真实代码运行

本 Skill 不生成可运行代码，因此不要求运行 `npm run build`。

但如果仓库存在脚本用于校验 Markdown 或 schema，可以运行：

```bash
scripts/check-blueprint.sh
scripts/check.sh
npm run check:blueprint
```

没有脚本时，执行文件存在性和章节完整性检查即可。

---

## 6. 输入契约

### 6.1 必需输入

至少需要用户提供：

```text
一个系统或产品的自然语言需求。
```

例如：

```text
我要做一个 AI 客服 SaaS 系统，有官网、登录、Dashboard、客户列表、会话详情、知识库、设置和账单页面。
```

### 6.2 推荐输入

推荐用户额外提供：

- 产品类型。
- 目标用户。
- 用户角色。
- 核心功能。
- 需要的页面。
- 风格偏好。
- 参考模板或参考截图。
- 是否需要公开页和登录后应用页。
- 是否需要 Dashboard、表格、表单、详情页、设置页。
- 技术目标，例如 Next.js + React。

### 6.3 可选上下文

可以读取模板索引，但本 Skill 不能做最终模板选择。

模板索引只能用于：

```text
判断后续模板组合可能需要哪些页面类型、页面结构和风格锚点。
```

不能输出：

```text
最终选择 template_id = xxx
```

最终模板匹配应交给 Skill 10。

---

## 7. 资源地图

如果存在以下资源，应优先阅读：

```text
references/
├── system-blueprint-rules.md
├── route-map-rules.md
├── user-flow-modeling.md
├── page-inventory-taxonomy.md
├── domain-modeling-lite.md
├── cross-page-consistency-rules.md
├── template-composition-handoff.md
└── system-blueprint-checklist.md

examples/
├── saas-system-blueprint-example.md
├── admin-system-blueprint-example.md
├── ecommerce-system-blueprint-example.md
├── marketing-site-blueprint-example.md
└── bad-vs-good-system-blueprint.md

scripts/
├── check-blueprint.sh
└── check.sh
```

如果资源不存在，应根据本 `SKILL.md` 的流程完成任务。

---

## 8. Step 0：前置检查

开始规划前，必须完成：

1. 读取用户需求。
2. 判断需求是否是多页系统，而不是单页页面。
3. 判断系统类型：Marketing、SaaS、Admin、E-commerce、Content、Marketplace、Internal Tool 或 Hybrid。
4. 提取明确功能。
5. 提取明确页面。
6. 提取用户角色。
7. 提取风格偏好，但不展开视觉系统。
8. 检查是否存在模板索引上下文。
9. 标记缺失信息和合理假设。
10. 明确本 Skill 只输出系统蓝图，不选模板、不生成代码。

如果用户需求过于简短，也要继续做最佳努力，但必须在“假设与不确定项”中标注。

---

## 9. Step 1：需求归一化

将用户自然语言需求归一化为：

```text
- Product Type
- Product Goal
- Target Users
- User Roles
- Core Features
- Required Pages
- Optional Pages
- Main User Flows
- Style Preferences
- Technical Target
- Explicit Constraints
- Open Questions
```

输出时必须区分：

| 类型 | 说明 |
|---|---|
| Explicit | 用户明确提出 |
| Inferred | 根据产品类型合理推断 |
| Assumed | 信息缺失时为继续规划设置的假设 |

---

## 10. Step 2：系统类型与范围定义

必须定义系统范围。

输出内容：

```text
系统类型：...
系统边界：...
本次包含：...
本次不包含：...
MVP 范围：...
后续扩展：...
```

注意：

- 不要把所有可能功能都塞进 MVP。
- 不要让蓝图无限膨胀。
- 对复杂业务应拆成 MVP 和 Later。

---

## 11. Step 3：用户角色与权限边界

为系统定义用户角色。

常见角色：

```text
Visitor
Guest
Authenticated User
Member
Admin
Owner
Customer
Vendor
Editor
Reviewer
Support Agent
```

每个角色必须说明：

- 角色目标。
- 主要任务。
- 可访问页面。
- 不应访问页面。
- 是否需要不同导航。

本 Skill 只做权限边界规划，不实现权限逻辑。

---

## 12. Step 4：页面清单 Page Inventory

必须输出页面清单。

每个页面必须包含：

```text
- Page ID
- Route
- Page Type
- Surface Type：Marketing / Auth / App / Admin / Content
- Purpose
- Primary User Role
- Entry Points
- Exit / Next Actions
- Required Sections
- Required Components
- Data Needs
- State Needs
- Template Need
- Priority：P0 / P1 / P2
```

优先级定义：

| 优先级 | 含义 |
|---|---|
| P0 | MVP 必须页面，没有它系统无法闭环 |
| P1 | 应该有，提升完整性或常见预期 |
| P2 | 可选扩展，不阻塞 MVP |

---

## 13. Step 5：路由结构 Route Map

必须输出路由结构。

示例：

```text
/
/login
/signup
/app
/app/dashboard
/app/customers
/app/customers/[id]
/app/settings
/app/billing
```

路由规划规则：

- 公开页面和登录后页面要分离。
- Auth 页面要独立于 App Layout。
- App 内页面应共享 App Shell。
- 列表页与详情页应有清晰父子关系。
- 设置、账单、团队等页面应在合理分组下。
- 动态路由必须说明参数含义。

---

## 14. Step 6：导航结构 Navigation Model

必须定义：

- Global Navigation。
- Marketing Navigation。
- Auth Navigation。
- App Sidebar。
- App Header。
- Footer Navigation。
- Breadcrumb 规则。
- Mobile Navigation 规则。

输出重点：

```text
哪些页面出现在主导航？
哪些页面隐藏在用户菜单？
哪些页面从操作按钮进入？
哪些页面不应直接出现在导航？
```

---

## 15. Step 7：用户流程 User Flows

必须输出主要用户流程。

每条流程包含：

```text
Flow Name
Actor
Goal
Steps
Entry Page
Exit Page
Success State
Failure / Empty State
```

常见流程：

- 访客了解产品并注册。
- 用户登录并进入 Dashboard。
- 用户从列表页进入详情页。
- 用户创建或编辑资源。
- 用户查看报表。
- 用户配置设置。
- 用户升级套餐。

不要只输出页面列表，必须说明页面之间如何流转。

---

## 16. Step 8：轻量数据模型 Domain Model Lite

必须定义轻量数据模型，但不要实现数据库。

输出内容：

```text
Entity
Purpose
Key Fields
Appears On Pages
Related Entities
CRUD Needs
```

示例：

| Entity | Purpose | Key Fields | Pages | CRUD Needs |
|---|---|---|---|---|
| Customer | 表示客户或联系人 | id, name, email, status, company | Customers, Customer Detail | read, create, update |

规则：

- 字段要在列表页、详情页、表单页之间保持一致。
- 不要设计复杂数据库关系。
- 不要假装真实 API 已存在。
- 如果只是静态原型，可标注为 mock data schema。

---

## 17. Step 9：页面间一致性规则

必须定义跨页一致性约束。

至少覆盖：

```text
- Layout Consistency
- Navigation Consistency
- Design System Consistency
- Component Reuse Consistency
- Data Model Consistency
- Interaction Consistency
- Empty / Loading / Error State Consistency
- Terminology Consistency
```

示例：

```text
所有登录后页面必须使用同一个 App Shell。
所有主操作按钮必须使用统一 Primary CTA 语义。
Customer List 和 Customer Detail 必须共享 Customer 字段命名。
Settings、Billing、Team 页面应共享 Settings Layout。
```

---

## 18. Step 10：模板组合交接输入

本 Skill 不选择最终模板，但必须为 Skill 10 提供模板匹配输入。

输出内容：

```text
Visual Anchor Need：系统整体视觉锚点需求
Page Template Needs：每个页面需要什么类型模板
Component Pattern Needs：需要哪些组件模式
Style Unification Rules：哪些风格必须统一
Template Matching Constraints：哪些模板不适合
```

示例：

```text
视觉锚点需求：B2B SaaS、clean、trustworthy、modern、data-capable。
页面模板需求：Landing、Auth、Dashboard Overview、Data Table、Detail Page、Settings。
组件模式需求：Navbar、Sidebar、Metric Card、Data Table、Form Field、Tabs、Billing Card。
不适合模板：强游戏化、重动画、WebGL、纯单页 Portfolio。
```

---

## 19. Step 11：下游代码生成交接约束

必须为后续代码生成明确：

- 需要生成哪些页面。
- 哪些页面共享 layout。
- 哪些组件必须共享。
- 哪些数据结构必须复用。
- 哪些流程必须闭环。
- 哪些功能只做静态原型。
- 哪些功能不能伪装成真实后端。

---

## 20. 硬性规则

必须遵守：

1. 不要直接生成 Next.js / React 代码。
2. 不要直接选择最终模板。
3. 不要直接修改模板文件。
4. 不要直接生成 Design Token。
5. 不要把单页模板扩展为系统蓝图的唯一依据。
6. 不要忽略页面之间的流转关系。
7. 不要生成没有职责说明的页面列表。
8. 不要把所有推断都写成用户明确需求。
9. 不要设计真实数据库或后端 API 实现。
10. 不要在生产路径中声称已存在真实数据。
11. 不要创建过大的 MVP 范围。
12. 不要省略角色、路由、页面清单、用户流程、数据模型和跨页一致性规则。
13. 不要输出 JSON 作为主格式；最终输出必须是 Markdown。
14. 不要声称运行了未实际运行的验证。

---

## 21. 验证标准

### 21.1 P0：必须通过

- 输出文件存在。
- 输出为 Markdown。
- 包含系统摘要。
- 包含需求归一化。
- 包含系统类型和范围。
- 包含用户角色。
- 包含页面清单。
- 包含路由结构。
- 包含导航结构。
- 包含用户流程。
- 包含轻量数据模型。
- 包含跨页一致性规则。
- 包含模板组合交接输入。
- 包含假设与不确定项。
- 未生成代码。
- 未选择最终模板。

### 21.2 P1：应该通过

- 页面之间的入口和出口清晰。
- P0/P1/P2 页面优先级合理。
- 路由命名稳定且适合 Next.js。
- 用户流程闭环。
- 数据实体字段在相关页面间一致。
- 已区分公开页面、认证页面和 App 页面。
- 对复杂功能做了 MVP / Later 分层。

### 21.3 P2：加分项

- 明确模板不适配风险。
- 明确后续 Skill 10 的匹配维度。
- 明确跨页 QA 检查点。
- 对空状态、错误状态、加载状态做统一要求。
- 给出下游代码生成风险提示。

---

## 22. Codex 文件验证流程

写入输出文件后，Codex 应执行：

```bash
test -f outputs/system-blueprint.md
```

如果输出到其他路径，应替换为实际路径。

然后检查必要章节，可用：

```bash
grep -q "# System Blueprint" outputs/system-blueprint.md
grep -q "## 1. 输入摘要" outputs/system-blueprint.md
grep -q "## 4. 用户角色" outputs/system-blueprint.md
grep -q "## 5. 页面清单" outputs/system-blueprint.md
grep -q "## 6. 路由结构" outputs/system-blueprint.md
grep -q "## 8. 用户流程" outputs/system-blueprint.md
grep -q "## 9. 轻量数据模型" outputs/system-blueprint.md
grep -q "## 11. 模板组合交接输入" outputs/system-blueprint.md
```

如果使用不同输出路径，必须替换路径。

如果检查失败，必须修复 Markdown 文件后重新检查。

---

## 23. 最终输出契约

最终生成的 Markdown 文件必须使用以下结构：

````markdown
# System Blueprint

## 1. 输入摘要

- 需求来源：对话 / `inputs/user-requirement.md` / 其他
- 产品 / 系统名称：
- 系统类型：
- 目标用户：
- 核心目标：
- 技术目标：
- 明确需求：
- 推断需求：
- 当前假设：

## 2. 需求归一化

| 维度 | 内容 | 来源类型 |
|---|---|---|
| Product Type |  | Explicit / Inferred / Assumed |
| Product Goal |  |  |
| Target Users |  |  |
| Core Features |  |  |
| Required Pages |  |  |
| Style Preferences |  |  |
| Technical Target |  |  |

## 3. 系统类型与范围

### 3.1 系统类型

...

### 3.2 MVP 范围

- ...

### 3.3 本次不包含

- ...

### 3.4 后续扩展

- ...

## 4. 用户角色

| Role | 目标 | 主要任务 | 可访问页面 | 不应访问页面 | 备注 |
|---|---|---|---|---|---|
| Visitor |  |  |  |  |  |

## 5. 页面清单

| Page ID | Route | Page Type | Surface | Purpose | Primary Role | Entry Points | Next Actions | Priority |
|---|---|---|---|---|---|---|---|---|
| landing | / | Landing Page | Marketing |  | Visitor |  |  | P0 |

### 5.1 页面详情

#### page-id

- Route：
- Page Type：
- Surface：Marketing / Auth / App / Admin / Content
- Purpose：
- Primary Role：
- Required Sections：
- Required Components：
- Data Needs：
- State Needs：
- Entry Points：
- Exit / Next Actions：
- Template Need：
- Priority：P0 / P1 / P2

## 6. 路由结构

```text
/
/login
/app
/app/dashboard
```

### 6.1 路由说明

| Route | Page | Layout | Auth Requirement | Dynamic Params |
|---|---|---|---|---|
| / | landing | MarketingLayout | public | - |

## 7. 导航结构

### 7.1 Marketing Navigation

- ...

### 7.2 Auth Navigation

- ...

### 7.3 App Navigation / Sidebar

- ...

### 7.4 Footer Navigation

- ...

### 7.5 Breadcrumb 规则

- ...

## 8. 用户流程

### 8.1 Flow Name

- Actor：
- Goal：
- Entry Page：
- Steps：
  1. ...
  2. ...
- Success State：
- Failure / Empty State：
- Exit Page：

## 9. 轻量数据模型

| Entity | Purpose | Key Fields | Appears On Pages | Related Entities | CRUD Needs |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 10. 跨页一致性规则

### 10.1 Layout Consistency

- ...

### 10.2 Navigation Consistency

- ...

### 10.3 Design System Consistency

- ...

### 10.4 Component Reuse Consistency

- ...

### 10.5 Data Model Consistency

- ...

### 10.6 Interaction / State Consistency

- ...

### 10.7 Terminology Consistency

- ...

## 11. 模板组合交接输入

### 11.1 Visual Anchor Need

- ...

### 11.2 Page Template Needs

| Page ID | Template Type Needed | Key Layout Need | Functional Pattern Need | Notes |
|---|---|---|---|---|
|  |  |  |  |  |

### 11.3 Component Pattern Needs

- ...

### 11.4 Style Unification Rules

- ...

### 11.5 Template Matching Constraints

- ...

## 12. 代码生成交接约束

- 必须生成的页面：
- 共享 Layout：
- 共享组件：
- 共享数据结构：
- 静态原型范围：
- 禁止伪装的真实能力：

## 13. 跨页 QA 检查点

- 路由是否完整：
- 导航是否闭环：
- CTA 是否指向正确页面：
- 页面风格是否统一：
- 数据字段是否一致：
- 空 / 加载 / 错误状态是否统一：

## 14. 假设与不确定项

| 项目 | 当前假设 | 影响 | 后续确认方式 |
|---|---|---|---|
|  |  |  |  |

## 15. 自检清单

```text
[ ] 输出为 Markdown
[ ] 未生成代码
[ ] 未选择最终模板
[ ] 页面清单完整
[ ] 路由结构完整
[ ] 用户流程闭环
[ ] 数据模型字段一致
[ ] 跨页一致性规则明确
[ ] 已提供模板组合交接输入
[ ] 已标注假设与不确定项
```
````

---

## 24. Codex 最终回复格式

Codex 完成后，最终回复必须使用：

```text
已完成：
- 已生成 System Blueprint Markdown。
- 已写入：...

已验证：
- 文件存在：通过 / 未通过
- 必要章节：通过 / 未通过
- 未生成代码：是
- 未选择最终模板：是

风险与说明：
- ...
```

如果无法完成：

```text
未完成：
- 原因：...

已完成：
- ...

需要用户提供：
- ...
```
