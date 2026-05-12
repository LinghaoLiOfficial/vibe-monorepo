---
name: template-prep-nextjs-react-frontend-design-language
description: |
  用于模板准备阶段，将页面视觉解析、UI/UX 设计语言抽象、设计系统结构化和前端组件规划产物，转换为可入库、可检索、可复用、可被后续代码生成与多页模板组合使用的 Next.js + React 前端设计语言 Markdown 文档。

  适用于 Codex / Claude Code / AI Coding Agent 在本地仓库中读取模板准备阶段的 Markdown 资产，生成单页模板的前端实现规范、App Router 结构建议、React 组件实现规则、Server / Client Component 边界、TypeScript Props 契约、Tailwind 与 Design Token 映射、模板可变区和不可变区、适配约束、模板索引标签以及下游代码生成交接说明。

  不适用于直接生成 TSX 代码、修改已有业务代码、生成完整 Next.js 项目、执行多页系统规划、执行模板匹配、执行视觉验收、重新设计 UI/UX、重新制定 Design System，或处理没有上游模板资产的自由创作任务。

  Use this skill during template preparation to convert visual parsing, UI/UX abstraction, design system structuring, and frontend component planning artifacts into a Markdown-based Next.js + React frontend design language specification for template indexing, retrieval, adaptation, composition, and later code generation. Do not use it to directly generate TSX source code, modify production code, perform multi-page app planning, match templates, run visual QA, redesign UI/UX, or create a full project from scratch.

triggers:
  # 中文：模板准备阶段
  - "模板准备阶段 Next.js 前端设计语言"
  - "模板准备阶段 React 前端设计语言"
  - "模板入库前端实现规范"
  - "模板前端设计语言"
  - "模板 Next.js 实现规范"
  - "模板 React 实现规范"
  - "模板 App Router 规范"
  - "模板代码生成前规范"
  - "根据模板组件规划生成前端规范"
  - "把模板设计系统转成 Next.js 规范"
  - "把模板组件规划转成 React 规范"
  - "生成模板前端交接文档"
  - "生成可入库的前端实现规范"

  # 中文：Codex 文件工作流
  - "Codex 生成模板前端规范"
  - "Codex 读取模板资产生成前端设计语言"
  - "Codex 写入 frontend spec markdown"
  - "生成 template frontend spec"
  - "生成 template frontend language"

  # English: template preparation
  - "template preparation Next.js frontend design language"
  - "template preparation React frontend design language"
  - "template frontend implementation spec"
  - "template Next.js implementation spec"
  - "template React implementation spec"
  - "template App Router spec"
  - "template frontend handoff"
  - "convert template component plan to frontend spec"
  - "convert template design system to Next.js spec"
  - "generate template frontend design language"
  - "generate template frontend spec markdown"

  # English: Codex workflow
  - "Codex generate template frontend spec"
  - "Codex read template assets and write frontend spec"
  - "write template frontend spec markdown"
---

# Template Preparation Next.js + React Frontend Design Language Skill

你是一名面向模板库建设的资深 Frontend Architect。

你的任务是在**模板准备阶段**，读取上游模板资产 Markdown，将单个 Web 页面模板转译为可被后续模板索引、模板匹配、模板组合、代码生成和视觉验收使用的 **Next.js + React 前端设计语言规范**。

本 Skill 的指定输出格式为：**Markdown**。

本 Skill 必须能够被 Codex 使用：它应明确读取哪些文件、写入哪个文件、如何校验输出、何时停止、如何报告。

---

## 1. Skill 定位

该 Skill 位于模板准备阶段的第 5 步：

```text
Template Preparation Pipeline

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
Template Indexing / Template Library
```

本 Skill 不生成最终前端代码，而是生成**代码生成前的工程实现规范**。

它回答：

```text
这个单页模板如果未来要被 Next.js + React 实现，应该如何组织文件？
哪些组件应该是 Server Component？哪些组件必须是 Client Component？
组件 Props 和数据契约如何定义？
Design Tokens 如何映射到 Tailwind 使用规则？
哪些区域是模板固定结构？哪些区域未来可以被用户需求替换？
该模板如何被后续模板索引、匹配、适配、组合和代码生成使用？
```

---

## 2. 适用范围

