import React from 'react';

/*
  This file is a highly conceptual example of how `prerender` and `resume` work together.
  This is a very advanced pattern used in modern distributed frameworks.
  The code here simulates the different stages (build time vs. request time).
*/

// --- 1. The React App Component with a Dynamic Part ---
// The `Header` is static, but the `Greeting` is dynamic and needs data.
function App({ userName }) {
  return (
    <html>
      <body>
        <header>
          <h1>Welcome to our Advanced App!</h1>
        </header>
        <main>
          <React.Suspense fallback={<p>Loading user greeting...</p>}>
            <Greeting name={userName} />
          </React.Suspense>
        </main>
      </body>
    </html>
  );
}

function Greeting({ name }) {
  // In a real app, this might use a hook that fetches data.
  // If `name` isn't available, it would suspend.
  if (!name) {
    // This is a simplified way to show suspension.
    // In a real app, this would be a Promise thrown by a data-fetching hook.
    throw new Error("User data not yet available!");
  }
  return <p>Hello, {name}!</p>;
}


// --- 2. The Conceptual Example ---
export default function ResumeExample() {
  const buildTimeCode = `
    // STAGE 1: Build Time (or on a static server)
    // We run `prerender` without the dynamic data.
    import { prerender } from 'react-dom/static';
    import App from './App.js';

    // We don't have the user name yet, so we pass null.
    const { prelude, postponed } = await prerender(<App userName={null} />);

    // 'prelude' contains the static HTML shell (the header and the Suspense fallback).
    // 'postponed' is a special object that contains the "paused" state of the render.

    // We would save both 'prelude' and 'postponed' to a file or a CDN.
    // saveToDisk('index.html', prelude);
    // saveToDisk('postponed.state', postponed);
  `;

  const requestTimeCode = `
    // STAGE 2: Request Time (on a dynamic server, e.g., an edge function)
    import { resume } from 'react-dom/server';
    import App from './App.js';

    async function handleRequest(request) {
      // 1. Load the "paused" state from our storage.
      const postponedState = await loadFromDisk('postponed.state');

      // 2. Get the dynamic data for this specific user.
      const userName = await getUserNameFromRequest(request);

      // 3. RESUME the render from where it was paused, now with the dynamic data.
      const stream = await resume(<App userName={userName} />, postponedState);

      // 4. Stream the rest of the HTML to the user.
      return new Response(stream, { headers: { 'Content-Type': 'text/html' } });
    }
  `;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>`resume` and `prerender` Example</h1>
      <p>This is an advanced pattern for high-performance sites. The render is split into two stages.</p>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Stage 1: Build Time (Prerender)</h3>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{buildTimeCode.trim()}</code>
        </pre>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>Stage 2: Request Time (Resume)</h3>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{requestTimeCode.trim()}</code>
        </pre>
      </div>
    </div>
  );
}