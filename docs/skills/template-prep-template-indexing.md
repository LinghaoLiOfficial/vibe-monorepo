---
name: template-prep-template-indexing
description: |
  用于模板准备阶段，将同一个 Web 页面模板的上游 Markdown 资产归一化为可入库、可检索、可匹配、可组合的模板索引文档。适用于已经完成模板准备阶段 Skill 1-5 之后，需要读取页面视觉解析、UI/UX 设计语言、设计系统、前端组件规划、Next.js + React 前端设计语言，并生成 Template Index Card、检索标签、适用场景、页面类型、布局模式、风格向量描述、功能能力、可替换区域、适配规则、质量评分和下游交接说明的任务。

  Use this skill in the template preparation stage to convert upstream Markdown artifacts from Skill 1-5 into a repository-ready template index document. It is intended for Codex or similar coding agents that can read local Markdown files, inspect project folders, write Markdown output, and verify required sections. Do not use it for raw screenshot analysis, UI/UX abstraction, design token creation, component planning, frontend code generation, or multi-page app composition.

triggers:
  # 中文：模板索引 / 入库
  - "模板索引"
  - "模板入库"
  - "Template Indexing"
  - "生成模板索引"
  - "生成模板卡片"
  - "生成 template index"
  - "生成 Template Index Card"
  - "把模板资产入库"
  - "把 Skill 1-5 产物整理成模板"
  - "整理模板元数据"
  - "生成模板检索标签"
  - "生成模板匹配信息"
  - "模板准备阶段 Skill 8"
  - "为模板库建立索引"
  - "将页面模板变成可检索资产"

  # English: template indexing
  - "template indexing"
  - "index template"
  - "create template index"
  - "create template index card"
  - "generate template metadata"
  - "generate template search tags"
  - "prepare template library entry"
  - "make template searchable"
  - "register template"
  - "template library entry"
  - "template repository card"
  - "template asset indexing"
---

# Skill 8：Template Indexing Skill

你是一名面向 Codex / Claude Code / AI Coding Agent 的模板库架构师。

你的任务是读取模板准备阶段前 5 个 Skill 生成的 Markdown 资产，将一个单页 Web 模板归一化为**可入库、可检索、可匹配、可组合、可复用**的 Markdown 模板索引文档。

本 Skill 的指定输出格式为：**Markdown**。

---

## 1. Skill 定位

该 Skill 位于模板准备阶段的第 8 步：

```text
Web 页面截图
  → Skill 1 页面视觉解析
  → Skill 2 UI/UX 设计语言抽象
  → Skill 3 设计系统结构化
  → Skill 4 前端组件规划
  → Skill 5 Next.js + React 前端设计语言
  → Skill 8 Template Indexing
  → Template Library
```

本 Skill 只负责：

```text
读取上游 Markdown 资产
  → 抽取模板元数据
  → 生成检索标签
  → 生成匹配维度
  → 生成可替换区域与适配规则
  → 生成质量评分
  → 写入模板索引 Markdown
  → 验证索引文档完整性
```

本 Skill 不负责：

```text
重新解析截图、重新抽象 UI/UX、重新设计 Design System、重新规划组件、生成前端代码、执行模板匹配、生成多页系统、做视觉验收。
```

---

## 2. 核心目标

将一个页面模板从“多个分散 Markdown 文档”整理为一个统一的模板索引卡片。

这个索引卡片应该能回答：

```text
这个模板是什么类型页面？
适合什么用户需求？
不适合什么需求？
它的风格是什么？
它的布局模式是什么？
它有哪些组件能力？
哪些区域可以替换？
哪些风格规则必须保留？
后续模板匹配 Skill 如何检索它？
后续模板组合 Skill 如何复用它？
后续代码生成 Skill 如何消费它？
```

---

## 3. Codex 使用要求

该 Skill 必须能被 Codex 在本地仓库中执行。

Codex 执行时必须遵守：

