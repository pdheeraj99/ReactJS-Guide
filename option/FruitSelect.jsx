import React from 'react';

// A simple array of data that we will render as options.
const fruits = [
  { value: 'apple', label: '🍎 Apple' },
  { value: 'banana', label: '🍌 Banana' },
  { value: 'orange', label: '🍊 Orange' },
  { value: 'grape', label: '🍇 Grape' },
  { value: 'strawberry', label: '🍓 Strawberry' },
];

/**
 * Idi mana reusable dropdown component.
 *
 * Idi "controlled" ga design cheyabadindi. Ante, deeni current value
 * (`value` prop) and aa value ni ela marchali (`onChange` prop)
 * anedi parent component nunchi vastayi.
 */
export default function FruitSelect({ value, onChange }) {
  return (
    <div className="select-container">
      <label htmlFor="fruit-select">Pick a fruit:</label>
      <select
        id="fruit-select"
        name="selectedFruit"
        // 2. The `value` prop of the <select> tag determines what is shown.
        value={value}
        // 3. When the user picks a new option, this function is called.
        onChange={onChange}
      >
        {/*
          1. We map over our array to dynamically create the <option> tags.
          The `key` prop is essential for React's list rendering.
        */}
        {fruits.map((fruit) => (
          <option key={fruit.value} value={fruit.value}>
            {fruit.label}
          </option>
        ))}
      </select>
    </div>
  );
}