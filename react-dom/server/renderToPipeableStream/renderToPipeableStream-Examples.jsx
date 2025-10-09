import React from 'react';

/*
  This file is a conceptual example of how `renderToPipeableStream` is used on a server.
  This code itself is not runnable as-is because it simulates a Node.js/Express server.
*/

// --- 1. The React App Component with Suspense ---
// This component has a part that might take time to load data.
function App() {
  return (
    <html>
      <head>
        <title>Streaming SSR</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div id="root">
          <nav>
            <a href="/">Home</a>
          </nav>
          <main>
            <h1>My Awesome Streaming App</h1>
            {/*
              This Suspense boundary tells React that the `Comments` component
              might take time to load. React will send the fallback first.
            */}
            <React.Suspense fallback={<p>Loading comments...</p>}>
              <Comments />
            </React.Suspense>
          </main>
        </div>
        <script src="/main.js" async></script>
      </body>
    </html>
  );
}

// A component that simulates slow data fetching.
function Comments() {
  // In a real app, this would be a data-fetching call.
  // We're just showing the final result here.
  return (
    <section>
      <h2>Comments</h2>
      <p>This is a comment that was loaded after the initial shell.</p>
    </section>
  );
}


// --- 2. Conceptual Server-Side Code (e.g., Express.js) ---
function ServerCode() {
  const serverCode = `
    import { renderToPipeableStream } from 'react-dom/server';
    import App from './App.js';

    // In an Express route handler...
    app.get('/', (req, res) => {
      let didError = false;

      const { pipe } = renderToPipeableStream(<App />, {
        // 1. Send this script to the browser to hydrate the app.
        bootstrapScripts: ['/main.js'],

        // 2. This function is called as soon as the "shell" is ready.
        onShellReady() {
          res.statusCode = didError ? 500 : 200;
          res.setHeader('Content-type', 'text/html');

          // Start streaming the HTML shell to the browser.
          pipe(res);
        },

        // 3. If the shell fails to render, send a fallback.
        onShellError(error) {
          res.statusCode = 500;
          res.send('<h1>Something went wrong!</h1>');
        },

        // 4. If any error happens, log it and mark it.
        onError(error) {
          didError = true;
          console.error(error);
        }
      });
    });
  `;

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
      <h3>Conceptual Server Logic (Node.js)</h3>
      <p>This is the modern, recommended way for SSR. It streams the HTML, providing a great user experience with Suspense.</p>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
        <code>{serverCode.trim()}</code>
      </pre>
    </div>
  );
}

// --- 3. Conceptual Client-Side Code ---
function ClientCode() {
  const clientScript = `
    // The client-side script is the same as with renderToString.
    // It hydrates the entire document.
    import { hydrateRoot } from 'react-dom/client';
    import App from './App.js';

    hydrateRoot(document, <App />);
  `;

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
      <h3>Conceptual Client Logic</h3>
      <p>The client code simply calls `hydrateRoot` on the `document`. React handles the rest, including swapping Suspense fallbacks with the streamed content.</p>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{clientScript.trim()}</code>
        </pre>
    </div>
  );
}


export default function RenderToPipeableStreamExample() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={containerStyles}>
      <h1>`renderToPipeableStream` Example</h1>
      <p>This is the modern, recommended API for server-rendering in Node.js environments.</p>
      <ServerCode />
      <ClientCode />
    </div>
  );
}