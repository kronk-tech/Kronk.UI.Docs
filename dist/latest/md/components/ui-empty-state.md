# ui-empty-state

Placeholder for empty content with an optional action.

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-empty-state heading="No projects" description="Create one to start." icon="folder-open"></ui-empty-state>
```

```html
<ui-empty-state heading="Nothing here"></ui-empty-state>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `heading` | `heading` | string | "" | Title. |
| `description` | `description` | string | "" | Explanation. |
| `icon` | `icon` | string | "" | Font Awesome icon name. |

## Methods

None.

## Events

None.

## Slots

- `action` — Call to action.

## CSS classes

- Base class: `ui-empty-state`
