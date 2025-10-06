import React, { useState, useEffect } from 'react';

/*
  Part 1: Basic Usage of useEffect

  Ee example lo, manam `useEffect` ni use chesi, document title ni
  (browser tab lo kanipinche text) update cheddam.
  Document title anedi React control lo leni oka "external system".
*/
function DocumentTitleExample() {
  const [count, setCount] = useState(0);

  // --- The Effect ---
  // Ee effect `count` state maarinappudu alla run avuthundi.
  useEffect(() => {
    // Side Effect: Directly manipulating the browser DOM
    document.title = `You clicked ${count} times`;
    console.log(`Effect ran! Document title updated to: ${document.title}`);

    // Ee effect ki cleanup avasaram ledu, endukante manam
    // subscription or timer lantiవి em start cheyyatledu.
  }, [count]); // Dependency: `count`

  return (
    <div className="example-container">
      <h2>Basic Usage: Document Title</h2>
      <p>
        Click the button. Notice how the document title in your browser tab
        changes.
      </p>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Click me</button>
    </div>
  );
}

export default DocumentTitleExample;