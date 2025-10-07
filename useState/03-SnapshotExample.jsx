import React, { useState } from 'react';

/*
  Example 3: State as a Snapshot

  Ee example `useState` యొక్క atni kante tricky behaviour ni
  chupisthundi: State behaves like a snapshot.

  `setState` ni call cheyagane, state ventane maaradu.
  Adi kevalam kotha state tho oka re-render ni queue chesthundi.
  Currently running code lo, state value inka pata value ne untundi.
*/
function SnapshotExample() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // 1. `setCount` ni call chesi, oka re-render ni request cheddam
    //    kotha value (count + 1) tho.
    setCount(count + 1);

    // 2. Ippudu ventane `alert` ni call cheddam.
    //    Ee `handleClick` function ee render యొక్క "snapshot" lo undi.
    //    Ee snapshot lo, `count` value inka `0` (or the previous value) eh.
    //    Anduke, alert lo manaki `0` kanipisthundi, `1` kadu.
    alert(`You clicked, but the count in this render is still: ${count}`);

    // The UI will update to show "1" only AFTER this alert is closed
    // and React processes the next render.
  }

  return (
    <div className="example-container">
      <h3>State as a Snapshot</h3>
      <p>
        Click the button. The alert will show the state from the render in
        which the click happened, NOT the new state you just set.
      </p>
      <p>Current count on screen: {count}</p>
      <button onClick={handleClick}>
        Click me and see the alert
      </button>
    </div>
  );
}

export default SnapshotExample;