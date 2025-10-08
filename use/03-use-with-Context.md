# `use` with Context: The Flexible Cousin of `useContext` 😎

Okay, `use` hook Promises tho pani chesthundani chusam. Kani daaniki inko super use undi: **reading context**.

Yes, `use(MyContext)` works very similarly to `useContext(MyContext)`. It looks up the component tree, finds the nearest `<MyContext.Provider>`, and returns its value.

```jsx
// ThemedBox.jsx
import { use } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedBox() {
  // `useContext` laage, idi 'dark' or 'light' ane value ni isthundi.
  const theme = use(ThemeContext);
  return <div className={theme}>I am a themed box!</div>;
}
```

Ippudu meeku oka doubt ravochu: "Already `useContext` undi ga, malli deeniki, daaniki theda enti?"

## The Difference is Flexibility: The `if` Block Superpower

The one, giant difference is that **`use` can be called inside conditionals and loops.**

`useContext` ni manam eppudu component top-level lo ne rayali. Manam ila rayalemu:
```jsx
// ❌ WRONG - This will cause an error!
if (props.isLoggedIn) {
  const theme = useContext(ThemeContext); // Error: Hooks cannot be called conditionally
}
```

Kani, `use` hook tho, ee pani chala easy ga cheyochu!

```jsx
// ✅ CORRECT - This is perfectly valid with `use`!
function LoginMessage({ showMessage }) {
  if (showMessage) {
    // Manam context ni conditionally read chestunnam!
    const currentUser = use(AuthContext);
    return <p>Welcome, {currentUser.name}!</p>;
  }
  return <p>Please log in.</p>;
}
```

**Why is this so useful?**
*   **Performance:** Manam avasaram lenappudu context ni access cheyyamu. Okavela aa context update aite, `showMessage` `false` ga unna component anavasaramga re-render avvadu.
*   **Clean Code:** Mana logic inka straightforward ga, readable ga untundi. Manam `if` block lopalane manaki kavalsina data ni teeskuntunnam.

```mermaid
graph TD
    A[Component renders] --> B{Is `showMessage` true?};
    B -- Yes --> C(Calls `use(AuthContext)`);
    C --> D[Reads context value];
    D --> E[Renders Welcome message ✅];
    B -- No --> F[Skips calling `use` entirely];
    F --> G[Renders Login message];

    style E fill:#d4edda
    style C fill:#e6f7ff
```

**So, which one should you use?**
For now, `useContext` is still the stable, widely-used hook for reading context. But `use` is the future. It's more powerful and flexible. As it becomes more standard, you'll likely see `use(context)` more and more often.

Ee "New Rules" of the `use` hook gurinchi, and daani implications ento, final ga next chapter lo chuddam. It's a small change with big consequences! 🤯➡️