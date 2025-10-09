# Handling Multiple Selections: The Array Game! 🤹‍♀️

Hey friend! Manam single option ni select cheyyadam chusam. Kani, konni sarlu user ki multiple items select cheskune facility ivvali. For example, "What are your favorite toppings?" lanti question ki.

Ee functionality ni enable cheyyadam chala simple. Manam `<select>` tag ki **`multiple={true}`** ane prop ni add cheyali.

```jsx
<select multiple={true}>
  {/* ...options */}
</select>
```
Ee prop add cheyagane, browser dropdown ni oka scrollable list la chupisthundi, and user `Ctrl` (or `Cmd` on Mac) pattukuni multiple options ni select cheyyagalaru.

### The State Change: String to Array

Single selection lo, mana state lo oka **string** undedi (`'apple'`).
But with `multiple={true}`, mana state lo **array of strings** undali (`['apple', 'orange']`).

So, the `value` prop of `<select>` now expects an array.

```jsx
const [selectedToppings, setSelectedToppings] = useState(['mushrooms', 'olives']);

<select
  multiple={true}
  value={selectedToppings} // value is now an array!
  onChange={...}
>
  <option value="pepperoni">Pepperoni</option>
  <option value="mushrooms">Mushrooms</option>
  <option value="olives">Olives</option>
</select>
```

### The `onChange` Challenge

The real change is in the `onChange` handler.
*   Single select lo, `e.target.value` manaki selected string ni ichedi.
*   Multiple select lo, `e.target.value` **pani cheyyadu** as expected. It usually just gives the *first* selected option.

So, how do we get all selected options? We need to use `e.target.selectedOptions`. Idi selected `<option>` elements యొక్క HTMLCollection. Manam daani meeda loop vesi, prathi option యొక్క `value` ni theeskuni, oka kotha array create cheyyali.

```jsx
function handleOnChange(e) {
  // 1. Get all selected <option> elements
  const selectedOptions = e.target.selectedOptions;

  // 2. Create an array from them
  const values = Array.from(selectedOptions).map(option => option.value);

  // 3. Update the state with the new array
  setSelectedToppings(values);
}
```

That's it! Ee three key changes tho - `multiple={true}`, state as an array, and the new `onChange` logic - manam multi-select dropdowns ni master cheyachu.

Ippudu, ee concepts anni kalipi, single select, multi select, and the "wrong way" anni oke chota code examples lo chuddam! Let's jump into the code! 💻✨