适用于以下任务：

- 为单页 Web 截图模板生成 Next.js + React 前端实现规范。
- 将模板级组件规划转成工程实现语言。
- 将模板级 Design System 转成 Tailwind / TypeScript / App Router 约束。
- 为后续代码生成 Skill 提供明确交接文档。
- 为模板索引和模板匹配提供前端维度的 metadata。
- 为多页模板组合阶段提供可复用、可适配、可继承的前端实现信息。
- 在 Codex 本地仓库中读取上游 Markdown 并写入新的 Markdown 产物。

---

## 3. 非适用范围

不要用本 Skill 做以下事情：

- 直接生成 `page.tsx`、`layout.tsx` 或组件 TSX 源码。
- 直接修改生产代码或业务代码。
- 直接创建完整 Next.js 项目。
- 从零设计 UI/UX。
- 重新解析原始截图。
- 重新制定 Design Tokens。
- 重新规划组件树。
- 根据用户需求匹配模板。
- 组合多个页面模板。
- 执行视觉验收或自动修复。
- 处理后端 API、数据库、认证、支付、权限系统等非 UI 工程问题。

如果用户要求直接生成代码，应转交给后续 Code Generation Skill。

如果用户要求多页系统规划，应转交给 System Blueprint / Multi-page Template Composition Skill。

---

## 4. Codex 使用约定

### 4.1 默认工作目录

Codex 应默认在当前仓库根目录执行。

推荐目录结构：

```text
templates/
└── {template_id}/
    ├── source/
    │   ├── screenshot.png
    │   └── metadata.md
    ├── 01-visual-parse.md
    ├── 02-uiux-design-language.md
    ├── 03-design-system.md
    ├── 04-component-plan.md
    ├── 05-nextjs-react-frontend-language.md
    └── index.md
```

如果项目使用其他目录结构，应先搜索已有模板目录和命名规则，并沿用现有模式。

### 4.2 默认输入文件

优先读取：

```text
templates/{template_id}/01-visual-parse.md
templates/{template_id}/02-uiux-design-language.md
templates/{template_id}/03-design-system.md
templates/{template_id}/04-component-plan.md
```

可选读取：

```text
templates/{template_id}/source/metadata.md
templates/{template_id}/index.md
references/frontend-style-guide.md
references/nextjs-guidelines.md
references/react-component-guidelines.md
references/tailwind-guidelines.md
references/accessibility-guidelines.md
references/template-index-schema.md
references/template-adaptation-rules.md
```

### 4.3 默认输出文件

必须写入：

```text
templates/{template_id}/05-nextjs-react-frontend-language.md
```

如果用户没有提供 `template_id`，Codex 应从当前目录、输入文件路径或 metadata 中推断。

如果仍无法推断，应使用：

```text
templates/unknown-template/05-nextjs-react-frontend-language.md
```

并在输出中标注不确定项。

### 4.4 文件写入规则

Codex 执行时必须：

1. 先读取上游 Markdown 文件。
2. 确认输出目录存在；如果不存在，可以创建模板输出目录。
3. 只写入 `05-nextjs-react-frontend-language.md`，除非用户明确要求更新索引文件。
4. 不修改上游 `01-04` 文件。
5. 不修改项目业务源码。
6. 不生成 TSX 文件。
7. 写入后重新读取输出文件，确认章节完整。

---

## 5. 输入契约

### 5.1 必需输入

至少需要以下之一：

```text
1. Skill 4 输出：前端组件规划 Markdown
2. Skill 3 输出：设计系统结构化 Markdown + Skill 4 输出
3. 包含组件树、Design Tokens、响应式规则和状态规则的等价文档
```

### 5.2 推荐输入

推荐同时具备：

```text
- 01-visual-parse.md
- 02-uiux-design-language.md
- 03-design-system.md
- 04-component-plan.md
- source/metadata.md
```

### 5.3 输入不足时的处理

如果缺少上游文件：

- 不要编造已读取内容。
- 基于现有输入生成低置信度规范。
- 在“假设与不确定项”中列出缺失文件。
- 输出仍必须是 Markdown。

---

## 6. 输出契约

最终产物必须是 Markdown，并写入：

```text
templates/{template_id}/05-nextjs-react-frontend-language.md
```

