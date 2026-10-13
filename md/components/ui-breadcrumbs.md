# ui-breadcrumbs

Breadcrumb trail.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-breadcrumbs><a href="/">Home</a><a href="/p">Projects</a><span>Current</span></ui-breadcrumbs>
```

```html
<ui-breadcrumbs><a href="/">Home</a><span>Here</span></ui-breadcrumbs>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Links; the last element is the current page.
