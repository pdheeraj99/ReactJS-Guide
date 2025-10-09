# Server APIs: React ni Server lo Run Cheyyadam 🤖

Hey mawa! Manam ippativaraku `react-dom/client` gurinchi matladukunnam. Adi browser lo pani chesthundi. Ippudu manam `react-dom/server` gurinchi matladukundam. Ee package loni functions, peru cheppinatte, **server-side** (e.g., a Node.js environment) lo run avuthayi.

### Asalu Server-Side Rendering (SSR) Enduku?

Deeni main purpose, manam `hydrateRoot` chapter lo chusina "blank page" problem ni solve cheyyadam. Ee server functions mana React components ni theeskuni, vaatini plain HTML string laaga marchi, browser ki pampisthayi. Deeni valla user ki page ventane kanipisthundi, performance improve avuthundi, and SEO ki kuda chala manchidi.

### The Main Server APIs

React manaki server rendering kosam konni different tools isthundi. Ekkada edi vadalo telusukovadam chala important.

1.  **`renderToString`**:
    *   **What it does:** Renders your component to an HTML string.
    *   **Behavior:** It's **synchronous**. Ante, mee component lopaala data fetching lanti panulu unte, adi complete ayye varaku wait chesi, appudu final HTML string isthundi.
    *   **Use Case:** Simple SSR setups where streaming is not needed. It's the older, more basic approach. It does **not** support streaming with Suspense.

2.  **`renderToStaticMarkup`**:
    *   **What it does:** `renderToString` laage HTML string isthundi, kani oka pedda theda undi. Idi `data-reactroot` lanti React-specific attributes ni add cheyyadu.
    *   **Behavior:** The output is "pure" HTML.
    *   **Use Case:** When you want to generate **completely static, non-interactive HTML**. For example, creating HTML email templates or exporting content to a PDF. The output of this function **cannot be hydrated**.

3.  **`renderToPipeableStream`** (for Node.js):
    *   **What it does:** Renders your component to a **Node.js Stream**.
    *   **Behavior:** It's **asynchronous and streaming**. Idi mundu page "shell" (the basic layout) ni pampisthundi. Tarvata, data load ayye కొద్దీ, HTML chunks ni pampisthune untundi. Idi `<Suspense>` tho perfect ga integrate avuthundi.
    *   **Use Case:** This is the **modern, recommended** approach for SSR in **Node.js** environments.

4.  **`renderToReadableStream`** (for Web Streams):
    *   **What it does:** Renders your component to a **Web Stream**.
    *   **Behavior:** Functionally similar to `renderToPipeableStream` but for modern edge runtimes like Deno, Cloudflare Workers, etc.
    *   **Use Case:** This is the **modern, recommended** approach for SSR in **non-Node.js** environments.

5.  **`resume` & `resumeToPipeableStream`** (Advanced):
    *   **What it does:** These are highly advanced APIs used to "resume" a render that was started somewhere else (e.g., during a build step with `prerender`).
    *   **Behavior:** They take a "postponed" state and continue rendering from where the previous render left off.
    *   **Use Case:** Advanced, distributed server architectures and static site generation (SSG) with dynamic parts.

### Quick Summary Table

| Function | Output | Hydratable? | Streaming? | Recommended for |
| :--- | :--- | :--- | :--- | :--- |
| `renderToString` | String | ✅ Yes | ❌ No | Simple SSR, legacy apps |
| `renderToStaticMarkup`| String | ❌ **No** | ❌ No | Static content (emails, PDFs) |
| `renderToPipeableStream`| Stream | ✅ Yes | ✅ Yes | **Modern SSR in Node.js** |
| `renderToReadableStream`| Stream | ✅ Yes | ✅ Yes | **Modern SSR in Web Stream envs** |
| `resume...` | Stream | ✅ Yes | ✅ Yes | Advanced: Resuming a prerender |

Ee overview tho, ippudu manam prathi function ni detail ga, conceptual server examples tho chuddam! Let's start with the classic, `renderToString`! ➡️🚀