1. 使用文件系统读取上游 Markdown 资产。
2. 不依赖在线服务。
3. 不要求真实 embedding API 才能完成索引。
4. 允许生成“文本化 embedding 描述”和“检索标签”，供后续向量化系统使用。
5. 必须把最终结果写入 Markdown 文件。
6. 必须验证输出文件存在。
7. 必须验证输出文件包含必要章节。
8. 不要声称生成了真实向量 embedding，除非确实调用了可用 embedding 工具。

---

## 4. 输入契约

### 4.1 推荐输入目录

默认一个模板的资产目录如下：

```text
templates/
└── <template-id>/
    ├── screenshots/
    │   ├── desktop.png
    │   ├── mobile.png
    │   └── states/
    ├── analysis/
    │   ├── 01-page-visual-parse.md
    │   ├── 02-uiux-design-language.md
    │   ├── 03-design-system.md
    │   ├── 04-frontend-component-plan.md
    │   └── 05-nextjs-react-frontend-language.md
    └── metadata.md                  # 可选：人工补充信息
```

### 4.2 最小输入

至少需要以下文件中的 3 个：

```text
analysis/01-page-visual-parse.md
analysis/02-uiux-design-language.md
analysis/03-design-system.md
analysis/04-frontend-component-plan.md
analysis/05-nextjs-react-frontend-language.md
```

如果少于 3 个上游文件，仍可生成低置信度索引，但必须在“不确定项与阻塞”中说明。

### 4.3 可选输入

```text
screenshots/desktop.png
screenshots/mobile.png
metadata.md
references/template-taxonomy.md
references/style-keywords.md
references/page-type-taxonomy.md
references/template-quality-rubric.md
```

---

## 5. 输出契约

### 5.1 推荐输出路径

Codex 应将结果写入：

```text
templates/<template-id>/index/template-index.md
```

如果目录不存在，应创建目录：

```bash
mkdir -p templates/<template-id>/index
```

### 5.2 输出格式

最终输出必须是 Markdown，且主文件必须为：

```text
template-index.md
```

不要用 JSON 作为最终主输出。

可以在 Markdown 中包含 YAML Front Matter、表格、代码块和列表，但交付物必须是可读、可审查、可版本管理的 `.md` 文件。

---

## 6. 资源地图

如果以下文件存在，Codex 应优先读取：

```text
references/
├── template-taxonomy.md              # 模板分类体系
├── page-type-taxonomy.md             # 页面类型分类
├── layout-pattern-taxonomy.md        # 布局模式分类
├── style-keywords.md                 # 风格关键词词表
├── use-case-taxonomy.md              # 使用场景分类
├── component-capability-taxonomy.md  # 组件能力分类
├── adaptation-rule-guide.md          # 模板适配规则
├── template-quality-rubric.md        # 模板质量评分规则
└── template-index-checklist.md       # 索引验收清单

examples/
├── good-template-index.md
├── weak-template-index.md
└── template-index-diff-example.md

scripts/
└── validate-template-index.sh
```

如果这些文件不存在，不要报错；使用本 `SKILL.md` 的流程完成。

---

## 7. 核心原则

### 7.1 索引不是摘要

模板索引不是把上游内容简单压缩成摘要，而是为后续检索和复用建立结构化入口。

必须抽取：

- 页面类型。
- 适用场景。
- 不适用场景。
- 风格关键词。
- 布局模式。
- 组件能力。
- 可替换区域。
- 固定设计规则。
- 适配风险。
- 质量评分。

### 7.2 不重新设计模板

不要在索引阶段修改模板风格、组件规划或前端规范。

如果发现上游产物之间冲突，应记录冲突，而不是强行改写。

### 7.3 面向检索与组合

索引文档必须能服务后续两个阶段：

```text
Template Matching：根据用户需求检索模板
Multi-page Template Composition：在多页系统中组合模板
```

所以必须提供多维度匹配字段，而不是只提供自然语言描述。

### 7.4 保留证据链

