# The `'use client'` Boundary: The Magic Door 🚪

Hey mawa! Manam mundu chapter lo "every component is a Server Component by default" ani cheppukunnam. Mari, manaki `useState` or `onClick` lanti interactivity kavali ante em cheyyali?

Appude manaki **`'use client'`** directive picture loki vasthundi.

### What is the `'use client'` directive?

> **`'use client'` is a string you put at the very top of a file to mark that file, and all the other modules it imports, as Client Components.**

Idi server ki client ki madhyalo oka "magic door" laantidi. Ee line kanipinchagane, React's bundler anukuntundi, "Okay, ee file loni code antha interactive. Deenini nenu user యొక్క browser ki pampinchali."

```jsx
// Add this at the VERY top of the file
'use client';

import { useState } from 'react';

// Now, this component is a Client Component.
export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}
```

**The Golden Rule:** `'use client'` must be the very first thing in the file (comments thappa). Deeni paina `import` statements kuda undakudadu.

### It's a One-Way Door!

Idi chala important concept. `'use client'` anedi oka one-way street.
*   Oka file ni `'use client'` ani mark cheste, daani lopaala import chesina anni files (e.g., helper functions, child components) kuda automatic ga Client Components aipothayi.
*   The entire module graph below a `'use client'` file becomes part of the client bundle.

```mermaid
graph TD
    A[App.js (Server)] --> B[ProductPage.js (Server)];
    B --> C[AddToCartButton.js <br/><b>'use client'</b>];
    C --> D[CounterLabel.js];
    C --> E[api-client.js];

    subgraph "Server Environment"
        A; B;
    end

    subgraph "Client Environment (sent to browser)"
        C; D; E;
    end

    style C fill:#d4edda
    style D fill:#d4edda
    style E fill:#d4edda
```
Ee diagram lo, `AddToCartButton.js` lo `'use client'` undatam valla, adi and daani children (`CounterLabel.js`, `api-client.js`) anni client code ga maaripoyayi.

### So, when do you add `'use client'`?

Simple ga, mee component ki ee features lo a a okati avasaram ayina, meeru `'use client'` vadali:
*   **Interactivity and State:** `useState`, `useEffect`, `useReducer`, etc.
*   **Event Listeners:** `onClick`, `onChange`, etc.
*   **Browser-Only APIs:** `window`, `localStorage`, `document`, `navigator`.

Next, manam asalu Server Components lo a a panulu cheyyaleemo, a a rules follow avvalo chuddam. Let's go! ➡️📜