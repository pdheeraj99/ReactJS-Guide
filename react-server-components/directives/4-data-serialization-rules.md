# 4. Data Serialization: Server ↔️ Client Data Passing Rules 📦

Server Components server lo, Client Components browser lo run avtayi. Ee rendu different environments madhya manam data (props, function arguments, return values) pass chesinappudu, aa data network lo travel cheyali. Network lo functions, classes, or complex objects ni direct ga pampalemu.

Daanikosam, React aa data ni **serialize** (network lo pampadaniki easy ga unde format, like JSON, loki marchadam) chestundi. Ee process valla, manam emaina data pass cheyalemu. Konni rules unnayi.

Ee rules ni ardham cheskovadam chala important, lekapothe "Objects are not valid as a React child" or "Functions cannot be passed directly to Client Components" lanti errors vastayi.

---

### A. Server Component nundi Client Component ki Props Pass Cheyadam

Server Component nundi Client Component ki props pampistunnappudu, aa props anni serializable ayi undali.

✅ **Supported Prop Types:**

*   **Primitives:** `string`, `number`, `boolean`, `null`, `undefined`, `bigint`.
*   **Plain Objects:** Simple JavaScript objects (`{}`) where all values are also serializable.
*   **Plain Arrays:** Arrays (`[]`) where all items are also serializable.
*   **Map, Set, Date:** `Map`, `Set`, and `Date` objects.
*   **Promises:** `Promise` objects.
*   **Server Functions:** `"use server"` tho mark chesina functions.
*   **JSX:** React components (e.g., `<MyComponent />`). Idi chala powerful. Meeru oka Server Component ni Client Component ki `children` ga pass cheyochu!

❌ **Unsupported Prop Types:**

*   **Normal Functions:** `"use server"` leni functions pass cheyalemu.
*   **Class Instances:** `new MyClass()` lanti class objects.
*   **Complex Objects:** `null` prototype unna objects or objects with methods.
*   **Symbols:** Globally register cheyani Symbols.

**Example:**

```javascript
// --- ServerComponent.jsx ---
import ClientComponent from './ClientComponent';
import { getServerSideData } from './data';

// ✅ This is a Server Function
async function onFollow() {
  "use server";
  console.log("Follow action triggered on server");
}

export default async function ServerComponent() {
  const data = await getServerSideData(); // returns { user: 'Jules', posts: 3 }

  // ❌ This function is NOT serializable
  const handleLike = () => {
    console.log("This will cause an error!");
  };

  return (
    <ClientComponent
      user={data.user}              // ✅ string - OK
      posts={data.posts}            // ✅ number - OK
      metadata={{ a: 1, b: "hi" }}  // ✅ Plain object - OK
      tags={['react', 'server']}    // ✅ Plain array - OK
      onFollowAction={onFollow}     // ✅ Server Function - OK
      // onLikeAction={handleLike}  // ❌ Normal function - ERROR!
      sidebar={<Sidebar />}         // ✅ JSX (Server Component) - OK!
    />
  );
}
```

---

### B. Client nundi Server Function ki Arguments Pass Cheyadam

Client nundi Server Function ni call chesinappudu, manam pass chese arguments kuda serializable ayi undali.

✅ **Supported Argument Types:**

*   Almost anni same as above (Primitives, Plain Objects, Arrays, etc.).
*   **FormData:** `<form>` nundi vache `FormData` objects ni direct ga pass cheyochu. Idi chala common use case.

❌ **Unsupported Argument Types:**

*   **JSX:** Client nundi server ki JSX pass cheyalemu.
*   **Functions:** Normal functions or component functions pass cheyalemu.
*   **Class Instances:** Same as above.
*   **Events:** `onClick` nundi vache event object ni direct ga pass cheyalemu.

**Example:**

```javascript
// --- ClientComponent.jsx ---
"use client";
import { useTransition } from 'react';
import { myServerAction } from './actions';

function ClientComponent() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const data = {
      userId: 123,
      payload: { type: 'like', timestamp: new Date() }
    };

    startTransition(async () => {
      // ✅ Plain objects, numbers, Dates are serializable
      await myServerAction(data);
    });
  }

  function problematicClick(event) {
    // ❌ The 'event' object is NOT serializable
    // await myServerAction(event); // This would throw an error!
  }

  return <button onClick={handleClick}>Like</button>;
}
```

### C. Server Function nundi Client ki Value Return Cheyadam

Server Function oka value ni return cheste, adi kuda serializable ayi undali. Rules Server-to-Client props tho same ga untayi.

**Example:**

```javascript
// --- actions.js ---
"use server";

export async function fetchPost(id) {
  const post = await db.posts.find(id);

  // ✅ Returning a plain object is OK
  return { id: post.id, title: post.title };
}

export async function getInternalClass() {
  class MyInternalData {
    // ...
  }
  const data = new MyInternalData();

  // ❌ Returning a class instance is NOT OK
  // return data; // This would throw an error on the client!
}
```

Ee rules ni gurtupettukunte, meeru server and client madhya communication lo chala common errors ni avoid cheyagalaru. 🚀