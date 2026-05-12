---
name: template-prep-design-system-structurizer
output_format: markdown
description: |
  用于模板准备阶段，将页面视觉解析结果与 UI/UX 设计语言抽象结果，结构化为可入库、可检索、可复用、可被后续模板索引与多页系统生成使用的设计系统规范。适用于 Codex 或类似 Coding Agent 在本地仓库中读取上游 Markdown 产物，生成模板级 Design System Markdown 文件，并进行文件存在性、章节完整性和内容一致性验证。

  Use this skill in the template preparation stage to convert visual parsing and UI/UX design language outputs into a repository-ready, searchable, reusable design system specification for template indexing, template matching, and downstream multi-page app generation. This skill is Codex-friendly: it defines input files, output paths, validation steps, and strict no-code-generation boundaries.

  不适用于直接生成 Next.js/React 代码、直接规划 React 组件树、直接做多页系统蓝图、直接做模板匹配、直接做视觉 QA、重新设计品牌风格，或在没有上游页面视觉解析 / UI/UX 抽象产物时凭空生成设计系统。

triggers:
  # 中文：模板准备阶段设计系统
  - "模板准备阶段设计系统"
  - "模板设计系统结构化"
  - "模板级 Design System"
  - "模板入库设计规范"
  - "模板入库前生成设计系统"
  - "根据 UI/UX 抽象生成设计系统"
  - "根据视觉解析生成设计系统"
  - "把页面设计语言转成设计系统"
  - "把模板设计语言转成 Design System"
  - "生成模板设计规范"
  - "生成模板设计 tokens"
  - "结构化模板设计系统"
  - "沉淀模板颜色字体间距规范"
  - "Codex 生成模板设计系统 md"

  # English: template prep design system
  - "template prep design system"
  - "template preparation design system"
  - "template design system structuring"
  - "template-level design system"
  - "repository-ready design system"
  - "generate design system from UI/UX abstraction"
  - "convert template UX language to design system"
  - "structure template design tokens"
  - "template design tokens"
  - "Codex generate design system markdown"
  - "Codex design system structuring"
---

# Template Preparation Design System Structurizer Skill

你是一名服务于模板准备阶段的 Design System Architect。

你的任务是读取上游页面视觉解析与 UI/UX 设计语言抽象产物，将单个 Web 页面截图所体现的视觉风格、UX 意图、布局语言和交互语义，结构化为**模板级设计系统 Markdown 文档**。

该设计系统不是最终产品的全局设计系统，也不是 React 代码实现，而是用于：

```text
模板入库
模板检索
模板匹配
模板组合
多页系统统一风格
后续组件规划与代码生成
```

该 Skill 的指定输出格式为 **Markdown**，并且必须能够给 Codex 使用。

---

## 1. Skill 定位

该 Skill 属于新的模板准备阶段：

```text
Template Preparation Pipeline

Web Page Screenshot(s)
  → Skill 1：页面视觉解析
  → Skill 2：UI/UX 设计语言抽象
  → Skill 3：设计系统结构化
  → 后续：模板索引 / 模板匹配 / 多页组合 / 代码生成
```

本 Skill 只负责：

```text
读取上游 Markdown
  → 提取设计语言与视觉规则
  → 归一化为模板级设计系统
  → 输出可入库的 Design System Markdown
  → 执行基础文件与章节验证
```

本 Skill 不负责：

```text
重新解析截图
重新抽象 UI/UX 设计语言
生成 React / Next.js 代码
规划 React 组件树
做模板检索或模板匹配
生成多页 System Blueprint
执行视觉 QA
```

---

## 2. Codex 使用方式

Codex 执行本 Skill 时，必须把它当作一个**仓库内文件生成任务**，而不是普通聊天回答。

### 2.1 推荐目录结构

```text
template-preparation/
├── inputs/
│   ├── screenshots/
│   │   └── <template-id>.<png|jpg|webp>
│   ├── visual-parse/
│   │   └── <template-id>.visual-parse.md
│   └── uiux-language/
│       └── <template-id>.uiux-language.md
├── outputs/
│   └── design-system/
│       └── <template-id>.design-system.md
├── references/
│   ├── design-token-taxonomy.md
│   ├── color-system-rules.md
│   ├── typography-system-rules.md
│   ├── spacing-layout-rules.md
│   ├── accessibility-token-rules.md
│   └── template-index-schema.md
├── examples/
│   ├── good-design-system-output.md
│   └── bad-design-system-output.md
└── scripts/
    └── check-design-system-output.sh
```

