# Practical Example: The "Smart" Submit Button 🧠

Okay, theory antha chusam. Ippudu `useFormStatus` tho asalu magic ento, oka full, working example tho chuddam. Manam ippudu oka "smart" submit button ni create cheddam. Ee button ki, daani parent form submit avuthundo ledo automatic ga telustundi!

Manaki ee example kosam moodu files kavali.

### 1. The Action (`actions.js`)

First, manaki form submit chesinappudu call cheyadaniki oka function kavali. Idi server meeda run ayye "Server Action" anukundam. Manam deenilo oka 2-second delay pedadam, so manaki pending state clear ga kanipisthundi.

```javascript
// actions.js
'use server'; // Mark this as a Server Action

export async function submitForm(formData) {
  const name = formData.get('name');
  console.log(`Submitting for name: ${name}`);
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('Submission complete!');
  // In a real app, you might save to a DB here
  return { success: true };
}
```

### 2. The Smart Button (`SubmitButton.jsx`)

Idi mana star of the show. Ee component `useFormStatus` ni call chesthundi.

```jsx
// SubmitButton.jsx
'use client'; // This is a Client Component

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  // Get the pending status from the parent form
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```
Chusara, entha clean ga undo!
*   `pending` `true` aite, button `disabled` avuthundi and daani text "Submitting..." ga maruthundi.
*   `pending` `false` aite, adi normal state lo untundi.
*   Ee component ki manam elanti props pass cheyyaledu!

### 3. The Form (`App.jsx`)

Finally, manam ee `SubmitButton` ni oka form lopalana petti, render cheddam.

```jsx
// App.jsx
import { submitForm } from './actions';
import SubmitButton from './SubmitButton';

export default function App() {
  return (
    <form action={submitForm}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <SubmitButton />
    </form>
  );
}
```
**The Golden Rule in action:** `<SubmitButton />` anedi `<form>` lopalana undi. Anduke, `useFormStatus` correct ga pani chesthundi.

Ippudu, meeru ee form lo "Submit" button click cheyagane, adi ventane "Submitting..." ga mari, disable aipothundi. 2 seconds tarvata, action complete avvagane, adi malli normal state ki vastundi.

```mermaid
graph TD
    subgraph "App.jsx"
        A["<form action={submitForm}>"] --> B["<SubmitButton />"];
    end

    subgraph "SubmitButton.jsx"
        B --> C{calls `useFormStatus()`};
        C --> D{`pending` is initially `false`};
        D --> E[Button is enabled];
    end

    E -- User Clicks --> F{Form submission starts};
    F --> G[Hook inside SubmitButton now reports `pending: true`];
    G --> H[Button becomes disabled with "Submitting..." text];
    I[Action completes after 2s] --> J[Hook reports `pending: false`];
    J --> E;

    style H fill:#fefde8
```

This pattern is incredibly powerful. It lets you create reusable UI components (like spinners, status messages, or disabled buttons) that can react to the state of a form they are in, without any props being passed down. This makes your code cleaner, more decoupled, and easier to maintain.

This concludes our deep dive into `useFormStatus`. You are now ready to build more responsive and user-friendly forms in React! 🎉✅