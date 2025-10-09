import React, { useState } from 'react';
import FruitSelect from './FruitSelect';
import './styles.css';

export default function App() {
  // 1. The parent component holds the state for the selected value.
  //    'banana' is our initial default selected value.
  const [selectedFruit, setSelectedFruit] = useState('banana');

  // This handler updates the state when the user selects a new option
  // in the child component.
  const handleFruitChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  return (
    <div className="app-container">
      <h1>The `&lt;select&gt;` and `&lt;option&gt;` Demo 🍎</h1>
      <p>
        This example shows the "controlled component" pattern for dropdowns. The
        parent component (`App.jsx`) controls the `&lt;select&gt;`'s value via state.
      </p>

      {/*
        We pass the current state as the `value` and the handler function
        as `onChange`. This makes the FruitSelect a controlled component.
      */}
      <FruitSelect value={selectedFruit} onChange={handleFruitChange} />

      <div className="result-box">
        <p>
          Parent's State: You have selected{' '}
          <strong>{selectedFruit}</strong>.
        </p>
      </div>
    </div>
  );
}