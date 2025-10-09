# Full Example: The Complete Modern Form 🧩

Okay mawa, final round! Manam ippativaraku nerchukunna concepts anni (modern `<form>`, Server Actions, `FormData`, and `useFormStatus`) kalipi, oka full, complete example ni build cheddam.

Our goal: Create a simple newsletter signup form that handles submission on the server and provides instant feedback to the user.

Manaki ee example kosam moodu files kavali.

### 1. The Action (`actions.js`)

First, mana Server Action. Idi form data ni teeskuni, oka chinna delay tarvata, console lo log chesthundi.

```javascript
// actions.js
'use server'; // Don't forget this!

// The action function automatically receives the form's data.
export async function signupForNewsletter(formData) {
  const email = formData.get('email');
  console.log(`New email signup on SERVER: ${email}`);

  // Simulate saving to a database
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Signup complete!');
  // In a real app, you might revalidate data or redirect here.
}
```

### 2. The Smart Button (`SubmitButton.jsx`)

Next, mana reusable, "smart" submit button. Idi `useFormStatus` hook tho, parent form state ni teluskuntundi.

```jsx
// SubmitButton.jsx
'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  // Get the pending status from the parent form.
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Signing up...' : 'Sign Up'}
    </button>
  );
}
```

### 3. The Form (`App.jsx`)

Finally, mana UI. Ikkada manam `<form>` ni create chesi, daani `action` prop ki mana server action ni istham, and lopalana mana smart button ni pedatham.

```jsx
// App.jsx
import { signupForNewsletter } from './actions';
import SubmitButton from './SubmitButton';

export default function App() {
  return (
    <div className="signup-form">
      <h2>Join Our Newsletter!</h2>
      <form action={signupForNewsletter}>
        <label htmlFor="email">Email:</label>
        {/* The `name` attribute is crucial! */}
        <input
          id="email"
          type="email"
          name="email"
          placeholder="mawa@react.dev"
          required
        />
        {/* The SubmitButton automatically knows when the form is pending! */}
        <SubmitButton />
      </form>
    </div>
  );
}
```

### The Complete Flow

1.  User `App.jsx` ni chustadu.
2.  Email type chesi, "Sign Up" button click chestadu.
3.  `<form>` `signupForNewsletter` action ni trigger chesthundi.
4.  React ventane form submission ni start chesthundi. Ee process antha oka **Transition** lo jarugutundi.
5.  `<SubmitButton>` loni `useFormStatus` hook, ee transition ni detect chesi, `pending` ni `true` ga set chesthundi.
6.  Button ventane "Signing up..." ga mari, disable aipothundi.
7.  React, form data (`'email': '...'`) tho, server ki request pampisthundi.
8.  Server meeda, `signupForNewsletter` function run avuthundi.
9.  2 seconds tarvata, aa function complete avuthundi.
10. `pending` state `false` ga maruthundi, and button malli normal state ki vastundi.

```mermaid
graph TD
    A[User clicks Submit] --> B{`<form>` triggers `signupForNewsletter` action};
    B --> C{`useFormStatus` reports `pending: true`};
    C --> D[SubmitButton shows "Signing up..." & disables];
    B --> E{React sends FormData to Server};
    subgraph "Server-Side"
      E --> F[Server Action runs for 2s];
    end
    F --> G{Action completes};
    G --> H{`useFormStatus` reports `pending: false`};
    H --> I[SubmitButton returns to normal];

    style D fill:#fefde8
    style I fill:#d4edda
```

This concludes our deep dive into the modern React `<form>`. Ee Server Actions and hooks pattern tho, manam chala takkuva code tho, chala powerful, robust, and user-friendly forms ni create cheyochu. Happy coding! ✅🎉