# ui-badge

Small status label.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-badge>Default</ui-badge>
```

```html
<ui-badge variant="success">Success</ui-badge>
```

```html
<ui-badge outline>Outline</ui-badge>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `variant` | `variant` | string | "" | Colour variant: primary, success, warning, danger or info. |
| `outline` | `outline` | boolean | false | Use the transparent outline style. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Badge text or icon.

## CSS classes

- Base class: `ui-badge`
- `variant` → `ui-badge--{}`
- `outline` → `ui-badge--outline`
