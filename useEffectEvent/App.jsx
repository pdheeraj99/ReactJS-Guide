import React, { useState, useEffect, useRef } from 'react';
import { createConnection } from './chat.js';

// --- Polyfill for the experimental useEffectEvent hook ---
// IMPORTANT: This is a simplified simulation for educational purposes.
// The actual hook might have slightly different behavior.
// Do not use this in production code.
function useEffectEvent(callback) {
  const ref = useRef(null);

  // Always update the ref to the latest callback on every render.
  // This is safe because it happens during render, not in an effect.
  ref.current = callback;

  // Return a stable function that's created only once.
  // This function will always call the *latest* callback from the ref.
  const stableFn = useRef((...args) => {
    return ref.current(...args);
  });

  return stableFn.current;
}
// --- End of Polyfill ---

// Helper function to show a notification
function showNotification(message, theme) {
  console.log(`%c${message}`, `color: ${theme === 'dark' ? 'white' : 'black'}; background-color: ${theme === 'dark' ? 'black' : 'white'}; padding: 5px; border-radius: 5px;`);
}

// --- ❌ Version 1: The WRONG Way (Stale Data) ---
function ChatRoom_StaleData({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', () => {
      // This `theme` value becomes "stale" if the prop changes,
      // because the Effect doesn't re-run.
      showNotification(`Welcome to ${roomId}! (Theme: ${theme})`, theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // 🔴 Problem: `theme` is not a dependency, so it becomes stale.

  return <h3>1. Stale Data Example (Theme won't update in notification)</h3>;
}

// --- ❌ Version 2: The WRONG Way (Too Many Re-runs) ---
function ChatRoom_TooManyReruns({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', () => {
      showNotification(`Welcome to ${roomId}! (Theme: ${theme})`, theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]); // 🔴 Problem: Re-connects every time `theme` changes.

  return <h3>2. Too Many Re-runs Example (Check console for re-connections)</h3>;
}

// --- ✅ Version 3: The RIGHT Way (with our useEffectEvent polyfill) ---
function ChatRoom_RightWay({ roomId, theme }) {
  // 1. Extract non-reactive logic into an Effect Event.
  //    This function will always see the latest `theme`, but it's not "reactive".
  const onConnected = useEffectEvent(() => {
    showNotification(`Welcome to ${roomId}! (Theme: ${theme})`, theme);
  });

  useEffect(() => {
    // 2. The Effect's logic is now only concerned with the "reactive" parts.
    const connection = createConnection(roomId);
    connection.on('connected', () => {
      // 3. Call the stable Effect Event from inside the Effect.
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ Perfect! The dependency array is now correct.

  return <h3>3. The Right Way with useEffectEvent (No stale data, no extra re-runs)</h3>;
}


// --- Main App Component to toggle between examples ---
export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [theme, setTheme] = useState('light');
  const [version, setVersion] = useState('stale');

  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
    backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
    color: theme === 'light' ? '#1e1e1e' : '#fff',
    minHeight: '100vh'
  };

  const hrStyle = { borderColor: theme === 'light' ? '#eee' : '#444' };

  return (
    <div style={appStyle}>
      <h1>useEffectEvent Demo (Conceptual)</h1>
      <label>
        Choose a room:{' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option>general</option>
          <option>travel</option>
          <option>music</option>
        </select>
      </label>
      <label style={{ marginLeft: '10px' }}>
        Theme:{' '}
        <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option>light</option>
          <option>dark</option>
        </select>
      </label>
      <hr style={hrStyle}/>
      <p>
        <b>Instructions:</b> Open the console. Select an example below. First, change the room to see it connect. Then, change the theme and observe the console logs to see the behavior of each version.
      </p>
      <label>
        Select Example:{' '}
        <select value={version} onChange={e => setVersion(e.target.value)}>
          <option value="stale">1. Stale Data</option>
          <option value="rerun">2. Too Many Re-runs</option>
          <option value="correct">3. Right Way (useEffectEvent)</option>
        </select>
      </label>
      <hr style={hrStyle} />

      {version === 'stale' && <ChatRoom_StaleData roomId={roomId} theme={theme} />}
      {version === 'rerun' && <ChatRoom_TooManyReruns roomId={roomId} theme={theme} />}
      {version === 'correct' && <ChatRoom_RightWay roomId={roomId} theme={theme} />}
    </div>
  );
}