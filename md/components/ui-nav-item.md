# ui-nav-item

Navigation item with icon and label.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-nav><ui-nav-item href="/" icon="house">Home</ui-nav-item></ui-nav>
```

```html
<ui-nav><ui-nav-item href="/docs" match="prefix">Docs</ui-nav-item></ui-nav>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `href` | `href` | string | "" | Link target. |
| `icon` | `icon` | string | "" | Font Awesome icon name. |
| `match` | `match` | string | "" | exact or prefix: derive active state from location. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Label text.
