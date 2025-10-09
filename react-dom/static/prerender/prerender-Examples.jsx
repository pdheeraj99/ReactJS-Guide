import React from 'react';

/*
  This file is a conceptual example of how `prerender` is used in a build script.
  This code is meant to be run in a Node.js environment during a build step,
  not in a browser.
*/

// --- 1. The React App Component ---
// The same component from our `resume` example, with static and dynamic parts.
function App({ productID, productData }) {
  return (
    <html>
      <head>
        <title>Prerendered Page</title>
      </head>
      <body>
        <header>
          <h1>Product Page</h1>
        </header>
        <main>
          <React.Suspense fallback={<div>Loading product details...</div>}>
            <ProductDetails id={productID} initialData={productData} />
          </React.Suspense>
        </main>
        <script src="/main.js" async></script>
      </body>
    </html>
  );
}

// A component that would fetch data, suspending if the data isn't ready.
function ProductDetails({ id, initialData }) {
  // In a real app, a data-fetching hook would use `initialData` or throw a
  // Promise to suspend. We simulate this.
  if (!initialData) {
    // This is a simplified way to show suspension.
    throw new Error("Product data not yet available!");
  }
  return (
    <div>
      <h2>{initialData.name}</h2>
      <p>{initialData.description}</p>
    </div>
  );
}


// --- 2. The Conceptual Example ---
export default function PrerenderExample() {
  const buildScriptCode = `
    // build.js - This script runs once when you build your site.
    import { prerender } from 'react-dom/static';
    import { writeFile } from 'fs/promises';
    import App from './App.js';

    async function build() {
      // At build time, we don't have dynamic data (like which product to show),
      // so we pass null.
      const { prelude, postponed } = await prerender(
        <App productID={null} productData={null} />
      );

      // The 'prelude' is a stream containing the static HTML shell.
      // We save it to an HTML file.
      await writeFile('./build/product.html', prelude);

      // The 'postponed' object contains the paused state of the render.
      // We save this to be used later by our dynamic server.
      await writeFile('./build/product.postponed', JSON.stringify(postponed));

      console.log('✅ Prerender complete! Static shell and postponed state saved.');
    }

    build();
  `;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>`prerender` Example</h1>
      <p>This API runs at **build time** to generate static HTML and a "postponed" state.</p>

      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>Conceptual Build Script (`build.js`)</h3>
        <p>This script would be executed by Node.js during your deployment process.</p>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', whiteSpace: 'pre-wrap' }}>
          <code>{buildScriptCode.trim()}</code>
        </pre>
      </div>

      <div style={{ border: '2px solid blue', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <h3>What Happens Next?</h3>
        <p>After this build step, you have two key files:</p>
        <ol>
          <li>`product.html`: A static HTML file with the header and the "Loading..." fallback.</li>
          <li>`product.postponed`: A JSON file containing the paused render state.</li>
        </ol>
        <p>At request time, a dynamic server would serve `product.html` and then use `product.postponed` with the `resume` API to stream the dynamic product details.</p>
      </div>
    </div>
  );
}