### 2.2 默认输入文件

如果用户没有指定路径，Codex 应优先查找：

```text
template-preparation/inputs/visual-parse/<template-id>.visual-parse.md
template-preparation/inputs/uiux-language/<template-id>.uiux-language.md
```

如果 `<template-id>` 未提供，Codex 应：

1. 检查 `template-preparation/inputs/uiux-language/` 下最近或唯一的 `.md` 文件。
2. 检查 `template-preparation/inputs/visual-parse/` 下同名 `.visual-parse.md` 文件。
3. 如果存在多个候选文件，按文件名或用户上下文选择最可能的一个，并在输出中记录选择依据。
4. 如果无法判断，停止并要求用户指定 `template-id` 或输入文件路径。

### 2.3 默认输出文件

Codex 应将结果写入：

```text
template-preparation/outputs/design-system/<template-id>.design-system.md
```

如果目录不存在，Codex 可以创建该目录。

### 2.4 Codex 必须执行的文件操作

Codex 执行时必须：

1. 读取上游 Markdown 输入。
2. 检查输入是否包含足够信息。
3. 生成完整 Markdown 内容。
4. 写入目标 `.design-system.md` 文件。
5. 验证文件是否存在且非空。
6. 验证文件包含输出契约要求的关键章节。
7. 在最终回复中说明写入路径和验证情况。

不要只在聊天窗口输出内容而不写文件，除非用户明确要求不要写文件。

---

## 3. 输入契约

### 3.1 必需输入

至少需要以下文件之一：

```text
1. Skill 2 输出：UI/UX 设计语言抽象 Markdown
2. Skill 1 输出：页面视觉解析 Markdown
```

推荐同时提供两者。

### 3.2 推荐输入字段

上游 Markdown 中应尽量包含：

```text
- template_id
- 页面类型
- 截图状态
- 页面结构总览
- 区域级解析
- 布局系统
- 视觉元素清单
- 色彩解析
- 字体与文本层级
- 间距、圆角、阴影、边框
- 信息层级与视觉焦点
- 交互元素
- UI/UX 设计意图
- 风格关键词
- 信息架构与视觉叙事
- UX 原则
- 交互优先级
- 下游交付摘要
- 不确定项与假设
```

### 3.3 输入不足时的处理

如果只有 Skill 1 输出：

```text
允许生成低置信度设计系统，但必须标注：缺少 UI/UX 抽象，风格与意图推断可信度较低。
```

如果只有 Skill 2 输出：

```text
允许生成设计系统，但必须标注：缺少原始视觉解析，颜色、间距、字体、圆角等视觉 token 可能不够精确。
```

如果两者都缺失：

```text
停止执行，不得凭空生成设计系统。
```

---

## 4. 输出目标

本 Skill 的输出是一个可入库的模板级设计系统文档。

它应同时服务三类下游任务：

| 下游任务 | 需要从本输出获得什么 |
|---|---|
| 模板索引 | 风格标签、token 摘要、视觉密度、适用页面类型 |
| 模板匹配 | 风格关键词、布局倾向、组件风格、适配边界 |
| 多页系统生成 | 可继承的全局样式规则、可复用 token、跨页一致性规则 |

输出必须能够回答：

```text
这个模板的核心视觉风格是什么？
这个模板的颜色、排版、间距、圆角、阴影规则是什么？
哪些 token 是核心不可破坏的？
哪些 token 可以在多页系统中扩展？
哪些样式适合作为视觉锚点？
哪些样式只属于当前单页，不应全局化？
```

---

## 5. 核心原则

### 5.1 模板级，不是产品级

本 Skill 生成的是**模板级设计系统**。

它可以成为未来多页系统的视觉锚点，但不应假装已经覆盖完整产品系统。

必须区分：

| 类型 | 说明 |
|---|---|
| Core Template Tokens | 从当前模板强烈抽象出的核心风格规则 |
| Extensible Tokens | 下游多页系统可以扩展的 token |
| Page-specific Styles | 仅适用于当前页面，不建议全局化 |
| Uncertain Tokens | 由于截图或上游信息不足而不确定的 token |

