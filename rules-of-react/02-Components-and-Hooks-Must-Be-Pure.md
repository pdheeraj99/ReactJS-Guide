# Rule 1: Components Must Be Pure ✨

Hey mawa! Ee "Rules of React" loni most important, most fundamental rule entante: **Your component's rendering logic must be pure.**

Asalu "pure function" ante enti?

### What is a Pure Function?

Computer science lo, oka function ni "pure" ani anadaniki rendu conditions satisfy avvali:
1.  **It minds its own business.** Adi daaniki pass chesina inputs ni matrame chusthundi. Adi bayata unna variables ni or objects ni change cheyyadu.
2.  **Same input, same output.** Meeru oke input tho aa function ni enni sarlu call chesina, adi eppudu oke output ni isthundi.

**Analogy: The Math Formula 🔢**
Imagine a math function: `function sum(a, b) { return a + b; }`.
*   Meeru `sum(2, 3)` ni enni sarlu call chesina, answer eppudu `5` eh vasthundi. (Same input, same output).
*   Ee function `a` or `b` ni change cheyyadu, or bayata unna vere variable ni marchadu. (Minds its own business).
So, `sum` anedi oka pure function.

Ippudu ee impure function chudandi: `let total = 0; function addToTotal(a) { total += a; return total; }`. Idi pure kadu, endukante adi bayata unna `total` variable ni change chesthundi.

### Why Must React Components Be Pure?

React component anedi, daani rendering phase lo, oka pure function laaga behave cheyyali. Ante, adi props and state ni theeskuni, JSX ni return cheyyali, anthe. Aa process lo, adi vere state ni set cheyyakudadu, network call cheyyakudadu, or bayata unna variable ni marchakudadu.

**The "Why":**
React performance kosam, konni sarlu mee component ni **multiple times** call cheyyochu, or call chesi, a a result ni **throw away** cheyyochu.

Okavela mee component render lopaala side effect (like an API call) unte, aa side effect anavasaramga multiple sarlu run avuthundi! Idi unpredictable behavior ki and bugs ki daari teestundi.

```jsx
// ❌ WRONG: This component is IMPURE
let visitorCount = 0;

function Counter() {
  // This is a side effect during render!
  // Every time React renders this, it will increment the global counter.
  visitorCount++;

  return <h1>Visitors: {visitorCount}</h1>;
}
```
React ee `Counter` component ni display cheyyadaniki, daanini 2 or 3 sarlu call cheyyochu. Appudu `visitorCount` anedi `3` aipovacchu, kani UI lo `1` or `2` kanipinchovacchu. Total confusion!

```mermaid
graph TD
    A[React decides to render] --> B(Calls `YourComponent()` the 1st time);
    B --> C{Detects a higher priority update};
    C --> D(Throws away the result from 1st call);
    D --> E(Calls `YourComponent()` the 2nd time);
    E --> F[Uses this result to update the DOM];

    subgraph "If your component is PURE"
        B & E --> G[✅ Safe! Output is the same];
    end

    subgraph "If your component is IMPURE (has side effects)"
      B -- Side Effect! --> H;
      E -- Side Effect Again! --> H;
      H((💣 Unpredictable Bugs!));
    end

    style H fill:#ffcccc
```

**The Golden Rule:** Keep your component's render logic pure. All side effects (data fetching, DOM manipulation, timers) must go inside **Event Handlers** or **`useEffect`**.

Next, manam "React Calls Your Components" ane rule gurinchi chuddam. ➡️⚛️