# ui-listbox

Keyed, filterable list with keyboard navigation and a custom item template.

- **Category:** Lists  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-listbox id="lb1" filterable></ui-listbox><script>document.getElementById("lb1").setItems([{id:"a",label:"Alpha"},{id:"b",label:"Beta"}])</script>
```

```html
<ui-listbox id="lb2" numbered></ui-listbox><script>document.getElementById("lb2").setItems([{id:"1",label:"One"},{id:"2",label:"Two"}])</script>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `disabled` | `disabled` | boolean | false |  |
| `busy` | `data-ui-busy` | boolean | false |  |
| `filterable` | `filterable` | boolean | false | Show a filter input. |
| `numbered` | `numbered` | boolean | false | Number the items. |
| `hotkeys` | `hotkeys` | boolean | false | Digits 1–9 select the n-th item. |
| `emptyText` | `empty-text` | string | "No items" | Text when nothing matches. |
| `value` | `value` | string | "" | Selected item key. |

## Methods

- `setItems` — Replace all items.
- `addItem` — addItem(item, index?).
- `removeItem` — removeItem(key).
- `updateItem` — updateItem(key, patch).
- `select` — select(key, { emit }).
- `next` — Move active item.
- `prev` — Move active item.
- `first` — First item.
- `last` — Last item.
- `focusItem` — Make an item active.
- `scrollToItem` — Scroll an item into view.

## Events

- `ui-change` — Selection changed; detail { value, item, index, previous, source }.
- `ui-activate` — Item activated (Enter / double click); detail { item, index }.
- `ui-filter` — Filter changed; detail { query }.

## Slots

None.
