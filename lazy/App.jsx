import React, { useState, Suspense, lazy } from 'react';
import LoadingSpinner from './LoadingSpinner.jsx';
import './styles.css';

// 1. DYNAMIC IMPORT with `lazy`
// Manam `HeavyComponent` ni direct ga import cheyyatledu.
// Instead, `lazy` function tho wrap chestunnam.
// Idi React ki chepthundi: "Ee component code ippudu vaddu,
// render chese time lo matrame download cheyyi."
const HeavyComponent = lazy(() => import('./HeavyComponent.jsx'));

// This is a helper to simulate a slow network so we can see the spinner
// const HeavyComponent = lazy(() =>
//   new Promise(resolve =>
//     setTimeout(
//       () => resolve(import('./HeavyComponent.jsx')),
//       2000
//     )
//   )
// );

export default function App() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);

  return (
    <div className="app-container">
      <h1>`React.lazy` and `Suspense` Demo ⚡</h1>
      <p>
        Ee example tho manam app initial load time ni ela thaggichalo chuddam.
      </p>

      <button
        onClick={() => setShowHeavyComponent(true)}
        disabled={showHeavyComponent}
      >
        {showHeavyComponent ? 'Component Loaded!' : 'Show Heavy Component'}
      </button>

      <div className="content-area">
        {/*
          2. THE PERFECT PAIR in action
          Manam `showHeavyComponent` true ayinappudu, `<HeavyComponent>` ni
          render cheyadaniki try chestam.
        */}
        {showHeavyComponent && (
          // 3. SUSPENSE BOUNDARY
          // `HeavyComponent` code load ayye varaku, React ee `fallback` UI ni chupisthundi.
          <Suspense fallback={<LoadingSpinner text="Loading Heavy Component..." />}>
            <HeavyComponent />
          </Suspense>
        )}
      </div>

      <div className="explanation">
        <p>
          Button click chesinappudu, mee browser's Network tab (in DevTools) ni
          chudandi. `HeavyComponent` code tho oka kottha JavaScript "chunk" file
          load avvadam meeru gamanistharu.
        </p>
      </div>
    </div>
  );
}