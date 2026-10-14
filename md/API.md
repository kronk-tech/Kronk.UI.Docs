# ui-alert

Inline status message.

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-alert variant="warning" heading="Attention">Check your input.</ui-alert>
```

```html
<ui-alert variant="success">Saved.</ui-alert>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `variant` | `variant` | string | "info" | info, success, warning or danger. |
| `heading` | `heading` | string | "" | Alert title. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Message body.

## CSS classes

- Base class: `ui-alert`
- `variant` → `ui-alert--{}`


---

# ui-avatar

User avatar with image, initials or icon fallback.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-avatar name="Ada Lovelace"></ui-avatar>
```

```html
<ui-avatar size="lg"></ui-avatar>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `src` | `src` | string | "" | Image URL. |
| `name` | `name` | string | "" | Full name used for initials and alt text. |
| `size` | `size` | string | "md" | sm, md or lg. |

## Methods

None.

## Events

None.

## Slots

None.

## CSS classes

- Base class: `ui-avatar`
- `size` → `ui-avatar--{}`


---

# ui-badge

Small status label.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-badge>Default</ui-badge>
```

```html
<ui-badge variant="success">Success</ui-badge>
```

```html
<ui-badge outline>Outline</ui-badge>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `variant` | `variant` | string | "" | Colour variant: primary, success, warning, danger or info. |
| `outline` | `outline` | boolean | false | Use the transparent outline style. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Badge text or icon.

## CSS classes

- Base class: `ui-badge`
- `variant` → `ui-badge--{}`
- `outline` → `ui-badge--outline`


---

# ui-breadcrumbs

Breadcrumb trail.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-breadcrumbs><a href="/">Home</a><a href="/p">Projects</a><span>Current</span></ui-breadcrumbs>
```

```html
<ui-breadcrumbs><a href="/">Home</a><span>Here</span></ui-breadcrumbs>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Links; the last element is the current page.


---

# ui-button

Styled button or link.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-button>Save</ui-button>
```

```html
<ui-button primary type="submit">Submit</ui-button>
```

```html
<ui-button href="https://example.com">Link</ui-button>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `type` | `type` | string | "button" | Native button type (button, submit, reset). |
| `href` | `href` | string | "" | When set, renders an anchor. |
| `variant` | `variant` | string | "" | Visual variant. |
| `primary` | `primary` | boolean | false | Primary emphasis. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Button content.


---

# ui-card

Surface container with optional header, body and footer.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-card><ui-card-header>Title</ui-card-header><ui-card-body>Body</ui-card-body><ui-card-footer>Footer</ui-card-footer></ui-card>
```

```html
<ui-card dashed size="lg"><ui-card-body>Dashed</ui-card-body></ui-card>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `size` | `size` | string | "md" | sm, md or lg. |
| `flat` | `flat` | boolean | false | Remove shadow. |
| `ghost` | `ghost` | boolean | false | Transparent surface. |
| `primary` | `primary` | boolean | false | Primary accent. |
| `dashed` | `dashed` | boolean | false | Dashed border. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — ui-card-header, ui-card-body, ui-card-footer.

## CSS classes

- Base class: `ui-card`
- `size` → `ui-card--{}`
- `flat` → `ui-card--flat`
- `ghost` → `ui-card--ghost`
- `primary` → `ui-card--primary`
- `dashed` → `ui-card--dashed`


---

# ui-card-body

Card body.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-card><ui-card-body>Content</ui-card-body></ui-card>
```

```html
<ui-card><ui-card-body><strong>Rich</strong> content</ui-card-body></ui-card>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-card__body`


---

# ui-card-footer

Card footer.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-card><ui-card-footer>Content</ui-card-footer></ui-card>
```

```html
<ui-card><ui-card-footer><strong>Rich</strong> content</ui-card-footer></ui-card>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-card__footer`


---

# ui-card-header

Card header.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-card><ui-card-header>Content</ui-card-header></ui-card>
```

```html
<ui-card><ui-card-header><strong>Rich</strong> content</ui-card-header></ui-card>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-card__header`


---

# ui-cluster

Horizontal, wrapping layout primitive.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-cluster><ui-badge>A</ui-badge><ui-badge>B</ui-badge></ui-cluster>
```

```html
<ui-cluster between><span>Left</span><span>Right</span></ui-cluster>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `gap` | `gap` | string | "md" | Spacing: xs, sm, md, lg or xl. |
| `between` | `between` | boolean | false | Distribute with space-between. |
| `end` | `end` | boolean | false | Align to the end. |
| `nowrap` | `nowrap` | boolean | false | Disable wrapping. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Inline content.

## CSS classes

- Base class: `ui-cluster`
- `gap` → `ui-cluster--{}`
- `between` → `ui-cluster--between`
- `end` → `ui-cluster--end`
- `nowrap` → `ui-cluster--nowrap`


---

# ui-container

Centred, width-constrained page container.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-container size="sm"><p>Narrow content</p></ui-container>
```

