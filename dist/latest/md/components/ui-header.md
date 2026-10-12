# ui-header

Semantic heading.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-header level="1">Title</ui-header>
```

```html
<ui-header level="3" size="xl" muted>Subtitle</ui-header>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `level` | `level` | number | 2 | Heading level 1–6. |
| `size` | `size` | string | "" | Visual size override xs–3xl. |
| `muted` | `muted` | boolean | false | Muted colour. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Heading text.
