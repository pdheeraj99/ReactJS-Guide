import React, { useState } from 'react';

/*
  Example 1: Basic Usage with a Counter

  Ee example lo, manam `useState` ni use chesi, oka simple counter
  ni build cheddam.
*/
function CounterExample() {
  // 1. `useState(0)` tho state variable ni declare cheddam.
  //    `count` anedi current value (initially 0).
  //    `setCount` anedi aa value ni update chese function.
  const [count, setCount] = useState(0);

  // 2. Event handler lo, `setCount` ni call chesi, state ni update cheddam.
  function handleIncrement() {
    // Ee call React ki chepthundi: "Please re-render this component
    // with the new count value."
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div className="example-container">
      <h3>Basic Usage: A Simple Counter</h3>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleIncrement} style={{ marginRight: '10px' }}>
        Click me
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default CounterExample;