```html
<ui-container size="xl"><p>Wide content</p></ui-container>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `size` | `size` | string | "md" | Max width: sm, md, lg, xl or full. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Page content.

## CSS classes

- Base class: `ui-container`
- `size` → `ui-container--{}`


---

# ui-details

Disclosure built on native <details>.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-details heading="More" subheading="Click to expand">Hidden content</ui-details>
```

```html
<ui-details heading="A" group="g">One</ui-details><ui-details heading="B" group="g">Two</ui-details>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `open` | `open` | boolean | false | Expanded state (reflected). |
| `heading` | `heading` | string | "" | Summary heading. |
| `subheading` | `subheading` | string | "" | Secondary line. |
| `group` | `group` | string | "" | Exclusive group name. |

## Methods

None.

## Events

- `ui-toggle` — Opened or closed; detail { open }.

## Slots

- `(default)` — Content.


---

# ui-empty-state

Placeholder for empty content with an optional action.

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-empty-state heading="No projects" description="Create one to start." icon="folder-open"></ui-empty-state>
```

```html
<ui-empty-state heading="Nothing here"></ui-empty-state>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `heading` | `heading` | string | "" | Title. |
| `description` | `description` | string | "" | Explanation. |
| `icon` | `icon` | string | "" | Font Awesome icon name. |

## Methods

None.

## Events

None.

## Slots

- `action` — Call to action.

## CSS classes

- Base class: `ui-empty-state`


---

# ui-grid

Column grid.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-grid cols="2"><div>1</div><div>2</div></ui-grid>
```

```html
<ui-grid cols="3" gap="lg"><div>1</div><div>2</div><div>3</div></ui-grid>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `cols` | `cols` | string | "" | Column count: 2, 3, 4, 6 or 12. |
| `gap` | `gap` | string | "md" | Spacing: xs, sm, md, lg or xl. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — ui-grid-col children or any content.

## CSS classes

- Base class: `ui-grid`
- `cols` → `ui-grid--{}`
- `gap` → `ui-grid--gap-{}`


---

# ui-grid-col

Grid column spanning several tracks.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-grid cols="4"><ui-grid-col span="3">Wide</ui-grid-col><ui-grid-col>Narrow</ui-grid-col></ui-grid>
```

```html
<ui-grid cols="2"><ui-grid-col span="2">Full</ui-grid-col></ui-grid>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `span` | `span` | string | "" | Number of columns to span (2, 3, 4, 6 or 12). |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Column content.

## CSS classes

- Base class: `ui-grid__col`
- `span` → `ui-grid__col--span-{}`


---

# ui-header

Semantic heading.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-header level="1">Title</ui-header>
```

```html
<ui-header level="3" size="xl" muted>Subtitle</ui-header>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `level` | `level` | number | 2 | Heading level 1–6. |
| `size` | `size` | string | "" | Visual size override xs–3xl. |
| `muted` | `muted` | boolean | false | Muted colour. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Heading text.


---

# ui-icon

Font Awesome icon.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-icon name="check" label="Completed"></ui-icon>
```

```html
<ui-icon name="star" icon-style="regular"></ui-icon>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `name` | `name` | string | "" | Icon name without prefix. |
| `iconStyle` | `icon-style` | string | "solid" | solid, regular, light, brands… |
| `label` | `label` | string | "" | Accessible label; omit for decorative icons. |

## Methods

None.

## Events

None.

## Slots

None.


---

# ui-input

Labelled native input (text, email, password, number, date, file, color, checkbox, radio, range, …).

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** UIFormElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-input label="Email" type="email" name="email"></ui-input>
```

```html
<ui-input label="Volume" type="range" value="40"></ui-input>
```

```html
<ui-input label="Password" type="password"></ui-input>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `name` | `name` | string | "" | Form field name. |
| `value` | `value` | string | "" | Current value. |
| `label` | `label` | string | "" | Visible label. |
| `required` | `required` | boolean | false | Mark as required. |
| `readonly` | `readonly` | boolean | false | Read-only. |
| `primary` | `primary` | boolean | false | Primary label emphasis. |
| `type` | `type` | string | "text" | Native input type. |
| `checked` | `checked` | boolean | false | Checked state for checkbox and radio. |
| `placeholder` | `placeholder` | string | "" | Placeholder text. |

## Methods

None.

## Events

- `ui-change` — Native change; detail { value, previous }.
- `ui-input` — Native input; detail { value }.

## Slots

None.


---

# ui-kbd

Keyboard shortcut hint.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-kbd keys="mod+k"></ui-kbd>
```