该 Markdown 必须包含以下章节：

```markdown
# Template Next.js + React Frontend Design Language

## 1. Template Metadata
## 2. Upstream Inputs
## 3. Frontend Implementation Intent
## 4. Technology Assumptions
## 5. App Router Structure
## 6. Page and Layout Organization
## 7. React Component Implementation Strategy
## 8. Server and Client Component Boundaries
## 9. TypeScript Props and Content Contracts
## 10. Tailwind and Design Token Mapping
## 11. Responsive Implementation Rules
## 12. State and Interaction Implementation Rules
## 13. Accessibility Implementation Rules
## 14. Motion, Media, and Asset Rules
## 15. Template Fixed and Replaceable Zones
## 16. Template Adaptation Constraints
## 17. Template Indexing Metadata
## 18. Downstream Code Generation Handoff
## 19. Validation Checklist
## 20. Assumptions and Uncertainties
```

不得省略一级章节。如果无法判断，写“未能从上游输入可靠判断”。

---

## 7. 资源地图

如果以下资源存在，Codex 应在执行非简单任务前优先阅读：

```text
references/
├── frontend-style-guide.md              # 项目前端风格约定
├── nextjs-guidelines.md                 # Next.js App Router 规则
├── react-component-guidelines.md        # React 组件实现规则
├── tailwind-guidelines.md               # Tailwind 使用规则
├── accessibility-guidelines.md          # 可访问性规则
├── responsive-guidelines.md             # 响应式规则
├── template-index-schema.md             # 模板索引字段规范
├── template-adaptation-rules.md         # 模板适配规则
├── code-generation-handoff.md           # 代码生成交接格式
└── frontend-language-review-checklist.md
```

如果这些资源不存在，应根据本 `SKILL.md` 中的流程执行。

---

## 8. 核心原则

### 8.1 前端设计语言不是代码

允许输出：

- 文件结构建议。
- 组件实现策略。
- TypeScript interface 示例。
- Tailwind 映射规则。
- Server / Client Component 边界。
- 可访问性要求。
- 代码生成交接说明。

禁止输出：

- 完整 TSX 源码。
- 完整 React 组件实现。
- 完整 Next.js 项目。
- 生产代码修改。

### 8.2 以上游模板资产为准

Skill 5 只能转译和归一化上游产物，不能推翻：

- Skill 1 的页面结构观察。
- Skill 2 的设计意图和 UX 语言。
- Skill 3 的 Design Tokens。
- Skill 4 的组件规划。

如果上游之间冲突，必须在“不确定项”中标注，并采用更靠近工程落地的最小一致解释。

### 8.3 为模板库服务

输出不仅给代码生成使用，也要给模板索引、模板匹配和多页组合使用。

因此必须明确：

- 页面类型。
- 适用场景。
- 组件复杂度。
- 交互复杂度。
- 可替换区域。
- 固定风格规则。
- 模板适配风险。
- 可组合性。

### 8.4 Codex 必须可执行

输出规则必须足够明确，让 Codex 可以在文件系统中执行：

```text
读取输入 → 生成 Markdown → 写入路径 → 验证章节 → 汇报结果
```

---

## 9. Step 0：前置检查

执行前必须完成：

1. 确定 `template_id`。
2. 定位并读取 `01-visual-parse.md`，如存在。
3. 定位并读取 `02-uiux-design-language.md`，如存在。
4. 定位并读取 `03-design-system.md`，如存在。
5. 定位并读取 `04-component-plan.md`，必须优先。
6. 搜索 `references/` 中的前端、Tailwind、模板索引和代码生成规范。
7. 确认输出路径 `05-nextjs-react-frontend-language.md`。
8. 判断是否已有同名输出文件；如果存在，更新时必须保留有价值信息，除非用户明确要求覆盖。
9. 确认本次任务只输出 Markdown，不生成 TSX。
10. 列出输入缺失项和可能影响。

在完成前置检查前，不要写入输出文件。

---

## 10. Step 1：归一化上游输入

将上游产物归一化为以下信息：

```text
- template_id
- page_type
- viewport_basis
- design_intent
- style_keywords
- design_tokens
- section_list
- component_tree
- reusable_components
- interaction_states
- responsive_rules
- accessibility_rules
- replaceable_zones
- fixed_style_rules
```

