import React, { useState, Profiler } from 'react';

/*
  Hey! Idi ee chapter ki main App component.
  Ikkada manam `<Profiler>` ni use chesi, oka component యొక్క
  rendering performance ni measure cheddam.
*/

// --- 1. The onRender Callback ---
// Ee function ni React prathi commit tarvata call chesthundi.
// Idi performance metrics ni log cheyyadaniki perfect place.
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
) {
  // Log the performance data
  console.log(`
    --- Profiler Data for "${id}" ---
    Phase: ${phase}
    Actual duration: ${actualDuration.toFixed(2)}ms (Time spent rendering)
    Base duration: ${baseDuration.toFixed(2)}ms (Worst-case time)
    Start time: ${startTime.toFixed(2)}ms
    Commit time: ${commitTime.toFixed(2)}ms
  `);
}

// --- A simple component to profile ---
function Counter() {
  const [count, setCount] = useState(0);

  // An intentionally "slow" calculation to make the durations more visible
  const slowCalculation = () => {
    const startTime = performance.now();
    while (performance.now() - startTime < 2) {
      // Do nothing for 2ms
    }
    return count * 2;
  };

  const doubledCount = slowCalculation();

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled Count (slow calc): {doubledCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}


export default function App() {
  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>Profiler Demo</h1>
      <p>
        Open the console. Click the "Increment" button multiple times. You will
        see detailed performance metrics logged for each render.
      </p>
      <hr />

      {/* 2. Wrap the component tree you want to measure in <Profiler> */}
      <Profiler id="Counter" onRender={onRenderCallback}>
        <Counter />
      </Profiler>
    </div>
  );
}