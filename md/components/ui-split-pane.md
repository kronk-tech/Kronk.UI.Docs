# ui-split-pane

Two resizable panes with a draggable, keyboard-accessible divider.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-split-pane style="height:8rem"><div>Left</div><div>Right</div></ui-split-pane>
```

```html
<ui-split-pane vertical value="30" style="height:10rem"><div>Top</div><div>Bottom</div></ui-split-pane>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | number | 50 | First pane size in percent (10–90). |
| `vertical` | `vertical` | boolean | false | Stack panes vertically. |

## Methods

- `set` — set(percent).
- `get` — Current percent.
- `reset` — Restore the initial split.

## Events

- `ui-resize` — Size changed; detail { value }.

## Slots

- `(default)` — Exactly two child elements.

## CSS classes

- Base class: `ui-split-pane`
- `vertical` → `ui-split-pane--vertical`
