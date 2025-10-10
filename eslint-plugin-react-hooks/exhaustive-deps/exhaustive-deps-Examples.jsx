import React, { useState, useEffect, useCallback } from 'react';

// --- Example 1: The "Stale Closure" Bug ---
function StaleClosureExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This effect sets up an interval when the component mounts.
    // However, the function inside the interval is a "closure".
    // It captures the value of `count` ONLY from the first render (which is 0).
    const intervalId = setInterval(() => {
      console.log(`[Stale Closure Log]: Count is ${count}`);
      // This will always log 0, because this function is "stale".
    }, 2000);

    return () => clearInterval(intervalId);

    // 🔴 LINT ERROR: React Hook useEffect has a missing dependency: 'count'.
    // Either include it or remove the dependency array.
  }, []); // We intentionally leave this empty to demonstrate the bug.

  return (
    <div style={{ border: '2px solid #ffcccc', padding: '15px', borderRadius: '5px', backgroundColor: '#fff0f0' }}>
      <h3>Troubleshooting: The Stale Closure Bug ❌</h3>
      <p>Click the button to increment the count. The UI will update, but check the browser console. The log from the `useEffect` will always show the initial count (0) because its "closure" is stale.</p>
      <h4>Count: {count}</h4>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <p style={{ marginTop: '10px', fontSize: '12px' }}>Open the console to see the stale logs.</p>
    </div>
  );
}

// --- Example 2: Fixing the Bug with Exhaustive Dependencies ---
function CorrectDepsExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Now, the effect depends on `count`.
    // Every time `count` changes, React will:
    // 1. Clean up the OLD interval (with the stale closure).
    // 2. Re-run this effect and create a NEW interval with a NEW closure
    //    that captures the NEW `count` value.
    const intervalId = setInterval(() => {
      console.log(`[Correct Deps Log]: Count is ${count}`);
    }, 2000);

    return () => clearInterval(intervalId);

    // ✅ LINT RULE SATISFIED: We have included `count` as a dependency.
  }, [count]);

  return (
    <div style={{ border: '2px solid #d4edda', padding: '15px', borderRadius: '5px', backgroundColor: '#f0fff0' }}>
      <h3>Solution: Exhaustive Dependencies ✅</h3>
      <p>Here, we add `count` to the dependency array. Now, the `useEffect` re-runs when the count changes, creating a new interval with the correct, up-to-date value. The console logs will match the UI.</p>
      <h4>Count: {count}</h4>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <p style={{ marginTop: '10px', fontSize: '12px' }}>Open the console to see the correct logs.</p>
    </div>
  );
}


// --- Main Example Component ---
export default function ExhaustiveDepsExamples() {
  const containerStyles = { fontFamily: 'sans-serif' };
  const exampleBoxStyles = { marginBottom: '20px' };

  return (
    <div style={containerStyles}>
      <h1>`exhaustive-deps` Lint Rule Examples</h1>
      <p>This rule helps prevent "stale closure" bugs by ensuring your hook's dependency array is always correct.</p>

      <div style={exampleBoxStyles}>
        <StaleClosureExample />
      </div>

      <div style={exampleBoxStyles}>
        <CorrectDepsExample />
      </div>
    </div>
  );
}