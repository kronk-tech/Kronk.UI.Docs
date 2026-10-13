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