```html
<ui-kbd keys="shift+/"></ui-kbd>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `keys` | `keys` | string | "" | Combo such as "mod+k". |

## Methods

None.

## Events

None.

## Slots

None.


---

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


---

# ui-modal

Native <dialog> with promise-based open and close.

- **Category:** Overlays  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** UIOverlayElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-modal id="m" heading="Hello">Body text</ui-modal><ui-button onclick="document.getElementById('m').show()">Open</ui-button>
```

```html
<ui-modal id="m2" heading="Sized" size="sm">Small dialog</ui-modal><ui-button onclick="document.getElementById('m2').show()">Open small</ui-button>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `open` | `open` | boolean | false | Open state (reflected). |
| `heading` | `heading` | string | "" | Dialog heading. |
| `size` | `size` | string | "md" | sm, md or lg. |
| `dismissible` | `dismissible` | boolean | true | Escape and backdrop dismissal. |
| `modal` | `modal` | boolean | true | Use showModal() (default) or non-modal show(). |

## Methods

- `show` — Open; returns a promise resolving with the close result.
- `hide` — Close with an optional result.

## Events

- `ui-open` — Fired after opening.
- `ui-before-close` — Cancelable; detail { reason, result }.
- `ui-close` — Fired after closing; detail { result, reason }.

## Slots

- `header` — Custom header.
- `(default)` — Body.
- `footer` — Footer actions.


---

# ui-nav

Navigation list.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-nav>Content</ui-nav>
```

```html
<ui-nav><strong>Rich</strong></ui-nav>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-nav`


---

# ui-nav-item

Navigation item with icon and label.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-nav><ui-nav-item href="/" icon="house">Home</ui-nav-item></ui-nav>
```

```html
<ui-nav><ui-nav-item href="/docs" match="prefix">Docs</ui-nav-item></ui-nav>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `href` | `href` | string | "" | Link target. |
| `icon` | `icon` | string | "" | Font Awesome icon name. |
| `match` | `match` | string | "" | exact or prefix: derive active state from location. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Label text.


---

# ui-nav-section

Navigation section.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-nav-section>Content</ui-nav-section>
```

```html
<ui-nav-section><strong>Rich</strong></ui-nav-section>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-nav__section`


---

# ui-navbar-link

Top bar link with optional icon.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-navbar-link href="/">Home</ui-navbar-link>
```

```html
<ui-navbar-link href="/x" icon="gear">Settings</ui-navbar-link>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `href` | `href` | string | "" | Link target. |
| `icon` | `data-icon` | string | "" | Font Awesome icon name. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Label.

## CSS classes

- Base class: `ui-navbar-link`


---

# ui-option

Declarative option for ui-select.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-select label="Pick"><ui-option value="a">Alpha</ui-option></ui-select>
```

```html
<ui-select label="Pick"><ui-option value="b" disabled>Beta</ui-option></ui-select>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | string | "" | Submitted option value. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Visible label; may contain a ui-option-meta.


---

# ui-option-group

Group of ui-option elements.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-select label="Pick"><ui-option-group label="Letters"><ui-option value="a">A</ui-option></ui-option-group></ui-select>
```

```html
<ui-select label="Pick"><ui-option-group label="Numbers"><ui-option value="1">1</ui-option></ui-option-group></ui-select>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `label` | `label` | string | "" | Group heading. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — ui-option children.


---

# ui-option-meta

Secondary text displayed beside an option label (excluded from filtering and the selected label).

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-select label="Pick"><ui-option value="a">Alpha<ui-option-meta>first</ui-option-meta></ui-option></ui-select>
```

```html
<ui-select label="Pick"><ui-option value="b">Beta<ui-option-meta>second</ui-option-meta></ui-option></ui-select>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Metadata text.


---

# ui-pagination

Page selector.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-pagination page="3" pages="12"></ui-pagination>
```

```html
<ui-pagination pages="3"></ui-pagination>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `page` | `page` | number | 1 | Current page (1-based). |
| `pages` | `pages` | number | 1 | Total pages. |

## Methods

- `select` — select(page, { emit }).

## Events

- `ui-change` — Page changed; detail { page, previous, source }.

## Slots

None.


---

# ui-progress

Progress bar.

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-progress value="40"></ui-progress>
```

```html
<ui-progress indeterminate></ui-progress>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | number | 0 | Current value. |
| `max` | `max` | number | 100 | Maximum value. |
| `indeterminate` | `indeterminate` | boolean | false | Unknown progress. |
| `size` | `size` | string | "md" | sm, md or lg. |
| `variant` | `variant` | string | "" | Colour variant. |

## Methods

None.

## Events

None.

## Slots

None.

## CSS classes

- Base class: `ui-progress`
- `size` → `ui-progress--{}`
- `variant` → `ui-progress--{}`
- `indeterminate` → `ui-progress--indeterminate`


---

# ui-select

Native, searchable, or inline select control.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** UIListElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-select label="Country" name="country" value="nl"><ui-option value="nl">Netherlands</ui-option><ui-option value="be">Belgium</ui-option></ui-select>
```

