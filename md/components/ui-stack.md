# ui-stack

Vertical layout primitive.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-stack><p>One</p><p>Two</p></ui-stack>
```

```html
<ui-stack gap="lg"><p>One</p><p>Two</p></ui-stack>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `gap` | `gap` | string | "md" | Spacing: xs, sm, md, lg or xl. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Stacked content.

## CSS classes

- Base class: `ui-stack`
- `gap` → `ui-stack--{}`
