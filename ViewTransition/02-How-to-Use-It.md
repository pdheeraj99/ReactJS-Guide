# `<ViewTransition>` ni Ela Use Cheyali? The Two Golden Rules 📜

Okay, `<ViewTransition>` tho animations create cheyadam chala easy, kani manam gurtupettukvalsina **rendu golden rules** unnayi. Ee rendu follow avakapothe, animation pani cheyyadu.

### Rule #1: Use `startTransition`

`<ViewTransition>` kevalam `startTransition` tho wrap chesina state updates ki matrame activate avuthundi. Enduku?

Because, `startTransition` update ni "non-urgent" ga mark chesthundi. Idi React ki chepthundi, "Hey, ee state change valla UI maarabotundi, konchem time teeskuni, ee change ni smoothly animate cheyyi."

```jsx
import { useState, startTransition } from 'react';

function App() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    // ✅ CORRECT: State update ni startTransition lo wrap cheyyali!
    startTransition(() => {
      setShow(!show);
    });
  };

  // ...
}
```
`startTransition` lekunda direct ga `setShow(!show)` ani raste, React daanini oka urgent update la teeskuni, animation ni skip chesthundi.

### Rule #2: Wrap the Target Element Directly

`<ViewTransition>` component, animate avvalsina DOM element ki **immediate parent** ga undali.

```jsx
// ✅ CORRECT: ViewTransition is the direct parent of the div
<ViewTransition>
  <div>I will animate!</div>
</ViewTransition>

// ❌ WRONG: ViewTransition is not the direct parent
<div>
  <ViewTransition>
    <div>I will NOT animate.</div>
  </ViewTransition>
</div>
```
Ee rule endukante, React `view-transition-name` ane oka special CSS property ni aa child element ki apply chesthundi. Direct child kakapothe, React ki a element ni animate cheyyalo teliyadu.

## Let's See a Simple Example (Enter/Exit)

Ee rendu rules ni use chesi, oka simple component ni screen loki animate chesi, malli bayatiki pampudam.

```jsx
import { useState, startTransition, unstable_ViewTransition as ViewTransition } from 'react';

function App() {
  const [showItem, setShowItem] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((p) => !p);
          });
        }}
      >
        {showItem ? 'Hide' : 'Show'} Item
      </button>

      {showItem && (
        <ViewTransition>
          <div className="item">Hello, I am animating!</div>
        </ViewTransition>
      )}
    </>
  );
}
```

**What happens here?**
1.  Button click chesinappudu, `startTransition` loni `setShowItem` run avuthundi.
2.  `showItem` `true` aite, `<ViewTransition>` DOM loki enter avuthundi. React idi chusi, **"enter"** animation ni trigger chesthundi.
3.  `showItem` `false` aite, `<ViewTransition>` DOM nunchi exit avuthundi. React **"exit"** animation ni trigger chesthundi.

By default, ee enter/exit animations simple cross-fade la untayi.

```mermaid
graph TD
    A[User Clicks Button] --> B[startTransition(() => setShow(true))];
    B --> C{ViewTransition enters DOM};
    C --> D[React triggers 'enter' animation ✨];

    E[User Clicks Again] --> F[startTransition(() => setShow(false))];
    F --> G{ViewTransition exits DOM};
    G --> H[React triggers 'exit' animation 💨];

    style D fill:#d4edda
    style H fill:#ffebe6
```

Ee basic enter/exit animations cool eh. Kani `<ViewTransition>` asalu magic antha **shared element transitions** lo undi. Ante, oka element oka chota nunchi inko chotaki smoothly morph avvadam! Adento next chuddam. Get ready for the real magic! 🎩🐇➡️