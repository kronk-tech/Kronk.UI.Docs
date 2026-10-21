# ui-grid

Column grid.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-grid cols="2"><div>1</div><div>2</div></ui-grid>
```

```html
<ui-grid cols="3" gap="lg"><div>1</div><div>2</div><div>3</div></ui-grid>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `cols` | `cols` | number | 2 | Column count: 2, 3, 4, 6 or 12. |
| `gap` | `gap` | string | "md" | Spacing: xs, sm, md, lg or xl. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — ui-grid-col children or any content.

## CSS classes

- Base class: `ui-grid`
- `cols` → `ui-grid--cols-{}`
- `gap` → `ui-grid--gap-{}`
