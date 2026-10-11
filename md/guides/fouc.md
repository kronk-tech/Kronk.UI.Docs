# Avoiding a flash of unstyled elements

Complex elements are hidden with CSS until they set the `ui-ready` attribute after their first render:

```css
ui-select:not([ui-ready]) { visibility: hidden; }
```

Checklist:

1. Load `ui.css` in `<head>` (render-blocking).
2. Load `ui.js` with `defer`.
3. Reserve space for tall elements with `min-height` if layout shift matters.
4. Add the theme prelude from [Getting started](guides/getting-started/).
