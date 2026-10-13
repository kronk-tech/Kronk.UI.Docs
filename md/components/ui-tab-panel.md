# ui-tab-panel

Panel shown for the matching ui-tab.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-tabs><ui-tab value="a">A</ui-tab><ui-tab-panel value="a">Panel</ui-tab-panel></ui-tabs>
```

```html
<ui-tabs><ui-tab value="x">X</ui-tab><ui-tab-panel value="x"><p>Rich</p></ui-tab-panel></ui-tabs>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | string | "" | Matches a ui-tab value. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Panel content.
