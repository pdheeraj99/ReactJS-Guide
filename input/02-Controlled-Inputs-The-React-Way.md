# Controlled Inputs: The React Way  puppeteer

Okay friend, ippudu manam React lo inputs ni handle cheyadaniki most common and recommended pattern gurinchi matladukundam: **Controlled Components**.

Peru lone undi, ee pattern lo, `<input>` value anedi **completely controlled by React state**. The component's state is the "single source of truth".

### The Two Essential Ingredients

Oka input ni controlled ga marchali ante, manaki rendu vishayalu kavali:
1.  **A State Variable:** `useState` hook tho, input value ni store cheyadaniki oka state variable create cheyyali.
2.  **An `onChange` Handler:** User input lo emaina change chesinappudu, aa state variable ni update cheyadaniki oka function kavali.

Ee rendu ingredients ni manam `<input>` component ki props ga istham:
*   The `value` prop is set to our state variable.
*   The `onChange` prop is set to our handler function.

```jsx
import { useState } from 'react';

function ControlledInput() {
  // 1. State variable to hold the input's value
  const [name, setName] = useState('');

  // 2. Handler function to update the state
  const handleChange = (event) => {
    // We get the new value from the event object and update our state
    setName(event.target.value);
  };

  return (
    <div>
      <p>Current value in state: {name}</p>
      <input
        value={name}       // The input's value is ALWAYS what's in our state
        onChange={handleChange} // Any change will trigger our function
      />
    </div>
  );
}
```

### The Data Flow: The "React Loop"

Ikkada data flow ela untundo ardham cheskovadam chala important.
1.  User input field lo 'a' ane letter type chestadu.
2.  Browser `onChange` event ni trigger chesthundi.
3.  Mana `handleChange` function run avuthundi. Adi `event.target.value` ('a') ni teeskuni, `setName('a')` ni call chesthundi.
4.  React state update ni chusi, component ni re-render chesthundi.
5.  Re-render lo, `<input>` ki `value` prop malli pass avuthundi, kani ee sari daani value `name` state nunchi vachina `'a'`.
6.  The input now visually shows 'a'.

Ee process antha chala fast ga jarigipothundi. The user types, the state updates, the UI reflects the state. The loop is complete.

**Analogy: The Puppet and the Puppeteer  puppeteer**
*   **The `<input>`:** A puppet. Daaniki sonta control ledu.
*   **React State (`name`):** The puppeteer.
*   **The `value` prop:** The strings that control the puppet's hands. Puppeteer ye string ni lagithe, puppet hand alage move avuthundi.
*   **The `onChange` handler:** The feedback system. Puppet hand emaina takinappudu, aa information ventane puppeteer ki velli, "Hey, the hand just moved, update its position!" ani chepthundi.

```mermaid
graph TD
    A[User types in input] --> B{Browser fires `onChange` event};
    B --> C{`handleChange` function is called};
    C --> D{`setName(event.target.value)` updates the state};
    D --> E{React re-renders the component};
    E --> F["`<input>` receives new `value` from state"];
    F --> A;

    style D fill:#e6f7ff
```

**Why is this the recommended way?**
Because the input's value is always in our React state, we can easily validate it, format it, or pass it to other components. We have full control.

Kani, prathi input ki ila state manage cheyadam anavasaram anipinche scenarios unnayi. Aaa scenarios lo, manam **Uncontrolled Inputs** ni vadathamu. Adento, next chuddam! 👉