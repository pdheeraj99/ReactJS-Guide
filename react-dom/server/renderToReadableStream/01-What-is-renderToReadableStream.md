# `renderToReadableStream`: Modern Streaming for the Edge 엣지

Hey mawa! Manam `renderToPipeableStream` gurinchi matladukunnappudu, adi **Node.js** kosam create chesina specific streaming API ani chusam.

Kani, ippudu web development antha Node.js lone jaragatledu. Manaki Deno, Cloudflare Workers, Vercel Edge Functions lanti kottha **"edge" runtimes** vachayi. Ee environments Node.js loni specific APIs ni use cheyyavu. Vaatiki బదులుగా, avi standard, browser-like APIs ni vadathayi.

Ee standard APIs lo okati **Web Streams**.

Anduke, React manaki `renderToReadableStream` ane inko streaming function isthundi.

### What does `renderToReadableStream` do?

> **`renderToReadableStream` does the exact same thing as `renderToPipeableStream` (streaming SSR with Suspense), but instead of a Node.js Stream, it returns a standard Web Stream.**

Idi antha function-wise same, kani output format veru.

*   **`renderToPipeableStream`** → **Node.js Stream** (Node.js servers kosam)
*   **`renderToReadableStream`** → **Web Stream** (Deno, Cloudflare, modern runtimes kosam)

### How to Use It?

Deeni usage kuda chala similar, kani konchem `async/await` syntax tho untundi. `renderToReadableStream` anedi oka Promise ni return chesthundi, adi resolve ayyaka manaki stream vasthundi.

```jsx
// This code runs on a modern edge runtime (e.g., Deno)
import { renderToReadableStream } from 'react-dom/server';
import App from './App.js';

async function handler(request) {
  // 1. Call the function and await the stream
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/main.js']
  });

  // 2. Create a standard Response object with the stream
  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' },
  });
}
```

**The key takeaway:**
> **If you are in a Node.js environment, use `renderToPipeableStream`. If you are in any other modern server environment that supports Web Streams, use `renderToReadableStream`.**

The core concepts of streaming, the "shell," and Suspense integration are identical between the two.

Ippudu, ee API ni oka conceptual example tho chuddam. Let's go! 🌊➡️