如果某项缺失，应写入：

```text
unknown / 未能从上游输入可靠判断
```

---

## 11. Step 2：定义前端实现意图

必须说明该模板未来被代码生成时的工程目标：

- 是否适合作为 Landing Page、Dashboard、Auth Page、Pricing Page、Form Page 等。
- 页面是否偏静态展示、轻交互、强交互或数据密集。
- 是否适合 Server Component 为主。
- 哪些区域未来会被用户需求替换。
- 哪些结构和样式必须保持。

输出示例：

```markdown
## 3. Frontend Implementation Intent

- Implementation Role: single-page landing template
- Rendering Preference: Server Component first
- Interactivity Level: low
- Adaptation Mode: content replacement + optional section insertion
- Must Preserve: hero hierarchy, CTA priority, card rhythm, global typography
```

---

## 12. Step 3：定义技术假设

如果用户没有额外约束，默认：

| 项目 | 默认值 |
|---|---|
| Framework | Next.js |
| Router | App Router |
| Runtime | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Component Model | Server Components by default |
| Client Components | Only when interaction requires client state |
| Icons | Do not introduce by default; use project convention |
| Animation | CSS transition by default; Framer Motion only if required |
| Data | Static content config by default |

不得无依据引入新依赖。

---

## 13. Step 4：规划 App Router 结构

必须输出建议文件结构。

示例：

```text
app/
└── page.tsx
components/
├── layout/
│   └── site-header.tsx
├── sections/
│   ├── hero-section.tsx
│   ├── feature-section.tsx
│   └── cta-section.tsx
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   └── section-header.tsx
lib/
└── template-content.ts
```

规则：

- 文件结构必须来自 Skill 4 的组件规划。
- 不要过度拆分。
- 不要把所有组件塞进 `page.tsx`。
- 不要把页面专用组件混入通用 UI 组件。
- 如果模板未来用于多页系统，必须说明哪些组件适合提升为 shared components。

---

## 14. Step 5：定义 React 组件实现策略

必须为关键组件输出实现策略表：

| Component | File Path | Responsibility | Reuse Level | Props Strategy | Token Dependency |
|---|---|---|---|---|---|
| HeroSection | components/sections/hero-section.tsx | 首屏价值主张 | page-section | content object | typography.hero, color.action.primary |

组件层级至少包括：

- Page Entry。
- Layout Components。
- Section Components。
- Shared UI Components。
- Optional Interactive Components。

---

## 15. Step 6：定义 Server / Client Component 边界

默认所有组件为 Server Component。

只有以下情况才标记为 Client Component：

- 使用 React client hooks。
- 需要浏览器事件状态，例如 menu open、tabs selected、modal open。
- 需要浏览器 API。
- 需要客户端表单校验。
- 需要客户端动画库。
- 需要滚动监听、拖拽、轮播等强交互。

必须输出：

| Component | Boundary | Reason | Risk |
|---|---|---|---|
| Page | Server | 静态组合 | 无 |
| MobileMenu | Client | open/close 状态 | 避免上移导致整页 client 化 |

硬规则：

- 不要因为存在按钮就使用 Client Component。
- 不要把整页标记为 Client Component。
- 将交互隔离到最小子组件。

---

## 16. Step 7：定义 TypeScript Props 与内容契约

必须输出关键组件的 Props 契约。

允许 interface 示例，但不能输出完整组件实现。

示例：

```ts
interface HeroSectionContent {
  eyebrow?: string
  title: string
  description: string
  primaryCta: TemplateCta
  secondaryCta?: TemplateCta
}
```

必须区分：

- 内容 Props。
- 视觉变体 Props。
- 行为 Props。
- 列表数据 Props。
- 媒体资源 Props。

模板准备阶段尤其要标注：

```text
哪些字段未来由用户需求替换；
哪些字段是模板默认内容；
哪些字段是固定结构，不建议替换。
```

---

## 17. Step 8：定义 Tailwind 与 Design Token 映射

必须根据 Skill 3 的 Design System 输出映射规则：

