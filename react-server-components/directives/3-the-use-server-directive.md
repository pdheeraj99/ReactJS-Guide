# 3. The `"use server"` Directive: Client nundi Server Logic ni Call Cheyadam 📞

Manam ippudu client boundary gurinchi nerchukunnam. Kani client lo unna manam, server-side logic ni (e.g., database update) ela trigger cheyali? Daaniki samadhaname `"use server"`.

> **`"use server"` anedi oka async function ni "Server Function" ga mark chese oka instruction. Idi cheppadam entante: "Ee function code ni server lo ne unchandi, kani client nundi call cheyadaniki వీలుగా oka secure reference (pointer) ni create cheyandi."**

Client ee reference ni call chesinappudu, React behind the scenes ga server ki oka network request pampi, aa original function ni execute chestundi.

### `"use server"` ni ela vadali?

Ee directive ni rendu vidhaluga vadachu:

#### 1. Function Top lo (Function-level)

Idi chala common. Meeru oka Server Component lo or server-only file lo oka specific async function ni Server Function ga cheyalante, aa function body top lo `"use server";` pettandi.

```javascript
// Server Component lo define cheyadam
import { db } from './db';

async function MyServerComponent() {

  async function updateUsername(username) {
    "use server"; // <-- Ikkada!
    if (!isValid(username)) {
      throw new Error("Invalid username");
    }
    await db.user.update({ name: username });
  }

  return (
    <UserProfile onSave={updateUsername} />
  );
}
```
Ee `updateUsername` function ippudu `UserProfile` (Client Component) ki prop ga pass cheyochu and akkada call cheyochu.

#### 2. File Top lo (Module-level)

Meeru oka file lo unna anni functions ni Server Functions ga export cheyalante, aa file top lo ne `"use server";` pettandi. Ee file ni "Server Action Module" antaru.

```javascript
// FILE: ./actions/userActions.js

"use server"; // <-- Ee file lo unna anni exports Server Functions avtayi

import { db } from './db';

export async function createPost(content) {
  await db.posts.create({ content });
  // ... revalidate data, etc.
}

export async function deletePost(postId) {
  await db.posts.delete({ id: postId });
  // ...
}
```

Ippudu, ee functions ni Client Components lo direct ga import chesukoni use cheyochu.

```javascript
// Client Component
"use client";

import { createPost } from './actions/userActions';

function NewPostForm() {
  return (
    <form action={createPost}>
      <textarea name="content"></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 🚨 Security: Chala Jagratha!

Idi chala important vishayam. Server Functions client nundi direct ga call avtayi kabatti, manam chala jagrathaga undali.

-   **Input ni Nammakandi:** Client nundi vache prathi argument (`formData`, `username`, etc.) "untrusted" (nammaranidi) ga bhavinchali. Manam server lo daanini use chese mundu, daanini validate cheyali (e.g., user `isAdmin: true` ani pampiste, manam daanini accept cheyakudadu).

-   **Authorization Check Cheyandi:** Prathi Server Function lo, aa action cheyadaniki user ki permission unda leda ani check cheyali. Session, cookie, or token nundi user ID teeskoni, "Ee user ee post ni delete cheyagalada?" ani verify cheyali.

```javascript
"use server";

import { getUser } from './auth'; // Gets current logged-in user
import { db } from './db';

export async function deletePost(postId) {
  const user = await getUser();

  // 1. Authentication: User login ayyara?
  if (!user) {
    throw new Error("You must be logged in.");
  }

  const post = await db.posts.find({ id: postId });

  // 2. Authorization: Ee post ee user de na?
  if (post.authorId !== user.id) {
    throw new Error("You are not authorized to delete this post.");
  }

  // 3. Action: Ippudu safe ga delete cheyochu
  await db.posts.delete({ id: postId });
}
```

### Key Rules

-   `"use server"` kevalam `async` functions lo matrame use cheyali.
-   Server Functions ni forms lo `action` ga pass chesinappudu, React automatically `useTransition` ni handle chestundi. Vere chota call cheste, manam `useTransition` lo wrap cheyadam better practice.
-   Server Functions data mutations (create, update, delete) kosam design chesayi. Data fetching (GET requests) kosam kaadu. Fetching kosam Server Components lo direct `fetch` vadali.

Next, manam Server and Client madhya data pass chesetappudu emi rules follow avvalo (Serialization) chuddam. 🚀