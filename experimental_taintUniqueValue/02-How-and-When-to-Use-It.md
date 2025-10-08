# How and When to Use It: Best Practices & Limitations ⚠️

Okay, `taintUniqueValue` tho manam secret keys ni protect cheyochu ani telisindi. Ippudu deenini practically code lo ela vadalo, and deeni limitations ento chuddam.

### How to Call It

Ee function മൂడు arguments teeskuntundi: `taintUniqueValue(message, lifetime, value)`.

1.  **`message`**: A string. Okavela ee value client ki leak avuthunte, React ee message tho error throw chesthundi. (e.g., `'Do not pass the API key to the client.'`)
2.  **`lifetime`**: An object. Ee object exist ayinంత varaku, aa value tainted ga untundi. App antha secret ga undalsina environment variable kosam, manam `process` lanti global object ni vadathamu.
3.  **`value`**: The actual secret string or number you want to protect.

**Best Practice: Taint at the Source**
Ee function ni eppudu, secret ni define chesina chote (or fetch chesina chote) call cheyyali. For example, environment variables ni handle chese oka separate file lo.

```javascript
// lib/secrets.js
import { experimental_taintUniqueValue } from 'react';
import 'server-only'; // Ensures this module never runs on the client

// Get the secret from environment variables
const apiKey = process.env.MY_API_KEY;

// ✅ Taint the value immediately after defining it.
experimental_taintUniqueValue(
  'The API key should never be sent to the client.',
  process, // The lifetime of the taint is tied to the server process
  apiKey
);

export function getApiKey() {
  return apiKey;
}
```

### The Biggest Limitation: Derived Values are NOT Tainted!

`taintObjectReference` laage, deeniki kuda ade pedda limitation undi.

> This API only taints the **exact value** you pass to it. If you create a new, derived value from the tainted one, the new value is **not** tainted.

**Example of the loophole:**
```jsx
// ServerComponent.jsx
import { getApiKey } from '@/lib/secrets';
import SomeClientComponent from './ClientComponent';

export default function ServerSideProcessor() {
  // `secretKey` is the original, tainted value.
  const secretKey = getApiKey();

  // 🚩 DANGER! We are creating a NEW, UNTAINTED string here!
  const derivedKey = `Bearer ${secretKey}`;

  // `derivedKey` tainted kadu, so React deenini client ki pampadaniki
  // allow chesthundi, leaking the original secret in the process!
  return <SomeClientComponent authToken={derivedKey} />;
}
```
Ikkada, manam original `secretKey` ni pampatledu, kani daanitho oka kottha string ni create chesi pampistunnam. React ki ee kottha string gurinchi emi teliyadu, so adi daanini client ki pampesthundi.

```mermaid
graph TD
    A[Original `secretKey` value] --> B(Tainted! 🛡️);
    B --> C{Pass to Client?};
    C --> D[❌ React throws error!];

    A --> E(Create derived value: `"Bearer " + secretKey`);
    E --> F(Untainted! 😱);
    F --> G{Pass to Client?};
    G --> H[✅ React allows it! Leak occurs!];

    style D fill:#d4edda
    style H fill:#ffcccc
```

### The Real Solution: Keep Secrets on the Server

Malli chepthunnam, tainting anedi kevalam oka **last-resort safety net**. Asalu solution entante, **secrets ni server meeda ne unchi, client ki అసలు pampakunda undatam.**

**The SECURE Way:**
Client ki API key avasaram ledu. Server eh aa key ni use chesi, third-party API ni call chesi, vachina *safe data* ni matrame client ki pampali.

```jsx
// ServerComponent.jsx
import { getApiKey } from '@/lib/secrets';
import DataDisplay from './ClientComponent';

async function fetchDataFromThirdParty(id) {
    const apiKey = getApiKey(); // Use the key on the server
    const response = await fetch(`https://api.example.com/data/${id}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    return response.json(); // Return only the SAFE data
}

export default async function Page({ id }) {
  // Fetch the data on the server, using the secret key.
  const safeData = await fetchDataFromThirdParty(id);

  // ✅ BEST PRACTICE: Pass only the safe data to the client.
  return <DataDisplay data={safeData} />;
}
```

Ee pattern lo, secret key eppudu server daati bayatiki velladu. So, `taintUniqueValue` tho kuda pani ledu. Tainting is just a guardrail to catch mistakes when a developer forgets to follow this pattern.