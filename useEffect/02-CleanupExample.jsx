import React, { useState, useEffect } from 'react';

/*
  Part 2: The Cleanup Function

  Ee example lo, manam `window` resize event ki subscribe avudam.
  Component unmount ainappudu, aa subscription ni clean ga remove cheyyadam
  chala important. Lekapothe memory leak avuthundi.
*/

function WindowWidthTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      console.log('Window resized!');
      setWidth(window.innerWidth);
    }

    // Setup: Event listener ni add chesthunnam
    window.addEventListener('resize', handleResize);
    console.log('✅ Event listener ADDED');

    // --- The Cleanup Function ---
    // Ee function component unmount ainappudu run avuthundi.
    return () => {
      // Cleanup: Event listener ni remove chesthunnam
      window.removeEventListener('resize', handleResize);
      console.log('❌ Event listener REMOVED (Cleaned up!)');
    };
  }, []); // Empty array `[]` means setup runs once on mount, cleanup runs once on unmount.

  return <p>Window width: {width}px</p>;
}

// Parent component to demonstrate mounting and unmounting
function CleanupExample() {
  const [showTracker, setShowTracker] = useState(false);

  return (
    <div className="example-container">
      <h2>Cleanup Function: Window Resize Listener</h2>
      <p>
        Click the button to mount/unmount the tracker component. Watch the
        console to see the setup and cleanup logs.
      </p>
      <button onClick={() => setShowTracker(s => !s)}>
        {showTracker ? 'Hide Tracker' : 'Show Tracker'}
      </button>

      {showTracker && <WindowWidthTracker />}
    </div>
  );
}

export default CleanupExample;