import React, { useState, useEffect } from 'react';

/*
  Part 5: Anti-Pattern - Using useEffect for User Events

  Inko common mistake entante, user events (like button clicks) ni
  handle cheyyadaniki `useEffect` vadadam. User events kosam manam
  eppudu direct event handlers ne vadali.
*/

// --- ❌ The WRONG Way ---
function AddToCartWrong({ productId }) {
  const [isAdding, setIsAdding] = useState(false);

  // ANTI-PATTERN!
  // Ee logic antha chala complex and indirect ga undi.
  // Click -> State Change -> Re-render -> Effect -> Action -> State Change -> Re-render
  useEffect(() => {
    if (isAdding) {
      console.log(`(Wrong) Effect is running to add product ${productId} to cart.`);
      // onAddToCart(productId); // Actual logic would go here
      setIsAdding(false); // Reset the trigger state
    }
  }, [isAdding, productId]);

  return (
    <div>
      <h4>The WRONG Way (with useEffect)</h4>
      <button onClick={() => setIsAdding(true)}>Add to Cart</button>
    </div>
  );
}

// --- ✅ The RIGHT Way ---
function AddToCartRight({ productId }) {
  // Simple, direct event handler.
  // Click -> Action
  function handleClick() {
    console.log(`(Right) Event handler running to add product ${productId} to cart.`);
    // onAddToCart(productId); // Actual logic would go here
  }

  return (
    <div>
      <h4>The RIGHT Way (with event handler)</h4>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
}

function AntiPatternUserEvents() {
  return (
    <div className="example-container">
      <h2>Anti-Pattern: Handling User Events</h2>
      <p>
        Click both buttons and check the console. The "RIGHT way" is much more
        direct and easier to understand.
      </p>
      <hr />
      <AddToCartWrong productId={1} />
      <hr />
      <AddToCartRight productId={2} />
    </div>
  );
}

export default AntiPatternUserEvents;