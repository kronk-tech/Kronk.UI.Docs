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
