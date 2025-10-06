import React from 'react';
import { useOnlineStatus } from './useOnlineStatus.js';

/*
  Hey! Idi mana main App component.
  Idi mana custom hook `useOnlineStatus` ni use cheskuntundi.
*/
function App() {
  const isOnline = useOnlineStatus();

  const appStyle = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: isOnline ? '#e0ffe0' : '#ffe0e0',
    color: isOnline ? '#006400' : '#a00000',
    minHeight: '100vh',
  };

  return (
    <div style={appStyle}>
      <h1>useDebugValue Demo</h1>
      <hr />
      <h2>Your current status is: {isOnline ? '✅ Online' : '❌ Offline'}</h2>
      <hr />
      <h3>How to see `useDebugValue` in action:</h3>
      <ol style={{ textAlign: 'left', display: 'inline-block' }}>
        <li>Install the React Developer Tools extension for your browser.</li>
        <li>Open your browser's developer tools (usually F12 or Ctrl+Shift+I).</li>
        <li>Find the "⚛️ Components" tab.</li>
        <li>Select the `App` component in the component tree on the left.</li>
        <li>
          Look at the "Hooks" section on the right. You will see our custom
          hook listed.
        </li>
        <li>
          Instead of just seeing `OnlineStatus: true`, you will see our custom
          label: <strong>`OnlineStatus: "Online"`</strong>.
        </li>
      </ol>
      <p>
        That label is coming directly from our `useDebugValue` call inside the
        custom hook!
      </p>
    </div>
  );
}

export default App;