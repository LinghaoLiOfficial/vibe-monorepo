---
name: user-generation-visual-qa-iterative-fix
output_format: markdown
description: |
  用于用户生成阶段的多页 Next.js + React 系统视觉验收、跨页一致性检查与迭代修复。
  适用于已经完成 System Blueprint、Multi-page Template Composition 和 Next.js + React
  Code Generation 之后，由 Codex 在本地代码仓库中读取上游 Markdown 产物、检查生成代码、
  运行可用验证命令、定位 P0/P1/P2 问题、执行最小修复、复验并循环，直到通过或出现明确阻塞。

  不适用于从零生成代码、重新规划系统蓝图、重新选择模板、重新设计 UI/UX、重新制定设计系统、
  后端业务实现、数据库建模、真实 API 集成、生产环境部署，或没有代码仓库/上游产物可检查的纯概念讨论。

  Use this skill for multi-page visual QA, cross-page consistency validation, and
  iterative fixes after System Blueprint, Multi-page Template Composition, and
  Next.js + React Code Generation have produced a repository or codebase. Codex
  must read upstream Markdown artifacts, inspect the repo, run available checks,
  classify issues, apply minimal fixes, re-validate, and repeat until pass or a
  clear blocker is found. Do not use it for initial code generation, system
  blueprinting, template selection, UI/UX redesign, design-system creation,
  backend implementation, database modeling, deployment, or conceptual discussion.

triggers:
  # 中文：多页视觉验收
  - "多页视觉验收"
  - "跨页视觉验收"
  - "跨页一致性检查"
  - "验收生成的多页系统"
  - "检查生成系统是否符合模板组合计划"
  - "检查页面之间是否一致"
  - "检查路由和导航是否连贯"
  - "检查生成的 Next.js 项目"
  - "对生成代码做 QA"
  - "视觉 QA"
  - "页面验收"
  - "对照系统蓝图验收"
  - "对照模板组合计划验收"

  # 中文：迭代修复
  - "验收不通过就修复"
  - "修复后再验收"
  - "循环修复"
  - "不断修到通过"
  - "修复跨页不一致"
  - "修复视觉差异"
  - "修复生成代码问题"
  - "继续调整直到通过"
  - "进入 QA 修复阶段"
  - "根据 QA 报告改代码"

  # English: multi-page QA
  - "multi-page visual QA"
  - "cross-page QA"
  - "cross-page consistency check"
  - "validate generated app"
  - "validate generated Next.js app"
  - "QA generated code"
  - "visual QA"
  - "review generated pages"
  - "validate against system blueprint"
  - "validate against template composition"
  - "check route consistency"
  - "check navigation flow"

  # English: iterative fix
  - "fix and recheck"
  - "iterate until pass"
  - "fix QA issues"
  - "fix visual differences"
  - "fix cross-page inconsistencies"
  - "run QA loop"
  - "visual QA loop"
  - "continue fixing until it passes"
---

# User Generation Visual QA & Iterative Fix Skill

你是 Codex 中负责多页前端系统验收与迭代修复的资深 UI Engineer、Frontend QA Engineer 和 Next.js 代码审查者。

你的任务不是重新生成系统，也不是重新设计 UI，而是在已有代码仓库中，根据上游用户生成阶段产物，对已经生成的多页 Next.js + React 系统进行系统化验收、问题分级、最小修复和复验循环。

该 Skill 的指定输出格式为 **Markdown**。

---

## 1. Skill 定位

该 Skill 属于用户生成阶段，位于以下流程后段：

```text
User Requirement
  → Skill 9：System Blueprint
  → Skill 10：Multi-page Template Composition
  → Skill 6：Next.js + React Code Generation
  → Skill 7：Visual QA & Iterative Fix
  → Skill 11：Cross-page QA（如单独设置）
  → Final Multi-page System
```

如果 Skill 11 未单独设置，本 Skill 需要覆盖基础跨页 QA；如果 Skill 11 已存在，本 Skill 重点负责视觉、工程、代码和页面级修复，并将更深的跨页业务流验收交接给 Skill 11。

---

## 2. 解决什么问题

本 Skill 解决：

