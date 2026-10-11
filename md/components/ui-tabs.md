# ui-tabs

Tabbed content with full keyboard and ARIA support.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-tabs value="overview"><ui-tab value="overview">Overview</ui-tab><ui-tab value="history">History</ui-tab><ui-tab-panel value="overview">Overview content</ui-tab-panel><ui-tab-panel value="history">History content</ui-tab-panel></ui-tabs>
```

```html
<ui-tabs><ui-tab value="one">One</ui-tab><ui-tab value="two" disabled>Two</ui-tab><ui-tab-panel value="one">First</ui-tab-panel></ui-tabs>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | string | "" | Selected tab value; defaults to the first enabled tab. |

## Methods

- `select` — Select a tab by value: select(value, { emit }).

## Events

- `ui-change` — User changed tab; detail { value, previous, source }.

## Slots

- `(default)` — ui-tab and ui-tab-panel children.
