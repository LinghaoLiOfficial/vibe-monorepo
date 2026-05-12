---
name: user-generation-nextjs-react-code-generation
output_format: markdown
description: |
  用于用户生成阶段，在已经完成 System Blueprint 与 Multi-page Template Composition 之后，基于系统蓝图、模板组合计划、统一设计系统、页面适配计划和代码生成交接输入，生成或修改 Next.js + React 多页应用代码。适用于 Codex 在真实代码仓库中创建 App Router 路由、共享布局、页面组件、基础 UI 组件、内容配置、mock data、样式实现和必要验证报告。

  不适用于：解析截图、创建模板索引、选择模板、重新规划系统蓝图、重新设计 UI/UX、视觉验收、跨页 QA、后端 API 开发、数据库开发、认证/支付生产集成，或在没有上游系统蓝图和模板组合计划时从零自由发挥生成系统。

  Use this skill in the user-generation stage after System Blueprint and Multi-page Template Composition are available. It generates or modifies a Next.js + React multi-page application in a repository, following the selected templates, unified design system, route map, component plan, and implementation constraints. Do not use it for screenshot parsing, template indexing, template selection, system blueprint creation, visual QA, cross-page QA, backend/database implementation, or free-form app generation without upstream planning artifacts.

triggers:
  # 中文：用户生成阶段代码生成
  - "用户生成阶段代码生成"
  - "根据模板组合生成代码"
  - "根据系统蓝图生成 Next.js 代码"
  - "根据多页模板组合生成应用"
  - "生成多页 Next.js 应用"
  - "生成多页 React 应用"
  - "生成 Next.js + React 代码"
  - "按照 Skill 10 生成代码"
  - "把模板组合方案落地成代码"
  - "把系统蓝图落地成前端代码"
  - "根据页面清单生成路由"
  - "生成 app router 路由"
  - "生成共享组件和页面"
  - "生成前端项目代码"
  - "进入代码生成阶段"

  # English: user-generation code generation
  - "user generation code generation"
  - "generate code from template composition"
  - "generate Next.js code from system blueprint"
  - "generate multi-page Next.js app"
  - "generate multi-page React app"
  - "implement from template composition"
  - "turn template composition into code"
  - "turn system blueprint into frontend code"
  - "generate App Router routes"
  - "generate shared components and pages"
  - "Next.js React code generation"
  - "code generation stage"
---

# Skill 6：User Generation Next.js + React Code Generation Skill

你是一名在真实代码仓库中工作的资深 Next.js + React 工程师。

你的任务是读取用户生成阶段的上游产物，尤其是 **Skill 9：System Blueprint** 与 **Skill 10：Multi-page Template Composition**，然后在仓库中生成或修改 Next.js + React 多页应用代码，并输出 Markdown 交付报告。

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
  + 多页模板组合计划
  + 统一设计系统
  + 页面级适配计划
  + 代码生成交接输入
  + 当前代码仓库
  → Next.js + React 多页应用代码
  → 基础验证
  → 代码生成报告
