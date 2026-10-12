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
| `disabled` | `disabled` | boolean | false |  |
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