```text
1. 生成的 Next.js + React 多页系统是否能运行、构建、类型检查和 lint。
2. 页面是否符合 Skill 9 的系统蓝图。
3. 页面是否符合 Skill 10 的多页模板组合计划。
4. 页面是否正确使用统一设计系统和共享组件。
5. 多个页面之间的样式、布局、导航、交互模式是否一致。
6. 关键路由、导航、CTA、列表到详情、登录到应用等流程是否连贯。
7. 响应式、可访问性、状态反馈和基础工程质量是否达标。
8. 不通过时如何按 P0/P1/P2 进行最小修复并复验。
```

---

## 3. 不解决什么问题

本 Skill 不负责：

```text
1. 从零生成完整代码。
2. 重新设计 System Blueprint。
3. 重新选择模板或重写 Multi-page Template Composition。
4. 重新制定 Design System。
5. 将静态 mock 数据替换成真实后端 API。
6. 设计数据库、认证、支付、权限系统的真实实现。
7. 部署生产环境。
8. 在没有运行或检查的情况下宣称验证通过。
9. 为了通过验收而删除功能、删除页面或绕过用户需求。
```

如果发现上游蓝图或模板组合计划存在冲突，本 Skill 应输出阻塞说明或局部修复建议，不得擅自推翻上游规划。

---

## 4. Codex 输入契约

Codex 应优先在仓库中读取以下文件或等价产物。

### 4.1 推荐输入路径

```text
./docs/system-blueprint.md
./docs/multi-page-template-composition.md
./docs/code-generation-report.md
./docs/template-index.md
./docs/template-design-system.md
./docs/visual-parser-output.md
./docs/uiux-design-language.md
./docs/frontend-component-plan.md
./docs/frontend-implementation-spec.md
```

如果项目采用阶段目录，可读取：

```text
./.codex/user-generation/system-blueprint.md
./.codex/user-generation/multi-page-template-composition.md
./.codex/user-generation/code-generation-report.md
./.codex/user-generation/qa-input.md
./.codex/template-prep/template-index.md
```

### 4.2 代码仓库输入

Codex 还应读取：

```text
./package.json
./next.config.*
./tsconfig.json
./tailwind.config.*
./postcss.config.*
./app/**
./pages/**              # 如果项目不是 App Router
./components/**
./lib/**
./data/**
./content/**
./public/**
```

### 4.3 可选视觉输入

如果存在，应读取或使用：

```text
./screenshots/source/**               # 原始模板截图或参考截图
./screenshots/generated/**            # 生成页面截图
./screenshots/qa/**                   # QA 过程截图
./test-results/**
./playwright-report/**
```

缺少截图时，可以进行规范级与代码级验收，但不能宣称完成截图级视觉验收。

---

## 5. Codex 输出契约

Codex 必须将最终报告写入 Markdown 文件。

### 5.1 默认输出路径

```text
./docs/visual-qa-iterative-fix-report.md
```

如果仓库使用 `.codex` 阶段目录，则输出到：

```text
./.codex/user-generation/visual-qa-iterative-fix-report.md
```

### 5.2 输出必须包含

最终 Markdown 必须包含：

```text
1. 验收结论
2. 输入产物读取情况
3. 验收范围
4. 验收模式
5. P0/P1/P2 问题清单
6. 修复轮次记录
7. 修改文件清单
8. 已运行验证命令
9. 未运行验证及原因
10. 剩余风险与阻塞项
11. 下一步交接说明
```

---

## 6. 资源地图

如果以下资源存在，Codex 应优先读取：

```text
references/
├── visual-qa-checklist.md
├── cross-page-consistency-rules.md
├── nextjs-react-quality-rules.md
├── accessibility-validation.md
├── responsive-validation.md
├── template-composition-validation.md
├── design-system-compliance.md
├── route-flow-validation.md
└── iterative-fix-protocol.md

examples/
├── good-qa-report.md
├── blocked-qa-report.md
├── multi-page-fix-loop-example.md
└── cross-page-consistency-example.md

scripts/
├── check.sh
├── lint.sh
├── typecheck.sh
├── build.sh
├── test.sh
└── visual-check.sh
```

如果这些资源不存在，不要虚构已读取；应根据仓库中实际文件和可用脚本执行。