重要结论必须标注来自哪个上游文件。

例如：

```text
页面类型来自 01-page-visual-parse.md。
风格关键词来自 02-uiux-design-language.md。
Design Token 约束来自 03-design-system.md。
组件能力来自 04-frontend-component-plan.md。
前端实现约束来自 05-nextjs-react-frontend-language.md。
```

### 7.5 不伪造 embedding

如果没有真实 embedding 工具，不要输出 fake vector。

可以输出：

```text
embedding_text: "用于后续向量化的文本描述"
```

不要输出：

```text
embedding: [0.123, 0.456, ...]
```

除非确实调用了 embedding 系统。

---

## 8. Step 0：前置检查

Codex 开始前必须完成：

1. 确认模板目录路径。
2. 列出可用上游文件。
3. 判断缺失文件。
4. 读取所有可用上游 Markdown。
5. 如果存在 `metadata.md`，读取人工补充元数据。
6. 确定输出路径。
7. 判断本次索引置信度：高 / 中 / 低。
8. 在写文件前形成简短计划。

推荐命令：

```bash
find templates/<template-id> -maxdepth 3 -type f | sort
```

如果用户没有提供 `<template-id>`，Codex 应从目录名、截图名或页面标题中推断，并在输出中标注为“推断”。

---

## 9. Step 1：读取并归一化上游产物

将上游 5 个 Skill 的产物归一化为以下字段：

```text
visual_parse:
  page_type
  viewport
  layout_summary
  sections
  visual_elements
  colors
  typography
  spacing
  interactions

uiux_language:
  design_intent
  style_keywords
  ux_principles
  information_hierarchy
  interaction_priority
  scenario_fit

design_system:
  color_tokens
  typography_tokens
  spacing_tokens
  radius_tokens
  shadow_tokens
  component_style_baseline

component_plan:
  component_tree
  page_sections
  reusable_components
  props_contracts
  replaceable_regions

frontend_language:
  framework
  app_router_strategy
  server_client_boundary
  tailwind_mapping
  file_structure
  implementation_constraints
```

如果某个字段缺失，用 `未从上游产物中可靠识别` 标注，不要编造。

---

## 10. Step 2：生成模板身份信息

必须生成模板身份信息：

```text
template_id
template_name
source_screenshots
page_type
surface_type
template_role
primary_use_cases
secondary_use_cases
not_suitable_for
index_confidence
```

### 10.1 页面类型 page_type

常见取值：

```text
landing-page
saas-homepage
pricing-page
dashboard-overview
data-table-page
detail-page
settings-page
auth-page
form-page
ecommerce-product-page
ecommerce-listing-page
docs-page
blog-list-page
blog-detail-page
portfolio-page
marketing-page
unknown
```

### 10.2 Surface 类型 surface_type

用于多页系统组合：

```text
marketing-surface      # 官网、营销页、价格页、案例页
app-surface            # 登录后应用页、Dashboard、设置页
commerce-surface       # 商品、购物车、订单
content-surface        # 文档、博客、内容页
admin-surface          # 后台管理页
unknown
```

### 10.3 模板角色 template_role

```text
visual-anchor          # 适合作为全局视觉锚点
page-structure         # 适合作为某类页面结构模板
component-pattern      # 适合作为组件/区块模式
hybrid                 # 同时具备视觉和结构参考价值
low-confidence         # 质量或信息不足，仅供参考
```

---

## 11. Step 3：生成检索标签

必须生成多维度检索标签。

### 11.1 语义标签 semantic_tags

描述页面用途：

```text
saas, ai-product, b2b, analytics, crm, ecommerce, portfolio, docs, pricing, onboarding, productivity
```

### 11.2 风格标签 style_tags

描述视觉风格：

```text
clean, minimal, premium, playful, enterprise, dark, light, editorial, technical, futuristic, glassmorphism, brutalist, calm, bold
```

### 11.3 布局标签 layout_tags

描述结构模式：

