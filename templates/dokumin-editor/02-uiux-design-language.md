# UIUX Design Language - dokumin-editor

## UX Intent
- 以“稳定、高效、可预期”的文档协作为核心。
- 将高频任务（切换文件、编辑、发布、查看变更）固定在可预期位置，降低操作成本。
- 通过低对比中性色背景与高对比焦点色，维持长时间编辑的视觉舒适度。

## Information Architecture Signals
- 三层 IA 信号清晰：
1. 产品导航层（左主侧栏）
2. 内容资源层（文件树）
3. 任务执行层（编辑器主区）
- 分组标题（MAIN/PRODUCTS/TOOLS）强化功能域边界。
- 面包式分支上下文（`/main`）说明当前工作分支语义。

## Interaction Principles
- Principle 1: 关键路径可一眼识别（Publish、Active Nav、Open Tabs）。
- Principle 2: 上下文并行（多标签 + 树结构 + 变更面板）。
- Principle 3: 渐进披露（变更详情放在可展开卡片，不干扰主编辑）。
- Principle 4: 轻反馈高频触达（图标按钮、状态徽标、时间戳反馈）。

## Responsive Intent (Desktop + Mobile)
- Desktop: 保持多栏并行信息结构，优先效率与可视范围。
- Mobile Hypothesis: 收敛为单主栏，采用抽屉承载导航和文件树。
- Mobile 下保留发布入口与变更入口，弱化低优先信息（如次级工具链接）。

## Assumptions And Uncertainties
- 未见移动端截图，移动布局为结构推断。
- 未见交互动效，无法确认过渡节奏与 easing。
- 无障碍细节（键盘导航、焦点环、ARIA）需实现阶段补证。
