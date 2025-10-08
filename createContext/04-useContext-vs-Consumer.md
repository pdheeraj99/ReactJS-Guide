# Showdown: `useContext` Hook vs. `<Consumer>` Component 🥊

Okay friend, final round! Manam context value ni read cheyadaniki unna rendu ways ni chusam. Ippudu vaatini pakkana pakkana petti, a astraanni eppudu vadalo (spoiler: `useContext` eh eppudu winner) chuddam.

## The Modern Champion: `useContext()` Hook ✨

Idi simple, clean, and straightforward. Function component lopalina, manam just `useContext` ni call chesi, context object ni pass chestam. Adi manaki direct ga value ni return chesthundi.

**The Code:**
```jsx
// ThemedButtonWithHook.jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButtonWithHook() {
  // Just one line to get the value!
  const theme = useContext(ThemeContext);
  return <button className={theme}>Modern Hook Button</button>;
}
```
**Advantages:**
*   **Readable:** Code chala easy ga ardham avuthundi.
*   **Concise:** Takkuva code lo pani aipothundi.
*   **Easy to combine:** Multiple contexts ni use cheyadam chala simple.
    ```jsx
    const theme = useContext(ThemeContext);
    const user = useContext(AuthContext);
    ```

---

## The Legacy Warrior: `<Consumer>` Component 📜

Idi "render prop" pattern ni vaduthundi. Manam oka function ni child ga pass cheyyali, and aa function ki value argument la vastundi.

**The Code:**
```jsx
// ThemedButtonWithConsumer.jsx
import { ThemeContext } from './ThemeContext';

function ThemedButtonWithConsumer() {
  return (
    <ThemeContext.Consumer>
      { (theme) => (
        <button className={theme}>Legacy Consumer Button</button>
      )}
    </ThemeContext.Consumer>
  );
}
```
**Disadvantages:**
*   **Verbose:** `useContext` tho polisthe, chala ekkuva code rayali.
*   **Nesting Hell:** Multiple contexts kosam, render props ni nest cheyyali, which gets ugly fast.

---

## The Verdict

The winner is clear. For any new code you write, you should **always prefer the `useContext` hook.**

`<Consumer>` ni kevalam pata class components lo (hooks vadaleni chota) or chala rare, advanced patterns lo matrame use cheyyalsi vastundi.

```mermaid
graph TD
    subgraph "Reading One Context"
        A[useContext] --> B("`const theme = useContext(ThemeContext)` <br/> Clean & Simple! ✅");
        C[Consumer] --> D("`<ThemeContext.Consumer>`<br/>`{theme => ...}`<br/>A bit verbose... 🟡");
    end

    subgraph "Reading Two Contexts"
        E[useContext] --> F("`const theme = useContext(ThemeContext)`<br/>`const user = useContext(AuthContext)`<br/>Still clean! ✅✅");
        G[Consumer] --> H("`<ThemeContext.Consumer>`<br/>`{theme => (`<br/>`<AuthContext.Consumer>`<br/>`{user => ...}`<br/>`)}`</br>Nested Hell! 👹❌");
    end

    style B fill:#d4edda
    style F fill:#d4edda
    style H fill:#ffcccc
```

And that's a wrap on `createContext`! Manam ippudu context ni ela create cheyalo (`createContext`), daaniki data ni ela supply cheyalo (`<Provider>`), and aa data ni ela read cheyalo (`useContext`) completely nerchukunnam. You are now a master of React Context! 🎉🎓