```html
<ui-select label="Native" mode="native"><ui-option value="a">Alpha</ui-option><ui-option value="b">Beta</ui-option></ui-select>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `name` | `name` | string | "" | Name of the form control. |
| `value` | `value` | string | "" | Selected option value. |
| `label` | `label` | string | "" | Visible label. |
| `required` | `required` | boolean | false | Mark as required. |
| `readonly` | `readonly` | boolean | false | Read-only. |
| `primary` | `primary` | boolean | false | Primary label emphasis. |
| `filterText` | `filter-text` | string | "" | Current filter query. |
| `multiple` | `multiple` | boolean | false | Reserved; not implemented in this build. |
| `hotkeys` | `hotkeys` | boolean | false | Select with digits 1–9 when no filter is active. |
| `numbered` | `numbered` | boolean | false | Show option numbering. |
| `mode` | `mode` | string | "combobox" | combobox, native or inline. |
| `placeholder` | `placeholder` | string | "" | Combobox placeholder. |
| `emptyText` | `empty-text` | string | "" | Text when no option matches. |
| `inline` | `inline` | boolean | false | Always show the option list. |

## Methods

- `clear` — Clear the selection.
- `getOption` — Find an option by value.

## Events

- `ui-change` — User picked an option; detail { value, option, previous, source }.
- `ui-filter` — Filter query changed; detail { query }.

## Slots

- `(default)` — ui-option and ui-option-group children.


---

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
| `sidebarOpen` | `sidebar-open` | boolean | false | Mobile sidebar open state. |
| `persist` | `persist` | boolean | false | Remember the collapsed state in localStorage. |

## Methods

- `toggle` — Toggle collapsed state.
- `openSidebar` — Open the mobile sidebar.
- `closeSidebar` — Close the mobile sidebar.

## Events

- `ui-shell-change` — Collapsed or sidebar state changed.

## Slots

- `(default)` — ui-topbar, ui-sidebar and page content.

## CSS classes

- Base class: `ui-shell`
- `collapsed` → `ui-shell--collapsed`


---

# ui-sidebar

Application sidebar.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-sidebar>Content</ui-sidebar>
```

```html
<ui-sidebar><strong>Rich</strong></ui-sidebar>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-sidebar`


---

# ui-sidebar-body

Sidebar body.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-sidebar-body>Content</ui-sidebar-body>
```

```html
<ui-sidebar-body><strong>Rich</strong></ui-sidebar-body>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-sidebar__body`


---

# ui-sidebar-footer

Sidebar footer.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-sidebar-footer>Content</ui-sidebar-footer>
```

```html
<ui-sidebar-footer><strong>Rich</strong></ui-sidebar-footer>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-sidebar__footer`


---

# ui-sidebar-header

Sidebar header.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-sidebar-header>Content</ui-sidebar-header>
```

```html
<ui-sidebar-header><strong>Rich</strong></ui-sidebar-header>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-sidebar__header`


---

# ui-skeleton

Loading placeholder.

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-skeleton width="12rem"></ui-skeleton>
```

```html
<ui-skeleton circle width="3rem" height="3rem"></ui-skeleton>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `width` | `width` | string | "100%" | CSS width. |
| `height` | `height` | string | "1rem" | CSS height. |
| `circle` | `circle` | boolean | false | Round shape. |

## Methods

None.

## Events

None.

## Slots

None.

## CSS classes

- Base class: `ui-skeleton`
- `circle` → `ui-skeleton--circle`


---

# ui-spinner

Loading indicator.

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-spinner></ui-spinner>
```

```html
<ui-spinner size="sm"></ui-spinner>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `size` | `size` | string | "md" | sm, md or lg. |
| `inverse` | `inverse` | boolean | false | Light variant for dark backgrounds. |

## Methods

None.

## Events

None.

## Slots

None.

## CSS classes

- Base class: `ui-spinner`
- `size` → `ui-spinner--{}`
- `inverse` → `ui-spinner--inverse`


---

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


---

# ui-stack

Vertical layout primitive.

- **Category:** Layout  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-stack><p>One</p><p>Two</p></ui-stack>
```

```html
<ui-stack gap="lg"><p>One</p><p>Two</p></ui-stack>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `gap` | `gap` | string | "md" | Spacing: xs, sm, md, lg or xl. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Stacked content.

## CSS classes

- Base class: `ui-stack`
- `gap` → `ui-stack--{}`


---

# ui-switch

Toggle switch backed by a native checkbox.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** UIFormElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-switch label="Notifications" name="notifications" checked></ui-switch>
```