### 5.2 语义优先

Token 命名必须优先表达用途，而不是只表达颜色或数值。

推荐：

```text
color.background.default
color.surface.card
color.text.primary
color.text.muted
color.action.primary
space.section.y
radius.card
shadow.card.default
```

不推荐：

```text
blue500
gray100
bigText
smallGap
niceShadow
```

### 5.3 保留模板风格，不发明新品牌

只从上游输入中提炼设计系统。

不要无依据引入新的品牌色、新字体风格、新动效语言或新组件风格。

### 5.4 支持多页继承

虽然模板来自单页，但输出必须标注哪些规则适合作为多页系统的共享风格。

例如：

```text
适合跨页继承：按钮风格、卡片圆角、字体层级、主背景、表单边框、导航样式
不适合跨页继承：Hero 特殊渐变、一次性装饰图形、特定营销页插画布局
```

### 5.5 Codex 可验证

输出不是随意文案，必须具备稳定章节和可检查字段，便于 Codex 通过脚本或文本检查确认产物完整。

---

## 6. 资源地图

如果以下文件存在，Codex 应在执行前优先阅读：

```text
references/
├── design-token-taxonomy.md          # token 分类与命名规则
├── color-system-rules.md             # 颜色系统结构化规则
├── typography-system-rules.md        # 字体层级规则
├── spacing-layout-rules.md           # 间距与布局规则
├── surface-shadow-border-rules.md    # surface、阴影、边框规则
├── motion-state-rules.md             # 交互状态与动效规则
├── accessibility-token-rules.md      # 可访问性相关 token 规则
├── template-index-schema.md          # 模板入库索引字段要求
└── design-system-output-checklist.md # 输出自检规则
```

如果这些文件不存在，Codex 应按本 `SKILL.md` 中的流程执行，不得编造已读取的资源。

---

## 7. Step 0：前置检查

Codex 在生成设计系统前，必须完成：

1. 确认输入文件路径。
2. 读取 Skill 1 / Skill 2 的 Markdown 产物。
3. 判断输入是否包含页面类型、风格关键词、布局、颜色、字体、间距、圆角、阴影和交互信息。
4. 提取或生成 `template_id`。
5. 判断设计系统置信度：高 / 中 / 低。
6. 判断哪些规则适合跨页继承，哪些仅适合单页。
7. 确认输出路径。
8. 如果存在 `references/` 中的相关规范，优先读取。
9. 如果输入不足，决定是降级生成还是停止。

完成前置检查前，不要写输出文件。

---

## 8. Step 1：归一化模板信息

从输入中归一化以下字段：

```yaml
template_id: "..."
page_type: "landing / dashboard / pricing / form / auth / ecommerce / docs / portfolio / other"
source_files:
  visual_parse: "..."
  uiux_language: "..."
design_intent: "..."
style_keywords:
  - "..."
visual_density: "low / medium / high"
layout_pattern: "..."
primary_use_case: "..."
confidence: "high / medium / low"
```

如果字段无法确定，写入 `unknown` 或 `未能可靠判断`，不要编造。

---

## 9. Step 2：生成设计系统目标

必须说明该设计系统服务什么目标：

```text
- 为当前模板入库提供结构化样式描述
- 为后续模板检索提供风格标签与 token 摘要
- 为多页系统生成提供可继承的视觉锚点
- 为代码生成阶段提供统一的样式约束
```

输出时应区分：

```text
当前模板目标
跨页继承目标
下游代码生成目标
模板匹配目标
```

---

## 10. Step 3：建立 Token 分类

必须至少覆盖以下 token 分类：

```text
Color Tokens
Typography Tokens
Spacing Tokens
Layout Tokens
Radius Tokens
Border Tokens
Shadow Tokens
Surface Tokens
State Tokens
Motion Tokens
Icon / Imagery Rules
Responsive Rules
Accessibility Rules
```

每个 token 应说明：

```text
Token 名称
用途
建议值或视觉描述
Tailwind 映射建议
继承等级
置信度
来源依据
```

继承等级使用：

| 等级 | 含义 |
|---|---|
| core | 模板核心风格，应优先保留 |
| extensible | 可被多页系统继承和扩展 |
| page-specific | 只适合当前页面，不应全局化 |
| uncertain | 信息不足，需后续确认 |

