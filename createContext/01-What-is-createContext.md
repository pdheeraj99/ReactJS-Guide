# `createContext`: The "Global Data" Factory 🏭

Hey friend! Manam `useContext` hook gurinchi matladukunnappudu, adi component tree lo ekkado unna data ni easy ga access cheyadaniki help chesthundani chusam.

Kani, asalu aa "context" (aa data channel) ekkada nunchi vastundi? How is it born?

The answer is the **`createContext()`** API.

> **`createContext()`** is the fundamental React function that you call to create a new, shareable context object. It's the factory that produces the context itself.

Think of it like this: `useContext` is like having a key to a special room. But `createContext` is the function that *builds the room and creates the key* in the first place.

## How to Use It

`createContext` ni manam eppudu component **bayata** call chestam, usually daaniki dedicate chesina oka separate file lo (`ThemeContext.js` lantiది).

```javascript
// ThemeContext.js
import { createContext } from 'react';

// Create a new context object.
export const ThemeContext = createContext('light'); // 'light' is the default value
```

**Emi jarugutundi ikkada?**
1.  Manam `react` nunchi `createContext` ni import chesam.
2.  Manam daanini call chesam. It returns a **Context Object**.
3.  Ee context object ni manam `ThemeContext` ane variable lo save chesi, export chestunnam, so vere files lo vadukovachu.

### The `defaultValue` Argument

`createContext()` function ki manam pass chese argument (`'light'` in our example) chala important. Adi **`defaultValue`**.

**Default Value ante enti?**
Oka component `useContext(ThemeContext)` ni call chesinappudu, adi paina unna component tree lo `<ThemeContext.Provider>` kosam vethukutundi. Okavela daaniki a provider kanipinchakapothe, appudu ee `defaultValue` ni fallback ga teeskuntundi. Idi oka "just-in-case" value lantiది.

```mermaid
graph TD
    A[Call `createContext('default')`] --> B(Creates a Context Object);
    subgraph "Context Object Contains"
        B --> C[Provider Component];
        B --> D[Consumer Component (Legacy)];
    end
    B --> E[Holds the Default Value: 'default'];

    style B fill:#e6f7ff
```

Ee `createContext` call manaki oka object ni isthundi. Aa object lo manaki rendu chala important properties untayi:
1.  **`ThemeContext.Provider`**: Ee component tho manam context value ni component tree ki "provide" chestam.
2.  **`ThemeContext.Consumer`**: Idi context value ni read cheyadaniki oka pata (legacy) way.

Ee `Provider` component ento, daani `value` prop entha powerful o, next chapter lo chuddam. Let's see how we deliver the data! 🚚➡️