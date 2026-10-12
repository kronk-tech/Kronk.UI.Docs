# ui-option-group

Group of ui-option elements.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-select label="Pick"><ui-option-group label="Letters"><ui-option value="a">A</ui-option></ui-option-group></ui-select>
```

```html
<ui-select label="Pick"><ui-option-group label="Numbers"><ui-option value="1">1</ui-option></ui-option-group></ui-select>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `label` | `label` | string | "" | Group heading. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — ui-option children.
