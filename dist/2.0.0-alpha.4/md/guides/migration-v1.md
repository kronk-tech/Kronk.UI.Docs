# Migrating from v1

v2 is a rewrite and does not run side by side with v1 wiring.

| v1 pattern | v2 replacement |
|---|---|
| `UI.callback` string registry | direct event listeners and `ui-*` events |
| `data-modal-*` triggers | `ui-modal`, `UI.dialog`, invoker commands |
| delegated click setup | element methods and properties |
| DOM surgery and parent chains | `UI.create.*` or element APIs |
| manual toast region | `UI.toast()` |
| select data attributes | `ui-select.options` or `ui-option` children |
| details `data-open` | reflected `open` property |

CSS class names, tokens and visual design are unchanged by intent.