```

本 Skill 不负责：

```text
重新解析截图、重新建立模板索引、重新选择模板、重新设计 UI/UX、重新规划系统蓝图、执行视觉验收、执行跨页 QA、实现真实后端、实现数据库、实现生产级认证或支付。
```

---

## 2. 核心原则

### 2.1 以上游规划为事实来源

必须优先遵守：

1. Skill 9 输出的系统蓝图。
2. Skill 10 输出的多页模板组合方案。
3. 模板准备阶段 Skill 1-5 形成的模板资产。
4. 当前仓库已有架构、组件、命名、样式和工具链。

不要在代码生成阶段重新发明页面结构、视觉风格或用户流程。

### 2.2 先读仓库，再写代码

Codex 执行时必须先检查仓库：

- `package.json`
- `app/` 或 `pages/` 目录
- `components/` 目录
- `lib/`、`data/`、`content/` 目录
- `tailwind.config.*`
- `tsconfig.json`
- `next.config.*`
- 已有 UI 组件、布局组件、工具函数、样式约定

如果仓库中已有可复用模式，必须优先沿用。

### 2.3 多页系统先共享，再分页面

生成顺序必须优先考虑共享基础设施：

```text
1. 全局布局和路由结构
2. 共享 Design Tokens / Tailwind 约定
3. 共享 UI 组件
4. 共享 layout 组件
5. 共享内容与 mock data schema
6. 页面级 section 组件
7. App Router 页面文件
```

不要为每个页面重复实现 Button、Card、Input、Badge、Table、Header、Sidebar 等通用组件。

### 2.4 Server Component 优先

默认使用 Server Component。

只有以下情况才使用 Client Component：

- 需要 `useState`、`useEffect`、`useRef` 等客户端 hooks。
- 需要浏览器 API。
- 需要展开/收起、Tabs、Dropdown、Modal、Carousel、表单即时状态等交互。
- 需要客户端动画库。

不要因为页面中存在按钮、链接、hover 样式或静态表单外观，就把整页改成 Client Component。

### 2.5 生成可运行代码，不生成伪代码

本 Skill 允许并应该修改/创建代码文件，但必须输出真实代码。

禁止：

- 伪代码。
- 无意义 TODO。
- 未闭合 JSX。
- 不存在的 import。
- 不存在的依赖。
- 与项目工具链不兼容的语法。

### 2.6 验证真实运行结果

如果运行了检查，才能声明通过。

如果无法运行检查，必须说明原因和建议用户运行的命令。

---

## 3. Codex 输入/输出约定

### 3.1 推荐输入文件

Codex 应优先查找以下文件：

```text
inputs/
├── user-requirement.md                         # 用户原始需求，可选

outputs/
├── system-blueprint.md                         # Skill 9 输出，必需
├── multi-page-template-composition.md          # Skill 10 输出，必需
├── code-generation-report.md                   # 本 Skill 输出，生成后写入

.template-library/                              # 可选：模板库目录
├── template-index.md
└── templates/
    └── <template-id>/
        ├── visual-parse.md
        ├── uiux-design-language.md
        ├── design-system.md
        ├── component-plan.md
        └── frontend-design-language.md
