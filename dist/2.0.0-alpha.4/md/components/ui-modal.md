# ui-modal

Native <dialog> with promise-based open and close.

- **Category:** Overlays  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** UIOverlayElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-modal id="m" heading="Hello">Body text</ui-modal><ui-button onclick="document.getElementById('m').show()">Open</ui-button>
```

```html
<ui-modal id="m2" heading="Sized" size="sm">Small dialog</ui-modal><ui-button onclick="document.getElementById('m2').show()">Open small</ui-button>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `open` | `open` | boolean | false | Open state (reflected). |
| `heading` | `heading` | string | "" | Dialog heading. |
| `size` | `size` | string | "md" | sm, md or lg. |
| `dismissible` | `dismissible` | boolean | true | Escape and backdrop dismissal. |
| `modal` | `modal` | boolean | true | Use showModal() (default) or non-modal show(). |

## Methods

- `show` — Open; returns a promise resolving with the close result.
- `hide` — Close with an optional result.

## Events

- `ui-open` — Fired after opening.
- `ui-before-close` — Cancelable; detail { reason, result }.
- `ui-close` — Fired after closing; detail { result, reason }.

## Slots

- `header` — Custom header.
- `(default)` — Body.
- `footer` — Footer actions.
