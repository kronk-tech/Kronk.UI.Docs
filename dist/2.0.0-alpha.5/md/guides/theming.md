# Theming

Colours are CSS custom properties on `:root` using `light-dark()`. The library follows `prefers-color-scheme` by default; set `data-theme="light"` or `data-theme="dark"` on `<html>` to force a mode.

```js
UI.theme.set("dark");    // "light" | "dark" | "system"
UI.theme.get();          // current setting
document.addEventListener("ui-theme-change", e => console.log(e.detail));
```

## Overriding tokens

All rules live in `@layer`s (`ui-reset, ui-tokens, ui-base, ui-layout, ui-components, ui-utilities`). Unlayered CSS always wins over layered CSS, so overriding is simple:

```css
:root {
  --ui-color-primary: light-dark(#0a7d5a, #4fd1a1);
  --ui-radius: 0.25rem;
}
```

See the [token reference](tokens/) for every variable.
