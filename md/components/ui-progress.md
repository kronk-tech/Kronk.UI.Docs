# ui-progress

Progress bar.

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-progress value="40"></ui-progress>
```

```html
<ui-progress indeterminate></ui-progress>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | number | 0 | Current value. |
| `max` | `max` | number | 100 | Maximum value. |
| `indeterminate` | `indeterminate` | boolean | false | Unknown progress. |

## Methods

None.

## Events

None.

## Slots

None.

## CSS classes

- Base class: `ui-progress`
- `indeterminate` → `ui-progress--indeterminate`
