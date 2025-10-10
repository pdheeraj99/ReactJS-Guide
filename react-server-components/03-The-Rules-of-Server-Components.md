# The Rules of Server Components: What You CAN'T Do 🚫

Hey mawa! Server Components chala powerful, kani aa power ki konni limitations unnayi. Ee components server lo matrame run avuthayi kabatti, avi browser lo matrame unde features ni use cheyyalevu.

Ee rules ni ardham cheskovadam chala important.

### Rule 1: No Interactivity or State

> **Server Components cannot use Hooks like `useState`, `useEffect`, `useReducer`, or any other Hook that manages state or relies on the component's lifecycle.**

**The "Why":** State anedi oka component యొక్క memory. Adi re-renders madhyalo untundi. Kani, Server Components anevi "stateless". Avi server lo **oke sari run ayyi**, a a output (JSX) generate chesi, a a pani aipothundi. Vaatiki "memory" undadu. `useEffect` kuda client-side lifecycle (mount, update, unmount) meeda aadharapaduthundi, adi server lo undadu.

```jsx
// ❌ WRONG - This will throw an error!
async function MyServerComponent() {
  // Server components can't have state!
  const [count, setCount] = useState(0);

  return <h1>Server Count: {count}</h1>;
}
```
Interactivity kosam, manam eppudu **Client Component** (`'use client'`) vadali.

### Rule 2: No Browser-Only APIs

> **Server Components cannot use browser-only APIs like `window`, `document`, `localStorage`, etc.**

**The "Why":** Ee rule chala obvious. Ee APIs anni browser lopaala matrame untayi. `window` anedi browser window ni represent chesthundi. Server anedi oka command-line environment laantidi, daaniki "window" undadu.

```jsx
// ❌ WRONG - This will crash on the server!
async function MyServerComponent() {
  // There is no `window` object on the server.
  const width = window.innerWidth;

  return <h1>Window width is: {width}</h1>;
}
```
Browser-specific logic antha eppudu **Client Component** lone undali.

### So, What CAN Server Components Do?

Ee limitations unna, Server Components ki chala super powers unnayi:
*   **Direct Data Access:** Avi direct ga mee database tho matladachu, or files ni read cheyyochu. No need for an API layer!
*   **Use Server-Only Libraries:** Meeru heavy libraries (like a markdown renderer, a PDF generator) ni server lo use chesi, a a output ni matrame client ki pampinchovacchu. Ee libraries client-side bundle lo include avvavu.
*   **Async/Await:** Server Components anevi `async` functions ga undochu! Ante, meeru data fetching kosam direct ga `await` ni mee component lopaala ne vadacchu.

```jsx
// ✅ RIGHT - This is a perfect use case for a Server Component!
import db from './database.js'; // Server-side data access

async function BlogPost({ id }) {
  // Directly fetch data inside the component
  const post = await db.posts.get(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
```

Ee theda ardham cheskunte, manam a a component ni server lo pettalo, a a component ni client ki pampalo, correct ga decide cheyyochu.

Next, manam ee rendu rakala components ni kalipi, ela pani cheyinchalo chuddam! ➡️🤝