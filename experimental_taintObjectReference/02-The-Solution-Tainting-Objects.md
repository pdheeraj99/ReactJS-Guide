# The Solution: Marking Objects as "Server-Only" 🛡️

Hey friend! Mana 'accidental secret leak' problem ni solve cheyadaniki, React manaki oka powerful security feature isthundi: `experimental_taintObjectReference`.

Ee function peru konchem peddaga, complex ga anipinchachu, kani deeni pani chala simple.

> **`experimental_taintObjectReference`** lets you "taint" or "mark" an object, telling React: "This object contains sensitive, server-only information. Never, ever allow this to be passed to a Client Component."

**Analogy: The "TOP SECRET" Stamp 📄**
Idi mana government office lo, officer ki vachina "TOP SECRET" document meeda, inkoka pedda red stamp veyadam lantiది: **"FOR INTERNAL USE ONLY - DO NOT DISTRIBUTE"**. Ee stamp veyadam valla, aa document ni bayatiki pampadam anedi system lo impossible aipothundi.

`taintObjectReference` kuda alane pani chesthundi.

### How to Use It

Manam ee function ni, sensitive data unna object ni fetch chesina ventane call chestam, usually data access layer lo.

```javascript
// lib/auth.js
import { experimental_taintObjectReference } from 'react';

export async function getUser(id) {
  const user = await db.users.find({ id }); // Contains passwordHash, etc.

  // ✅ Stamping the object as "server-only"
  experimental_taintObjectReference(
    'Do not pass the entire user object to the client.',
    user
  );

  return user;
}
```

**Ippudu em jarugutundi?**
1.  Mana `ServerComponent` `getUser(123)` ni call chesthundi.
2.  Manaki `user` object vastundi, kani ippudu adi React lopalana "tainted" (marked) ga untundi.
3.  Ippudu, developer mistake lo aa `user` object ni `ClientComponent` ki prop ga pass cheste...
4.  **BOOM! 💥** React render process ni aapesthundi and oka error ni throw chesthundi. Aa error lo manam ichina message (`'Do not pass the entire user object...'`) kanipisthundi.

The sensitive data **never leaves the server**. The app breaks during development, forcing the developer to fix the security hole before it ever reaches production.

```mermaid
graph TD
    A[Server Component] --> B(Calls `getUser(123)`);
    subgraph "auth.js"
        B --> C{Fetches `user` object};
        C --> D(Calls `taintObjectReference` on `user`);
    end
    D --> E(Returns "tainted" user object 🛡️);
    A --> F(Tries to pass tainted `user` to Client Component);
    F --> G[React detects tainted prop];
    G --> H[💥 Throws Error! Stops the render.];
    H --> I[Sensitive data is SAFE on the server ✅];

    style H fill:#ffcccc
    style I fill:#d4edda
```

**Important Note:** Ee API peru lo `experimental` undi. Ante, idi inka final stage lo ledu and future lo marochu. So, deenini jagratthaga, kevalam development and learning kosam vadali.

Ippudu manam object ni ela protect cheyalo chusam. Kani deeni limitations enti, and best practices emito, next chuddam. 👉