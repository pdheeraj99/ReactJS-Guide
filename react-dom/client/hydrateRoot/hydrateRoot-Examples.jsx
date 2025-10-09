import React from 'react';

/*
  This file is a conceptual example. In a real Server-Side Rendering (SSR) setup,
  you would have two parts:

  1. SERVER-SIDE CODE (e.g., using Node.js with Express):
     This code runs on the server. It takes your React component and renders it
     to an HTML string. This HTML is then sent to the browser.

     ```javascript
     // server.js
     import { renderToString } from 'react-dom/server';
     import App from './App.js';

     const html = renderToString(<App />);
     // The server would send a full HTML document with this `html` inside <div id="root">.
     ```

  2. CLIENT-SIDE CODE (the script that runs in the browser):
     This is where `hydrateRoot` comes in. It takes the server-rendered HTML and
     makes it interactive.

  Below, we simulate this concept in a single file for educational purposes.
*/


// --- A. The Main App Component ---
// This is the component that would be rendered on BOTH the server and the client.
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ padding: '20px', border: '2px solid blue', borderRadius: '5px' }}>
      <h1>Hello from a Hydrated App!</h1>
      <p>This HTML was initially rendered on the server.</p>
      <p>
        The button below was just static HTML, but `hydrateRoot` has now attached the `onClick` event listener and state, making it interactive!
      </p>
      <button onClick={() => setCount(c => c + 1)}>
        You clicked {count} times
      </button>
    </div>
  );
}


// --- B. The Conceptual Example ---
export default function HydrateRootExample() {
  const serverHtml = `
    <!-- This is what the browser receives from the server -->
    <div id="root">
      <div style="padding: 20px; border: 2px solid blue; border-radius: 5px;">
        <h1>Hello from a Hydrated App!</h1>
        <p>This HTML was initially rendered on the server.</p>
        <p>The button below was just static HTML, but \`hydrateRoot\` has now attached the \`onClick\` event listener and state, making it interactive!</p>
        <button>You clicked 0 times</button>
      </div>
    </div>
  `;

  const clientScript = `
    // This is the script that runs on the client
    import { hydrateRoot } from 'react-dom/client';
    import App from './App.js'; // The same component as on the server

    const container = document.getElementById('root');

    // Instead of createRoot, we use hydrateRoot!
    // It reuses the server HTML and just attaches event listeners.
    hydrateRoot(container, <App />);
  `;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>`hydrateRoot` Example</h1>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>1. Server-Rendered HTML</h3>
        <p>Imagine the browser first receives this static HTML from the server. It's visible immediately, but not interactive.</p>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{serverHtml.trim()}</code>
        </pre>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>2. Client-Side Hydration Script</h3>
        <p>Then, the browser downloads and runs this JavaScript. `hydrateRoot` attaches to the existing HTML, making it interactive without destroying and re-creating it.</p>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{clientScript.trim()}</code>
        </pre>
      </div>

      <div style={{ border: '2px solid red', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <h3>Troubleshooting: Hydration Mismatch ❌</h3>
        <p>A "hydration mismatch" error happens if the component's output on the client is different from the HTML rendered by the server. For example, if the server rendered `<h1>Hello</h1>` but the client rendered `<h1>Goodbye</h1>`, React would warn you. This is a critical bug to fix because it can lead to unpredictable behavior.</p>
      </div>
    </div>
  );
}