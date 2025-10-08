# The `<Provider>` Component: The Delivery Truck 🚚

Okay, manam `createContext` tho oka "data room" create chesam. Kani aa room loki data ni ela pampali? And a room access ye ye components ki ivvalo ela cheppali?

Deeniki answer eh the **`<Provider>`** component.

`createContext()` call chesinappudu manaki oka context object (`ThemeContext`) vastundi kada, daani meeda ee `Provider` component oka property la attach ayi untundi: `ThemeContext.Provider`.

> The `<Provider>` component is used to wrap a part of your component tree. All components inside this wrapper will be able to access the context's value.

### The All-Important `value` Prop

Provider component ki kevalam okate, kani chala important prop undi: **`value`**.

Ee `value` prop lo manam ye data ayite pass chestamo, aa data ne lopalina unna anni components access cheyagalavu.

```jsx
// App.jsx
import { useState } from 'react';
import { ThemeContext } from './ThemeContext';
import Toolbar from './Toolbar';

function App() {
  const [theme, setTheme] = useState('dark');

  // ... a function to toggle theme ...

  return (
    // 1. Use the Provider to wrap the component tree
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

**Emi jarugutundi ikkada?**
1.  Manam `App` component lo `theme` ane oka state variable create chesam.
2.  Manam `<ThemeContext.Provider>` tho `<Toolbar>` component ni (and daani loni anni children ni) wrap chesam.
3.  Most importantly, manam `value={theme}` ani pass chesam. Ante, "Ee provider lopalina unna prathi component ki, `ThemeContext` value ippudu `'dark'`" ani manam React ki chepthunnam.
4.  Ippudu `<Toolbar>` loni ഏ component ayina `useContext(ThemeContext)` ni call cheste, daaniki `'dark'` ane value vastundi.

Okavela manam `setTheme('light')` ani state ni update cheste, ee `value` prop kuda `'light'` ga maruthundi, and context ni use chese anni components automatic ga re-render avuthayi! This is how you create dynamic context.

```mermaid
graph TD
    A[App Component] -- "manages state `theme = 'dark'`" --> B["<ThemeContext.Provider value={theme}>"];
    B --> C[Toolbar Component];
    C --> D[ThemedButton Component];

    subgraph "Inside ThemedButton"
        E(Calls `useContext(ThemeContext)`) --> F{Gets the value 'dark' from the Provider!};
    end

    D --> E;

    style B fill:#e6f7ff,stroke:#0050b3
    style F fill:#d4edda
```

**Key Takeaway:** `createContext` context ni create chesthundi, kani **`<Provider>`** and daani **`value`** prop eh asalu data ni supply chesthayi. Provider lekunda, components kevalam `createContext` lo ichina default value ni matrame chudagalavu.

Ippudu manam data ni provide cheyadam nerchukunnam. Daanini consume (read) cheyadaniki `useContext` hook undani manaki telusu. Kani hooks raka mundu ela chesevaru? Aa pata "Consumer" component ento, next chapter lo chuddam. It's a good piece of history to know! 📜➡️