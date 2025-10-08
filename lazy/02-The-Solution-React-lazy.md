# The Solution: `React.lazy` for On-Demand Loading ⚡

Mana "overstuffed suitcase" (large bundle) problem ki, React manaki chala simple and powerful solution isthundi: the `lazy` function.

> **`React.lazy`** is a function that lets you render a dynamically imported component as a regular component. It makes code-splitting incredibly easy.

Simple ga cheppalante, `lazy` tho manam React ki ila cheptam: "Hey, ee component ni ippude load cheyyaku. Eppudaithe deenini render cheyyalsi vastundo, appudu matrame deeni code ni network nunchi download cheyyi."

## How to Use `lazy`

`lazy` ni use cheyadam chala simple. Manam normal ga component ni import chese badulu, `lazy` function lopalina `import()` function ni call chestam.

**The Old Way (Static Import):**
```javascript
// Ee code, app start ayinappude download aipothundi.
import HeavyComponent from './HeavyComponent.js';
```

**The New Way (Dynamic Import with `lazy`):**
```javascript
import { lazy } from 'react';

// Ee code, HeavyComponent render avvalsina time lo matrame download avuthundi.
const HeavyComponent = lazy(() => import('./HeavyComponent.js'));
```

**What's happening here?**
1.  `lazy()` anedi oka function, adi argument ga inko function ni teeskuntundi.
2.  Ee lopalina unna function, `import('./HeavyComponent.js')` ni call chesthundi. Idi **dynamic import**. Idi browser ki chepthundi, "ee file ni ippudu network nunchi fetch cheyyi" ani.
3.  Dynamic import oka **Promise** ni return chesthundi. Aa Promise, file download ayyaka resolve avuthundi.
4.  `lazy` ee process antha lopalana handle chesi, manaki `HeavyComponent` ane oka regular React component la kanipinche daanini return chesthundi.

### One Important Rule: Default Exports!

`React.lazy` pani cheyyali ante, meeru lazy-load chese component file nunchi **`default export`** cheyali.

```jsx
// HeavyComponent.jsx

function HeavyComponent() {
  // ...
}

export default HeavyComponent; // ✅ CORRECT! Must be a default export.

// export { HeavyComponent }; // ❌ WRONG! Named exports won't work with lazy.
```

`lazy` function, promise resolve ayyaka, aa vachina module loni `.default` property kosam vethukutundi.

```mermaid
graph TD
    A[User visits HomePage] --> B{Browser requests initial JS bundle};
    B --> C[Downloads small initial_bundle.js (1MB)];
    C --> D[HomePage is interactive almost instantly! ✨];
    D --> E{User clicks "Show Heavy Component" button};
    E --> F[React tries to render `<HeavyComponent />`];
    F --> G{Browser requests HeavyComponent's code chunk};
    G --> H[Downloads heavy_component.chunk.js (9MB)];
    H --> I[Renders the heavy component];

    style C fill:#d4edda
    style H fill:#e6f7ff
```

Ee approach tho, initial load time chala fast ga untundi. User ki avasaram leni code ni manam network meeda pampatledu.

Kani, ikkada oka question undi. Point **G** lo, `HeavyComponent` code download avuthunna time lo (e.g., 2 seconds), user ki emi kanipisthundi? Blank space aa? Ee loading state ni handle cheyadanike, `lazy` ki oka perfect partner undi: **`<Suspense>`**. Vaalla jodi ento, next chuddam! 🤝➡️