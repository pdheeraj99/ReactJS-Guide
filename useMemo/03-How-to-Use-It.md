# `useMemo` ni Ela Vadali? (The Syntax) 🤓

Okay, manam `useMemo` aney concept ni ardham cheskunnam. Ippudu daani syntax ento, adi ela use cheyyalo chuddam. Idi `useCallback` ki chala similar ga untundi.

## The Basic Syntax

`useMemo` hook ki manam rendu arguments pass chestham:

1.  **`calculateValue` function:** Idi oka function. Deeni lopaala manam expensive calculation ni perform chestham. Ee function return chese value ne `useMemo` cache chesthundi.
2.  **`dependencies` array:** Ee calculation lopaala manam use chese prathi reactive value (props, state) ni ee array lo pettali.

```jsx
const cachedValue = useMemo(calculateValue, dependencies);
```

Let's see it in action with our filtering example:

```jsx
import { useMemo } from 'react';

function TodoList({ todos, tab }) {

  const visibleTodos = useMemo(() => {
    // 1. This is the `calculateValue` function.
    //    It takes no arguments.
    console.log('Calculating visible todos...');
    return filterTodos(todos, tab);
  }, [todos, tab]); // 2. This is the dependency array.

  // ...
}
```

## Deeni Parts gurinchi Details

### 1. `calculateValue` function

*   Idi eppudu **arguments theeskokunda** oka function (`() => ...`) ayyi undali.
*   Ee function lopaala nuvvu nee expensive logic ni pedathav.
*   Idi **oka value ni return cheyyali.** Aa return value ne `useMemo` cache chesi, `visibleTodos` lanti variable ki isthundi.
*   **Important:** Ee function "pure" ga undali. Ante, adi kevalam daani inputs theeskuni, oka result ni ivvali. Adi bayata variables ni change cheyyakudadu (no side effects).

### 2. `dependencies` array

*   Idi `useEffect` and `useCallback` lo laage pani chesthundi.
*   **The Golden Rule:** `calculateValue` function lopaala nuvvu use chese prathi reactive value (`props`, `state`) ni ee array lo pettali.
*   React ee array lo unna values ni previous render tho compare chesthundi.
    *   Values em maaraledu ante, calculation ni skip chesi, cache lo unna pata value ni return chesthundi.
    *   Edaina value maarindi ante, calculation ni malli run chesi, kotha result ni cache chesi, daanini return chesthundi.

Anthe! Adi `useMemo` యొక్క basic syntax.

Ippudu neeku `useMemo` and `useCallback` rendu chala similar ga anipinchachu. Vaati madhyalo oka chinna kani chala important theda undi. Aa theda ento manam next chuddam. It's a very common interview question too! 😉➡️