```html
<ui-switch label="Disabled" disabled></ui-switch>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `name` | `name` | string | "" | Form field name. |
| `value` | `value` | string | "" | Submitted value when on. |
| `label` | `label` | string | "" | Visible label. |
| `required` | `required` | boolean | false | Mark as required. |
| `readonly` | `readonly` | boolean | false | Read-only. |
| `primary` | `primary` | boolean | false | Primary label emphasis. |
| `checked` | `checked` | boolean | false | On/off state. |

## Methods

- `toggle` — Flip the state.

## Events

- `ui-change` — Toggled by the user; detail { checked, value, previous }.

## Slots

None.


---

# ui-tab

Tab trigger inside ui-tabs.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-tabs><ui-tab value="a">A</ui-tab><ui-tab-panel value="a">Panel A</ui-tab-panel></ui-tabs>
```

```html
<ui-tabs value="b"><ui-tab value="a">A</ui-tab><ui-tab value="b">B</ui-tab><ui-tab-panel value="a">One</ui-tab-panel><ui-tab-panel value="b">Two</ui-tab-panel></ui-tabs>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | string | "" | Tab id; matches a ui-tab-panel value. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Tab label.


---

# ui-tab-panel

Panel shown for the matching ui-tab.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-tabs><ui-tab value="a">A</ui-tab><ui-tab-panel value="a">Panel</ui-tab-panel></ui-tabs>
```

```html
<ui-tabs><ui-tab value="x">X</ui-tab><ui-tab-panel value="x"><p>Rich</p></ui-tab-panel></ui-tabs>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | string | "" | Matches a ui-tab value. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Panel content.


---

# ui-table

Styled wrapper for a native table.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-table striped><table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table></ui-table>
```

```html
<ui-table bordered><table><tr><td>x</td></tr></table></ui-table>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `striped` | `striped` | boolean | false | Zebra rows. |
| `bordered` | `bordered` | boolean | false | Cell borders. |
| `size` | `size` | string | "md" | sm, md or lg. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — A native <table>.

## CSS classes

- Base class: `ui-table`
- `striped` → `ui-table--striped`
- `bordered` → `ui-table--bordered`
- `size` → `ui-table--{}`


---

# ui-table-wrapper

Horizontal scroll wrapper for tables.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-table-wrapper><ui-table><table><tr><td>x</td></tr></table></ui-table></ui-table-wrapper>
```

```html
<ui-table-wrapper>Scrollable</ui-table-wrapper>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — ui-table.

## CSS classes

- Base class: `ui-table-wrapper`


---

# ui-tabs

Tabbed content with full keyboard and ARIA support.

- **Category:** Navigation  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-tabs value="overview"><ui-tab value="overview">Overview</ui-tab><ui-tab value="history">History</ui-tab><ui-tab-panel value="overview">Overview content</ui-tab-panel><ui-tab-panel value="history">History content</ui-tab-panel></ui-tabs>
```

```html
<ui-tabs><ui-tab value="one">One</ui-tab><ui-tab value="two" disabled>Two</ui-tab><ui-tab-panel value="one">First</ui-tab-panel></ui-tabs>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `value` | `value` | string | "" | Selected tab value; defaults to the first enabled tab. |

## Methods

- `select` — Select a tab by value: select(value, { emit }).

## Events

- `ui-change` — User changed tab; detail { value, previous, source }.

## Slots

- `(default)` — ui-tab and ui-tab-panel children.


---

# ui-textarea

Labelled multi-line text input.

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** UIFormElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-textarea label="Notes" rows="4"></ui-textarea>
```

```html
<ui-textarea label="Auto" autosize></ui-textarea>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `name` | `name` | string | "" | Form field name. |
| `value` | `value` | string | "" | Current text. |
| `label` | `label` | string | "" | Visible label. |
| `required` | `required` | boolean | false | Mark as required. |
| `readonly` | `readonly` | boolean | false | Read-only. |
| `primary` | `primary` | boolean | false | Primary label emphasis. |
| `rows` | `rows` | number | 3 | Visible rows. |
| `placeholder` | `placeholder` | string | "" | Placeholder. |
| `maxlength` | `maxlength` | number | null | Maximum length. |
| `autosize` | `autosize` | boolean | false | Grow with content. |

## Methods

None.

## Events

- `ui-input` — Typing; detail { value }.
- `ui-change` — Committed change; detail { value, previous }.

## Slots

None.


---

# ui-theme-toggle

Cycles light, dark and system theme through UI.theme.

- **Category:** Display  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-theme-toggle></ui-theme-toggle>
```

```html
<ui-cluster><span>Theme</span><ui-theme-toggle></ui-theme-toggle></ui-cluster>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

- `setTheme` — setTheme('light' | 'dark' | 'system').

## Events

None.

## Slots

None.

## CSS classes

- Base class: `ui-theme-toggle`


---

# ui-toast-region

Stacking region for toasts; created on demand by UI.toast().

- **Category:** Feedback  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-toast-region></ui-toast-region>
```

