# How to Use `cacheSignal` 🛠️

`cacheSignal` ni use cheyadam chala straightforward. The main idea is to get the signal from React and pass it down to whatever function is doing the slow work.

The process involves two simple steps:

### Step 1: Call `cacheSignal()` in your Server Component

Meeru data fetch chese Server Component lo, `cacheSignal()` ni call chesi, aa signal ni mana data fetching function ki pass cheyyali.

```jsx
// components/SomeServerComponent.jsx

import { cacheSignal } from 'react';
import { fetchSomeData } from '@/lib/api';

export default async function SomeServerComponent({ id }) {
  // 1. Get the signal from React
  const signal = cacheSignal();

  // 2. Pass the signal to your data fetching function
  const data = await fetchSomeData(id, { signal });

  return <div>{data.name}</div>;
}
```
**Important:** `cacheSignal()` kevalam component rendering time lo matrame pani chesthundi. Vere chota call cheste `null` return chesthundi.

### Step 2: Use the Signal in Your Data Fetching Function

Ippudu, mana `api.js` file lo, `fetchSomeData` function aa `signal` object ni receive cheskuni, daanini asalu network request chese function ki (like `fetch`) pass cheyyali.

```jsx
// lib/api.js

// Our function now accepts an options object with a signal
export async function fetchSomeData(id, { signal }) {
  console.log(`Fetching data for ${id}...`);

  // 3. Pass the signal to the native fetch API
  const response = await fetch(`https://api.example.com/data/${id}`, {
    signal, // The magic happens here!
  });

  return response.json();
}
```

**What happens now?**
*   `fetch` API ki `signal` option undi.
*   Okavela React ee render ni cancel cheste, adi lopalina `cacheSignal` ni abort chesthundi.
*   Aa signal abort avvagane, `fetch` API ee network request ni **automatically cancel chesthundi.**
*   Browser "Aborted" ane error ni throw chesthundi, kani adi manam expect chesinde kabatti, daanini ignore cheyochu.

```mermaid
graph LR
    subgraph "Server Component"
        A[Renders] --> B(Calls `cacheSignal()`);
        B --> C(Gets `signal` object);
        C --> D(Calls `fetchSomeData(id, { signal })`);
    end

    subgraph "API Function (api.js)"
        D --> E(Receives `signal`);
        E --> F(Calls `fetch(url, { signal })`);
    end

    subgraph "React Lifecycle"
        G(Render is no longer needed) --> H(Aborts `cacheSignal`);
    end

    subgraph "Browser's fetch API"
        H -.-> I{Signal aborted?};
        I -- Yes --> J(Cancels network request 🛑);
    end

    F --> I;

    style J fill:#ffcccc
```

Anthe! Ee two steps tho, manam anavasaramaina network requests ni cancel chesi, server resources ni save cheyochu.

Kani, ee `cacheSignal` anedi prathi sari vadala? Leka konni specific situations lo matrame na? Ee question ki answer next chapter lo chuddam. 🤔➡️