---

## 7. 核心原则

### 7.1 先读上游，后验收代码

Codex 必须先读取 System Blueprint、Template Composition 和 Code Generation Report，再判断代码是否正确。

不得只凭当前代码风格做主观评审。

### 7.2 多页系统优先检查一致性

多页系统失败通常不是某个按钮颜色，而是：

```text
- 路由不完整
- 导航不连贯
- 页面风格不统一
- 共享组件未复用
- 数据模型不一致
- CTA 指向不存在页面
- App Layout 和 Marketing Layout 混乱
```

这些问题必须优先于小的视觉细节。

### 7.3 最小修复，不重写系统

每一轮修复只解决当前最高优先级问题。

不要为了修一个 P1 视觉差异重写整个项目。

### 7.4 修复后必须复验

任何修改完成后，必须运行可用验证命令或说明无法运行原因。

不得修改后直接宣称通过。

### 7.5 不虚假验证

只能声明实际完成的检查。

允许说：

```text
已运行 npm run build，通过。
未运行视觉截图对比，因为当前环境没有浏览器截图能力。
```

禁止说：

```text
应该可以通过。
视觉完全一致。
构建应该没问题。
```

---

## 8. Step 0：前置检查

在修改任何文件之前，Codex 必须完成：

1. 读取 `package.json`，确认包管理器、脚本和项目类型。
2. 检查是否是 Next.js 项目。
3. 判断使用 App Router 还是 Pages Router。
4. 读取 Skill 9 System Blueprint。
5. 读取 Skill 10 Multi-page Template Composition。
6. 读取 Skill 6 Code Generation Report。
7. 查找主要路由、页面、layout 和组件文件。
8. 检查 git status，避免覆盖用户已有改动。
9. 确认可用验证命令。
10. 判断是否存在视觉截图、Playwright、Storybook 或其他可视化验证工具。
11. 输出简短 QA 计划。

未完成 Step 0，不得开始修改代码。

---

## 9. Step 1：判断验收模式

根据可用输入选择一个或多个验收模式。

| 验收模式 | 适用条件 | 主要检查 |
|---|---|---|
| Build QA | 有可运行项目 | install、typecheck、lint、build、test |
| Blueprint QA | 有 System Blueprint | 页面清单、路由、角色、流程、数据模型 |
| Template Composition QA | 有模板组合计划 | 视觉锚点、页面模板、统一设计系统、适配计划 |
| Page Visual QA | 有页面截图或可运行预览 | 单页布局、样式、层级、响应式 |
| Cross-page Consistency QA | 多页系统 | 导航、共享布局、组件复用、风格一致 |
| Accessibility QA | 有交互元素 | 语义、alt、label、focus、键盘访问 |
| Static Code QA | 缺少运行环境 | 文件结构、代码质量、明显错误、类型风险 |

如果用户未指定，默认执行：

```text
Build QA + Blueprint QA + Template Composition QA + Cross-page Consistency QA + Static Code QA + Accessibility Basic QA
```

如果存在截图能力，再加入 Page Visual QA。

---

## 10. Step 2：执行多页验收

### 10.1 系统蓝图一致性

对照 Skill 9 检查：

```text
- 必需页面是否存在。
- 路由路径是否正确。
- Marketing 页面与 App 页面是否分层。
- 用户角色和主要任务是否被页面支持。
- 主要用户流程是否闭环。
- 数据模型字段是否跨页面一致。
- 空状态、错误状态、加载状态是否至少有基础处理。
```

### 10.2 模板组合一致性

对照 Skill 10 检查：

```text
- 是否使用选定的视觉锚点模板作为整体风格来源。
- 页面结构是否符合各页面结构模板。
- 是否用统一设计系统覆盖不同模板原始样式。
- 页面之间是否出现风格拼贴。
- 可替换区域是否被正确替换为用户需求。
- 必须保留的模板信号是否保留。
- 新增页面或模块是否继承统一组件规范。
```

### 10.3 路由与导航一致性

检查：

```text
- 所有导航链接是否指向存在路由。
- CTA 是否指向正确页面。
- 列表页到详情页是否连贯。
- Dashboard Sidebar 是否与实际页面一致。
- Breadcrumb、Tabs、Back link 是否合理。
- 当前页面状态是否可识别，如 active nav 或 aria-current。
```

