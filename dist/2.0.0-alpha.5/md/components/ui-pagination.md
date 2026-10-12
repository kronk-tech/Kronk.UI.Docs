# ui-pagination

Page selector.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-pagination page="3" pages="12"></ui-pagination>
```

```html
<ui-pagination pages="3"></ui-pagination>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `page` | `page` | number | 1 | Current page (1-based). |
| `pages` | `pages` | number | 1 | Total pages. |

## Methods

- `select` — select(page, { emit }).

## Events

- `ui-change` — Page changed; detail { page, previous, source }.

## Slots

None.
