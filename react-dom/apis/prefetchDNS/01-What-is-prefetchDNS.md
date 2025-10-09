# `prefetchDNS`: Just Getting the Address 🗺️

Hey mawa! Manam `preconnect` gurinchi nerchukunnam. Adi server tho connection ni ready ga unchutundi. Kani, prathi server ki connection open cheyyadam konchem "expensive" (resource-intensive) pani.

Imagine, mana app lo analytics, A/B testing, customer support chat... ila chala third-party scripts unnayi. Manam vaati anni domains ki `preconnect` chesthe, browser chala connections open chesi, performance debba tinedi.

Ilanti situations lo, manam `prefetchDNS` vadatham.

### What does `prefetchDNS` do?

`prefetchDNS` anedi `preconnect` kanna chala chinna pani chesthundi. Idi browser ki chepthundi:
> **"Hey Browser, nenu `https://analytics.example.com` ane ee server ni future lo use cheyyochu. Nuvvu connection em vaddu, just daani IP address ento kanukkuni pettu."**

Ante, idi kevalam **DNS Lookup** matrame chesthundi. Connection open cheyyadu. Idi chala "cheap" (low-cost) operation.

Ee chinna step mundhe cheyyadam valla, manam actual ga asset ni request chesinappudu, browser ki already address telusu kabatti, adi DNS lookup step ni skip chesi, direct ga connection process start chesthundi. This saves a few milliseconds, which can add up!

### How to Use It?

`prefetchDNS` kuda `react-dom` nunchi vache oka simple function. Daaniki manam server URL ni pass chestham.

```jsx
import { prefetchDNS } from 'react-dom';

function MyComponent() {
  // Tell the browser to find the IP addresses for these domains
  prefetchDNS("https://analytics.google.com");
  prefetchDNS("https://cdn.ab-testing-service.com");

  return (
    <div>
      {/* The rest of your component */}
    </div>
  );
}
```

### The Golden Rule: `preconnect` vs `prefetchDNS`

*   **`preconnect`**: Use for 1-3 **high-priority** domains you are **sure** you will connect to (e.g., your API server, your font provider).
*   **`prefetchDNS`**: Use for many **lower-priority** domains you *might* connect to (e.g., analytics, third-party widgets, etc.).

Ippudu, ee `prefetchDNS` ni code lo ela vadalo, oka simple example tho chuddam. Let's go! 🚀💻