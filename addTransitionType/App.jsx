import React, {
  useState,
  // Note: These APIs are unstable and might change.
  // We alias them for convenience.
  unstable_ViewTransition as ViewTransition,
  startTransition,
  unstable_addTransitionType as addTransitionType,
} from 'react';
import './styles.css';

const pages = ['Page 1: Home', 'Page 2: About', 'Page 3: Contact'];

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);

  const handleNext = () => {
    // We must wrap the state update in a transition to trigger the animation.
    startTransition(() => {
      // 1. TAG the transition as 'forward'
      addTransitionType('forward');
      // Update the state
      setPageIndex((p) => (p + 1) % pages.length);
    });
  };

  const handleBack = () => {
    startTransition(() => {
      // 1. TAG the transition as 'back'
      addTransitionType('back');
      // Update the state
      setPageIndex((p) => (p - 1 + pages.length) % pages.length);
    });
  };

  return (
    <div className="app-container">
      <h1>`addTransitionType` Demo 🏷️</h1>
      <p>Click "Next" and "Back" to see different animations for each action.</p>
      <div className="nav-controls">
        <button onClick={handleBack}>⬅️ Back</button>
        <button onClick={handleNext}>Next ➡️</button>
      </div>

      <div className="page-container">
        {/*
          2. CONFIGURE the ViewTransition component.
          Instead of a string, we pass an object to `enter` and `exit`.
          This object maps the "tag" from `addTransitionType` to a CSS class.
        */}
        <ViewTransition
          enter={{
            forward: 'slide-in-from-right',
            back: 'slide-in-from-left',
          }}
          exit={{
            forward: 'slide-out-to-left',
            back: 'slide-out-to-right',
          }}
        >
          {/*
            The `key` is crucial here. It tells React that when `pageIndex`
            changes, the old `div` is being replaced by a completely new
            one, which is what triggers the enter/exit animations.
          */}
          <div key={pageIndex} className="page">
            <h2>{pages[pageIndex]}</h2>
          </div>
        </ViewTransition>
      </div>
    </div>
  );
}