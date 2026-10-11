# ui-details

Disclosure built on native <details>.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-details heading="More" subheading="Click to expand">Hidden content</ui-details>
```

```html
<ui-details heading="A" group="g">One</ui-details><ui-details heading="B" group="g">Two</ui-details>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `open` | `open` | boolean | false | Expanded state (reflected). |
| `heading` | `heading` | string | "" | Summary heading. |
| `subheading` | `subheading` | string | "" | Secondary line. |
| `group` | `group` | string | "" | Exclusive group name. |

## Methods

None.

## Events

- `ui-toggle` — Opened or closed; detail { open }.

## Slots

- `(default)` — Content.
