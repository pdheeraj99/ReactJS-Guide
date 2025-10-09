# `resume`: Paused Render ni Malli Start Cheyyadam ▶️

Hey mawa! Manam ippudu chala advanced and super cool topic loki enter avuthunnam: **resuming a render**.

Normal ga, manam `renderTo...` function ni call cheste, adi rendering ni start nunchi end varaku chesthundi. Kani, konni modern architectures lo, rendering anedi oke chota jaragadu.

Imagine, oka pedda website ni build chesetappudu (like Amazon), prathi page ni user request chesinappudu server lo render cheyyadam బదులుగా, manam mundhe konni pages ni **prerender** chesi save cheskuntam.

**The Problem:** Ee prerender chesina page lo konni parts dynamic ga undali. For example, "Welcome, Jules!" ane message undali, or a shopping cart section undali. Ee dynamic data antha build time lo manaki teliyadu.

So, manam em cheyyochu ante, build time lo page antha render chesi, a a dynamic part (`<Suspense>` boundary) daggaraki రాగానే, rendering ni **pause** chesi, appativaraku generate ayina HTML ni and a a "paused state" object (`postponedState`) ni save cheskuntam.

User actual ga page ni request chesinappudu, manam ee "paused state" ni theeskuni, rendering ni akkada nunchi **resume** cheyyochu!

Ee "resume" cheyyadanike, manam `resume` and `resumeToPipeableStream` APIs ni vadatham.

### Analogy: The Relay Race 🏃‍♀️🏃‍♂️

1.  **`prerender` (The First Runner):** Build time lo, ee runner race start chesi, entha dooram vellagalo antha dooram velli, baton (`postponedState`) ni ready ga pedathadu.
2.  **`resume` (The Second Runner):** Request time lo, ee runner vachi, aa baton ni theeskuni, race ni akkada nunchi continue chesthadu.

```mermaid
graph TD
    subgraph "Build Time"
        A[Start Prerender] --> B{Renders static parts};
        B --> C{Hits a dynamic `<Suspense>` boundary};
        C --> D[Pauses rendering ⏸️];
        D --> E[Saves the HTML Prelude & `postponedState` object];
    end

    subgraph "Request Time"
        F[User requests page] --> G{Loads the saved HTML & `postponedState`};
        G --> H{Calls `resume(..., postponedState)`};
        H --> I[React continues rendering from where it left off!];
        I --> J[Streams the final HTML to the user];
    end

    style I fill:#d4edda
```

### `resume` vs. `resumeToPipeableStream`

Ee theda manaki aల్రెడీ thelusu:
*   **`resume`**: Returns a **Web Stream**. For modern edge runtimes (Deno, etc.).
*   **`resumeToPipeableStream`**: Returns a **Node.js Stream**. For Node.js environments.

Ee APIs chala advanced and specific use cases (like high-performance static site generation with dynamic parts) kosam design chesaru.

Ippudu, ee concept ni oka conceptual example tho chuddam. Let's go! 🚀➡️