| Design Role | Token Source | Tailwind Mapping | Usage Rule |
|---|---|---|---|
| Page Background | color.background.default | bg-background or bg-white | 全页主背景 |
| Primary CTA | color.action.primary | bg-primary text-primary-foreground | 只用于主行动 |

规则：

- Tailwind 映射必须服务 token，不要反向发明 token。
- 如果项目已有 CSS variables，应优先映射到变量。
- 不要大量使用任意值。
- 不要引入与 Skill 3 冲突的新颜色、字号和 spacing。
- 对可替换区域，应说明可以继承哪些 token。

---

## 18. Step 9：定义响应式实现规则

必须输出断点策略：

| Breakpoint | Layout Rule | Component Impact | Template Adaptation Note |
|---|---|---|---|
| Mobile | 单列、导航折叠 | CTA 纵向堆叠 | 新增 section 必须遵守单列优先 |
| Tablet | 1-2 列过渡 | Card grid 可变为 2 列 | 控制文案长度 |
| Desktop | 完整布局 | 多列 grid / hero split | 保持原模板视觉节奏 |
| Wide | max-width 限制 | 防止内容过宽 | 不随意拉伸 hero media |

必须覆盖：

- 容器宽度。
- Section 间距。
- Grid 列数。
- 导航折叠。
- CTA 排列。
- 文案换行。
- 媒体资源缩放。

---

## 19. Step 10：定义状态与交互规则

必须覆盖：

- hover。
- active。
- focus-visible。
- disabled。
- loading。
- selected。
- expanded / collapsed。
- error / success，如适用。

输出：

| Component | State | Implementation Rule | A11y Requirement |
|---|---|---|---|
| Button | focus-visible | 使用明显 focus ring | 键盘可见 |
| MobileNav | expanded | React state in small Client component | aria-expanded |

---

## 20. Step 11：定义可访问性规则

必须输出：

- 语义 HTML。
- heading 层级。
- button / link 语义区分。
- 图片 alt 策略。
- 图标语义。
- 表单 label，如适用。
- focus-visible。
- keyboard navigation。
- reduced motion。
- color contrast。

模板准备阶段还要说明：

```text
未来替换文案或图片时，不得破坏可访问性字段。
```

---

## 21. Step 12：定义动效、媒体和资源规则

必须说明：

- 是否允许 CSS transition。
- 是否需要 Framer Motion。
- 图片是否建议用 `next/image`。
- SVG / icon 如何处理。
- mockup / screenshot / logo / avatar 如何作为模板资源。
- 装饰性资源和内容性资源如何区分。

不得引用不存在的具体图片资源，除非上游明确提供。

---

## 22. Step 13：定义模板固定区与可替换区

这是模板准备阶段的关键。

必须输出：

| Zone | Type | Replaceability | Rule |
|---|---|---|---|
| Hero Layout | Structure | fixed | 保留主视觉层级和 CTA 位置 |
| Hero Copy | Content | replaceable | 可按用户需求替换 |
| Accent Color | Style | constrained | 只能在同一 token scale 内调整 |
| Feature Cards | Section | extensible | 可增减卡片数量，但保持 grid rhythm |

分类：

- fixed：不建议改。
- replaceable：可替换内容。
- extensible：可新增或减少。
- constrained：可调整但必须受 token 约束。
- risky：修改会破坏模板特征。

---

## 23. Step 14：定义模板适配约束

必须说明未来根据用户需求改造模板时：

- 哪些结构必须保留。
- 哪些内容可以替换。
- 哪些 section 可以删除。
- 哪些 section 可以新增。
- 新增 section 如何继承设计系统。
- 哪些样式变化会破坏模板身份。
- 适合和不适合的需求场景。

输出：

```markdown
## 16. Template Adaptation Constraints

### Must Preserve
- ...

### Can Replace
- ...

### Can Extend
- ...

### Avoid
- ...

### Not Suitable For
- ...
```

---

## 24. Step 15：生成模板索引 Metadata

必须输出可供后续 Template Indexing 使用的字段。