```text
centered-hero, split-hero, sidebar-layout, card-grid, table-layout, pricing-grid, form-centered, dashboard-grid, content-sidebar, multi-section-landing
```

### 11.4 组件能力标签 component_tags

描述组件能力：

```text
navbar, hero, cta-group, feature-card, pricing-card, testimonial, sidebar, data-card, chart, table, form-field, tabs, modal, footer
```

### 11.5 交互标签 interaction_tags

描述交互类型：

```text
primary-cta, secondary-cta, navigation, filter, search, tabs, dropdown, form-submit, pagination, drill-down, mobile-menu
```

---

## 12. Step 4：生成匹配评分字段

模板索引必须提供后续检索可使用的评分字段。

```markdown
| 维度 | 分值 | 依据 | 说明 |
|---|---:|---|---|
| 页面类型清晰度 | 0-5 | ... | ... |
| 功能结构清晰度 | 0-5 | ... | ... |
| 视觉风格稳定性 | 0-5 | ... | ... |
| 设计系统完整度 | 0-5 | ... | ... |
| 组件规划完整度 | 0-5 | ... | ... |
| 前端实现可用性 | 0-5 | ... | ... |
| 多页组合适配性 | 0-5 | ... | ... |
```

总分建议：

```text
0-10：不建议入库
11-20：低置信度入库，仅供参考
21-28：可入库
29-35：高质量模板
```

如果无法判断某项，给出低分并说明原因。

---

## 13. Step 5：生成模板适配规则

必须输出：

```text
must_preserve
can_replace
can_extend
should_not_change
risky_changes
missing_assets
```

### 13.1 must_preserve

必须保留的设计信号，例如：

```text
- 首屏视觉层级
- 主 CTA 优先级
- 全局容器宽度
- 卡片圆角和阴影风格
- 排版比例
- 核心布局骨架
```

### 13.2 can_replace

可以替换的内容，例如：

```text
- 文案
- 图片
- 图标
- 行业术语
- 卡片内容
- CTA 文案和链接
```

### 13.3 can_extend

可以扩展的内容，例如：

```text
- 新增同风格 section
- 扩展卡片列表
- 增加 FAQ
- 增加客户 Logo
- 增加移动端折叠菜单
```

### 13.4 should_not_change

不建议改变的内容，例如：

```text
- 主视觉布局比例
- 全局 Design Tokens
- 按钮视觉层级
- 页面密度
- 组件边界
```

### 13.5 risky_changes

高风险改动，例如：

```text
- 把营销页改成复杂后台系统
- 把极简风格改成强装饰风格
- 强行增加复杂图表和表格
- 改变全局颜色体系
- 删除主 CTA
```

---

## 14. Step 6：生成 embedding_text

必须生成一个用于后续向量化的文本字段。

该字段应该压缩模板的主要检索特征：

````markdown
## 11. Embedding Text

```text
A clean premium B2B SaaS landing page template with centered hero, strong primary CTA, modular feature cards, generous spacing, subtle card shadows, high trust visual hierarchy, suitable for AI product websites, startup landing pages, and conversion-oriented marketing pages.
```
````

规则：

- 使用英文优先，便于通用 embedding 模型处理。
- 不超过 120 词。
- 包含页面类型、风格、布局、组件、适用场景。
- 不包含无用形容词堆砌。
- 不输出 fake vector。

---

## 15. Step 7：生成模板组合信息

为了支持多页系统，需要输出模板在系统组合中的角色。

```markdown
## 12. 多页系统组合建议

| 组合维度 | 建议 | 说明 |
|---|---|---|
| 可作为视觉锚点 | 是 / 否 / 有条件 | ... |
| 可作为页面结构模板 | 是 / 否 / 有条件 | ... |
| 适合搭配页面 | ... | ... |
| 不适合搭配页面 | ... | ... |
| 需要统一的 Design Token | ... | ... |
| 跨页一致性注意事项 | ... | ... |
```

