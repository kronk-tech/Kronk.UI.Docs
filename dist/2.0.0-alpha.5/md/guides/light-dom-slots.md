# Light-DOM slot contract

There is no shadow DOM and therefore no native `<slot>`. Instead:

- Elements capture their author-supplied children **once**, when first connected (`captureLightDom()`).
- Tier-A elements (layout, card, badge…) only add classes to the host; children stay where they are.
- Tier-B elements (select, tabs, modal…) build internal DOM and move the captured children into it. Named slots use the `slot="…"` attribute (for example `slot="footer"` on `ui-modal`).
- Changing children after first connect is not observed. Use properties (`options`, `setItems`) instead.

Never wrap the direct children of `ui-shell`: its layout is a CSS grid over those children.
