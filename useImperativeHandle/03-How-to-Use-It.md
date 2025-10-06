# `useImperativeHandle` ni Ela Vadali? (The Step-by-Step Guide)

Okay, concept ardham ayyindi. Ippudu code lo `useImperativeHandle` and `forwardRef` ni kalipi ela vadalo chuddam.

## The Syntax

First, `useImperativeHandle` యొక్క syntax chuddam.

`useImperativeHandle(ref, createHandle, dependencies?)`

Ee hook ki manam moodu arguments pass cheyyochu:
1.  **`ref`:** Idi parent nunchi `forwardRef` dwara vachina `ref`.
2.  **`createHandle`:** Idi oka function. Ee function lopaala manam custom handle object ni create chesi **return** cheyyali. Ee object eh parent యొక్క `ref.current` ki assign avuthundi.
3.  **`dependencies?` (optional):** `useEffect` or `useCallback` lo laage, idi oka dependency array. Ee array lo unna values maarithe, `createHandle` function malli run ayyi, kotha handle create avuthundi. Idi rarely use chestham. Empty array `[]` isthe, handle okkasari matrame create avuthundi.

## The Full Process: A Step-by-Step Guide

Manam mana `CustomInput` component example ni theeskuni, daaniki `focus()` and `clear()` aney rendu methods ni expose cheddam.

### Step 1: Wrap your component in `forwardRef`

Modatiga, mana component `ref` prop ni theeskovali ante, daanini `forwardRef` tho wrap cheyyali.

```javascript
// CustomInput.jsx
import { forwardRef } from 'react';

const CustomInput = forwardRef(function CustomInput(props, ref) {
  // `ref` is the second argument now!
  // ...
});

export default CustomInput;
```

### Step 2: Create an Internal Ref

Manam parent nunchi vachina `ref` ni direct ga `<input>` ki ivvam. So, lopaala unna `<input>` DOM node ni hold cheyyadaniki, manam **inko separate, internal ref** ni create cheskovali (`useRef` tho).

```javascript
import { forwardRef, useRef } from 'react';

const CustomInput = forwardRef(function CustomInput(props, ref) {
  const internalInputRef = useRef(null);
  // ...
  return <input ref={internalInputRef} />;
});
```

### Step 3: Use `useImperativeHandle` to Define the Handle

Ippudu asalu magic vasthundi. Manam `useImperativeHandle` ni call chesi, parent nunchi vachina `ref` ni, and mana custom handle ni create chese function ni pass cheddam.

```javascript
import { forwardRef, useRef, useImperativeHandle } from 'react';

const CustomInput = forwardRef(function CustomInput(props, ref) {
  const internalInputRef = useRef(null);

  // THE MAGIC HAPPENS HERE ✨
  useImperativeHandle(ref, () => {
    // This is our custom handle object
    return {
      // Expose a `focusInput` method
      focusInput: () => {
        internalInputRef.current.focus();
      },
      // Expose a `clearInput` method
      clearInput: () => {
        internalInputRef.current.value = '';
      },
    };
  }, []);

  return <input ref={internalInputRef} {...props} />;
});
```

### Step 4: Parent Component Calls the Custom Methods

Ippudu `App` component lo, `ref.current` anedi DOM node kadu. Adi manam Step 3 lo create chesina `{ focusInput, clearInput }` aney object.

```jsx
// App.jsx
function App() {
  const customInputRef = useRef(null);

  return (
    <>
      <CustomInput ref={customInputRef} />
      <button onClick={() => customInputRef.current.focusInput()}>
        Focus
      </button>
      <button onClick={() => customInputRef.current.clearInput()}>
        Clear
      </button>
    </>
  );
}
```

```mermaid
sequenceDiagram
    participant Parent
    participant Child (CustomInput)
    participant DOM (<input>)

    Parent->>Child: Renders with `ref` prop
    Child->>Child: `internalInputRef` created (points to null)
    Child->>DOM: Renders `<input>`, `ref` is set to `internalInputRef`
    Note over Child: `useImperativeHandle` runs
    Child-->>Parent: `ref.current` is now `{ focusInput, clearInput }`

    Parent->>Parent: User clicks "Focus" button
    Parent->>Child: Calls `ref.current.focusInput()`
    Child->>DOM: `internalInputRef.current.focus()` is called
```

Anthe! Ee four steps tho, manam child component internals ni hide chesi, daaniki oka clean, safe API ni create chesam.

Kani, ee pattern chala powerful ga unna, deenini chala jagratha ga vadali. Ee "imperative" code anedi React యొక్క declarative nature ki konchem opposite. So, deenini eppudu vadalo, eppudu vadakudado manam next chuddam. 🤔➡️