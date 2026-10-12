# UI.keys

Central keyboard shortcut registry.

```js
const off = UI.keys.register('save', 'mod+s', () => save());
UI.keys.format('mod+k'); // ["⌘","K"] or ["Ctrl","K"]
UI.keys.list();
```
