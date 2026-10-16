# Events

| Event | Element | Description |
|---|---|---|
| `ui-toggle` | `ui-details` | Opened or closed; detail { open }. |
| `ui-change` | `ui-input` | Native change; detail { value, previous }. |
| `ui-input` | `ui-input` | Native input; detail { value }. |
| `ui-open` | `ui-modal` | Fired after opening. |
| `ui-before-close` | `ui-modal` | Cancelable; detail { reason, result }. |
| `ui-close` | `ui-modal` | Fired after closing; detail { result, reason }. |
| `ui-change` | `ui-pagination` | Page changed; detail { page, previous, source }. |
| `ui-change` | `ui-select` | User picked an option; detail { value, option, previous, source }. |
| `ui-filter` | `ui-select` | Filter query changed; detail { query }. |
| `ui-shell-change` | `ui-shell` | Collapsed or sidebar state changed. |
| `ui-resize` | `ui-split-pane` | Size changed; detail { value }. |
| `ui-change` | `ui-switch` | Toggled by the user; detail { checked, value, previous }. |
| `ui-change` | `ui-tabs` | User changed tab; detail { value, previous, source }. |
| `ui-input` | `ui-textarea` | Typing; detail { value }. |
| `ui-change` | `ui-textarea` | Committed change; detail { value, previous }. |
| `ui-toast-show` | `ui-toast-region` | Toast shown; detail { id }. |
| `ui-toast-dismiss` | `ui-toast-region` | Toast removed; detail { id, reason }. |
