# `renderToString`: React Component ni HTML String ga Marchadam 📜

Hey mawa! Manam ippudu Server-Side Rendering (SSR) loni most basic and fundamental function gurinchi matladukundam: `renderToString`.

Deeni peru cheppinatte, deeni pani chala simple:
> **`renderToString` takes your React component and renders it into a plain HTML string.**

Ee function ni manam server lo run chestham. Adi mana `<App />` component ni theeskuni, daanini browser ki ardham ayye `<html>...</html>` string laaga convert chesi isthundi. Manam aa string ni theeskuni, server response lo pampistham.

### How to Use It?

Usage chala straightforward. Manam `renderToString` ni `react-dom/server` nunchi import cheskuni, daaniki mana main component ni pass chestham.

```jsx
// This code runs on a Node.js server
import { renderToString } from 'react-dom/server';
import App from './App.js';

// Render the <App /> component to an HTML string
const htmlString = renderToString(<App />);

console.log(htmlString);
// Output: "<div data-reactroot=\"\"><h1>Hello, World!</h1></div>"
```
Chusara? React component antha oka simple string ga maaripoyindi. Ee string lo `data-reactroot` ane oka special attribute undatam gamaninchandi. Ee attribute eh `hydrateRoot` ki, "Hey, ikkada nunchi React app start avuthundi" ani chepthundi.

### The Biggest Limitation: No Streaming 🚫

`renderToString` anedi **synchronous** and **blocking** function.

Ante, mee component lopaala data fetching (`<Suspense>` tho) lanti panulu unte, `renderToString` aa data antha vachi, component antha fully render ayye varaku **wait chesthundi**. Appati varaku, adi browser ki em pampinchadu.

*   **Pros:** Simple to use.
*   **Cons:** Slow for apps with data fetching. User ki content kanipinchadaniki ekkuva time paduthundi. It doesn't take advantage of modern features like streaming.

Ee limitation valla, modern apps lo `renderToString` badulu `renderToPipeableStream` lanti streaming APIs ni prefer chestharu.

Kani, asalu `renderToString` ni `renderToStaticMarkup` tho polisthe, a a theda ento, and `renderToString` యొక్క output ni client lo ela hydrate chestaro, next example lo chuddam. Let's go! ➡️💻