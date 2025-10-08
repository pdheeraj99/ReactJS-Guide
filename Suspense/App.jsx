import React, { Suspense, lazy, useState } from 'react';
import LoadingSpinner from './LoadingSpinner.jsx';
import ProfilePage from './ProfilePage.jsx';
import { createProfileResource } from './api.js';
import './app.css';

// 1. Code-Splitting Example: Lazy-load the component
const LazyComponent = lazy(() => import('./LazyComponent.jsx'));

// 2. Data-Fetching Example: Pre-fetch the data
//    Note: In a real app, this might be triggered by routing.
const initialResource = createProfileResource();

export default function App() {
  const [showLazy, setShowLazy] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="app-container">
      <h1>Hello, `<Suspense>`! ⏳</h1>
      <p>
        Ee examples tho manam Suspense ni ela use cheyalo chuddam.
      </p>
      <hr />

      {/* --- Example 1: Code Splitting with React.lazy --- */}
      <div className="example">
        <h2>Example 1: Code-Splitting with `React.lazy`</h2>
        <p>
          Ee kindi button click cheste, oka "lazy" component load avuthundi.
          Adi load ayye time lo, Suspense tana fallback (spinner) ni chupisthundi.
          Check your Network tab in DevTools to see the new JS chunk being loaded!
        </p>
        <button onClick={() => setShowLazy(true)} disabled={showLazy}>
          Show Lazy Component
        </button>

        {showLazy && (
          <Suspense fallback={<LoadingSpinner />}>
            <LazyComponent />
          </Suspense>
        )}
      </div>
      <hr />

      {/* --- Example 2: Data Fetching --- */}
      <div className="example">
        <h2>Example 2: Data Fetching</h2>
        <p>
          Ee button click cheste, profile page kanipisthundi. Aa page loni
          components (`ProfileDetails` and `ProfileTimeline`) data ni fetch
          chesthunnay. Aa data vachhe varaku, `ProfilePage` loni Suspense
          fallback kanipisthundi. Rendu components data ready ayyaka, anni
          okate sari reveal avuthayi.
        </p>
        <button onClick={() => setShowProfile(true)} disabled={showProfile}>
          Show Profile Page
        </button>

        {showProfile && <ProfilePage resource={initialResource} />}
      </div>
    </div>
  );
}