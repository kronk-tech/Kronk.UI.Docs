# ui-avatar

User avatar with image, initials or icon fallback.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-avatar name="Ada Lovelace"></ui-avatar>
```

```html
<ui-avatar size="lg"></ui-avatar>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `src` | `src` | string | "" | Image URL. |
| `name` | `name` | string | "" | Full name used for initials and alt text. |
| `size` | `size` | string | "md" | sm, md or lg. |

## Methods

None.

## Events

None.

## Slots

None.

## CSS classes

- Base class: `ui-avatar`
- `size` → `ui-avatar--{}`
