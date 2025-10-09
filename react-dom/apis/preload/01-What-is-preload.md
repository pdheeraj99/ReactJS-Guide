# `preload`: "Ee Asset Pakka Kavali, Mundhe Download Cheyyi!" 📥

Hey mawa! Manam `preconnect` (connection ready cheyyadam) and `prefetchDNS` (address kanukkovadam) chusam. Ee rendu "warm-up" activities laantivi.

Kani, konni sarlu manaki inka ekkuva kavali. Manaki thelusu, ee current page render avvadaniki oka specific font or stylesheet **absolutely necessary** ani. Ilanti situation lo, manam browser ki cheppochu:
> **"Hey Browser, connection gurinchi wait cheyyaku. Ee resource naaku pakka ga kavali, so nuvvu ippude daanini download cheyyadam start cheseyyi."**

Ee "eager download" hint eh `preload`.

### What does `preload` do?

`preload` anedi browser ki chepthundi, oka specific resource ni high priority tho download chesi, memory lo ready ga pettu ani.

**Important Note:** `preload` resource ni download chesthundi, kani daanini **execute cheyyadu** (script aithe) or **apply cheyyadu** (stylesheet aithe). Adi kevalam "fetch and hold" operation.

### How to Use It?

`preload` function ki manam rendu arguments istham:
1.  **`href`**: The URL of the resource to download.
2.  **`options`**: An object where you **must** specify the type of resource using the `as` key.

```jsx
import { preload } from 'react-dom';

function MyComponent() {
  // Tell the browser to start downloading this critical stylesheet NOW.
  preload("/css/critical-styles.css", { as: "style" });

  // Tell the browser to start downloading this important font NOW.
  preload("/fonts/my-hero-font.woff2", { as: "font", crossOrigin: "anonymous" });

  return (
    <div>
      {/*
        By the time React gets here to render this <link>, the browser might have
        already finished downloading it, thanks to our preload hint!
      */}
      <link rel="stylesheet" href="/css/critical-styles.css" />
      <h1>Hello, World!</h1>
    </div>
  );
}
```
The `as` option is critical. It helps the browser prioritize the request correctly and apply the right security policies. Common values for `as` are: `style`, `script`, `font`, `image`, `fetch`.

### `preload` vs. `preconnect`

*   **`preconnect`**: Warms up the connection to a server.
*   **`preload`**: Warms up the connection AND downloads a specific resource.

Use `preload` only for resources you are highly confident will be used on the current page. Preloading unused assets is a waste of the user's bandwidth.

Ippudu, ee `preload` ni different types of assets (styles, scripts, fonts) kosam ela vadalo, code examples tho chuddam. Let's get our most important assets ready early! 🚀💨