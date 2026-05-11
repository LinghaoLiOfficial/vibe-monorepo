# Page Visual Parse - dokumin-editor

## Summary
这是一个三栏式文档平台编辑器页面（SaaS Web App），核心目标是“文档内容编辑 + 文件树管理 + 协作变更追踪”。页面强调高信息密度、清晰分区和低干扰编辑体验。

## Page Type
- 产品类型: 文档协作/知识库编辑后台
- 页面类型: 已登录工作台（Editor）
- 任务导向: 浏览目录、编辑 Markdown/MDX、发布文档、查看变更

## Desktop Evidence
- 证据来源: `template-preparation/inputs/screenshots/dokumin-editor.webp`
- 画布宽度明显大于 1200px，采用桌面端多栏布局。
- 全局结构为:
1. 左侧导航栏（品牌、模块导航、工具入口、进度卡片）
2. 中左资源栏（分支、搜索、树状文件结构）
3. 右侧主编辑区（标签页、正文编辑、变更抽屉、底部状态）
- 顶部右侧存在主题/通知/头像控制区，主操作按钮为 `Publish`。

## Mobile Evidence Or Hypothesis
- 未提供移动端截图，以下为 Hypothesis（<=767px）：
- 三栏会折叠为单栏主内容优先，导航与文件树通过抽屉/Sheet 展开。
- 顶部保留核心操作：返回/菜单、页面标题、发布按钮（可能图标化）。
- 变更卡片改为底部可展开面板；目录树支持手风琴折叠。
- 搜索与分支选择保持可达，但层级简化，减少同屏密度。

## Region Breakdown
1. Global Shell
- 外层大圆角容器 + 浅灰背景，体现“应用画布”感。
- 顶部跨栏 Header：左侧 `Editor` 标题，右侧系统控制与账号。

2. Left Primary Sidebar
- 品牌区（Dokumin logo + name）
- 全局搜索框
- 分组导航（MAIN / PRODUCTS / TOOLS）
- 当前选中项高亮（蓝紫渐变底）
- 底部进度卡与工作区切换入口

3. File Explorer Panel
- 分支选择 `/main`
- 新建文件/文件夹图标按钮
- 第二搜索框（针对文件树）
- 树形目录与文件类型图标（md/mdx/json/svg/png）

4. Editor Workspace
- Tab 条（README.md / quickstart.mdx）
- 主文档阅读/编辑面板（大标题、正文、列表、链接）
- 悬浮 `Changes` 抽屉，显示文件新增/修改与编辑人
- 底部状态区（变更数量、时间戳、语言/代码切换）

## Visual Signals
- 颜色: 中性灰底 + 蓝紫品牌强调色；高亮项与主 CTA 一致。
- 形态: 大量 10-16px 圆角，弱边框 + 轻阴影，降低视觉噪音。
- 字体层级: H1 大字重，正文中等字重，导航/元信息较小。
- 图标策略: 线性图标统一风格，文件类型用色彩区分。
- 空间系统: 面板间距与内边距规律稳定，使用卡片容器承载功能块。

## Interaction Signals
- 导航项具明显 active 状态，支持快速定位当前模块。
- 树形目录支持展开/折叠，暗示层级浏览与大纲管理。
- 多标签编辑支持并行上下文切换。
- `Publish` 作为首要动作，位于右上显著位置。
- `Changes` 抽屉支持协作审阅路径（谁改了什么）。

## Uncertainties
- 无法从静态图确认：
- 真实断点规则、动画时长、hover/focus 细节。
- 编辑区是否为富文本或纯 Markdown 源码模式。
- 变更抽屉的可筛选/可回滚能力。
- 暗色模式下 token 映射是否完全对称。
