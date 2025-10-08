import React, { useState, useEffect } from 'react';

/**
 * Idi manam test cheyabotunna simple Counter component.
 * Deenilo oka state (`count`) and oka effect (`useEffect`) unnayi.
 *
 * - 'Increment' button click cheste, count synchronous ga perugutundi.
 * - 'Increment Async' button click cheste, count 500ms tarvata perugutundi.
 */
function Counter() {
  const [count, setCount] = useState(0);

  // A simple side effect to show that `act` waits for effects too.
  useEffect(() => {
    document.title = `Count is ${count}`;
  }, [count]);

  const handleAsyncIncrement = () => {
    setTimeout(() => {
      setCount((c) => c + 1);
    }, 500);
  };

  return (
    <div>
      <h2>Counter Example</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={handleAsyncIncrement}>Increment Async</button>
    </div>
  );
}

export default Counter;