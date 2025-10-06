# `useId` ni Ela Vadali? (A Simple Example)

Manam `useId` enduku importanto chusam. Ippudu daanini code lo ela vadalo chuddam. It's one of the simplest hooks in React.

## The Basic Syntax

`useId` hook ki parameters em undavu. Just call it at the top level of your component.

`const id = useId();`

*   **`id`:** Idi `useId` manaki return chese unique ID string. Ee string eppudu `:` tho start avuthundi and end avuthundi (e.g., `:r1:`, `:r2:`), so adi normal CSS selectors tho clash avvakunda untundi.

## Usage: Connecting a Label to an Input

Atni kante common use case, `<label>` ni `<input>` tho connect cheyyadam.

Let's build a simple `EmailField` component.

```jsx
// EmailField.jsx
import { useId } from 'react';

function EmailField() {
  // 1. Call useId at the top level to get a unique ID.
  const emailId = useId();

  console.log('Generated ID:', emailId);

  return (
    <div>
      {/* 2. Use the ID for the `htmlFor` attribute in the label. */}
      <label htmlFor={emailId}>Email:</label>

      {/* 3. Use the same ID for the `id` attribute in the input. */}
      <input id={emailId} type="email" />
    </div>
  );
}
```

**How it works:**
1.  Component render ainappudu, `useId()` call avuthundi and oka unique ID (e.g., `:r1:`) ni `emailId` variable lo store chesthundi.
2.  Aa `emailId` ni manam `<label>` యొక్క `htmlFor` prop ki and `<input>` యొక్క `id` prop ki pass chestham.
3.  Ippudu, browser ki telusu ee rendu elements connect ayyi unnayani. Nuvvu "Email:" aney label meeda click cheste, input field automatic ga focus avuthundi.

## What if we render it multiple times?

Ippudu manam ee `EmailField` component ni `App` lo rendu sarlu render cheddam.

```jsx
// App.jsx
import EmailField from './EmailField';

function App() {
  return (
    <form>
      <h2>Create Account</h2>
      <EmailField />
      <h2>Contact Us</h2>
      <EmailField />
    </form>
  );
}
```

Nuvvu console lo chusthe, neeku veru veru IDs kanipistayi:
*   `Generated ID: :r1:`
*   `Generated ID: :r2:`

Prathi `EmailField` instance ki daani sonta unique ID undi. So, IDs clash avvavu, and accessibility perfect ga pani chesthundi.

Anthe! Chala simple kadha?

Kani, oka component lo manaki okati kante ekkuva IDs kavali anukunte? For example, oka form lo First Name and Last Name rendu fields unte? Appudu em cheyyali?

Let's see the best pattern for that in the next section. 🤔➡️