import {
  useState,
  Suspense,
  // Note: Activity is still an unstable API in some versions.
  // We're aliasing it for convenience.
  unstable_Activity as Activity,
} from 'react';
import UserProfile from './UserProfile.jsx';
import PrerenderedContent from './PrerenderedContent.jsx';
import { createSlowResource } from './api.js';
import './app.css';

// Pre-fetch the resource for the prerendered tab as soon as the app loads.
// Ee component app load ayinappude background lo data fetch cheyadam start chesthundi.
const prerenderedResource = createSlowResource();

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="app-container">
      <h1>Hello, `<Activity>`! 🦸</h1>
      <p>
        Ee component tho state ni ela preserve cheyyalo and content ni ela
        pre-render cheyalo chuddam.
      </p>
      <nav className="tabs">
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile (State Preservation)
        </button>
        <button
          className={activeTab === 'prerender' ? 'active' : ''}
          onClick={() => setActiveTab('prerender')}
        >
          Prerendered Content
        </button>
      </nav>
      <hr />

      <main>
        {/* Example 1: State Preservation */}
        {/* Ee UserProfile component hide ayina kuda, daani loni text state reset avvadu. */}
        <Activity mode={activeTab === 'profile' ? 'visible' : 'hidden'}>
          <UserProfile />
        </Activity>

        {/* Example 2: Pre-rendering */}
        {/* Ee component app load ayinappude mode="hidden" lo render avuthundi. */}
        {/* Deeni valla, adi background lo data fetch cheskuni ready ga untundi. */}
        <Activity mode={activeTab === 'prerender' ? 'visible' : 'hidden'}>
          <PrerenderedContent resource={prerenderedResource} />
        </Activity>
      </main>
    </div>
  );
}