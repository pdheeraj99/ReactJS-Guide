# 1. Directives ante enti? 푯

Namaste friends! 🙏 React Server Components (RSC) architecture lo manam server and client madhya panulni panchukuntam. Server emo data fetching, file system access lanti heavy lifting chestundi. Client emo user interaction, state management, and browser APIs tho pani chestundi.

Ayite, ee rendu environments madhya "boundary" (sarihaddu) ni ela define cheyali? Ekkadi code server lo run avvali? Ekkadi code client ki pampali?

Ee prashnalaku samadhaname **Directives**!

> **Directives anevi React bundler (like Next.js or Remix's compiler) ki manam iche special instructions. Ee instructions, "Ee code ni client lo run cheyandi" or "Ee function ni server lo matrame unchi, client nundi call cheyadaniki access ivvandi" ani cheptayi.**

Avi normal JavaScript syntax kaadu. Avi simple string literals (`"use client"` or `"use server"`) and vatini file or function top lo pettali.

### Rendu Pradhana Directives ✌️

React Server Components lo manam mukhyanga rendu directives gurinchi telusukovali:

1.  **`"use client"`**: Idi oka file ni and daani dependencies anni "Client Module" ga mark chestundi. Ante, ee file lo unna code antha browser ki pampabadutundi and akkade execute avthundi. User interaction (`onClick`), state (`useState`), effects (`useEffect`), and browser APIs (`window`, `localStorage`) use chese prathi component ki idi avasaram.

2.  **`"use server"`**: Idi oka function ni "Server Function" ga mark chestundi. Ante, ee function server lo ne untundi, kani client nundi call cheyadaniki oka secure "door" open chestundi. Idi database updates, authentication, or vere server-side mutations ki chala useful.

### Oka Analogy tho Ardham Cheskundam: Restaurant Kitchen 🍽️

Mana React app ni oka restaurant anukondi.

-   **Server (Kitchen 🧑‍🍳):** Ikkada heavy-duty panulu jarugutayi. Ingredients (data) fetch cheyadam, vantalu (HTML) prepare cheyadam. Server Components ikkada untayi.
-   **Client (Dining Area 🤵):** Ikkada customer (user) tho interaction jarugutundi. Order teeskodam (`onClick`), customer em adigaro gurtupettukodam (`useState`), table setup cheyadam (`useEffect`). Client Components ikkada untayi.

Ee rendu areas ni kaluputu oka **boundary** (the kitchen door) untundi.

-   `"use client"` anedi Dining Area meeda unna sign board laantidi. Ee sign unna area lo customer interaction jaragali ani cheptundi.
-   `"use server"` anedi Dining Area nundi Kitchen ki order pampadaniki use chese special intercom system laantidi. Waiter (Client Component) intercom (`Server Function`) lo order chepthe, chef (Server) aa pani chesi pedatadu.

```mermaid
graph TD
    subgraph Server-Side (Kitchen)
        A[Server Components]
        B[Database Access]
        C["'use server' Functions (Intercom)"]
    end

    subgraph Client-Side (Dining Area)
        D["'use client' Components (Waiters)"]
        E[User Interaction (useState, useEffect)]
    end

    A -- renders --> D;
    D -- calls --> C;
    C -- accesses --> B;

    style A fill:#d4e6f1
    style B fill:#d4e6f1
    style C fill:#f5cba7
    style D fill:#d5f5e3
    style E fill:#d5f5e3
```

Ee directives gurinchi manam inka deep ga next sections lo chuddam. Ee boundary ni ardham cheskovadam RSC architecture ni master cheyadaniki chala key! 🚀