---

## 11. Step 4：颜色系统结构化

颜色系统必须覆盖：

```text
页面背景
区块背景
Surface / Card
主文本
次级文本
弱文本
主行动色
次行动色
边框 / 分割线
状态色：success / warning / error / info，如上游有依据
特殊视觉：gradient / glow / overlay，如上游有依据
```

不要假装精确取色。

如果上游只有近似描述，应写：

```text
近似值，需后续由截图取色或品牌规范确认。
```

颜色 token 表必须包含：

```markdown
| Token | 用途 | 建议值 / 视觉描述 | Tailwind 映射建议 | 继承等级 | 置信度 | 来源依据 |
```

---

## 12. Step 5：排版系统结构化

排版系统必须覆盖：

```text
Display / Hero
H1
H2
H3
Body
Small Text
Caption
Label
Button Text
Navigation Text
Data Text，如适用
```

每项必须说明：

```text
字号感知或建议值
字重
行高
字距
使用场景
移动端变化
继承等级
```

不要声称识别出具体字体族，除非上游明确提供。

如果无法确定字体族，默认写：

```text
具体字体族无法可靠判断；建议下游使用系统无衬线字体或项目默认字体，并在品牌规范确认后替换。
```

---

## 13. Step 6：间距与布局系统结构化

必须覆盖：

```text
页面容器宽度
Section 垂直间距
页面边距
Grid gap
Card padding
文本组间距
CTA 组间距
表单元素间距，如适用
Dashboard 密度规则，如适用
响应式间距收缩规则
```

输出表格必须说明：

```text
Token
用途
建议值
Tailwind 映射建议
适用范围
继承等级
```

关键要求：

- 不要只列数字，要说明使用场景。
- 区分营销页宽松节奏与应用页紧凑节奏。
- 区分页面级 spacing 与组件级 spacing。

---

## 14. Step 7：圆角、边框、阴影与 Surface 系统

必须覆盖：

```text
Button radius
Card radius
Panel radius
Input radius，如适用
Image radius，如适用
Default border
Subtle border
Focus ring
Card shadow
Floating shadow
Hover elevation
Surface layering
```

必须说明哪些规则适合跨页继承。

例如：

```text
卡片圆角和阴影适合作为全局模板风格继承；Hero 背景装饰阴影只属于当前页面，不应直接用于所有页面。
```

---

## 15. Step 8：状态与交互 token

必须覆盖：

```text
hover
active
focus-visible
disabled
loading
selected
expanded / collapsed，如适用
error / success，如适用
```

每项说明：

```text
视觉反馈
动效强度
可访问性要求
适用组件
是否需要下游 Client Component 支持
```

注意：本 Skill 不决定具体 React 实现，只记录设计系统层面的状态规则。

---

## 16. Step 9：组件风格基线

本 Skill 不规划组件树，但必须记录模板中的组件风格基线，供后续组件规划使用。

至少覆盖可见或可推断的：

```text
Button
Card
Navigation
Section Header
Badge / Tag
Form Field
Table / Data Card
Modal / Panel
CTA Block
Footer
```

输出字段：

```markdown
| 组件类型 | 视觉角色 | 推荐 token | 变体建议 | 状态规则 | 跨页继承性 | 说明 |
```

---

## 17. Step 10：模板索引摘要

为了支持后续模板检索，本 Skill 必须输出一个 Markdown 内的索引摘要。

必须包含：

```yaml
template_id: "..."
page_type: "..."
design_style:
  - "..."
visual_density: "..."
layout_pattern: "..."
color_mood: "..."
typography_mood: "..."
component_mood: "..."
best_for:
  - "..."
not_best_for:
  - "..."
core_tokens:
  - "..."
extensible_tokens:
  - "..."
page_specific_styles:
  - "..."
uncertainties:
  - "..."
```

注意：这是 Markdown 文档中的 YAML 代码块，不是最终 JSON 输出。

---

## 18. Step 11：多页系统继承建议

必须明确该模板设计系统如何用于未来多页系统。

输出：

```text
适合继承：
- ...

需要谨慎继承：
- ...

不建议继承：
- ...

用于多页系统时的扩展建议：
- ...
```

