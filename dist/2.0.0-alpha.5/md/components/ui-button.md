# ui-button

Styled button or link.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

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
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `type` | `type` | string | "button" | Native button type (button, submit, reset). |
| `href` | `href` | string | "" | When set, renders an anchor. |
| `variant` | `variant` | string | "" | Visual variant. |
| `primary` | `primary` | boolean | false | Primary emphasis. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Button content.
