# `use` with Promises: The `async/await` for Components Await for Components

Asynchronous operations, especially data fetching, React lo eppudu konchem complex ga undevi. Manam `useEffect` lo fetch chesi, `useState` tho loading, error, and data states ni manually manage chese vallam.

The `use` hook ee process ni chala simple ga, `async/await` la marchisthundi.

> When you pass a **Promise** to the `use` hook, it tells React: "Pause this component's rendering until this Promise settles. If it resolves, give me the value. If it rejects, throw an error."

Ee "pausing" mechanism eh **Suspense**.

## How It Works

Imagine, manam oka server nunchi message ni fetch chese oka promise undi.

```jsx
// api.js
export function fetchMessage() {
  return new Promise(resolve => setTimeout(() => resolve("Hello, Mawa! 👋"), 2000));
}
```

Ippudu, ee promise ni manam `use` hook tho component lo ela vadathamo chuddam.

```jsx
// Message.jsx
import { use } from 'react';
import { fetchMessage } from './api';

const messagePromise = fetchMessage();

function Message() {
  // 1. Pass the promise directly to `use`
  const message = use(messagePromise);
  return <p>Message from server: {message}</p>;
}
```

**What's happening here? It's magic!**
1.  `Message` component render avvadam start avuthundi.
2.  Adi `use(messagePromise)` ni call chesthundi.
3.  React chustundi: "Oh, this is a promise, and it's still pending."
4.  Ventane, `Message` component **suspends** (pauses rendering).
5.  React component tree lo paina unna nearest `<Suspense>` boundary kosam vethukutundi and daani `fallback` UI ni chupisthundi.
6.  2 seconds tarvata, promise resolve ayyi, `'Hello, Mawa! 👋'` ane value vastundi.
7.  React ippudu `Message` component ni malli render cheyadam start chesthundi. Ee sari `use(messagePromise)` call chesinappudu, promise already resolved kabatti, adi direct ga aa message string ni return chesthundi.
8.  `Suspense` fallback hide aipoyi, mana message kanipisthundi!

The code looks synchronous and clean, just like `await`, but it works perfectly with React's rendering lifecycle.

### The Unbreakable Bond: `use(promise)` and `<Suspense>`

`useContext` la kakunda, `use(promise)` vadinappudu, adi suspend avvadaniki chance undi. So, the rule is:

> Any component that calls `use` with a promise **must** be rendered inside a `<Suspense>` boundary. Leka pothe, app crash avuthundi!

```jsx
// App.jsx
import { Suspense } from 'react';
import Message from './Message';

function App() {
  return (
    <Suspense fallback={<p>🌀 Loading message...</p>}>
      <Message />
    </Suspense>
  );
}
```

```mermaid
graph TD
    A[Component renders] --> B{Calls `use(promise)`};
    B --> C{Is promise pending?};
    C -- Yes --> D[Component SUSPENDS! ⏸️];
    D --> E[<Suspense> shows fallback];
    C -- No --> F[Promise resolved!];
    F --> G[`use` returns the resolved value];
    G --> H[Component renders with the value ✅];

    style E fill:#fefde8
    style H fill:#d4edda
```

Ee pattern, especially Server Components nunchi Client Components ki data stream chesetappudu chala powerful.

Next, `use` hook inko use case, Context ni read cheyadam, entha flexible ga undo chuddam. Let's go! 👉