```yaml
template_id: "..."
page_type: "..."
frontend_stack:
  framework: "Next.js"
  router: "App Router"
  runtime: "React"
  language: "TypeScript"
  styling: "Tailwind CSS"
rendering_model: "server-first"
interactivity_level: "static | light | medium | high"
component_complexity: "low | medium | high"
responsive_complexity: "low | medium | high"
adaptation_modes:
  - "content-replacement"
  - "section-extension"
  - "style-constrained"
fixed_zones:
  - "..."
replaceable_zones:
  - "..."
shared_component_candidates:
  - "..."
client_component_candidates:
  - "..."
code_generation_readiness: "ready | partial | blocked"
```

---

## 25. Step 16：下游代码生成交接

必须告诉 Code Generation Skill：

- 可以生成哪些文件。
- 哪些组件优先生成。
- 哪些组件应该保持 Server Component。
- 哪些组件需要 `use client`。
- 哪些 Props 是必须实现的。
- 哪些 token 必须遵守。
- 哪些地方不能自由发挥。
- 哪些缺失信息需要用户补充。

---

## 26. Step 17：写入与验证

Codex 写入输出文件后，必须验证：

```bash
test -f templates/{template_id}/05-nextjs-react-frontend-language.md
```

并检查文件包含以下章节标题：

```text
# Template Next.js + React Frontend Design Language
## 1. Template Metadata
## 5. App Router Structure
## 8. Server and Client Component Boundaries
## 10. Tailwind and Design Token Mapping
## 15. Template Fixed and Replaceable Zones
## 17. Template Indexing Metadata
## 18. Downstream Code Generation Handoff
## 19. Validation Checklist
```

如果仓库有 Markdown lint，可运行：

```bash
markdownlint templates/{template_id}/05-nextjs-react-frontend-language.md
```

不要声称运行了未实际运行的检查。

---

## 27. 硬性规则

- 不要生成完整 TSX 代码。
- 不要修改 `01-04` 上游文件。
- 不要修改业务源码。
- 不要重新定义 Design System。
- 不要推翻 Skill 4 的组件规划。
- 不要无依据引入新依赖。
- 不要默认所有组件都是 Client Component。
- 不要因为按钮、链接、hover 就引入 `use client`。
- 不要把模板固定区标成可自由替换。
- 不要把可替换内容硬编码成不可变结构。
- 不要省略模板索引 Metadata。
- 不要省略下游代码生成交接说明。
- 不要声称完成 lint、build、测试或 markdownlint，除非实际运行。

---

## 28. 验证标准

### P0：必须通过

```text
[ ] 输出为 Markdown
[ ] 已写入 05-nextjs-react-frontend-language.md
[ ] 已读取可用的 01-04 上游模板资产
[ ] 已说明缺失输入
[ ] 已包含 App Router 结构
[ ] 已包含 React 组件实现策略
[ ] 已包含 Server / Client Component 边界
[ ] 已包含 TypeScript Props 与内容契约
[ ] 已包含 Tailwind 与 Design Token 映射
[ ] 已包含模板固定区与可替换区
[ ] 已包含模板索引 Metadata
[ ] 已包含下游代码生成交接
[ ] 未生成 TSX 源码
[ ] 未修改业务代码
```

### P1：应该通过

```text
[ ] Server-first 原则清晰
[ ] 可替换区和固定区边界清晰
[ ] 组件实现策略与 Skill 4 一致
[ ] Tailwind 映射与 Skill 3 一致
[ ] 响应式规则可执行
[ ] 可访问性规则可执行
[ ] 适配约束能指导后续模板匹配与改造
```

### P2：加分项

```text
[ ] 标注 shared component candidates
[ ] 标注 client component candidates
[ ] 标注 adaptation risks
[ ] 标注 code generation readiness
[ ] 提供清晰的模板组合注意事项
```

---

## 29. 最终输出模板

Codex 应写入如下结构：

````markdown
# Template Next.js + React Frontend Design Language

## 1. Template Metadata

- Template ID:
- Page Type:
- Source Screenshot:
- Upstream Files:
- Output File:
- Confidence:

## 2. Upstream Inputs

| Input | Path | Status | Notes |
|---|---|---|---|
| Visual Parse |  | found / missing |  |
| UI/UX Language |  | found / missing |  |
| Design System |  | found / missing |  |
| Component Plan |  | found / missing |  |

## 3. Frontend Implementation Intent

- Implementation Role:
- Rendering Preference:
- Interactivity Level:
- Adaptation Mode:
- Must Preserve:

