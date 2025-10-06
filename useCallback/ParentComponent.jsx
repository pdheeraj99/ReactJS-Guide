import React, { useState, useCallback } from 'react';
import ChildButton from './ChildButton';

/*
  Hey! Idi mana main Parent Component.
  Ikkada manam useCallback యొక్క magic ni chustham.
*/
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  console.log('--- Parent is rendering ---');

  // --- THE SOLUTION: `useCallback` ---
  // Ee function `useCallback` tho wrap cheyyabadindi.
  // Deeni dependency array `[]` (empty) kabatti,
  // ee function ParentComponent re-render aina kuda,
  // memory lo oke okka sari create avuthundi.
  // Idi maaradu.
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // --- THE PROBLEM: Normal Function ---
  // Ee function prathi sari ParentComponent re-render
  // ainappudu kothaga create avuthundi. Memory lo idi
  // eppudu kotha function eh.
  const handleDecrement = () => {
    setCount(c => c - 1);
  };

  const themeStyles = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#333' : '#fff',
  };

  return (
    <div style={themeStyles}>
      <h2>Parent Component</h2>
      <p>
        <strong>Instructions:</strong> Open the console and click "Toggle
        Theme".
      </p>
      <p>
        You will see that the "Decrement" button re-renders every time, but the
        "Increment" button does not. Why? Because `handleIncrement` is wrapped
        in `useCallback`!
      </p>

      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>

      <h3>Count: {count}</h3>

      {/* ChildButton #1: Gets the memoized function */}
      <ChildButton onClick={handleIncrement}>Increment (+)</ChildButton>

      {/* ChildButton #2: Gets a new function on every render */}
      <ChildButton onClick={handleDecrement}>Decrement (-)</ChildButton>
    </div>
  );
}

export default ParentComponent;