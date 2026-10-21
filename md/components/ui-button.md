# ui-button

Styled button or link.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-button>Save</ui-button>
```

```html
<ui-button primary type="submit">Submit</ui-button>
```

```html
<ui-button href="https://example.com">Link</ui-button>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `type` | `type` | string | "button" | Native button type (button, submit, reset). |
| `href` | `href` | string | "" | When set, renders an anchor. |
| `variant` | `variant` | string | "" | Visual variant. |
| `iconOnly` | `icon-only` | boolean | false | When true, the button will only display an icon. |
| `primary` | `primary` | boolean | false | Primary emphasis. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Button content.

## CSS classes

- Base class: `ui-button`
- `variant` → `ui-button--{}`
- `primary` → `ui-button--primary`
- `iconOnly` → `ui-button--icon-only`
