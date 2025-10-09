import React, { useState } from 'react';

// Example 1: A standard, controlled single-select dropdown.
function SingleSelectExample() {
  const [fruit, setFruit] = useState('banana');

  function handleChange(e) {
    setFruit(e.target.value);
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <h3>Usage: Single Select Dropdown ✅</h3>
      <p>
        Currently selected value is controlled by React state.
      </p>
      <label>
        Pick a fruit:
        <select
          value={fruit}
          onChange={handleChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="apple">Apple 🍎</option>
          <option value="banana">Banana 🍌</option>
          <option value="orange">Orange 🍊</option>
        </select>
      </label>
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
        Your choice: {fruit}
      </p>
    </div>
  );
}

// Example 2: A controlled multi-select dropdown.
function MultiSelectExample() {
  const [toppings, setToppings] = useState(['olives', 'pepperoni']);

  function handleChange(e) {
    // Get all selected <option> elements from the event
    const selectedOptions = e.target.selectedOptions;
    // Create an array of their values
    const values = Array.from(selectedOptions, option => option.value);
    // Update the state with the new array
    setToppings(values);
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <h3>Usage: Multiple Select Dropdown ✅</h3>
      <p>
        The `value` prop is an array, and the `onChange` handler needs to build a new array.
      </p>
      <label>
        Select your pizza toppings (hold Ctrl/Cmd to select multiple):
        <select
          multiple={true}
          value={toppings}
          onChange={handleChange}
          style={{ marginLeft: '10px', padding: '5px', height: '100px' }}
        >
          <option value="pepperoni">Pepperoni 🍕</option>
          <option value="mushrooms">Mushrooms 🍄</option>
          <option value="olives">Olives 🫒</option>
          <option value="onions">Onions 🧅</option>
        </select>
      </label>
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
        Your toppings: {toppings.join(', ')}
      </p>
    </div>
  );
}

// Example 3: Demonstrating the "wrong way"
function WrongWayExample() {
  return (
    <div style={{ border: '1px solid #ffcccc', padding: '10px', borderRadius: '5px', backgroundColor: '#fff0f0' }}>
      <h3>Troubleshooting: The "Wrong Way" ❌</h3>
      <p>
        In HTML, you use `selected` on an `<option>`. In React, trying to do this for a controlled component is an anti-pattern. React will ignore the `selected` attribute in favor of the `<select>` tag's `value` prop.
      </p>
      <label>
        Pick a fruit (this is not the React way):
        <select style={{ marginLeft: '10px', padding: '5px' }}>
          <option value="apple">Apple 🍎</option>
          {/* This `selected` attribute is ignored by React if `value` is on the <select> tag. */}
          {/* If the component is UNCONTROLLED, you should use `defaultValue` on the <select> tag instead of this. */}
          <option value="banana" selected>Banana 🍌</option>
          <option value="orange">Orange 🍊</option>
        </select>
      </label>
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
        To set an initial value for an <strong>uncontrolled</strong> select, use <code>&lt;select defaultValue="banana"&gt;</code>. To control the value, use the <code>value</code> and <code>onChange</code> props on <code>&lt;select&gt;</code> as shown in the examples above.
      </p>
    </div>
  );
}


export default function SelectExamples() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={containerStyles}>
      <h1>&lt;select&gt; Component Examples</h1>
      <SingleSelectExample />
      <MultiSelectExample />
      <WrongWayExample />
    </div>
  );
}