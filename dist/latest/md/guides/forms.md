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
