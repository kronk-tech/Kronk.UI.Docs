# Getting started

Kronk UI v2 is a zero-runtime-dependency Custom Elements library. Everything lives in the light DOM, so your page CSS, forms and accessibility tooling keep working.

## CDN

```html
<link rel="stylesheet" href="https://ui.kronk.tech/dist/latest/ui.css">
<script src="https://ui.kronk.tech/dist/latest/ui.js" defer></script>

<ui-button primary>Save</ui-button>
```

Load the script with `defer` (or at the end of `<body>`): elements read their children when they connect, so the children must already be parsed.

## ES module

```html
<script type="module">
  import "https://ui.kronk.tech/dist/latest/ui.esm.js";
</script>
```

## Local files

Copy `ui.css`, `ui.js` and the `font/` folder from `packages/core/dist/` next to each other.

## ASP.NET Core

```razor
@addTagHelper *, Kronk.UI.AspNetCore

<link rel="stylesheet" href="~/_content/Kronk.UI/ui.css" />
<ui-input asp-for="Email" type="email"></ui-input>
<script src="~/_content/Kronk.UI/ui.js" defer></script>
```

## Theme prelude

Put this in `<head>` before the stylesheet to avoid a flash of the wrong theme:

```html
<script>
  try { const t = localStorage.getItem("ui-theme"); if (t) document.documentElement.dataset.theme = t; } catch {}
</script>
```

## Using the JavaScript API

```js
const ok = await UI.confirm("Delete this item?");
UI.toast("Saved", { type: "success" });
const el = UI.create.button({ primary: true }, "Click");
```
