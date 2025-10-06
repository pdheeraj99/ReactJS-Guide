# The Three Parts of `useReducer`: State, Action, and Reducer 🧩

Manam `useReducer` state logic ni separate chesthundi ani chusam. Ee process lo moodu mukhyaమైన bhagalu untayi. Ee moodu ardham aithe, `useReducer` antha ardham ayinatte.

`const [state, dispatch] = useReducer(reducer, initialState);`

Let's break them down.

## 1. The State

*   **What it is:** Idi mana component యొక్క current data. `useState` lo laage, idi number, string, object, or array... edaina avvochu.
*   **How we get it:** `useReducer` nunchi vachina array lo idi modati value.
*   **How it's used:** Manam deenini mana JSX lo UI ni render cheyyadaniki use chestham.

```javascript
// `state` is the current data
const [state, dispatch] = useReducer(reducer, { count: 0 });

return <p>Count: {state.count}</p>;
```

## 2. The Action

*   **What it is:** Idi oka simple JavaScript object. Idi "user em chesadu?" aney vishayanni describe chesthundi.
*   **Convention:** By convention, action object ki eppudu oka `type` property untundi. Ee `type` anedi oka string (e.g., `'increment'`, `'changed_name'`). Action ki కావలసిన extra data ni manam vere properties ga pass cheyyochu (e.g., `payload`).
*   **How it's used:** Manam ee action object ni `dispatch` function ki pass chestham.

```javascript
// An "action" object describing what happened
dispatch({ type: 'incremented_age' });

// An action with extra data
dispatch({ type: 'changed_name', nextName: 'Jules' });
```

Action anedi kevalam oka "request" or "message" laantidi. Adi state ni change cheyyadu.

## 3. The Reducer Function & `dispatch`

Ikkade asalu logic antha untundi.

### The `dispatch` function:
*   **What it is:** Idi `useReducer` manaki return chese second value.
*   **What it does:** Deeni pani okkate: manam ichina action object ni theeskuni, daanini React ki andinchi, "Hey React, ee action jarigindi, state ni update cheyyi" ani cheppadam.

### The `reducer` function:
*   **What it is:** Idi manam raase oka pure function. Idi component bayata untundi.
*   **What it does:** React mana `dispatch` call ni chusi, ee reducer function ni call chesthundi. Adi reducer ki rendu vishayalu isthundi: the **current `state`** and the **`action` object**.
*   Reducer ee rendu theeskuni, lopaala logic antha run chesi, **kotha state ni calculate chesi, daanini return chesthundi.**

```javascript
// reducer function signature
function myReducer(state, action) {
  // ... logic to calculate next state based on action ...
  return nextState;
}
```

```mermaid
graph LR
    A[Component calls `dispatch(action)`] --> B(React);
    B -- "sends `(currentState, action)`" --> C(Your Reducer Function);
    C -- "calculates and returns `nextState`" --> B;
    B -- "provides `nextState` in next render" --> A;
```

Ee moodu parts kalisi, oka predictable and organized state management system ni form chesthayi.

Ippudu neeku `useReducer` యొక్క building blocks anni telusu. So, `useState` eppudu vadali, `useReducer` eppudu vadali? Let's compare them side-by-side in the next section to get a clear answer. 🤔➡️