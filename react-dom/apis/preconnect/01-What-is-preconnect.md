# `preconnect`: Server tho "Hello, I'm Coming!" ani Cheppadam 👋

Hey mawa! Manam overview lo chusinattu, browser oka server nunchi asset download cheyyali ante, mundu aa server tho connection pettukovali. Ee process (DNS lookup, TCP handshake, TLS handshake) konchem time theeskuntundi.

Imagine, meeru Google Fonts nunchi oka font, oka icon, and inko font... ila multiple assets ni load cheyyali. Prathi asset ki, browser malli ee connection process start cheste, time waste avuthundi.

Ee problem ni solve cheyadanike manam `preconnect` vadatham.

### What does `preconnect` do?

`preconnect` anedi browser ki oka "hint" isthundi. Adi chepthundi:
> **"Hey Browser, nenu `https://fonts.googleapis.com` ane ee server nunchi konni assets download cheyyabotunnanu. Nenu adige lopu, nuvvu mundhe velli aa server tho connection ready chesi pettu."**

So, browser ventane aa server tho connection establish chesi, "warm up" chesi peduthundi. Appudu, manam actual ga font adiginappudu, ee connection steps anni skip aipothayi, and browser direct ga download start chesthundi. This saves valuable time!

### How to Use It?

`preconnect` anedi `react-dom` nunchi vache oka simple function. Daaniki manam server URL ni pass chestham.

```jsx
import { preconnect } from 'react-dom';

function MyComponent() {
  // Tell the browser to warm up the connection to Google Fonts
  preconnect("https://fonts.googleapis.com");

  return (
    <div>
      {/* These fonts will now load faster! */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" />
    </div>
  );
}
```

### `preconnect` vs `prefetchDNS`

*   **`prefetchDNS`:** Kevalam address kanukkuntundi (DNS lookup).
*   **`preconnect`:** Address kanukkoni, connection kuda establish chesthundi.

`preconnect` konchem ekkuva pani chesthundi kabatti, adi konchem more "expensive". So, the rule is:
*   **Use `preconnect`** when you are **sure** you will download something from that server soon.
*   **Use `prefetchDNS`** when you *might* download something, but you are not sure.

Ippudu, ee `preconnect` ni mana code lo ekkada, ela vadalo, konni practical examples tho chuddam. Let's go! 🚀💻