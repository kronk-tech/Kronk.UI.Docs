# ui-option-meta

Secondary text displayed beside an option label (excluded from filtering and the selected label).

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-select label="Pick"><ui-option value="a">Alpha<ui-option-meta>first</ui-option-meta></ui-option></ui-select>
```

```html
<ui-select label="Pick"><ui-option value="b">Beta<ui-option-meta>second</ui-option-meta></ui-option></ui-select>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Metadata text.