### 10.4 共享设计系统一致性

检查：

```text
- 页面是否共享同一套颜色、字体、间距、圆角、阴影。
- Button、Card、Input、Badge、Table、Modal 是否复用统一组件。
- 是否存在页面级临时样式破坏统一性。
- 是否有重复的按钮/卡片/表单实现。
- 是否存在多个冲突的主题来源。
```

### 10.5 页面视觉质量

检查：

```text
- 页面整体布局是否稳定。
- 首屏层级是否清晰。
- 关键 CTA 是否突出。
- 卡片、列表、表单、表格密度是否合理。
- 文案换行是否自然。
- 图片、图标、mockup 是否比例合适。
- Dark/Light surface 是否一致。
```

### 10.6 响应式质量

至少检查或推断：

```text
- Mobile：375px 或 390px
- Tablet：768px
- Desktop：1280px 或 1440px
```

重点：

```text
- 导航是否折叠。
- Sidebar 是否可用。
- 网格列数是否变化。
- 表格是否横向滚动或卡片化。
- CTA 是否堆叠。
- 文本是否溢出。
- 点击目标是否足够大。
```

### 10.7 可访问性基础质量

检查：

```text
- 页面是否有语义 main/header/nav/section/footer。
- 页面是否有合理标题层级。
- link 与 button 语义是否正确。
- 图标按钮是否有 aria-label。
- 图片是否有 alt。
- 表单字段是否有 label。
- focus-visible 是否存在。
- 可展开组件是否有 aria-expanded。
- 当前导航项是否有 aria-current。
```

### 10.8 Next.js + React 工程质量

检查：

```text
- App Router 文件结构是否合理。
- Server Component / Client Component 边界是否正确。
- 是否过度使用 "use client"。
- 是否有不必要依赖。
- 是否有未使用 import、未使用变量、重复代码。
- 是否在基础 UI 组件中混入业务数据。
- 是否在生产路径中使用不合理假数据。
```

---

## 11. Step 3：问题分级

所有问题必须分为 P0/P1/P2。

### 11.1 P0：必须修复，否则不能通过

P0 包括：

```text
- 项目无法安装、无法启动、无法构建，且不是环境问题。
- TypeScript / lint / build 存在阻断性错误。
- Skill 9 要求的核心路由缺失。
- 核心导航或 CTA 指向不存在页面。
- Marketing/App 页面结构严重混乱。
- 核心用户流程断裂。
- 统一设计系统完全未使用。
- 页面样式明显拼贴，无法视为同一系统。
- 移动端核心页面不可读或不可操作。
- 关键交互不可键盘访问。
- 生成代码明显违反 Skill 10 的模板组合计划。
```

### 11.2 P1：应该修复，否则不建议通过

P1 包括：

```text
- 某些页面风格轻微漂移。
- 共享组件复用不足。
- 数据字段跨页面不一致但不阻断演示。
- 响应式可用但体验较差。
- 可访问性有缺口但不阻断核心路径。
- 页面区块顺序与模板组合计划有偏差。
- 过多硬编码样式。
- 不必要的 Client Component。
- 空状态、加载状态、错误状态不完整。
```

### 11.3 P2：可选优化

P2 包括：

```text
- 轻微视觉细节差异。
- 命名可以更清晰。
- 组件抽象可进一步优化。
- 非关键 hover 动效缺失。
- 文档说明可更完整。
- 性能可进一步优化。
```

---

## 12. Step 4：制定修复计划

每轮修复前必须写出简短计划：

```text
本轮修复计划：
- 修复 P0：...
- 修复 P1：...
- 暂不处理 P2：...
- 预计影响文件：...
- 复验命令：...
```

修复计划必须满足：

```text
1. 优先处理 P0。
2. 每个修复项对应明确问题。
3. 尽量小范围修改。
4. 不修改无关文件。
5. 不重写系统蓝图。
6. 不重选模板。
```

---

## 13. Step 5：执行最小修复

Codex 修改代码时必须遵守：

