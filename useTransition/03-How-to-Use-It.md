# `useTransition` ni Ela Vadali? (The Syntax) 🤓

Okay, manam `useTransition` aney concept ni ardham cheskunnam. Ippudu daani syntax ento, adi ela use cheyyalo chuddam. It's very simple to use!

## The Basic Syntax

`useTransition` anedi oka function, daaniki manam arguments em pass cheyyam.

`const [isPending, startTransition] = useTransition();`

`useTransition` manaki oka array lo rendu values ni return chesthundi. Manam వాటిని array destructuring tho theeskuntam.

Let's break down each part.

### 1. `isPending`

*   Idi oka simple boolean (`true` or `false`). Idi read-only.
*   Idi manaki current transition యొక్క status ni chepthundi.
*   **`false` (Default):** Transition em run avvatledhu.
*   **`true`:** Manam `startTransition` ni call chesinappati nunchi, lopaala unna slow render complete ayye varaku, `isPending` value `true` ga untundi.
*   Manam ee `isPending` flag ni use chesi, user ki loading state chupinchachu (e.g., oka spinner or a disabled button).

### 2. `startTransition(callback)`

*   Idi oka special function. Manam deeni lopaala mana "non-urgent" state updates ni wrap cheyyali.
*   **`callback`:** Idi oka function (`() => ...`). Ee function lopaala manam mana `setState` calls ni pedatham.
*   `startTransition` lopaala pettina state updates ni React "low priority" ga treat chesthundi. Avi UI ni block cheyyavu.

## Putting It All Together

Mana slow tabs example lo, `useTransition` ni ila implement chestham.

```jsx
import { useState, useTransition } from 'react';

function TabContainer() {
  // 1. Call useTransition at the top level
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    // 2. Wrap the slow state update in startTransition
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <div>
      {/* 3. Use `isPending` to show a loading state */}
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => selectTab('posts')}
        disabled={isPending}
      >
        Posts {isPending && '(loading...)'}
      </TabButton>
      {/* ... other tab buttons ... */}
    </div>
  );
}
```

**How it works:**
1.  User "Posts" button click cheyagane, `selectTab('posts')` call avuthundi.
2.  `startTransition` lopaala `setTab('posts')` call avvadam valla, React ki telusu idi oka slow update ani.
3.  `isPending` ventane `true` avuthundi. UI lo "Posts (loading...)" ani kanipisthundi, and button disable avuthundi. The UI is responsive!
4.  Background lo, React slow render ni start chesthundi.
5.  Render complete ayyaka, `isPending` malli `false` avuthundi, and kotha tab content kanipisthundi.

Anthe! Ee simple pattern tho manam slow updates ni gracefully handle cheyyochu.

Ippudu manaki `isPending` ni use chesi loading state chupinchadam gurinchi telisindi. Ee UI patterns gurinchi inkonchem detail ga next section lo chuddam. Ready? Let's go! ➡️