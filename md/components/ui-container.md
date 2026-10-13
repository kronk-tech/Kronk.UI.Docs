# ui-container

Centred, width-constrained page container.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-container size="sm"><p>Narrow content</p></ui-container>
```

```html
<ui-container size="xl"><p>Wide content</p></ui-container>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `size` | `size` | string | "md" | Max width: sm, md, lg, xl or full. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Page content.

## CSS classes

- Base class: `ui-container`
- `size` → `ui-container--{}`