```html
<ui-toast-region limit="2"></ui-toast-region>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `limit` | `limit` | number | 5 | Maximum simultaneously visible toasts. |
| `placement` | `placement` | string | "bottom-end" | Screen corner. |

## Methods

- `showToast` — showToast(message, { type, duration, action }) -> { id, dismiss }.

## Events

- `ui-toast-show` — Toast shown; detail { id }.
- `ui-toast-dismiss` — Toast removed; detail { id, reason }.

## Slots

None.

## CSS classes

- Base class: `ui-toast-region`


---

# ui-tooltip

Accessible tooltip attached to an anchor element.

- **Category:** Overlays  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-button id="tt1">Hover me</ui-button><ui-tooltip for="tt1">Helpful text</ui-tooltip>
```

```html
<ui-button id="tt2">Focus me</ui-button><ui-tooltip for="tt2" delay="0">Instant</ui-tooltip>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |
| `for` | `for` | string | "" | id of the anchor element. |
| `delay` | `delay` | number | 400 | Open delay in ms. |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Tooltip content.

## CSS classes

- Base class: `ui-tooltip`


---

# ui-topbar

Application top bar.

- **Category:** Shell  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** _UIElement  
- **Rendering tier:** A (host classes)

## Examples

```html
<ui-topbar>Content</ui-topbar>
```

```html
<ui-topbar><strong>Rich</strong></ui-topbar>
```

## Attributes and properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `busy` | `data-ui-busy` | boolean | false |  |

## Methods

None.

## Events

None.

## Slots

- `(default)` — Content.

## CSS classes

- Base class: `ui-topbar`


---

# Browser support

Target: current evergreen Chrome, Edge, Firefox and Safari.

The library relies on Custom Elements, `<dialog>`, `:has()`, `@layer`, `light-dark()` and `color-mix()`.

> Status: **not yet verified** in real browsers by this project. Record tested browser versions here before claiming support.

| Feature | Verified |
|---|---|
| Custom Elements | no |
| dialog | no |
| @layer | no |
| light-dark() | no |
| :has() | no |


---

# FAQ

**Why no shadow DOM?** Global CSS, native forms and existing tooling keep working.

**Do I need a build step?** No. Include `ui.css` and `ui.js`.

**Where is the API in one file?** `API.md` in the docs output, built for pasting into an LLM context.

**Which components exist?** See the component index; each page has live examples and a playground.


---

# Forms

Form controls render a real native control inside the element, so they take part in `<form>` submission, validation and `reset` without `ElementInternals`.

```html
<form>
  <ui-input label="Email" type="email" name="email" required></ui-input>
  <ui-select label="Country" name="country" value="nl">
    <ui-option value="nl">Netherlands</ui-option>
    <ui-option value="be">Belgium</ui-option>
  </ui-select>
  <ui-button type="submit" primary>Send</ui-button>
