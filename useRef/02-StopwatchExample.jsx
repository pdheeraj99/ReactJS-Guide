import React, { useState, useRef } from 'react';

/*
  Example 2: Referencing a Value without Re-renders

  Ee example lo, manam oka stopwatch build cheddam.
  Manam `setInterval` tho create chesina timer ID ni store cheyyali,
  so manam tarvata daanini `clearInterval` tho apochu.

  Ee timer ID ni `useState` lo pedithe, prathi second anavasaramaina
  re-renders avuthayi. So, `useRef` is the perfect tool for this job.
*/
function StopwatchExample() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  // 1. Create a ref to hold the interval ID.
  const intervalRef = useRef(null);

  function handleStart() {
    // Start timing
    setStartTime(Date.now());
    setNow(Date.now());

    // Clear any existing interval before starting a new one
    clearInterval(intervalRef.current);

    // 2. Store the new interval ID in the ref.
    //    This does NOT cause a re-render.
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10); // Update every 10ms for a smooth display
  }

  function handleStop() {
    // 3. Read the ID from the ref and clear the interval.
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <div className="example-container">
      <h3>Use Case 2: Storing a Timer ID</h3>
      <p>The `intervalId` is stored in a ref to avoid re-renders.</p>
      <h2>Time passed: {secondsPassed.toFixed(3)}</h2>
      <button onClick={handleStart} style={{ marginRight: '10px' }}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </div>
  );
}

export default StopwatchExample;