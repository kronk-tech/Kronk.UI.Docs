# ui-option

Declarative option for ui-select.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-select label="Pick"><ui-option value="a">Alpha</ui-option></ui-select>
```

```html
<ui-select label="Pick"><ui-option value="b" disabled>Beta</ui-option></ui-select>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | string | "" | Submitted option value. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Visible label; may contain a ui-option-meta.
