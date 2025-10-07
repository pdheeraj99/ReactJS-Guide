# `useState` ni Ela Vadali? (The Syntax) 🤓

`useState` ni use cheyyadam chala simple. Idi React lo atni kante common ga kanipinche code line.

## The Basic Syntax

`useState` ni call cheyyadaniki, manam `react` nunchi daanini import cheskovali. `useState` anedi oka function, adi kevalam oka argument theeskuntundi.

`const [state, setState] = useState(initialState);`

Ee line chala important. Let's break it down using a counter example.

`const [count, setCount] = useState(0);`

### 1. `useState(0)` - The Initial State

*   Manam `useState` function ki pass chese value (`0` in this case) ne **initial state**.
*   Idi mana state variable యొక్క starting value. Component modati sari render ainappudu, `count` aney variable ki `0` assign avuthundi.
*   Ee `initialState` anedi number, string, boolean, array, object... edaina avvochu.
*   Ee argument ni React kevalam **modati render lo matrame** chusthundi. Tarvata renders lo, adi ignore cheyyabaduthundi.

### 2. `count` - The State Variable

*   Idi `useState` return chese array lo modati value.
*   Idi mana component యొక్క current render lo unna **state value**.
*   Idi oka normal variable laantidi, kani idi "read-only". Nuvvu deenini `count = 5` ani direct ga change cheyyakudadu! Ala cheste, React ki teliyadu and re-render avvadu.

### 3. `setCount` - The Set Function

*   Idi `useState` return chese array lo rendo value.
*   Idi mana state ni update cheyyadaniki unna **special function**. Deenini "setter function" or "dispatch function" ani kuda antaru.
*   Manam state ni update cheyyali anukunnappudu, eppudu ee function ne call cheyyali.
*   `setCount(5)` ani call cheste, nuvvu React ki chepthunnav: "Hey React, please ee state ni `5` ga marchu, and ee component ni re-render cheyyi."

**Convention:** Ee setter function peru eppudu `set` tho start ayyi, state variable peru tho continue avuthundi. (e.g., `name` state ki `setName`, `isOpen` state ki `setIsOpen`).

```mermaid
graph TD
    A[useState(initialValue)] --> B{Returns an Array};
    B --> C[0: `state`<br/>(The current value)];
    B --> D[1: `setState`<br/>(The function to update it)];
```

## Putting It All Together

```jsx
import { useState } from 'react';

function Counter() {
  // Declare a state variable named "count"
  const [count, setCount] = useState(0);

  function handleIncrement() {
    // Call the set function to update the state
    setCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleIncrement}>Click Me</button>
    </div>
  );
}
```

Anthe! Ee simple syntax tho, manam mana components ki memory and interactivity ni add cheyyochu.

Ippudu manaki numbers, strings lanti simple state ni ela handle cheyyalo telisindi. Kani, mana state lo objects or arrays unte? వాటిని update cheyyadaniki konni special rules unnayi. Let's learn about the rule of immutability next! It's super important! ➡️ immutable!