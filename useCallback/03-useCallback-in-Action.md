# useCallback in Action: `React.memo` tho Jathakattadam! 🤝

Manam theory chala matladukunnam. Ippudu antha kalipi oka practical example lo chuddam.

`useCallback` anedi single ga powerful kadu. Daani real power `React.memo` tho kalisinappude bayatapaduthundi. Ee rendu oka power couple anamata! 💑

*   **`React.memo`:** "Naa props maarithe thappa, nannu re-render cheyyaku!" ani chepthundi.
*   **`useCallback`:** "Ee function prop ni nenu maaraniyyakunda chuskunta!" ani `React.memo` ki maata isthundi.

## The Scenario: A Counter App

Manam oka simple counter app build cheddam. Daanilo rendu components untayi:
1.  `ParentComponent`: Idi counter state ni maintain chesthundi and oka "theme" (dark/light) ni kuda change cheyyagaladu.
2.  `ChildButton`: Idi oka simple button. Deeniki parent nunchi oka function prop ga vasthundi.

**Our Goal:** Parent lo theme change ainappudu, `ChildButton` anavasaranga re-render avvakudadu.

---

### Version 1: `useCallback` LEKUNDA (The Problem 😭)

First, `useCallback` lekunda code chuddam.

```jsx
// ParentComponent.jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  // Ee function prathi re-render ki kothaga create avuthundi
  const handleIncrement = () => {
    setCount(c => c + 1);
  };

  console.log("Parent is rendering!");

  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <h3>Count: {count}</h3>
      <ChildButton onClick={handleIncrement} />
    </div>
  );
}

// ChildButton.jsx
const ChildButton = React.memo(({ onClick }) => {
  console.log("!!! ChildButton is re-rendering !!!");
  return <button onClick={onClick}>Increment Count</button>;
});
```

**Em Jarugutundi?**
1.  Nuvvu "Toggle Theme" button click chey.
2.  Parent component re-render avuthundi. Console lo "Parent is rendering!" ani chusthav.
3.  `handleIncrement` aney kotha function create avuthundi.
4.  `React.memo` unna `ChildButton` ki ee kotha function prop ga velthundi.
5.  `React.memo` chusthundi, "Oh, `onClick` prop maarindi!" anukuntundi.
6.  Console lo "!!! ChildButton is re-rendering !!!" ani chusthav. **This is the problem!** Count maaraledu, kani child re-render ayyindi.

---

### Version 2: `useCallback` THO (The Solution 😎)

Ippudu `useCallback` ni add cheddam. Oke okka chinna change.

```jsx
// ParentComponent.jsx
import { useState, useCallback } from 'react'; // useCallback ni import cheyyali

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  // Ee function ippudu cache cheyyabadindi!
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Dependencies em levu

  console.log("Parent is rendering!");

  // ... rest of the component is the same
  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <h3>Count: {count}</h3>
      <ChildButton onClick={handleIncrement} />
    </div>
  );
}

// ChildButton.jsx (No changes needed here)
const ChildButton = React.memo(({ onClick }) => {
  console.log("!!! ChildButton is re-rendering !!!");
  return <button onClick={onClick}>Increment Count</button>;
});
```

**Ippudu Em Jarugutundi?**
1.  Nuvvu "Toggle Theme" button click chey.
2.  Parent component re-render avuthundi. Console lo "Parent is rendering!" ani chusthav.
3.  `useCallback` dependencies (`[]`) em maaraledu kabatti, adi `handleIncrement` function ni kothaga create cheyyakunda, **pata cached function ne** return chesthundi.
4.  `React.memo` unna `ChildButton` ki ade pata function prop ga velthundi.
5.  `React.memo` chusthundi, "`onClick` prop em maaraledu."
6.  **`ChildButton` re-render avvadu!** Console lo "!!! ChildButton is re-rendering !!!" aney message raadu. Victory! 🎉

Chusava? `useCallback` + `React.memo` kalisi anavasaramaina re-renders ni ela apayo.

Ee example lo manam `handleIncrement` function ki state access avasaram ledu kabatti `[]` (empty dependency array) pettam. Kani, mana function ki props or state meeda depend avvalsina avasaram unte?

Appude `useCallback` lo atni kante important and tricky part vasthundi: **The Dependency Array**. Deeni gurinchi manam next chuddam. Idi correct ga isthe ne `useCallback` correct ga pani chesthundi! Ready for the most important rule? Let's go! Rules are important! 📜➡️