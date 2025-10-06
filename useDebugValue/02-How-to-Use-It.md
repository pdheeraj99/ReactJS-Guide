# `useDebugValue` ni Ela Vadali? (It's Super Simple!)

Okay, ee hook ento manaki ardham ayyindi. Ippudu deenini mana custom hook lo ela integrate cheyyalo chuddam. The good news is, it's incredibly simple.

## The Basic Syntax

`useDebugValue` anedi oka function, daaniki manam oka argument pass chestham.

`useDebugValue(value)`

*   **`value`:** Idi nuvvu React DevTools lo chupinchali anukuntunna value. Idi string, number, object, edaina avvochu.

And that's it! Ee hook em return cheyyadu (`undefined`). Daani pani just DevTools ki information pampadame.

## A Simple Example: `useDisplayName`

Manam `useDisplayName` aney oka simple custom hook create cheddam. Ee hook oka user object theeskuni, daani nunchi full name ni generate chesthundi anukundam.

### Step 1: Create the Custom Hook

```javascript
// useDisplayName.js
import { useState, useDebugValue } from 'react';

function useDisplayName(user) {
  // Ee hook lopaala konni states or logic undochu...
  const [fullName, setFullName] = useState(`${user.firstName} ${user.lastName}`);

  // THE IMPORTANT PART
  // Manam DevTools lo "fullName" variable ni chupinchali anukuntunnam.
  useDebugValue(fullName);

  return fullName;
}
```

### Step 2: Use it in a Component

```jsx
// Profile.jsx
import useDisplayName from './useDisplayName';

function Profile() {
  const user = { firstName: 'Jules', lastName: 'The Engineer' };
  const displayName = useDisplayName(user);

  return <h1>{displayName}</h1>;
}
```

### Step 3: Check React DevTools

Ippudu nuvvu `Profile` component ni DevTools lo inspect cheste, neeku Hooks section lo ila kanipisthundi:

`DisplayName: "Jules The Engineer"`

Chala neat ga undi kadha? `useDebugValue` lekunda unte, manaki just `State: "Jules The Engineer"` ani kanipinchedi, adi antha clear ga undadu. `useDebugValue` valla manam daaniki `DisplayName` ane oka custom label icham (React ee label ni hook peru nunchi theeskuntundi).

## Important Rule to Remember

`useDebugValue` anedi oka Hook. So, deenini manam **top-level** lo, mana custom hook lopaala matrame call cheyyali. Conditions or loops lopaala call cheyyakudadu.

That's the basic usage! Chala simple kadha?

Kani, oka chinna problem undi. Mana debug value ni format cheyyadaniki konchem heavy calculation avasaram aithe? For example, oka pedda object ni string ga marchalante? Prathi re-render ki aa calculation cheyyadam anavasaram.

Ee performance problem ni `useDebugValue` ela solve chesthundo manam next chuddam. 🤔➡️