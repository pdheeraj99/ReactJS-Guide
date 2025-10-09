import React from 'react';

/*
  This file is a conceptual example of how `renderToReadableStream` is used on a server.
  This code itself is not runnable as-is because it simulates a modern edge environment
  (like Deno, Cloudflare Workers, etc.) that uses standard Web APIs.
*/

// --- 1. The React App Component (same as before) ---
function App() {
  return (
    <html>
      <head>
        <title>Streaming with Web Streams</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div id="root">
          <h1>Hello from the Edge! 엣지</h1>
          <React.Suspense fallback={<p>Loading some heavy component...</p>}>
            <p>This content was streamed from a modern runtime.</p>
          </React.Suspense>
        </div>
        <script src="/main.js" async></script>
      </body>
    </html>
  );
}


// --- 2. Conceptual Server-Side Code (e.g., Deno or Cloudflare Worker) ---
function ServerCode() {
  const serverCode = `
    import { renderToReadableStream } from 'react-dom/server';
    import App from './App.js';

    // In a Deno or Cloudflare Worker request handler...
    async function handleRequest(request) {
      const stream = await renderToReadableStream(<App />, {
        bootstrapScripts: ['/main.js'],
        onError(error) {
          console.error(error);
        }
      });

      // Use the standard 'Response' object to send the stream.
      return new Response(stream, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }
  `;

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
      <h3>Conceptual Server Logic (Edge Runtime)</h3>
      <p>The logic is very similar to `renderToPipeableStream`, but it uses `await` and returns a standard `Response` object with the stream. This is for non-Node.js environments.</p>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
        <code>{serverCode.trim()}</code>
      </pre>
    </div>
  );
}


export default function RenderToReadableStreamExample() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={containerStyles}>
      <h1>`renderToReadableStream` Example</h1>
      <p>This API is the modern way to do streaming SSR in environments that support Web Streams (like Deno, Cloudflare, etc.).</p>
      <ServerCode />
    </div>
  );
}