# ui-toast-region

Stacking region for toasts; created on demand by UI.toast().

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-toast-region></ui-toast-region>
```

```html
<ui-toast-region limit="2"></ui-toast-region>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `limit` | `limit` | number | 5 | Maximum simultaneously visible toasts. |
| `placement` | `placement` | string | "bottom-end" | Screen corner. |

## Methods

- `showToast` — showToast(message, { type, duration, action }) -> { id, dismiss }.

## Events

- `ui-toast-show` — Toast shown; detail { id }.
- `ui-toast-dismiss` — Toast removed; detail { id, reason }.

## Slots

None.

## CSS classes

- Base class: `ui-toast-region`
