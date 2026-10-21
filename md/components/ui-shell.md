# ui-shell

Application shell with collapsible sidebar and top bar.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-shell><ui-topbar>App</ui-topbar><ui-sidebar>Menu</ui-sidebar><main>Content</main></ui-shell>
```

```html
<ui-shell collapsed><ui-sidebar>Menu</ui-sidebar><main>Content</main></ui-shell>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `collapsed` | `collapsed` | boolean | false | Collapse the sidebar. |
| `persist` | `persist` | boolean | false | Remember the collapsed state in localStorage. |

## Methods

- `toggle` — Toggle collapsed state.
- `closeSidebar` — Close the mobile sidebar.

## Events

- `ui-shell-change` — Collapsed or sidebar state changed.

## Slots

- `(default)` — ui-topbar, ui-sidebar and page content.

## CSS classes

- Base class: `ui-shell`
- `collapsed` → `ui-shell--collapsed`