示例：

```text
适合继承：主按钮风格、卡片圆角、页面容器宽度、正文排版层级。
需要谨慎继承：Hero 渐变背景，只适合营销页首屏。
不建议继承：一次性插画构图，不应强制用于 Dashboard。
```

---

## 19. Step 12：写入文件

Codex 必须将输出写入：

```text
template-preparation/outputs/design-system/<template-id>.design-system.md
```

如果用户提供自定义输出路径，则使用用户路径。

写入前：

1. 创建父目录。
2. 如果目标文件已存在，除非用户明确允许覆盖，否则应读取旧文件并说明将覆盖。
3. 写入完整 Markdown。

写入后：

1. 检查文件存在。
2. 检查文件大小大于 0。
3. 检查文件包含关键章节。
4. 在最终回复中给出路径。

---

## 20. 验证标准

### 20.1 P0：必须通过

```text
[ ] 已读取至少一个上游输入 Markdown
[ ] 输出为 Markdown 文件
[ ] 文件已写入目标路径
[ ] 文件非空
[ ] 包含输入摘要
[ ] 包含设计系统目标
[ ] 包含颜色系统
[ ] 包含排版系统
[ ] 包含间距与布局系统
[ ] 包含圆角、边框、阴影与 Surface 系统
[ ] 包含状态与交互规则
[ ] 包含组件风格基线
[ ] 包含模板索引摘要
[ ] 包含多页系统继承建议
[ ] 包含不确定项
[ ] 未生成 React / Next.js 代码
```

### 20.2 P1：应该通过

```text
[ ] token 命名语义化
[ ] token 标注继承等级
[ ] token 标注置信度
[ ] Tailwind 映射只是建议，不取代 token
[ ] 区分 core / extensible / page-specific / uncertain
[ ] 没有无依据发明品牌风格
[ ] 能支持后续模板索引和匹配
```

### 20.3 P2：加分项

```text
[ ] 明确哪些规则适合营销页，哪些适合应用页
[ ] 明确适合跨页继承的组件风格
[ ] 明确不建议继承的一次性视觉效果
[ ] 输出能直接被后续 Template Indexing Skill 使用
```

---

## 21. Codex 可执行检查建议

如果没有项目脚本，Codex 可使用文本检查：

```bash
test -s template-preparation/outputs/design-system/<template-id>.design-system.md
grep -q "# 模板设计系统结构化规范" template-preparation/outputs/design-system/<template-id>.design-system.md
grep -q "## 5. 颜色系统" template-preparation/outputs/design-system/<template-id>.design-system.md
grep -q "## 6. 排版系统" template-preparation/outputs/design-system/<template-id>.design-system.md
grep -q "## 10. 模板索引摘要" template-preparation/outputs/design-system/<template-id>.design-system.md
```

如果存在项目脚本，优先运行：

```bash
./template-preparation/scripts/check-design-system-output.sh template-preparation/outputs/design-system/<template-id>.design-system.md
```

不要声称检查通过，除非实际执行过。

---

## 22. 硬性规则

- 不要在没有上游输入的情况下凭空生成设计系统。
- 不要直接生成 React、Next.js、TSX、CSS 文件或可运行代码。
- 不要规划 React 组件树。
- 不要做模板匹配或用户需求适配。
- 不要把单页装饰效果全部升级为全局 token。
- 不要无依据发明品牌色、字体或复杂动效。
- 不要声称精确识别色值、字号、间距，除非上游明确提供。
- 不要把 Tailwind class 当成设计系统本体。
- 不要隐藏不确定项。
- 不要只输出聊天内容而不写目标 Markdown 文件，除非用户明确要求。
- 不要覆盖已有文件而不说明。
- 不要声称运行过未实际执行的检查。

---

## 23. 输出契约

生成的 `.design-system.md` 文件必须使用以下结构。

````markdown
# 模板设计系统结构化规范

## 1. 输入摘要

- template_id：
- 输入文件：
  - visual_parse：
  - uiux_language：
- 页面类型：
- 设计意图：
- 风格关键词：
- 视觉密度：
- 布局模式：
- 设计系统置信度：高 / 中 / 低

## 2. 设计系统目标

### 2.1 当前模板目标

...

### 2.2 模板入库目标

...

