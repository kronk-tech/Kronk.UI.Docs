# ui-tab

Tab trigger inside ui-tabs.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-tabs><ui-tab value="a">A</ui-tab><ui-tab-panel value="a">Panel A</ui-tab-panel></ui-tabs>
```

```html
<ui-tabs value="b"><ui-tab value="a">A</ui-tab><ui-tab value="b">B</ui-tab><ui-tab-panel value="a">One</ui-tab-panel><ui-tab-panel value="b">Two</ui-tab-panel></ui-tabs>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | string | "" | Tab id; matches a ui-tab-panel value. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Tab label.
