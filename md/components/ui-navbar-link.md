# ui-navbar-link

Top bar link with optional icon.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-navbar-link href="/">Home</ui-navbar-link>
```

```html
<ui-navbar-link href="/x" icon="gear">Settings</ui-navbar-link>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `href` | `href` | string | "" | Link target. |
| `icon` | `data-icon` | string | "" | Font Awesome icon name. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Label.

## CSS classes

- Base class: `ui-navbar-link`
