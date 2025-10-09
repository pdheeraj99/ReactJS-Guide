import React from 'react';

/*
  This file is a conceptual example. In a real application, this code
  would live in your main entry file (e.g., `src/index.js`) and would
  mount your main `<App />` component.

  To run this code, you would need an HTML file with:
  `<div id="root"></div>`
*/

// --- A. The Main App Component ---
// This is the component we want to render, update, and unmount.
function App({ title }) {
  return (
    <div style={{ padding: '20px', border: '2px solid green', borderRadius: '5px' }}>
      <h1>{title}</h1>
      <p>This is our simple React application.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

// --- B. The Script Logic ---
// This part simulates what your `index.js` would do. We can't run it
// directly here, but we've wrapped it in a component to demonstrate the lifecycle.

export default function CreateRootLifecycleExample() {
  const [logs, setLogs] = React.useState([]);
  const rootRef = React.useRef(null);

  const log = (message) => {
    setLogs(currentLogs => [...currentLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // 1. Initial Render
  const handleInitialRender = () => {
    log('Attempting initial render...');
    const container = document.getElementById('demo-root');
    if (container) {
      // Create the root if it doesn't exist
      if (!rootRef.current) {
        rootRef.current = React.createRoot(container);
      }
      rootRef.current.render(<App title="Welcome, Mawa!" />);
      log('✅ Initial render call complete.');
    } else {
      log('❌ Could not find #demo-root element.');
    }
  };

  // 2. Update Render
  const handleUpdateRender = () => {
    log('Attempting to update render...');
    if (rootRef.current) {
      rootRef.current.render(<App title="Title Updated! Check the time." />);
      log('✅ Update render call complete.');
    } else {
      log('❌ Root does not exist. Please render first.');
    }
  };

  // 3. Unmount
  const handleUnmount = () => {
    log('Attempting to unmount...');
    if (rootRef.current) {
      rootRef.current.unmount();
      rootRef.current = null; // Clear the ref after unmounting
      log('✅ App unmounted successfully.');
    } else {
      log('❌ Root does not exist. Nothing to unmount.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>`createRoot` Lifecycle Examples</h1>
      <p>Use the buttons below to control the React app in the green box.</p>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleInitialRender}>1. Render App</button>
        <button onClick={handleUpdateRender} style={{ marginLeft: '10px' }}>2. Update App</button>
        <button onClick={handleUnmount} style={{ marginLeft: '10px' }}>3. Unmount App</button>
      </div>

      {/* This is the target DOM node for our React app */}
      <div id="demo-root" style={{ marginBottom: '20px' }}>
        {/* The React app rendered by createRoot will appear here */}
      </div>

      <div style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '10px' }}>
        <strong>Logs:</strong>
        <ul style={{ height: '150px', overflowY: 'auto', listStyleType: 'none', padding: 0 }}>
          {logs.map((logMsg, index) => <li key={index} style={{fontFamily: 'monospace'}}>{logMsg}</li>)}
        </ul>
      </div>
    </div>
  );
}

// Note: In a real app, you would import `createRoot` from `react-dom/client`,
// not from the `react` package. The example above uses React.createRoot
// because it's running in a self-contained component example environment.
// The correct import is:
// import { createRoot } from 'react-dom/client';