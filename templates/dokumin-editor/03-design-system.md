# Design System Structurization - dokumin-editor

## Token Taxonomy
- `color.*`: 背景/边框/文本/强调/状态
- `radius.*`: 容器、输入框、按钮
- `space.*`: 4/8 基线间距系统
- `shadow.*`: 浮层与卡片层级
- `typography.*`: 标题、正文、辅助文本

## Color System
- `color.bg.canvas`: #f3f3f5 (应用背景)
- `color.bg.panel`: #ffffff (面板背景)
- `color.border.subtle`: #e6e6ea
- `color.text.primary`: #111111
- `color.text.secondary`: #61616b
- `color.brand.primary`: #3a34ff
- `color.brand.primaryHover`: #2d28d9
- `color.state.success`: #12a150
- `color.state.warning`: #c58a00

## Typography System
- Heading XL: 48/56, 700 (文档主标题)
- Heading L: 36/44, 650
- Body M: 16/28, 400-500
- Label M: 14/20, 500
- Meta S: 12/16, 400
- 建议字体族: `"Manrope", "SF Pro Text", "Segoe UI", sans-serif`

## Spacing Radius Shadow Border
- Spacing: 4, 8, 12, 16, 20, 24, 32
- Radius: `r-sm=8`, `r-md=12`, `r-lg=16`, `r-xl=20`
- Shadow: `shadow-sm` (工具卡), `shadow-md` (浮层/抽屉)
- Border: 1px solid `color.border.subtle`

## Component Style Baselines
- Sidebar Item: 高度 40-44，active 使用品牌色填充 + 白字。
- Input/Search: 浅灰底 + 圆角 + 左图标。
- Tab: 默认透明底，选中增加文字对比与下划线/背景强调。
- CTA Button: 主色实心按钮，圆角中等，hover 提升明度/阴影。
- Change Card: 白底卡片 + 状态 pill（added/modified）。

## Responsive Token Considerations
- Mobile 降低左右 padding（24 -> 16 或 12）。
- Mobile 标题字号回退一级（48 -> 36 或 32）。
- 浮层宽度改为 `min(100vw-24px, 420px)`。

## Reuse Constraints
- 必须保留三类语义层级：导航层、资源层、执行层。
- 品牌色应只用于高价值交互，不泛滥到正文区域。
- 若替换字体，需保持 x-height 与字重梯度接近。
- 当前 token 含移动端推断成分，落地前需真机校验。
