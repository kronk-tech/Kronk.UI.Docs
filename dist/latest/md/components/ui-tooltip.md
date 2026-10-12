# ui-tooltip

Accessible tooltip attached to an anchor element.

- **Category:** Overlays  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-button id="tt1">Hover me</ui-button><ui-tooltip for="tt1">Helpful text</ui-tooltip>
```

```html
<ui-button id="tt2">Focus me</ui-button><ui-tooltip for="tt2" delay="0">Instant</ui-tooltip>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `for` | `for` | string | "" | id of the anchor element. |
| `delay` | `delay` | number | 400 | Open delay in ms. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Tooltip content.

## CSS classes

- Base class: `ui-tooltip`
