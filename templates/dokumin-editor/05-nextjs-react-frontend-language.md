# Next.js React Frontend Language - dokumin-editor

## App Router Structure Suggestion
- `app/(workspace)/editor/page.tsx`
- `app/(workspace)/layout.tsx`
- `components/editor/top-header.tsx`
- `components/editor/primary-sidebar.tsx`
- `components/editor/file-explorer-panel.tsx`
- `components/editor/editor-main-panel.tsx`
- `components/editor/changes-drawer.tsx`

## Server Client Component Boundaries
- Server Components:
- `editor/page.tsx`（拉取初始项目、目录树、文档内容）
- Client Components:
- `PrimarySidebar`, `FileExplorerPanel`, `DocTabs`, `ChangesDrawer`（交互密集）
- 混合策略:
- 文档正文可 server render + client hydrate（按编辑器能力决定）。

## Props And Data Contracts
- `TreeNode`:
```ts
type TreeNode = { id: string; name: string; kind: 'file'|'folder'; ext?: string; children?: TreeNode[] }
```
- `DocTab`:
```ts
type DocTab = { id: string; title: string; dirty: boolean }
```
- `ChangeItem`:
```ts
type ChangeItem = { id: string; type: 'added'|'modified'|'deleted'; file: string; editor: string; at: string }
```

## Tailwind Token Mapping
- `bg-canvas` -> `bg-[#f3f3f5]`
- `bg-panel` -> `bg-white`
- `text-primary` -> `text-[#111111]`
- `text-secondary` -> `text-[#61616b]`
- `brand` -> `bg-[#3a34ff] hover:bg-[#2d28d9]`
- `border-subtle` -> `border-[#e6e6ea]`
- 圆角映射: `rounded-lg`, `rounded-xl`, `rounded-2xl`

## TypeScript Contract
- 组件 props 全量显式声明，不使用 `any`。
- 目录树、标签、变更记录使用可复用 domain types。
- 交互回调统一采用受控组件模式。
- 异步发布动作定义为 `Promise<Result>` 并携带错误码。

## shadcn/ui Adoption Plan
- 复用 `Button`, `Input`, `Tabs`, `Sheet`, `DropdownMenu`, `ScrollArea`。
- 文件树可由 `Collapsible` + 自定义节点渲染实现。
- 变更抽屉优先 `Sheet`，桌面端可设右侧停靠样式。

## Responsive Implementation Notes
- 使用 `lg:grid-cols-[280px_360px_1fr]` 组织桌面三栏。
- `md` 以下启用 `Sheet` 承载侧栏。
- Tab 列表容器使用 `overflow-x-auto` 保障可达性。
- 桌面与移动共享状态模型，避免分叉逻辑。

## Adaptation Constraints
- 必须保留核心任务路径：选文件 -> 编辑 -> 查看变更 -> 发布。
- 颜色强调保持稀缺，主 CTA 唯一高优先。
- 当前移动端规则来自假设，需后续用真实截图回填验证。
