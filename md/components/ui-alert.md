# ui-alert

Inline status message.

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-alert variant="warning" heading="Attention">Check your input.</ui-alert>
```

```html
<ui-alert variant="success">Saved.</ui-alert>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `variant` | `variant` | string | "info" | info, success, warning or danger. |
| `heading` | `heading` | string | "" | Alert title. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Message body.

## CSS classes

- Base class: `ui-alert`
- `variant` → `ui-alert--{}`
