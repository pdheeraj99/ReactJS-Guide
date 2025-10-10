import React from 'react';

/*
  This file contains conceptual examples of using React Compiler directives.
  These directives are hints to the compiler and their effect depends on your
  project's `compilationMode`.
*/

// --- Example 1: Opting-in with "use memo" ---
// This is useful when your project is in `compilationMode: 'annotation'`.
function HeavilyUsedComponent({ items }) {
  // By adding "use memo", we are telling the compiler: "Please optimize
  // this component, even if the default mode is to ignore it."
  "use memo";

  const processedItems = items.map(item => {
    // Imagine some expensive computation here
    return { ...item, processed: true };
  });

  return (
    <div>
      <h3>This component is explicitly optimized!</h3>
      <ul>
        {processedItems.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}


// --- Example 2: Opting-out with "use no memo" ---
// This is useful as a temporary escape hatch if the compiler is causing
// unexpected issues with a specific component.
function LegacyWrapperComponent({ options }) {
  // By adding "use no memo", we are telling the compiler: "Please do not
  // touch this component. I know what I'm doing."
  //
  // Always add a comment explaining WHY you are opting out.
  "use no memo"; // TODO: Remove this when we upgrade `old-charting-library` (TICKET-456)

  // someLegacyChart.render(options); // Imagine this is some non-React code

  return (
    <div>
      <h3>This component is explicitly NOT optimized.</h3>
      <p>This might be necessary to avoid conflicts with older, non-standard libraries.</p>
    </div>
  );
}


export default function DirectivesExamples() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif',
  };
  const exampleBoxStyles = {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyles}>
      <h1>Compiler Directives Examples</h1>
      <p>These directives give you fine-grained control over the compiler.</p>

      <div style={exampleBoxStyles}>
        <h3>Usage: Opting-in with `"use memo"` ✅</h3>
        <p>This is ideal for gradual adoption of the compiler in a large codebase.</p>
        <HeavilyUsedComponent items={[{id: 1, name: 'First'}, {id: 2, name: 'Second'}]} />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Opting-out with `"use no memo"` 🚫</h3>
        <p>This should be a temporary measure for debugging or handling incompatible code.</p>
        <LegacyWrapperComponent options={{}} />
      </div>
    </div>
  );
}