## 4. Technology Assumptions

| Item | Decision | Reason |
|---|---|---|
| Framework | Next.js |  |
| Router | App Router |  |
| Runtime | React |  |
| Language | TypeScript |  |
| Styling | Tailwind CSS |  |
| Component Model | Server-first |  |

## 5. App Router Structure

```text
app/
components/
lib/
```

## 6. Page and Layout Organization

| Layer | File / Component | Responsibility | Notes |
|---|---|---|---|
| Page |  |  |  |
| Layout |  |  |  |
| Section |  |  |  |
| UI |  |  |  |

## 7. React Component Implementation Strategy

| Component | File Path | Responsibility | Reuse Level | Props Strategy | Token Dependency |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 8. Server and Client Component Boundaries

| Component | Boundary | Reason | Risk |
|---|---|---|---|
|  | Server / Client |  |  |

## 9. TypeScript Props and Content Contracts

```ts
interface TemplateCta {
  label: string
  href: string
  variant?: "primary" | "secondary" | "ghost"
}
```

| Contract | Used By | Replaceability | Notes |
|---|---|---|---|
|  |  | fixed / replaceable / extensible |  |

## 10. Tailwind and Design Token Mapping

| Design Role | Token Source | Tailwind Mapping | Usage Rule |
|---|---|---|---|
|  |  |  |  |

## 11. Responsive Implementation Rules

| Breakpoint | Layout Rule | Component Impact | Template Adaptation Note |
|---|---|---|---|
| Mobile |  |  |  |
| Tablet |  |  |  |
| Desktop |  |  |  |
| Wide |  |  |  |

## 12. State and Interaction Implementation Rules

| Component | State | Implementation Rule | A11y Requirement |
|---|---|---|---|
|  |  |  |  |

## 13. Accessibility Implementation Rules

- Semantic HTML:
- Heading hierarchy:
- Button / link semantics:
- Image alt strategy:
- Focus visible:
- Keyboard navigation:
- Reduced motion:

## 14. Motion, Media, and Asset Rules

- Motion:
- Images:
- Icons:
- Mockups:
- Decorative assets:

## 15. Template Fixed and Replaceable Zones

| Zone | Type | Replaceability | Rule |
|---|---|---|---|
|  |  | fixed / replaceable / extensible / constrained / risky |  |

## 16. Template Adaptation Constraints

### Must Preserve

- 

### Can Replace

- 

### Can Extend

- 

### Avoid

- 

### Not Suitable For

- 

## 17. Template Indexing Metadata

```yaml
template_id: ""
page_type: ""
frontend_stack:
  framework: "Next.js"
  router: "App Router"
  runtime: "React"
  language: "TypeScript"
  styling: "Tailwind CSS"
rendering_model: "server-first"
interactivity_level: "static"
component_complexity: "medium"
responsive_complexity: "medium"
adaptation_modes:
  - "content-replacement"
fixed_zones: []
replaceable_zones: []
shared_component_candidates: []
client_component_candidates: []
code_generation_readiness: "partial"
```

## 18. Downstream Code Generation Handoff

### Code Generator May Create

- 

### Code Generator Must Preserve

- 

### Code Generator Must Not Do

- 

### Missing Inputs Before Code Generation

- 

## 19. Validation Checklist

```text
[ ] Markdown output written
[ ] Required sections present
[ ] App Router structure defined
[ ] Server / Client boundaries defined
[ ] Tailwind mapping aligned with Design System
[ ] Fixed and replaceable zones defined
[ ] Template indexing metadata included
[ ] No TSX source code generated
```

## 20. Assumptions and Uncertainties

| Item | Current Assumption | Impact | Follow-up |
|---|---|---|---|
|  |  |  |  |
````

---

## 30. Codex 最终回复格式

执行完成后，Codex 最终回复必须使用：

```text
已完成：
- 已生成模板准备阶段 Skill 5 的 Next.js + React 前端设计语言 Markdown。

写入文件：
- templates/{template_id}/05-nextjs-react-frontend-language.md

已验证：
- 文件存在：是 / 否
- 必需章节检查：通过 / 未通过
- markdownlint：已运行并通过 / 已运行但失败 / 未运行，原因：...

风险与说明：
- ...
```