必须说明该模板适合作为：

```text
- 全局视觉锚点
- 某类页面结构模板
- 区块 / 组件模式
- 仅参考模板
```

---

## 16. Step 8：写入 Markdown 文件

Codex 应写入：

```text
templates/<template-id>/index/template-index.md
```

推荐命令：

```bash
mkdir -p templates/<template-id>/index
cat > templates/<template-id>/index/template-index.md <<'INDEX_EOF'
...
INDEX_EOF
```

如果在非仓库环境中执行，可写入当前工作目录下：

```text
./template-index.md
```

但必须在最终回复说明实际输出路径。

---

## 17. Step 9：验证输出

写入后必须验证：

```bash
test -f templates/<template-id>/index/template-index.md
grep -q "# Template Index Card" templates/<template-id>/index/template-index.md
grep -q "## 1. 模板身份信息" templates/<template-id>/index/template-index.md
grep -q "## 4. 检索标签" templates/<template-id>/index/template-index.md
grep -q "## 7. 模板适配规则" templates/<template-id>/index/template-index.md
grep -q "## 11. Embedding Text" templates/<template-id>/index/template-index.md
```

如果没有 shell 环境，必须人工检查必要章节。

不要声称验证通过，除非实际执行或人工确认。

---

## 18. 硬性规则

- 不要重新生成 Skill 1-5 的内容。
- 不要直接生成前端代码。
- 不要执行模板匹配。
- 不要生成多页系统规划。
- 不要把截图摘要当成模板索引。
- 不要只输出自然语言总结，必须输出结构化索引字段。
- 不要编造不存在的上游文件。
- 不要声称生成了真实 embedding，除非确实调用 embedding 工具。
- 不要忽略缺失文件，必须记录缺失项。
- 不要改变上游设计系统或组件规划。
- 不要给所有维度都打满分，必须基于证据评分。
- 不要将低质量模板强行标记为高质量模板。
- 不要输出 JSON 作为最终主格式。
- 不要省略输出路径和验证情况。

---

## 19. 验证标准

### P0：必须通过

```text
[ ] 输出为 Markdown 文件
[ ] 已读取可用上游文件
[ ] 已列出缺失上游文件
[ ] 已生成模板身份信息
[ ] 已生成页面类型、Surface 类型、模板角色
[ ] 已生成检索标签
[ ] 已生成匹配评分字段
[ ] 已生成适配规则
[ ] 已生成 Embedding Text，但未伪造向量
[ ] 已生成多页系统组合建议
[ ] 已生成不确定项与风险
[ ] 已验证输出文件存在
```

### P1：应该通过

```text
[ ] 检索标签覆盖语义、风格、布局、组件、交互
[ ] 评分依据来自上游文件
[ ] 适配规则区分 must_preserve / can_replace / can_extend / risky_changes
[ ] 模板质量评分不过度乐观
[ ] 多页组合建议明确说明适用和不适用场景
[ ] 输出路径清晰
```

### P2：加分项

```text
[ ] 输出可直接被后续 Template Matching Skill 使用
[ ] 输出可直接被 Multi-page Template Composition Skill 使用
[ ] 标注该模板是否适合作为 visual anchor
[ ] 标注该模板适合搭配哪些页面类型
[ ] 给出人工补充 metadata 的建议
```

---

## 20. 最终输出模板

Codex 生成的 `template-index.md` 必须使用以下结构：

````markdown
---
template_id: "..."
template_name: "..."
page_type: "..."
surface_type: "..."
template_role: "..."
index_confidence: "high | medium | low"
quality_score: 0
output_format: "markdown"
---

# Template Index Card

## 1. 模板身份信息

| 字段 | 值 |
|---|---|
| Template ID | ... |
| Template Name | ... |
| Page Type | ... |
| Surface Type | ... |
| Template Role | ... |
| Source Screenshots | ... |
| Index Confidence | ... |

## 2. 上游资产读取情况

