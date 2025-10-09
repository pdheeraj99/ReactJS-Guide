import React from 'react';

/*
  This file is a conceptual example of how `renderToString` is used on a server.
  This code itself is not runnable as-is because it simulates a server environment.
*/

// --- 1. The React App Component ---
// This is the component we want to render on the server.
function App() {
  return (
    <div>
      <h1>Hello from the Server! 🤖</h1>
      <p>This HTML was generated using `renderToString`.</p>
    </div>
  );
}


// --- 2. Conceptual Server-Side Code ---
// In a real app, this would be your Node.js server (e.g., using Express).
function ServerCode() {
  // On the server, you would import the function and your App component.
  // import { renderToString } from 'react-dom/server';
  // import App from './App.js';

  // You call renderToString with your component.
  // const appHtml = renderToString(<App />);
  const appHtml = '<div data-reactroot=""><h1>Hello from the Server! 🤖</h1><p>This HTML was generated using `renderToString`.</p></div>';

  // Then, you inject this HTML string into a full HTML document template.
  const fullHtmlDocument = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with renderToString</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <!-- The client-side script to hydrate the app -->
        <script src="/main.js" async></script>
      </body>
    </html>
  `;

  // Finally, you send this full HTML document as the response.
  // server.send(fullHtmlDocument);

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
      <h3>Conceptual Server Logic</h3>
      <p>The server takes your `<App />` component and uses `renderToString` to create an HTML string.</p>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
        <code>
          {`// 1. Render the component to a string:\nconst appHtml = renderToString(<App />);`}
        </code>
      </pre>
      <p>It then injects this string into an HTML template and sends it to the browser.</p>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
        <code>
          {fullHtmlDocument.trim()}
        </code>
      </pre>
    </div>
  );
}


// --- 3. Conceptual Client-Side Code ---
function ClientCode() {
  const clientScript = `
    // On the client, you hydrate the server-rendered HTML.
    import { hydrateRoot } from 'react-dom/client';
    import App from './App.js';

    const container = document.getElementById('root');
    hydrateRoot(container, <App />);
  `;

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
      <h3>Conceptual Client Logic</h3>
      <p>The client browser receives the full HTML. Then it downloads and runs the JavaScript, which calls `hydrateRoot` to make the static content interactive.</p>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{clientScript.trim()}</code>
        </pre>
    </div>
  );
}


export default function RenderToStringExample() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={containerStyles}>
      <h1>`renderToString` Example</h1>
      <p>This API renders a React tree to an HTML string on the server. It's a blocking, non-streaming API.</p>
      <ServerCode />
      <ClientCode />
    </div>
  );
}