</form>
```

## Events

Native `input` and `change` events still bubble. In addition, controls emit `ui-change` with a typed `detail`.

## Property-first options

```js
select.value = "be";            // may be assigned before options
select.options = [{ value: "be", label: "Belgium" }];
```

Assigning `value` first is fine: the label resolves as soon as the option exists.

## Serialising

```js
const data = UI.form.serialize(formElement);
```


---

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


---

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


---

# Light-DOM slot contract

There is no shadow DOM and therefore no native `<slot>`. Instead:

- Elements capture their author-supplied children **once**, when first connected (`captureLightDom()`).
- Tier-A elements (layout, card, badge…) only add classes to the host; children stay where they are.
- Tier-B elements (select, tabs, modal…) build internal DOM and move the captured children into it. Named slots use the `slot="…"` attribute (for example `slot="footer"` on `ui-modal`).
- Changing children after first connect is not observed. Use properties (`options`, `setItems`) instead.

Never wrap the direct children of `ui-shell`: its layout is a CSS grid over those children.


---

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


---

# Server-rendered markup

Hydration is out of scope. Server-rendered **light-DOM markup** (what you would write by hand) upgrades normally once `ui.js` loads.

- Render only the public tag and its documented children, never the internal DOM a component generates.
- Use the FOUC rules to hide not-yet-upgraded complex elements.
- Keep a native fallback for forms where practical.


---

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


---

# UI.keys

Central keyboard shortcut registry.

```js
const off = UI.keys.register('save', 'mod+s', () => save());
UI.keys.format('mod+k'); // ["⌘","K"] or ["Ctrl","K"]
UI.keys.list();
```


---

# UI.i18n

Message catalogue with English defaults.

```js
UI.i18n.set({ 'select.empty': 'Niets gevonden' });
UI.i18n.t('modal.ok');
```


---

# UI.theme

Theme control (`light`, `dark`, `system`).

```js
UI.theme.set('dark');
```


---

# UI.dialog

Promise-based dialogs built on `ui-modal`.

```js
await UI.alert('Saved');
const ok = await UI.confirm('Delete?');
const name = await UI.prompt('Your name');
```


---

# UI.toast

Transient notifications.

```js
const t = UI.toast('Saved', { type: 'success', duration: 4000 });
t.dismiss();
```


---

# UI.form

Form helpers.

```js
UI.form.serialize(formEl);
UI.form.fill(formEl, { name: 'Ada' });
```


---

# UI.create

Element factories: `UI.create.select({ label: 'X' })`, `UI.create.button({ on: { click } }, 'Text')`.


---

# UI.commands

Command registry.

```js
UI.commands.register({ id: 'project.new', label: 'New project', shortcut: 'mod+n', run() {} });
```


---

# Tokens

| Token | Value |
|---|---|
| `--ui-color-primary` | `#0d9488` |
| `--ui-color-primary-hover` | `#0f766e` |
| `--ui-color-primary-active` | `#115e59` |
| `--ui-color-secondary` | `#64748b` |
| `--ui-color-secondary-hover` | `#475569` |
| `--ui-color-success` | `#16a34a` |
| `--ui-color-danger` | `#dc2626` |
| `--ui-color-warning` | `#d97706` |
| `--ui-color-info` | `#0284c7` |
| `--ui-color-bg` | `#ffffff` |
| `--ui-color-surface` | `#f8fafc` |
| `--ui-color-surface-hover` | `#f1f5f9` |
| `--ui-color-border` | `#e2e8f0` |
| `--ui-color-border-strong` | `#cbd5e1` |
| `--ui-color-text` | `#0f172a` |
| `--ui-color-text-muted` | `#64748b` |
| `--ui-color-text-inverse` | `#ffffff` |
| `--ui-color-overlay` | `rgba(15, 23, 42, 0.5)` |
| `--ui-color-focus-ring` | `#0d9488` |
| `--ui-color-bg` | `#0b1120` |
| `--ui-color-surface` | `#111827` |
| `--ui-color-surface-hover` | `#1a2333` |
| `--ui-color-border` | `#263042` |
| `--ui-color-border-strong` | `#334155` |
| `--ui-color-text` | `#e2e8f0` |
| `--ui-color-text-muted` | `#94a3b8` |
| `--ui-color-text-inverse` | `#0b1120` |
| `--ui-color-overlay` | `rgba(0, 0, 0, 0.6)` |
| `--ui-space-0` | `0` |
| `--ui-space-1` | `0.25rem` |
| `--ui-space-2` | `0.5rem` |
| `--ui-space-3` | `0.75rem` |
| `--ui-space-4` | `1rem` |
| `--ui-space-5` | `1.25rem` |
| `--ui-space-6` | `1.5rem` |
| `--ui-space-8` | `2rem` |
| `--ui-space-10` | `2.5rem` |
| `--ui-space-12` | `3rem` |
| `--ui-space-16` | `4rem` |
| `--ui-radius-sm` | `4px` |
| `--ui-radius-md` | `8px` |
| `--ui-radius-lg` | `12px` |
| `--ui-radius-full` | `9999px` |
| `--ui-shadow-sm` | `0 1px 2px rgba(15, 23, 42, 0.06)` |
| `--ui-shadow-md` | `0 4px 12px rgba(15, 23, 42, 0.1)` |
| `--ui-shadow-lg` | `0 12px 32px rgba(15, 23, 42, 0.18)` |
| `--ui-topbar-height` | `3.5rem` |
| `--ui-sidebar-width` | `16rem` |
| `--ui-sidebar-width-collapsed` | `4rem` |
| `--ui-container-sm` | `40rem` |
| `--ui-container-md` | `56rem` |
| `--ui-container-lg` | `72rem` |
| `--ui-container-xl` | `88rem` |
| `--ui-font-sans` | `"Euclid Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, Helvetica, Arial, sans-serif` |
| `--ui-font-mono` | `ui-monospace, "JetBrains Mono", SFMono-Regular, Menlo, Consolas, monospace` |
| `--ui-text-xs` | `0.75rem` |
| `--ui-text-sm` | `0.875rem` |
| `--ui-text-base` | `1rem` |
| `--ui-text-lg` | `1.125rem` |
| `--ui-text-xl` | `1.25rem` |
| `--ui-text-2xl` | `1.5rem` |
| `--ui-text-3xl` | `1.875rem` |
| `--ui-font-weight-normal` | `400` |
| `--ui-font-weight-medium` | `500` |
| `--ui-font-weight-semibold` | `600` |
| `--ui-font-weight-bold` | `700` |
| `--ui-line-height-tight` | `1.25` |
| `--ui-line-height-normal` | `1.5` |
| `--ui-line-height-relaxed` | `1.75` |


---

# Events