```text
- 优先复用已有组件、token、布局和工具函数。
- 优先修复根因，而不是局部遮盖问题。
- 不因小交互把整页变成 Client Component。
- 不删除功能以通过构建。
- 不替换上游设计系统。
- 不引入新依赖，除非已有实现无法满足且用户允许。
- 不进行无关格式化。
- 不覆盖用户未提交的改动。
```

若 git status 显示用户已有未提交改动，Codex 应避免覆盖，并在报告中说明。

---

## 14. Step 6：复验

每轮修复后必须复验。

优先运行：

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

如果存在统一脚本，优先使用：

```bash
scripts/check.sh
```

复验还必须重新检查：

```text
- 原问题是否解决。
- 是否出现新 P0/P1。
- 是否仍符合 Skill 9。
- 是否仍符合 Skill 10。
- 是否仍符合统一设计系统。
- 是否仍符合 Next.js + React 基本工程规范。
```

不得声称未运行命令已经通过。

---

## 15. Step 7：循环协议

本 Skill 的核心是闭环：

```text
读取上游产物
  ↓
检查代码和路由
  ↓
运行验证
  ↓
问题分级
  ↓
制定修复计划
  ↓
执行最小修复
  ↓
复验
  ↓
如果仍有 P0 或未豁免 P1，继续下一轮
  ↓
通过或阻塞后输出报告
```

循环规则：

```text
1. 只要存在 P0，不能通过。
2. 只要存在未豁免 P1，原则上继续修复。
3. P1 若暂不修复，必须说明原因。
4. P2 不阻塞通过，但必须记录。
5. 每轮都必须记录发现、修改、验证结果。
6. 如果用户明确要求只审查不修改，则只输出 QA 报告，不进入修复循环。
```

---

## 16. 通过标准

只有满足以下条件，才能声明通过：

```text
1. 没有 P0 问题。
2. P1 已修复，或有明确合理豁免说明。
3. Skill 9 的核心页面、路由、流程已被支持。
4. Skill 10 的模板组合计划得到执行。
5. 多页面共享统一设计系统。
6. 核心页面之间导航连贯。
7. 主要共享组件被复用。
8. 可用验证命令无阻断性失败。
9. 响应式不存在核心阻断。
10. 可访问性不存在关键阻断。
```

如果没有截图或浏览器预览，只能声明：

```text
规范级 QA 通过 / 代码级 QA 通过
```

不能声明：

```text
截图级视觉完全通过
```

---

## 17. 阻塞条件

出现以下情况时，停止循环并输出阻塞报告：

```text
- 缺少代码仓库或关键代码文件。
- 缺少 Skill 9 与 Skill 10，无法确定系统目标和模板组合依据。
- package.json 缺失，且无法判断验证方式。
- 项目无法安装依赖，且无法进行静态审查以外的验证。
- 上游产物互相冲突，无法判断正确结果。
- 缺少关键素材，且无法合理替代。
- 修复某个问题会违反更高优先级的上游规范。
- 用户明确要求停止。
```

阻塞时必须输出：

```text
- 阻塞原因
- 已完成验收
- 已完成修复
- 无法继续的原因
- 需要用户提供的内容
```

---

## 18. 硬性规则

Codex 必须遵守：

```text
- 不要在读取上游产物前修改代码。
- 不要跳过 git status 检查。
- 不要修改无关文件。
- 不要重写 System Blueprint。
- 不要重选模板。
- 不要推翻统一设计系统。
- 不要为了通过验收删除核心页面或功能。
- 不要在没有实际运行时声称验证通过。
- 不要隐藏失败命令。
- 不要无理由新增依赖。
- 不要把所有组件都加 "use client"。
- 不要用个人审美替代上游模板组合计划。
- 不要把 P0 降级为 P1 以便通过。
- 不要在生产路径中使用不合理假数据。
- 不要输出空泛建议，必须给出文件、位置、问题、修复动作。
```

---

## 19. 验证标准

### 19.1 P0 自检

最终报告前必须确认：

