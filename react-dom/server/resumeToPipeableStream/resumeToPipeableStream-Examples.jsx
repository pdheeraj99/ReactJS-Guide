import React from 'react';

/*
  This file is a conceptual example of how `prerender` and `resumeToPipeableStream` work together.
  This is the Node.js-specific version of the `resume` pattern.
*/

// --- 1. The React App Component (same as the `resume` example) ---
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
  if (!name) {
    throw new Error("User data not yet available!");
  }
  return <p>Hello, {name}!</p>;
}


// --- 2. The Conceptual Example ---
export default function ResumeToPipeableStreamExample() {
  const buildTimeCode = `
    // STAGE 1: Build Time (e.g., using a script)
    // This part is identical to the `resume` example.
    import { prerender } from 'react-dom/static';
    import App from './App.js';

    const { prelude, postponed } = await prerender(<App userName={null} />);

    // Save the static shell and the postponed state to disk.
    // saveToDisk('index.html', prelude);
    // saveToDisk('postponed.state', postponed);
  `;

  const requestTimeCode = `
    // STAGE 2: Request Time (on a Node.js / Express server)
    import { resumeToPipeableStream } from 'react-dom/server';
    import App from './App.js';

    app.get('/', async (req, res) => {
      const postponedState = await loadFromDisk('postponed.state');
      const userName = await getUserNameFromRequest(req);

      const { pipe } = resumeToPipeableStream(
        <App userName={userName} />,
        postponedState,
        {
          onShellReady() {
            res.setHeader('Content-type', 'text/html');
            pipe(res); // Pipe the stream to the Node.js response
          },
          onError(error) {
            console.error(error);
          }
        }
      );
    });
  `;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>`resumeToPipeableStream` Example</h1>
      <p>This is the Node.js version of the `resume` API. The concept is the same, but the API is designed to work with Node.js streams.</p>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Stage 1: Build Time (Prerender)</h3>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{buildTimeCode.trim()}</code>
        </pre>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>Stage 2: Request Time (Resume in Node.js)</h3>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{requestTimeCode.trim()}</code>
        </pre>
      </div>
    </div>
  );
}