# Frontend Component Plan - dokumin-editor

## Component Tree
1. `EditorWorkspacePage`
2. `TopHeader`
3. `PrimarySidebar`
4. `FileExplorerPanel`
5. `EditorMainPanel`
6. `DocTabs`
7. `DocumentCanvas`
8. `ChangesDrawer`
9. `BottomStatusBar`

## Layering And Boundaries
- Layout Shell 层: `TopHeader + 3-column body`
- Navigation 层: `PrimarySidebar`
- Resource 层: `FileExplorerPanel`
- Content/Task 层: `EditorMainPanel`
- Overlay 层: `ChangesDrawer`（绝对定位或 portal）

## Component Contracts
- `PrimarySidebar`
- props: `{ sections, activeKey, onNavigate }`
- `FileExplorerPanel`
- props: `{ branch, treeNodes, selectedFile, onSelectFile, onCreate }`
- `DocTabs`
- props: `{ tabs, activeTabId, onSwitch, onClose }`
- `DocumentCanvas`
- props: `{ docTitle, blocks, mode, onEdit }`
- `ChangesDrawer`
- props: `{ open, changes, onClose, onOpenDetail }`

## State And Interaction Rules
- `activeNavKey` 控制左侧高亮。
- `expandedNodeIds` 管理目录树展开。
- `activeTabId` 控制主文档内容。
- `isChangesOpen` 控制变更抽屉显示。
- `publishState` 管理发布按钮状态（idle/loading/success/error）。

## Responsive Behavior
- `>=1200px`: 三栏固定展示。
- `768-1199px`: 左侧主导航可折叠，保留文件树 + 主编辑。
- `<=767px`: 单栏主编辑；导航和文件树改为抽屉。

## Mobile Degradation Rules
- 隐藏低优先级辅助入口（如部分工具链接）。
- Tab 条可横向滚动，最多展示 1-2 个完整标签。
- Changes 抽屉转为底部 sheet，避免遮挡主内容。

## Replaceable Regions
- 品牌区可替换：logo、产品名。
- 左侧菜单可替换：信息架构项与分组。
- 文件树图标映射可替换：按业务文件类型扩展。
- 主编辑内容渲染器可替换：Markdown、富文本或混合模式。
