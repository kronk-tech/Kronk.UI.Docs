# ui-table

Styled wrapper for a native table.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-table striped><table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table></ui-table>
```

```html
<ui-table bordered><table><tr><td>x</td></tr></table></ui-table>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `striped` | `striped` | boolean | false | Zebra rows. |
| `bordered` | `bordered` | boolean | false | Cell borders. |
| `size` | `size` | string | "md" | sm, md or lg. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — A native <table>.

## CSS classes

- Base class: `ui-table`
- `striped` → `ui-table--striped`
- `bordered` → `ui-table--bordered`
- `size` → `ui-table--{}`
