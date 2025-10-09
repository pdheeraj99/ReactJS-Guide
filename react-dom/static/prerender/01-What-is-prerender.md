# `prerender`: The First Runner in the SSG Relay Race 🏃‍♀️

Hey mawa! Manam Static Site Generation (SSG) gurinchi matladukunnappudu, adi HTML ni **build time** lo generate chesthundani chusam. Ee "build time generation" cheyyadaniki manam use chese main tool eh `prerender`.

`prerender` anedi `react-dom/static` package nunchi vache oka function. Idi mana relay race analogy lo "first runner".

### What does `prerender` do?

`prerender` function ni manam mana build script lo run chestham. Adi oka React component ni theeskuni, daanini render cheyyadam start chesthundi.

1.  **Renders Static Parts:** Adi component loni static content antha render chesi, HTML laaga marchi peduthundi.
2.  **Hits Dynamic Parts & Pauses:** Component lopaala, data fetching kosam wait chesthunna `<Suspense>` boundary ni chudagane, `prerender` aagipothundi. Adi aa dynamic part ni render cheyyadu.
3.  **Returns Two Things:** Rendering pause chesi, `prerender` manaki oka object ni return chesthundi. Aa object lo rendu important vishayalu untayi:
    *   **`prelude`**: Appativaraku generate ayina static HTML. Idi oka stream.
    *   **`postponedState`**: The "paused state" of the render. Idi oka special object. Ee object lo, render ekkada aagipoindi, and continue cheyyadaniki em kavali ane information untundi.

### How to Use It?

Ee function ni manam direct ga app lo vadamu. Manam deenini oka build script (e.g., a `build.js` file) lo vadatham.

```jsx
// build.js - This script runs during the build process
import { prerender } from 'react-dom/static';
import App from './App.js';

// We don't have dynamic data at build time, so we pass nulls
const { prelude, postponed } = await prerender(
  <App initialData={null} />
);

// We save the output to our build folder
await saveToDisk('./build/index.html', prelude);
await saveToDisk('./build/postponed.state', postponed);
```
Ee build process tarvata, mana `build` folder lo rendu files untayi: oka static `index.html` (the prelude) and a `postponed.state` file.

### The Big Picture

`prerender` anedi story lo sagam matrame. Adi static part ni create chesi, dynamic part kosam baton (`postponedState`) ni ready ga peduthundi.

Request time lo, mana dynamic server ee `postponedState` ni theeskuni, `resume` function tho race ni continue chesthundi.

Ee `prerender` and `resume` combination eh modern Jamstack architectures ki foundation. It gives us the speed of static sites with the power of dynamic rendering.

Ippudu, ee `prerender` process ni oka conceptual example tho chuddam. Let's go! 🛠️➡️