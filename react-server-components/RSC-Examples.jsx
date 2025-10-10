import React from 'react';

/*
  This file contains conceptual examples of Server and Client components
  to demonstrate how they work together. In a real RSC-enabled framework
  (like Next.js), these would be in separate files.
*/

// ======================================================================
//        CONCEPTUAL FILE 1: AddToCartButton.jsx (Client Component)
// ======================================================================

// We add 'use client' at the top to mark this as a Client Component.
// This means its code will be sent to the browser, and it can use
// state, effects, and event listeners.
'use client';

import { useState } from 'react';

function AddToCartButton({ productId }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    console.log(`[Client] Adding product ${productId} to cart...`);
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAdding(false);
    alert(`Product ${productId} added to cart!`);
  };

  return (
    <button onClick={handleAddToCart} disabled={isAdding} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}


// ======================================================================
//        CONCEPTUAL FILE 2: ProductPage.jsx (Server Component)
// ======================================================================

// This component has no 'use client' directive, so it's a Server Component by default.
// It can be an `async` function and perform server-side tasks directly.

// A fake database call that simulates fetching data on the server.
const fakeDatabase = {
  products: {
    '123': { name: 'React Pro Keyboard', description: 'The best keyboard for typing React code.', price: '$120' },
    '456': { name: 'Juice Maker 3000', description: 'Makes the best juice out of concepts.', price: '$99' },
  },
  async getProduct(id) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network latency
    return this.products[id];
  }
};

async function ProductPage({ productId }) {
  // 1. Fetch data directly on the server. No need for useEffect or API routes.
  const product = await fakeDatabase.getProduct(productId);

  if (!product) {
    return <div>Product not found!</div>;
  }

  // 2. Render the static content on the server.
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
      <h1>{product.name} (Rendered on Server)</h1>
      <p>{product.description}</p>
      <h3>{product.price}</h3>

      {/*
        3. Import and render a Client Component to handle interactivity.
           The `product.id` is a serializable prop that can be passed from Server to Client.
      */}
      <AddToCartButton productId={productId} />
    </div>
  );
}


// ======================================================================
//                Main Example Component to Display Everything
// ======================================================================

export default function RSCExamples() {
  // This component itself is a Client Component for demonstration purposes,
  // so we can use state to switch between examples.
  const [selectedProductId, setSelectedProductId] = useState('123');

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={containerStyles}>
      <h1>React Server Components (RSC) Example</h1>

      <div style={{ border: '2px solid #007acc', padding: '15px', borderRadius: '5px' }}>
        <h3>Interactive Demo</h3>
        <p>Select a product to see the Server Component re-render and pass different data to the Client Component.</p>
        <div>
          <button onClick={() => setSelectedProductId('123')}>Load Keyboard</button>
          <button onClick={() => setSelectedProductId('456')} style={{ marginLeft: '10px' }}>Load Juice Maker</button>
        </div>

        <hr style={{margin: '20px 0'}} />

        {/*
          In a real RSC app, changing the product would trigger a new server render
          of `ProductPage`, which would then render the interactive `AddToCartButton`.
          Here, we simulate this by re-rendering our conceptual `ProductPage`.
        */}
        <React.Suspense fallback={<p>Loading product...</p>}>
          <ProductPage productId={selectedProductId} />
        </React.Suspense>
      </div>

      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        <h4>Key Takeaways:</h4>
        <ul>
          <li><strong>ProductPage.jsx</strong> is a Server Component. It runs on the server, can be `async`, and fetches data directly. Its source code is never sent to the client.</li>
          <li><strong>AddToCartButton.jsx</strong> is a Client Component (marked with `'use client'`). It can use `useState` and `onClick`. Its source code *is* sent to the client.</li>
          <li>The Server Component renders the Client Component and passes data (`productId`) to it as a prop.</li>
        </ul>
      </div>
    </div>
  );
}