| 上游文件 | 是否存在 | 使用情况 | 说明 |
|---|---|---|---|
| `analysis/01-page-visual-parse.md` | 是 / 否 | ... | ... |
| `analysis/02-uiux-design-language.md` | 是 / 否 | ... | ... |
| `analysis/03-design-system.md` | 是 / 否 | ... | ... |
| `analysis/04-frontend-component-plan.md` | 是 / 否 | ... | ... |
| `analysis/05-nextjs-react-frontend-language.md` | 是 / 否 | ... | ... |

## 3. 模板摘要

### 3.1 一句话描述

...

### 3.2 适用场景

- ...

### 3.3 不适用场景

- ...

## 4. 检索标签

### 4.1 Semantic Tags

- ...

### 4.2 Style Tags

- ...

### 4.3 Layout Tags

- ...

### 4.4 Component Tags

- ...

### 4.5 Interaction Tags

- ...

## 5. 匹配评分字段

| 维度 | 分值 | 依据 | 说明 |
|---|---:|---|---|
| 页面类型清晰度 | ... | ... | ... |
| 功能结构清晰度 | ... | ... | ... |
| 视觉风格稳定性 | ... | ... | ... |
| 设计系统完整度 | ... | ... | ... |
| 组件规划完整度 | ... | ... | ... |
| 前端实现可用性 | ... | ... | ... |
| 多页组合适配性 | ... | ... | ... |

## 6. 关键模板特征

### 6.1 布局模式

...

### 6.2 视觉风格

...

### 6.3 组件能力

...

### 6.4 交互能力

...

## 7. 模板适配规则

### 7.1 Must Preserve

- ...

### 7.2 Can Replace

- ...

### 7.3 Can Extend

- ...

### 7.4 Should Not Change

- ...

### 7.5 Risky Changes

- ...

## 8. 可替换区域映射

| 区域 / 组件 | 可替换内容 | 不可破坏约束 | 适配建议 |
|---|---|---|---|
| ... | ... | ... | ... |

## 9. 下游消费方式

### 9.1 给 Template Matching Skill

- ...

### 9.2 给 Multi-page Template Composition Skill

- ...

### 9.3 给 Code Generation Skill

- ...

## 10. 质量评分与入库结论

- 总分：...
- 入库结论：不建议入库 / 低置信度入库 / 可入库 / 高质量模板
- 主要优势：...
- 主要缺口：...

## 11. Embedding Text

```text
...
```

## 12. 多页系统组合建议

| 组合维度 | 建议 | 说明 |
|---|---|---|
| 可作为视觉锚点 | ... | ... |
| 可作为页面结构模板 | ... | ... |
| 适合搭配页面 | ... | ... |
| 不适合搭配页面 | ... | ... |
| 跨页一致性注意事项 | ... | ... |

## 13. 不确定项与风险

| 项目 | 原因 | 对后续影响 | 建议补充 |
|---|---|---|---|
| ... | ... | ... | ... |

## 14. 验证记录

| 检查项 | 结果 | 说明 |
|---|---|---|
| 输出文件已写入 | 通过 / 未通过 | ... |
| 必要章节完整 | 通过 / 未通过 | ... |
| 未伪造 embedding vector | 通过 / 未通过 | ... |
| 缺失文件已记录 | 通过 / 未通过 | ... |

## 15. 后续建议

- ...
````

---

## 21. Codex 最终回复格式

执行完后，Codex 最终回复必须使用：

```text
已完成：
- 已生成模板索引 Markdown。
- 已整理模板身份、检索标签、适配规则、质量评分和多页组合建议。

输出文件：
- templates/<template-id>/index/template-index.md

已验证：
- 文件存在：通过 / 未通过
- 必要章节：通过 / 未通过
- 未伪造 embedding vector：通过 / 未通过

风险与说明：
- ...
```

如果无法完成：

```text
未完成：
- ...

阻塞原因：
- ...

已读取文件：
- ...

需要补充：
- ...
```
