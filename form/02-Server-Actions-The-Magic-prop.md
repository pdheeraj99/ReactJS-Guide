# Server Actions: The Magic of the `action` Prop 🪄

Hey friend! `<form>` `action` prop ki manam oka function ni pass cheyochu ani chusam. Ippudu, aa function ni server meeda run cheste ela untundi? That's where the magic of **Server Actions** begins.

> A **Server Action** is an `async` function that you can pass to a `<form>`'s `action` prop, which will execute securely on the **server**, not in the client's browser.

Ee feature tho, manam database ni update cheyadaniki or server meeda vere pani cheyadaniki, elanti client-side API call logic (like `fetch`) rayalsina avasaram ledu.

### The `'use server'` Directive

Oka normal `async` function ni, Server Action ga ela marchali? It's incredibly simple. Just add one line of code at the very top of the function body (or the file):

**`'use server';`**

Ee string anedi oka directive. Idi bundler ki and React ki chepthundi: "Hey, ee function code antha server-only. Deenini eppudu client-side JavaScript bundle lo include cheyyaku. Instead, deeniki oka special endpoint create cheyyi."

```javascript
// actions.js

// This directive at the top of the file marks ALL exported functions
// in this file as Server Actions.
'use server';

export async function createNewUser(formData) {
  // This code will ONLY ever run on the server!
  const name = formData.get('name');
  await db.users.create({ name });
  console.log('New user created on the server!');
}
```

### Connecting the Client and Server

Ippudu manam ee Server Action ni, mana `<form>` ki direct ga pass cheyochu.

```jsx
// App.jsx
import { createNewUser } from './actions';

function MyForm() {
  return (
    // That's it! The form is now connected to server-side logic.
    <form action={createNewUser}>
      <input type="text" name="name" />
      <button type="submit">Create User</button>
    </form>
  );
}
```

**What happens when the user clicks submit?**
1.  React, form loni data antha collect chesthundi.
2.  Adi network meeda, `createNewUser` function kosam create chesina special endpoint ki, oka `POST` request pampisthundi.
3.  Server meeda, `createNewUser` function execute avuthundi.
4.  User ki page reload avvadu! UI smooth ga untundi.

**Analogy: The Magic Mailbox 📬**
Imagine, `<form>` anedi oka magic mailbox.
*   You write a letter with some information (`FormData`).
*   You drop it into the mailbox (`<form>`).
*   Instead of you having to drive to the post office (`client-side fetch`), the mailbox has a direct, secret portal to the destination (`action={serverAction}`).
*   The letter instantly appears at the destination and gets processed (`function runs on the server`).

```mermaid
graph TD
    subgraph "Client (Browser)"
        A[User fills form and clicks Submit] --> B["<form action={serverAction}>"];
    end

    B -- "React sends a POST request" --> C((Network));

    subgraph "Server"
        C --> D["`'use server'` function is invoked"];
        D --> E[Runs database queries, etc.];
        E --> F[✅ Logic is secure on the server];
    end

    style F fill:#d4edda
```

### Progressive Enhancement

The best part? Ee form, user browser lo JavaScript disable ayina, or inka load avvakapoyina, pani chesthundi! In that case, it will work like a classic HTML form and do a full-page refresh. This makes your app incredibly robust.

Okay, form ni server ki ela connect cheyalo chusam. Kani, asalu ee form data (`name`, `email`) antha React ela collect chesthundi? Aa `FormData` object ento, next chuddam. 👉