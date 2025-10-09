# `resumeToPipeableStream`: Resuming for Node.js 🏃‍♂️

Hey mawa! Manam `resume` gurinchi matladukunnappudu, adi oka "paused" render ni theeskuni, Web Stream tho continue chesthundani chusam.

`resumeToPipeableStream` anedi deeniki "twin brother" laantidi, kani idi special ga **Node.js** kosam create chesaru.

### What does `resumeToPipeableStream` do?

> **`resumeToPipeableStream` does the exact same thing as `resume` (resumes a postponed render), but instead of a Web Stream, it returns a Node.js Stream that can be `pipe`d.**

Ee rendu functions madhya unna theda kevalam output stream type matrame. The core concept of resuming a render is identical.

*   **`resume`** → **Web Stream** (Deno, Cloudflare, modern runtimes kosam)
*   **`resumeToPipeableStream`** → **Node.js Stream** (Node.js servers kosam)

### How to Use It?

Deeni usage `renderToPipeableStream` ni chala varaku polivuntundi. Manam function ni call chesi, adi return chese object nunchi `pipe` method ni theeskuni, daanini response object ki `pipe` chestham.

```jsx
// This code runs on a Node.js server
import { resumeToPipeableStream } from 'react-dom/server';
import App from './App.js';

// In an Express route handler...
app.get('/', async (req, res) => {
  // 1. Load the "paused" state from storage
  const postponedState = await loadFromDisk('postponed.state');

  // 2. Get dynamic data
  const userName = await getUserNameFromRequest(req);

  // 3. Resume the render
  const { pipe } = resumeToPipeableStream(
    <App userName={userName} />,
    postponedState,
    {
      onShellReady() {
        res.setHeader('Content-type', 'text/html');
        // 4. Pipe the stream to the response
        pipe(res);
      },
      onError(error) {
        console.error(error);
      }
    }
  );
});
```

**The key takeaway:**
> **If you are using the advanced `prerender`/`resume` pattern in a Node.js environment, `resumeToPipeableStream` is the function you need.**

Ippudu, ee concept ni oka conceptual example tho chuddam. Let's go! ➡️💻