# ui-grid-col

Grid column spanning several tracks.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-grid cols="4"><ui-grid-col span="3">Wide</ui-grid-col><ui-grid-col>Narrow</ui-grid-col></ui-grid>
```

```html
<ui-grid cols="2"><ui-grid-col span="2">Full</ui-grid-col></ui-grid>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `span` | `span` | string | "" | Number of columns to span (2, 3, 4, 6 or 12). |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Column content.

## CSS classes

- Base class: `ui-grid__col`
- `span` → `ui-grid__col--span-{}`