| Event | Element | Description |
|---|---|---|
| `ui-toggle` | `ui-details` | Opened or closed; detail { open }. |
| `ui-change` | `ui-input` | Native change; detail { value, previous }. |
| `ui-input` | `ui-input` | Native input; detail { value }. |
| `ui-change` | `ui-listbox` | Selection changed; detail { value, item, index, previous, source }. |
| `ui-activate` | `ui-listbox` | Item activated (Enter / double click); detail { item, index }. |
| `ui-filter` | `ui-listbox` | Filter changed; detail { query }. |
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


---

# Kronk UI v2

- [ui-alert](components/ui-alert.md) — Inline status message.
- [ui-avatar](components/ui-avatar.md) — User avatar with image, initials or icon fallback.
- [ui-badge](components/ui-badge.md) — Small status label.
- [ui-breadcrumbs](components/ui-breadcrumbs.md) — Breadcrumb trail.
- [ui-button](components/ui-button.md) — Styled button or link.
- [ui-card](components/ui-card.md) — Surface container with optional header, body and footer.
- [ui-card-body](components/ui-card-body.md) — Card body.
- [ui-card-footer](components/ui-card-footer.md) — Card footer.
- [ui-card-header](components/ui-card-header.md) — Card header.
- [ui-cluster](components/ui-cluster.md) — Horizontal, wrapping layout primitive.
- [ui-container](components/ui-container.md) — Centred, width-constrained page container.
- [ui-details](components/ui-details.md) — Disclosure built on native <details>.
- [ui-empty-state](components/ui-empty-state.md) — Placeholder for empty content with an optional action.
- [ui-grid](components/ui-grid.md) — Column grid.
- [ui-grid-col](components/ui-grid-col.md) — Grid column spanning several tracks.
- [ui-header](components/ui-header.md) — Semantic heading.
- [ui-icon](components/ui-icon.md) — Font Awesome icon.
- [ui-input](components/ui-input.md) — Labelled native input (text, email, password, number, date, file, color, checkbox, radio, range, …).
- [ui-kbd](components/ui-kbd.md) — Keyboard shortcut hint.
- [ui-listbox](components/ui-listbox.md) — Keyed, filterable list with keyboard navigation and a custom item template.
- [ui-modal](components/ui-modal.md) — Native <dialog> with promise-based open and close.
- [ui-nav](components/ui-nav.md) — Navigation list.
- [ui-nav-item](components/ui-nav-item.md) — Navigation item with icon and label.
- [ui-nav-section](components/ui-nav-section.md) — Navigation section.
- [ui-navbar-link](components/ui-navbar-link.md) — Top bar link with optional icon.
- [ui-option](components/ui-option.md) — Declarative option for ui-select.
- [ui-option-group](components/ui-option-group.md) — Group of ui-option elements.
- [ui-option-meta](components/ui-option-meta.md) — Secondary text displayed beside an option label (excluded from filtering and the selected label).
- [ui-pagination](components/ui-pagination.md) — Page selector.
- [ui-progress](components/ui-progress.md) — Progress bar.
- [ui-select](components/ui-select.md) — Native, searchable, or inline select control.
- [ui-shell](components/ui-shell.md) — Application shell with collapsible sidebar and top bar.
- [ui-sidebar](components/ui-sidebar.md) — Application sidebar.
- [ui-sidebar-body](components/ui-sidebar-body.md) — Sidebar body.
- [ui-sidebar-footer](components/ui-sidebar-footer.md) — Sidebar footer.
- [ui-sidebar-header](components/ui-sidebar-header.md) — Sidebar header.
- [ui-skeleton](components/ui-skeleton.md) — Loading placeholder.
- [ui-spinner](components/ui-spinner.md) — Loading indicator.
- [ui-split-pane](components/ui-split-pane.md) — Two resizable panes with a draggable, keyboard-accessible divider.
- [ui-stack](components/ui-stack.md) — Vertical layout primitive.
- [ui-switch](components/ui-switch.md) — Toggle switch backed by a native checkbox.
- [ui-tab](components/ui-tab.md) — Tab trigger inside ui-tabs.
- [ui-tab-panel](components/ui-tab-panel.md) — Panel shown for the matching ui-tab.
- [ui-table](components/ui-table.md) — Styled wrapper for a native table.
- [ui-table-wrapper](components/ui-table-wrapper.md) — Horizontal scroll wrapper for tables.
- [ui-tabs](components/ui-tabs.md) — Tabbed content with full keyboard and ARIA support.
- [ui-textarea](components/ui-textarea.md) — Labelled multi-line text input.
- [ui-theme-toggle](components/ui-theme-toggle.md) — Cycles light, dark and system theme through UI.theme.
- [ui-toast-region](components/ui-toast-region.md) — Stacking region for toasts; created on demand by UI.toast().
- [ui-tooltip](components/ui-tooltip.md) — Accessible tooltip attached to an anchor element.
- [ui-topbar](components/ui-topbar.md) — Application top bar.