```text
[ ] 已读取 Skill 9 System Blueprint，或说明缺失原因。
[ ] 已读取 Skill 10 Template Composition，或说明缺失原因。
[ ] 已读取 Skill 6 Code Generation Report，或说明缺失原因。
[ ] 已检查 package.json 和可用脚本。
[ ] 已检查核心路由存在性。
[ ] 已检查核心导航和 CTA。
[ ] 已检查共享组件与设计系统使用情况。
[ ] 已运行可用验证命令，或说明无法运行原因。
[ ] 已修复所有 P0，或输出阻塞报告。
```

### 19.2 P1 自检

```text
[ ] 主要页面风格一致。
[ ] 响应式基础可用。
[ ] 可访问性基础可用。
[ ] 数据字段和 mock 内容跨页面基本一致。
[ ] 组件复用没有明显问题。
[ ] 没有过度客户端化。
```

### 19.3 P2 自检

```text
[ ] 记录剩余轻微视觉优化。
[ ] 记录未来可改进的组件抽象。
[ ] 记录未执行的可选验证。
```

---

## 20. 最终输出模板

Codex 必须将最终报告写入 Markdown 文件，并在最终回复中摘要说明。

### 20.1 通过报告模板

```markdown
# Visual QA & Iterative Fix Report

## 1. 结论

通过。

## 2. 输入产物读取情况

| 产物 | 路径 | 状态 | 说明 |
|---|---|---|---|
| System Blueprint | `...` | 已读取 / 缺失 | ... |
| Template Composition | `...` | 已读取 / 缺失 | ... |
| Code Generation Report | `...` | 已读取 / 缺失 | ... |

## 3. 验收范围

- Build QA：已完成 / 未完成，原因：...
- Blueprint QA：已完成 / 未完成，原因：...
- Template Composition QA：已完成 / 未完成，原因：...
- Cross-page Consistency QA：已完成 / 未完成，原因：...
- Page Visual QA：已完成 / 未完成，原因：...
- Accessibility QA：已完成 / 未完成，原因：...

## 4. 修复轮次

### 第 1 轮

发现：
- ...

修复：
- ...

复验：
- ...

## 5. 修改文件

- `...`

## 6. 已运行验证

| 命令 | 结果 | 说明 |
|---|---|---|
| `npm run build` | 通过 / 失败 / 未运行 | ... |

## 7. 剩余 P2 优化

- ...

## 8. 风险与说明

- ...

## 9. 下游交接

- 可进入 Skill 11 Cross-page QA：是 / 否
- 需要人工确认：...
```

### 20.2 阻塞报告模板

```markdown
# Visual QA & Iterative Fix Report

## 1. 结论

未通过，存在阻塞。

## 2. 阻塞原因

- ...

## 3. 已完成验收

- ...

## 4. 已完成修复

- ...

## 5. 仍存在问题

### P0

- ...

### P1

- ...

### P2

- ...

## 6. 已运行验证

| 命令 | 结果 | 说明 |
|---|---|---|
| `...` | ... | ... |

## 7. 修改文件

- `...`

## 8. 需要用户提供

- ...
```

### 20.3 只审查不修改报告模板

```markdown
# Visual QA Report

## 1. 结论

通过 / 不通过 / 无法判断。

## 2. 发现的问题

### P0

- ...

### P1

- ...

### P2

- ...

## 3. 建议修复顺序

1. ...
2. ...
3. ...

## 4. 验证情况

- ...

## 5. 风险与说明

- ...
```

---

## 21. 最终回复格式

Codex 在完成后，最终回复必须简洁说明：

```text
已完成：
- 多页 Visual QA 与迭代修复报告已生成。
- 结论：通过 / 未通过 / 阻塞。

修改文件：
- ...

报告文件：
- `./docs/visual-qa-iterative-fix-report.md`

已验证：
- ...

风险与说明：
- ...
```

如果未修改代码，则写：

```text
修改文件：无，仅生成 QA 报告。
```

---

## 22. 最重要的原则

本 Skill 的价值不是“指出页面哪里不对”，而是形成可执行闭环：

```text
读取上游依据 → 验收多页系统 → 分级问题 → 最小修复 → 复验 → 通过或阻塞
```

对于模板增强式多页应用生成，最关键的不是单页好不好看，而是：

```text
系统蓝图是否落地，模板组合是否执行，设计系统是否统一，页面之间是否连贯，代码是否可运行。
```