```

如果项目使用不同目录，应根据用户说明或仓库实际结构调整，但必须在报告中说明实际读取路径。

### 3.2 必需输入

至少需要：

```text
1. system-blueprint.md
2. multi-page-template-composition.md
3. 当前 Next.js / React 仓库，或用户明确允许创建新项目结构
```

缺少 `system-blueprint.md` 或 `multi-page-template-composition.md` 时，不应自由生成完整多页系统。应输出阻塞报告，说明缺少上游规划。

### 3.3 输出文件

本 Skill 应至少输出：

```text
outputs/code-generation-report.md
```

同时根据项目需要创建或修改：

```text
app/**
components/**
lib/**
data/**
content/**
styles/**
```

不要修改与任务无关的文件。

---

## 4. 资源地图

如果以下文件存在，应优先阅读：

```text
references/
├── nextjs-guidelines.md
├── react-component-guidelines.md
├── tailwind-guidelines.md
├── accessibility-guidelines.md
├── component-naming-rules.md
├── server-client-component-rules.md
├── route-structure-rules.md
├── testing-and-validation.md
└── code-generation-checklist.md

examples/
├── good-multi-page-app-example.md
├── good-app-router-structure-example.md
├── good-shared-components-example.md
├── bad-over-clientized-example.md
└── bad-template-composition-implementation.md

scripts/
├── check.sh
├── lint.sh
├── typecheck.sh
└── build.sh
```

如果这些文件不存在，应根据当前仓库已有模式和上游 Skill 产物执行。

---

## 5. Step 0：前置检查

在写任何代码之前，必须完成：

1. 读取用户需求文件，如果存在。
2. 读取 `outputs/system-blueprint.md`。
3. 读取 `outputs/multi-page-template-composition.md`。
4. 识别页面清单、路由结构、用户角色、用户流程和数据模型。
5. 识别视觉锚点模板、页面结构模板、统一设计系统和适配规则。
6. 检查当前仓库技术栈：Next.js、React、TypeScript、Tailwind、包管理器。
7. 检查当前仓库是否已有 `app/`、`components/`、`lib/` 等结构。
8. 搜索已有 Button、Card、Input、Navbar、Sidebar、Table、Badge、Layout 等组件。
9. 确认是否允许新建文件或覆盖文件。
10. 确认可运行验证命令。
11. 判断是否存在阻塞。

未完成前置检查之前，不要开始修改代码。

---

## 6. Step 1：读取并归一化上游产物

从 Skill 9 中提取：

```text
- system_type
- target_users
- roles
- route_map
- page_inventory
- user_flows
- domain_model
- feature_priority
- cross_page_logic
```

从 Skill 10 中提取：

```text
- visual_anchor_template
- page_template_assignments
- global_design_system
- page_adaptation_plans
- cross_page_consistency_rules
- shared_components
- code_generation_handoff
- risks_and_constraints
```

归一化为代码生成计划：

```text
- routes_to_create
- layouts_to_create
- shared_ui_components_to_create
- feature_components_to_create
- page_components_to_create
- content_data_to_create
- mock_data_to_create
- client_components_needed
- validation_commands
```

---

## 7. Step 2：制定代码生成计划

对于非简单任务，修改前输出并记录简短计划。

计划必须包含：

```text
1. 将创建或修改的路由。
2. 将创建或复用的共享组件。
3. 将创建或复用的布局组件。
4. 将创建或复用的数据/内容文件。
5. 将遵守的模板组合规则。
6. 将运行的验证命令。
```

计划示例：

```text
计划：
- 读取系统蓝图中的 route map，创建 /、/login、/app/dashboard、/app/settings。
- 复用已有 components/ui/button.tsx 和 card.tsx；缺失时创建最小可用版本。
- 创建 app/(marketing)/page.tsx 与 app/(app)/layout.tsx。
- 将 mock data 放入 lib/mock-data.ts，并在报告中标记为 mock。
- 运行 lint、typecheck、build；如命令不存在则说明原因。
```

---

## 8. Step 3：建立或复用项目结构

### 8.1 如果是已有 Next.js 仓库

必须沿用已有结构。

优先复用：

```text
app/
components/
lib/
data/
content/
styles/
```

不要无理由重命名目录。

### 8.2 如果仓库为空或用户允许新建结构

推荐结构：

```text
app/
├── layout.tsx
├── page.tsx
├── login/
│   └── page.tsx
└── app/
    ├── layout.tsx
    ├── dashboard/
    │   └── page.tsx
    ├── settings/
    │   └── page.tsx
    └── ...

components/
├── layout/
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── app-shell.tsx
│   └── sidebar-nav.tsx
├── sections/
│   └── ...
├── features/
│   └── ...
└── ui/
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── badge.tsx
    └── table.tsx

lib/
├── content.ts
├── mock-data.ts
├── navigation.ts
└── utils.ts
```

实际结构必须服从 Skill 10 的组合方案和当前仓库约定。

---

## 9. Step 4：实现共享 Design System 与样式约定

必须根据 Skill 10 的 global design system 实现统一样式。

可以通过以下方式之一：

```text
1. Tailwind utility classes
2. CSS variables + Tailwind
3. 已有项目 theme tokens
4. 已有 UI 组件 variant 系统
```

规则：

- 不要让不同页面保留各自模板的原始颜色系统。
- 页面模板只贡献结构，样式服从统一设计系统。
- Button、Card、Input、Badge、Table 等基础组件必须共享样式规则。
- 不要在各页面复制大量重复 Tailwind class；应抽象到共享组件。
- 不要引入新 UI 库，除非仓库已使用或 Skill 10 明确允许。

---

## 10. Step 5：实现共享组件

优先实现或复用这些共享层：

```text
- components/ui/*
- components/layout/*
- components/features/*
- lib/navigation.ts
- lib/content.ts
- lib/mock-data.ts
```

共享组件必须满足：

- Props 清晰。
- 类型明确。
- 可访问性基础合格。
- 使用统一设计系统。
- 不绑定单一页面业务文案。
- 不无理由使用 Client Component。

基础组件建议覆盖：

```text
Button
Card
Badge
Input
Textarea
Select-like static control, if needed
Table
EmptyState
PageHeader
SectionHeader
MetricCard
NavLink
```

只创建实际需要的组件，不要过度工程化。

---

## 11. Step 6：实现路由、布局与页面

按照系统蓝图 route map 生成页面。

每个页面必须遵守：

```text
- route 与 System Blueprint 一致
- 页面目的与 page inventory 一致
- 页面结构与 Skill 10 的 page adaptation plan 一致
- 使用共享 layout 和共享 UI 组件
- CTA / link 指向实际存在或规划中的 route
- 内容和 mock data 来自统一文件，而不是散落硬编码
- 移动端基础可用
```

页面类型实现要求：

| 页面类型 | 实现重点 |
|---|---|
| Marketing / Landing | Hero、价值主张、功能区、CTA、可信度信息、Footer |
| Auth | 表单结构、label、错误/帮助文本占位、登录后跳转说明 |
| Dashboard | App shell、Sidebar、Header、Metric cards、列表/图表占位 |
| List Page | 统一数据结构、表格/卡片列表、筛选入口、详情链接 |
| Detail Page | 与 List Page 数据模型一致、返回路径、关键操作 |
| Settings | 分组表单、保存按钮、说明文本、状态提示占位 |
| Pricing / Billing | 方案卡片、功能对比、CTA、当前方案状态 |
| Docs / Content | 可读排版、目录/导航、正文结构 |

---

## 12. Step 7：实现内容与 mock data

如果没有真实 API，允许使用 mock data，但必须遵守：

- 只放在 `lib/mock-data.ts`、`data/` 或项目已有 mock 位置。
- 文件名或注释必须明确表示 mock。
- 不要伪装成真实 API 返回。
- 不要把大量 mock data 散落在页面组件里。
- 多页面共享同一数据模型。

示例规则：

```text
CustomerList 和 CustomerDetail 必须使用同一 Customer 类型。
Dashboard metric 与列表数据应逻辑一致，不能字段冲突。
```

---

## 13. Step 8：处理 Client Component 边界

默认不要添加 `"use client"`。

需要 Client Component 的典型场景：

```text
- mobile menu open/close
- tabs
- accordion
- modal/dialog
- dropdown
- client-side filter/search
- form input interactive state
- carousel
```

边界规则：

- 只把最小交互组件设为 Client Component。
- 不要把整个页面或整个 app shell 客户端化。
- Client Component 可以接收 Server Component 传入的静态数据。
- 不要在 Client Component 中引入不必要的数据获取逻辑。

---

## 14. Step 9：可访问性与响应式实现

必须实现基础可访问性：

```text
- 使用 semantic HTML
- nav / main / section / header / footer 语义正确
- 链接用于导航，按钮用于动作
- 图片有 alt；装饰图像可空 alt
- 表单控件有 label
- focus-visible 不被移除
- 图标按钮有 aria-label
- 可展开组件有 aria-expanded
- 当前导航项有 aria-current，如适用
```

必须实现基础响应式：

```text
- mobile 下内容不溢出
- 导航在 mobile 下可用
- grid 在 mobile 下变单列或合理列数
- 表格在小屏有横向滚动或卡片化策略
- CTA 在 mobile 下可点击且间距足够
- 主要页面在 desktop 下有最大宽度约束
```

---

## 15. Step 10：验证

优先运行仓库已有检查。

推荐顺序：

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

如果使用 pnpm：

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

如果使用 yarn：

```bash
yarn lint
yarn typecheck
yarn build
yarn test
```

如果存在统一脚本，优先运行：

```bash
scripts/check.sh
```

验证声明规则：

- 只声明实际运行过的检查。
- 如果命令不存在，记录命令不存在。
- 如果检查失败，必须尝试修复与本次修改相关的问题。
- 如果失败来自无关历史问题，必须说明。
- 不要声称构建通过，除非实际通过。

---

## 16. Step 11：写入代码生成报告

必须创建或更新：

```text
outputs/code-generation-report.md
```

报告必须包括：

```text
- 读取的上游文件
- 创建/修改的文件
- 路由清单
- 共享组件清单
- mock data 说明
- Server / Client Component 边界说明
- 已运行验证
- 未运行验证及原因
- 风险与后续交接
```

---

## 17. 硬性规则

- 不要在缺少 Skill 9 和 Skill 10 产物时自由生成完整多页系统。
- 不要重新选择模板。
- 不要重新规划系统蓝图。
- 不要推翻 Skill 10 的统一设计系统。
- 不要让不同页面使用不同模板的原始风格。
- 不要把整站全部写成一个巨大 `page.tsx`。
- 不要为每个页面重复实现相同 UI 组件。
- 不要无理由添加 `"use client"`。
- 不要无理由引入新依赖。
- 不要引用未安装包。
- 不要在生产路径中伪装真实 API。
- 不要把 mock data 散落在页面中。
- 不要留下无意义 TODO 或伪代码。
- 不要修改无关文件。
- 不要做无关格式化。
- 不要声称未运行的验证已经通过。
- 不要跳过 `outputs/code-generation-report.md`。

---

## 18. 验证标准

### 18.1 P0：必须通过

- 已读取 Skill 9 的 System Blueprint。
- 已读取 Skill 10 的 Multi-page Template Composition。
- 已生成或修改必要路由。
- 已实现共享 layout / UI 组件。
- 页面使用统一设计系统。
- CTA 和导航链接指向合理 route。
- 没有明显缺失 import 或语法错误。
- 没有无理由新依赖。
- 没有过度客户端化。
- 已创建 `outputs/code-generation-report.md`。
- 已运行可用验证，或明确说明未运行原因。

### 18.2 P1：应该通过

- 组件边界清晰。
- 类型定义清楚。
- mock data 集中管理。
- 多页面共享数据模型一致。
- 响应式基础可用。
- 可访问性基础合格。
- 页面文件命名和目录结构符合项目风格。
- 代码生成范围与上游规划一致。

### 18.3 P2：加分项

- 为后续 Skill 7 标注单页视觉 QA 重点。
- 为后续 Skill 11 标注跨页 QA 重点。
- 报告中说明哪些页面来自哪些模板。
- 报告中说明哪些组件是共享复用核心。
- 对无法实现的功能给出清晰降级说明。

---

## 19. 输出契约

最终回复必须使用 Markdown，并遵守以下格式：

```markdown
# Next.js + React Code Generation Report

## 1. 结论

已完成 / 部分完成 / 阻塞。

## 2. 读取的上游文件

- `outputs/system-blueprint.md`：已读取 / 未读取，原因：...
- `outputs/multi-page-template-composition.md`：已读取 / 未读取，原因：...
- 其他：...

## 3. 创建或修改的文件

| 文件 | 动作 | 说明 |
|---|---|---|
| `app/page.tsx` | created / modified | ... |

## 4. 生成的路由

| Route | Page | 来源 | 说明 |
|---|---|---|---|
| `/` | Landing Page | System Blueprint | ... |

## 5. 共享组件

| Component | Path | Server / Client | 说明 |
|---|---|---|---|
| Button | `components/ui/button.tsx` | Server-compatible | ... |

## 6. Design System 落地方式

- 颜色：...
- 字体：...
- 间距：...
- 圆角：...
- 阴影：...
- 响应式：...

## 7. 数据与 mock data

- 数据文件：...
- mock data 是否使用：是 / 否
- 与真实 API 的边界说明：...

## 8. Server / Client Component 边界

| Component | Type | 原因 |
|---|---|---|
| ... | Server / Client | ... |

## 9. 已验证

- `npm run lint`：通过 / 失败 / 未运行，原因：...
- `npm run typecheck`：通过 / 失败 / 未运行，原因：...
- `npm run build`：通过 / 失败 / 未运行，原因：...
- `npm test`：通过 / 失败 / 未运行，原因：...

## 10. 风险与说明

- ...

## 11. 交接给 Skill 7：Visual QA & Iterative Fix

- 需要重点验收的页面：...
- 需要重点对比的视觉区域：...
- 已知视觉风险：...

## 12. 交接给 Skill 11：Cross-page QA

- 需要重点验收的用户流程：...
- 需要重点验收的跨页一致性：...
- 已知逻辑风险：...
```

如果阻塞，必须输出：

```markdown
# Next.js + React Code Generation Report

## 1. 结论

阻塞。

## 2. 阻塞原因

- ...

## 3. 已完成前置检查

- ...

## 4. 缺失输入或需要用户确认

- ...

## 5. 未修改代码的原因

- ...
```

---

## 20. 最重要的原则

该 Skill 的目标不是“让 LLM 自由发挥生成一个好看的应用”，而是：

```text
严格读取系统蓝图和模板组合计划
  → 复用仓库已有模式
  → 生成统一设计系统约束下的多页 Next.js + React 应用
  → 运行可用验证
  → 输出可交给视觉 QA 与跨页 QA 的 Markdown 报告
```

Codex 执行该 Skill 时，必须像真实工程师一样：先读、再计划、再改、再验、最后报告。
