# ui-card

Surface container with optional header, body and footer.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-card><ui-card-header>Title</ui-card-header><ui-card-body>Body</ui-card-body></ui-card>
```

```html
<ui-card dashed size="lg"><ui-card-body>Dashed</ui-card-body></ui-card>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `size` | `size` | string | "md" | sm, md or lg. |
| `flat` | `flat` | boolean | false | Remove shadow. |
| `ghost` | `ghost` | boolean | false | Transparent surface. |
| `primary` | `primary` | boolean | false | Primary accent. |
| `dashed` | `dashed` | boolean | false | Dashed border. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — ui-card-header, ui-card-body, ui-card-footer.

## CSS classes

- Base class: `ui-card`
- `size` → `ui-card--{}`
- `flat` → `ui-card--flat`
- `ghost` → `ui-card--ghost`
- `primary` → `ui-card--primary`
- `dashed` → `ui-card--dashed`
