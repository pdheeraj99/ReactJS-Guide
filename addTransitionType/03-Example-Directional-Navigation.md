# Example: Directional Page Navigation ⬅️➡️

Okay, theory antha chusam. Ippudu `addTransitionType` ni use chesi, oka simple multi-page view lo directional navigation ni ela create cheyalo, full code example tho chuddam.

Our goal is simple:
*   "Next" click cheste, kottha page right nunchi ravాలి (pata page left ki vellali).
*   "Back" click cheste, kottha page left nunchi ravాలి (pata page right ki vellali).

### 1. The Component (`App.jsx`)

First, mana component setup chuddam. Manam `currentPage` ni state lo manage chestam, and "Next", "Back" buttons untayi.

```jsx
import React, { useState, unstable_ViewTransition as ViewTransition, startTransition, unstable_addTransitionType as addTransitionType } from 'react';

export default function App() {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    startTransition(() => {
      // "forward" ane tag ni add chestunnam
      addTransitionType('forward');
      setPage(p => p + 1);
    });
  };

  const handleBack = () => {
    startTransition(() => {
      // "back" ane tag ni add chestunnam
      addTransitionType('back');
      setPage(p => p - 1);
    });
  };

  return (
    <>
      <div className="nav-controls">
        <button onClick={handleBack} disabled={page === 0}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>

      <div className="page-container">
        {/* The ViewTransition component wraps the changing content */}
        <ViewTransition
          enter={{
            'forward': 'slide-from-right',
            'back': 'slide-from-left',
          }}
          exit={{
            'forward': 'slide-to-left',
            'back': 'slide-to-right',
          }}
        >
          {/* We use `key` to tell React this is a new component instance */}
          <div key={page} className="page">
            Page {page + 1}
          </div>
        </ViewTransition>
      </div>
    </>
  );
}
```
Ikkada manam `enter` and `exit` props ki objects pass chesi, mana `'forward'` and `'back'` tags ni CSS classes ki map chesam.

### 2. The Animations (`styles.css`)

Ippudu, ee CSS classes (`slide-from-right`, etc.) ki kavalsina animations ni define cheddam.

```css
/* First, define the different slide animations we need */
@keyframes slide-from-right { from { transform: translateX(100%); } }
@keyframes slide-to-left { to { transform: translateX(-100%); } }

@keyframes slide-from-left { from { transform: translateX(-100%); } }
@keyframes slide-to-right { to { transform: translateX(100%); } }

/* --- FORWARD NAVIGATION --- */
/* When going forward, the OLD page slides TO THE LEFT */
::view-transition-old(slide-to-left) {
  animation: 300ms ease-out both slide-to-left;
}
/* When going forward, the NEW page slides IN FROM THE RIGHT */
::view-transition-new(slide-from-right) {
  animation: 300ms ease-out both slide-from-right;
}


/* --- BACK NAVIGATION --- */
/* When going back, the OLD page slides TO THE RIGHT */
::view-transition-old(slide-to-right) {
  animation: 300ms ease-out both slide-to-right;
}
/* When going back, the NEW page slides IN FROM THE LEFT */
::view-transition-new(slide-from-left) {
  animation: 300ms ease-out both slide-from-left;
}
```
Manam `::view-transition-old` and `::view-transition-new` pseudo-elements tho, mana custom class names ni combine chesi, correct animation ni apply chestunnam.

And that's it! Ee simple setup tho, manam context-aware, directional animations ni create chesam.

This concludes our deep dive into React's animation and transition APIs. You now have the knowledge to create truly fluid, dynamic, and engaging user experiences! Happy animating! 🎨🚀🎉