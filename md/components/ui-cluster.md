# ui-cluster

Horizontal, wrapping layout primitive.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-cluster><ui-badge>A</ui-badge><ui-badge>B</ui-badge></ui-cluster>
```

```html
<ui-cluster between><span>Left</span><span>Right</span></ui-cluster>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `gap` | `gap` | string | "md" | Spacing: xs, sm, md, lg or xl. |
| `between` | `between` | boolean | false | Distribute with space-between. |
| `end` | `end` | boolean | false | Align to the end. |
| `nowrap` | `nowrap` | boolean | false | Disable wrapping. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Inline content.

## CSS classes

- Base class: `ui-cluster`
- `gap` → `ui-cluster--{}`
- `between` → `ui-cluster--between`
- `end` → `ui-cluster--end`
- `nowrap` → `ui-cluster--nowrap`
