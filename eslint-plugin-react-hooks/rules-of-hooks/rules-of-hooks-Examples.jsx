import React, { useState, useEffect } from 'react';

// --- Rule 1: Only Call Hooks at the Top Level ---

// ❌ WRONG: Calling a Hook inside a condition
function ConditionalHookComponent({ showDetails }) {
  // This is okay, it's at the top level.
  const [name, setName] = useState('Mawa');

  if (showDetails) {
    // 🔴 LINT ERROR: React Hook "useEffect" is called conditionally.
    // React Hooks must be called in the exact same order in every component render.
    // WHY? React relies on the call order to associate state with the right Hook.
    // If this condition changes, the order of Hooks changes, and React gets confused.
    useEffect(() => {
      document.title = `Details for ${name}`;
    }, [name]);
  }

  return <h1>{name}</h1>;
}

// ✅ RIGHT: Move the condition INSIDE the Hook
function CorrectConditionalHookComponent({ showDetails }) {
  const [name, setName] = useState('Mawa');

  useEffect(() => {
    // The condition is now inside the Hook, so the Hook itself is always called.
    // The call order is preserved on every render.
    if (showDetails) {
      document.title = `Details for ${name}`;
    }
  }, [showDetails, name]); // Make sure to include all dependencies!

  return <h1>{name}</h1>;
}


// --- Rule 2: Only Call Hooks from React Functions ---

// ❌ WRONG: Calling a Hook from a regular JavaScript function
function getWindowWidth() {
  // 🔴 LINT ERROR: Invalid hook call. Hooks can only be called inside of the
  // body of a function component.
  // WHY? This function is not a React component or a custom Hook.
  // React doesn't know which component this state belongs to.
  // const [width, setWidth] = useState(window.innerWidth); // This would crash
  return window.innerWidth;
}

// ✅ RIGHT: Create a custom Hook to contain the logic
// Custom hooks must start with "use".
function useWindowWidth() {
  // Now React knows this is a Hook, and it can only be called from components.
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this runs only once on mount.

  return width;
}

// A component can now use our custom hook
function ComponentUsingCustomHook() {
  const width = useWindowWidth();
  return <p>Window width is: {width}px</p>;
}


// --- Main Example Component ---
export default function RulesOfHooksExamples() {
  const containerStyles = { fontFamily: 'sans-serif' };
  const exampleBoxStyles = { border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' };

  return (
    <div style={containerStyles}>
      <h1>Rules of Hooks Examples</h1>

      <div style={exampleBoxStyles}>
        <h3>Rule 1: Top-Level Only</h3>
        <p>The "Wrong" component below would show a lint error because the `useEffect` is inside an `if` block. The "Right" one fixes this by moving the condition inside the effect.</p>
        <h4>Wrong Way ❌</h4>
        <ConditionalHookComponent showDetails={true} />
        <h4>Right Way ✅</h4>
        <CorrectConditionalHookComponent showDetails={true} />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Rule 2: Only from React Functions</h3>
        <p>The "Wrong" example (commented out in the code) tries to call a Hook from a plain JS function, which would crash. The "Right" way is to create a custom Hook (`useWindowWidth`) and use it in a component.</p>
        <h4>Right Way ✅</h4>
        <ComponentUsingCustomHook />
      </div>
    </div>
  );
}