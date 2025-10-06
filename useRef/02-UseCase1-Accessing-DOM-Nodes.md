# Use Case 1: Accessing DOM Nodes (The Main Job!)  DOM!

Manam `useRef` gurinchi nerchukunnam. Ippudu daani atni kante common and important use case ni chuddam: **DOM elements ni direct ga access cheyyadam.**

React anedi declarative ga untundi. Manam state ni marchi, UI ela undalo cheptham. Kani, konni sarlu manaki React flow nunchi bayataki velli, direct ga browser DOM element tho matladalsi vasthundi.

Konni examples:
*   Oka input field ni programmatically **focus** cheyyadam.
*   Oka form ni submit chesaka, daanini **reset** cheyyadam.
*   Oka video element ni **play** or **pause** cheyyadam.
*   Oka element యొక్క size or position ni **measure** cheyyadam.

Ee panulanni cheyyadaniki, manaki aa DOM node యొక్క reference kavali. `useRef` ee reference ni manaki isthundi.

## The 3-Step Process

DOM node ni access cheyyadaniki, manam moodu steps follow avtham:

### Step 1: Declare a Ref

`useRef` tho oka ref object ni declare cheyyi. Daani initial value eppudu `null` undali, endukante modata aa DOM node inka ledu.

```javascript
import { useRef } from 'react';

function MyComponent() {
  const myInputRef = useRef(null);
  // ...
}
```

### Step 2: Attach the Ref to a DOM Element

Nee JSX lo, nuvvu a DOM element ni access cheyyali anukuntunnavo, daaniki `ref` aney special prop ni pass cheyyi.

```jsx
function MyComponent() {
  const myInputRef = useRef(null);

  return <input ref={myInputRef} />;
}
```

### Step 3: Access the Node via `.current`

React ee `<input>` ni DOM lo render chesaka, adi automatic ga `myInputRef` యొక్క `.current` property ni aa `<input>` DOM node ki set chesthundi.

Ippudu, manam event handlers or effects lopaala, `myInputRef.current` ni use chesi, aa DOM node meeda browser methods ni call cheyyochu.

```jsx
function MyComponent() {
  const myInputRef = useRef(null);

  function handleClick() {
    // Access the DOM node and call the .focus() method
    myInputRef.current.focus();
  }

  return (
    <>
      <input ref={myInputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

**Important:** `myInputRef.current` anedi component modati sari render avvaka mundu `null` ga untundi. So, eppudu `useEffect` lopaala or event handlers lopaala matrame daanini access cheyyi. Rendering logic lo direct ga access cheyyakudadu.

```mermaid
graph TD
    A[1. `const myRef = useRef(null)`] --> B[2. `<input ref={myRef}>`];
    B --> C{React Renders & Commits to DOM};
    C --> D[3. React sets `myRef.current = <input DOM node>`];
    D --> E[4. Event handler can now use `myRef.current`];
```

Anthe! Ee simple pattern tho, manam React declarative world nunchi bayataki velli, browser DOM tho direct ga interact avvochu.

Kani, DOM manipulation okate `useRef` యొక్క use case kadu. Deeniki inko clever use undi: re-render ni trigger cheyyakunda values ni store cheyyadam. Let's see that next! 🤔➡️