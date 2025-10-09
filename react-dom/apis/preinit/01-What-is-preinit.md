# `preinit`: "Download AND Run this ASAP!" 🚀

Hey mawa! Manam ippativaraku chusina resource hints (`prefetchDNS`, `preconnect`, `preload`) anni browser ki "hints" matrame. `preload` varaku vachina, adi resource ni download chesi, memory lo petti aagipothundi.

Kani, konni sarlu manaki inka speed kavali. Manaki oka script undi, adi page load ayina ventane run avvali. Leda oka stylesheet undi, adi apply ayithe gani mana UI correct ga kanipinchadu.

Ilanti **highest-priority** situations kosam, React manaki `preinit` ane ultimate weapon isthundi.

### What does `preinit` do?

`preinit` anedi `preload` kanna oka step munduki velthundi.
> **`preinit` tells the browser to download a resource with the highest priority, and as soon as it's downloaded, to immediately execute it (if it's a script) or insert it into the document (if it's a stylesheet).**

Idi "fetch and hold" kadu, idi **"fetch and activate"** operation.

### How to Use It?

`preinit` syntax `preload` laage untundi, kani `as` option ki kevalam `script` or `style` matrame accept chesthundi.

```jsx
import { preinit } from 'react-dom';

function MyPage() {
  // Download AND execute this critical script immediately after download.
  preinit("/js/critical-analytics.js", { as: "script" });

  // Download AND insert this critical stylesheet immediately after download.
  preinit("/css/reset-styles.css", { as: "style" });

  return (
    <div>
      <h1>My Page</h1>
      {/* ... */}
    </div>
  );
}
```

### `preinit` vs `preload`

Idi chala important distinction:
*   **`preload(..., { as: 'script' })`**: Script ni download chesi, ready ga peduthundi. Kani, daanini run cheyyadu. Manam `<script>` tag render chesinappudu, adi cache nunchi theeskuni execute chesthundi.
*   **`preinit(..., { as: 'script' })`**: Script ni download chesi, **ventane execute chesthundi**. Manam `<script>` tag ni separate ga render cheyyalsina avasaram ledu.

So, the rule is:
*   Use **`preload`** for resources you want to download early, but use later (`<link>`, `<script>`, `<img>` tags will trigger their use).
*   Use **`preinit`** for resources you want to download and activate at the earliest possible moment.

`preinit` anedi chala powerful tool, kani deenini jagrathaga vadali. Anavasaramaina scripts ni `preinit` chesthe, adi main rendering process ni slow cheyyochu.

Ippudu, ee powerful API ni code examples lo ela use cheyalo chuddam! Let's go! ⚡️💻