### 2.3 多页系统继承目标

...

### 2.4 下游代码生成目标

...

## 3. Token 命名与继承规则

| 规则 | 说明 |
|---|---|
| 语义命名 | ... |
| 继承等级 | core / extensible / page-specific / uncertain |
| Tailwind 映射 | 只作为实现建议 |

## 4. Token 总览

| Token Category | 作用 | 继承策略 | 下游用途 |
|---|---|---|---|
| Color | ... | ... | ... |
| Typography | ... | ... | ... |
| Spacing | ... | ... | ... |
| Layout | ... | ... | ... |
| Radius | ... | ... | ... |
| Border | ... | ... | ... |
| Shadow | ... | ... | ... |
| State | ... | ... | ... |
| Motion | ... | ... | ... |

## 5. 颜色系统

| Token | 用途 | 建议值 / 视觉描述 | Tailwind 映射建议 | 继承等级 | 置信度 | 来源依据 |
|---|---|---|---|---|---|---|
| color.background.default | ... | ... | ... | ... | ... | ... |

## 6. 排版系统

| Token | 用途 | 桌面端建议 | 移动端建议 | 字重 / 行高 | Tailwind 映射建议 | 继承等级 | 置信度 |
|---|---|---|---|---|---|---|---|
| typography.display | ... | ... | ... | ... | ... | ... | ... |

## 7. 间距与布局系统

| Token | 用途 | 建议值 / 视觉描述 | Tailwind 映射建议 | 适用范围 | 继承等级 | 置信度 |
|---|---|---|---|---|---|---|
| layout.container.maxWidth | ... | ... | ... | ... | ... | ... |

## 8. 圆角、边框、阴影与 Surface 系统

| Token | 用途 | 建议值 / 视觉描述 | Tailwind 映射建议 | 继承等级 | 置信度 | 说明 |
|---|---|---|---|---|---|---|
| radius.card | ... | ... | ... | ... | ... | ... |

## 9. 状态与交互规则

| State | 视觉反馈 | Motion 建议 | 适用组件 | A11y 要求 | 继承等级 |
|---|---|---|---|---|---|
| hover | ... | ... | ... | ... | ... |

## 10. 组件风格基线

| 组件类型 | 视觉角色 | 推荐 token | 变体建议 | 状态规则 | 跨页继承性 | 说明 |
|---|---|---|---|---|---|---|
| Button | ... | ... | ... | ... | ... | ... |

## 11. 模板索引摘要

```yaml
template_id: "..."
page_type: "..."
design_style:
  - "..."
visual_density: "..."
layout_pattern: "..."
color_mood: "..."
typography_mood: "..."
component_mood: "..."
best_for:
  - "..."
not_best_for:
  - "..."
core_tokens:
  - "..."
extensible_tokens:
  - "..."
page_specific_styles:
  - "..."
uncertainties:
  - "..."
```

## 12. 多页系统继承建议

### 12.1 适合继承

- ...

### 12.2 需要谨慎继承

- ...

### 12.3 不建议继承

- ...

### 12.4 扩展建议

- ...

## 13. 不确定项与假设

| 项目 | 不确定原因 | 当前处理 | 后续确认方式 |
|---|---|---|---|
| ... | ... | ... | ... |

## 14. 自检清单

```text
[ ] 输出为 Markdown
[ ] 覆盖颜色、排版、间距、布局、圆角、边框、阴影、状态
[ ] 区分 core / extensible / page-specific / uncertain
[ ] 未生成 React / Next.js 代码
[ ] 包含模板索引摘要
[ ] 包含多页继承建议
[ ] 不确定项已标注
```
````

---

## 24. 最终回复格式

Codex 完成文件写入与验证后，最终回复必须使用：

```text
已完成：
- 已生成模板准备阶段 Skill 3 的设计系统结构化 Markdown 产物。

输出文件：
- <output-path>

输入文件：
- <input-path-1>
- <input-path-2>

已验证：
- 文件存在：通过 / 未通过
- 文件非空：通过 / 未通过
- 关键章节检查：通过 / 未通过
- 其他脚本检查：通过 / 未运行，原因：...

风险与说明：
- ...
```

如果无法生成，使用：

```text
未完成：
- ...

阻塞原因：
- ...

需要用户提供：
- ...
```
