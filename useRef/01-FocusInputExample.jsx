import React, { useRef } from 'react';

/*
  Example 1: Accessing a DOM Node

  Ee example lo, manam `useRef` ni use chesi, oka <input> element ni
  direct ga access chesi, daani meeda `.focus()` method ni call cheddam.
*/
function FocusInputExample() {
  // 1. `useRef` ni `null` tho initialize cheddam.
  const inputRef = useRef(null);

  function handleClick() {
    // 3. Event handler lo, `inputRef.current` anedi asalu DOM node.
    //    Manam daani meeda browser methods ni call cheyyochu.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div className="example-container">
      <h3>Use Case 1: Accessing the DOM</h3>
      <p>Click the button to focus the input field.</p>
      {/* 2. `ref` prop tho mana ref ni DOM element ki attach cheddam. */}
      <input ref={inputRef} type="text" placeholder="I will be focused" />
      <button onClick={handleClick} style={{ marginLeft: '10px' }}>
        Focus Input
      </button>
    </div>
  );
}

export default FocusInputExample;