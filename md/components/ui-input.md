# ui-input

Labelled native input (text, email, password, number, date, file, color, checkbox, radio, range, …).

- **Category:** Forms  
- **Status:** stable  
- **Since:** 2.0.0  
- **Base class:** UIFormElement  
- **Rendering tier:** B (renders internal DOM)

## Examples

```html
<ui-input label="Text" type="text" name="text"></ui-input>
```

```html
<ui-input label="Email" type="email" name="email"></ui-input>
```

```html
<ui-input label="Password" type="password"></ui-input>
```

```html
<ui-input label="Tel" type="tel" name="tel"></ui-input>
```

```html
<ui-input label="Number" type="number" name="number"></ui-input>
```

```html
<ui-input label="Search" type="search" name="search"></ui-input>
```

```html
<ui-input label="Url" type="url" name="url"></ui-input>
```

```html
<ui-input label="File" type="file" name="file"></ui-input>
```

```html
<ui-input label="Hidden" type="hidden" name="hidden"></ui-input>
```

```html
<ui-input label="Button" type="button" name="button"></ui-input>
```

```html
<ui-input label="Reset" type="reset" name="reset"></ui-input>
```

```html
<ui-input label="Submit" type="submit" name="submit"></ui-input>
```

```html
<ui-input label="Radio" type="radio" name="radio"></ui-input><ui-input label="Radio2" type="radio" name="radio"></ui-input><ui-input label="Radio3" type="radio" name="radio"></ui-input>
```

```html
<ui-input label="Checkbox" type="checkbox" name="checkbox"></ui-input>
```

```html
<ui-input label="Range" type="range" name="range"></ui-input>
```

```html
<ui-input label="Color" type="color" name="color"></ui-input>
```

```html
<ui-input label="Month" type="month" name="month"></ui-input>
```

```html
<ui-input label="Date" type="date" name="date"></ui-input>
```

```html
<ui-input label="Time" type="time" name="time"></ui-input>
```

```html
<ui-input label="Week" type="week" name="week"></ui-input>
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
