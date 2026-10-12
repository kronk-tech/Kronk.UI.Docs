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
| `disabled` | `disabled` | boolean | false |  |
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
