import { Suspense, useState } from 'react';
import { fetchMessage } from './api.js';
import Message from './Message.jsx';
import { ThemeContext } from './ThemeContext.js';
import ThemedBox from './ThemedBox.jsx';
import './styles.css';

// Create the promise outside the component so it's not re-created on every render.
const messagePromise = fetchMessage();

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [showThemedBox, setShowThemedBox] = useState(true);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="app-container">
      <h1>`use` Hook Demo 🦸‍♂️</h1>
      <p>
        This hook can read values from Promises and Context, and can even be
        used inside `if` statements!
      </p>
      <hr />

      {/* --- Example 1: `use` with a Promise & Suspense --- */}
      <div className="demo-box">
        <h3>1. `use` with a Promise</h3>
        <p>
          The component below calls `use(messagePromise)`. React will show the
          Suspense fallback until the promise resolves after 2 seconds.
        </p>
        <Suspense fallback={<p className="loading">🌀 Loading message...</p>}>
          <Message messagePromise={messagePromise} />
        </Suspense>
      </div>

      {/* --- Example 2: `use` with Context --- */}
      <div className="demo-box">
        <h3>2. `use` with Context (Conditionally)</h3>
        <p>
          The box below uses `use(ThemeContext)` inside an `if` block. It only
          reads the context when the "Show" checkbox is checked.
        </p>
        <ThemeContext.Provider value={theme}>
          <label>
            <input
              type="checkbox"
              checked={showThemedBox}
              onChange={(e) => setShowThemedBox(e.target.checked)}
            />
            Show the themed box
          </label>
          <button onClick={toggleTheme} style={{ marginLeft: '10px' }}>
            Toggle Theme
          </button>

          <ThemedBox show={showThemedBox}>
            <p>This is a child of the themed box.</p>
          </ThemedBox>
        </ThemeContext.Provider>
      </div>
    </div>
  );
}