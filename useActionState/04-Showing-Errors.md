# Error Handling: User ki "Error" Ani Chupinchadam ❌

Manam `isPending` tho loading state ni handle chesam. Super! Ippudu inko important part: **error handling**.

Form submit chesaka, server nunchi error ravochu. For example, "User already exists" or "Invalid password". Ee message ni manam user ki chupinchali.

Deenikosame `useActionState` manaki `state` variable ni isthundi.

## `state` tho Error Handling Ela?

Gurthu unda? `useActionState` ki manam pass chese `action` function edaithe *return* chesthundo, ade kotha `state` avuthundi.

Ee feature ni manam error handling kosam use cheskuntam.

1.  **Initial State:** Manam `useActionState` ni call chesetappudu, initial state ni set chestham. Usually, idi `{ error: null }` lanti object untundi. Error em ledu ani cheppadaniki.
2.  **Action Logic:** Mana `action` function lo, manam form data ni validate chestham.
    *   Antha correct ga unte, manam `{ error: null, success: true }` lanti object ni return cheyyochu.
    *   Edaina error unte, manam aa error message tho `{ error: "Your password must be 8 characters long." }` lanti object ni return chestham.
3.  **Displaying the Error:** Mana component lo, ee `state.error` ni check chesi, adi `null` kakapothe, aa error message ni UI lo chupistam.

## Let's see the full flow in code:

### 1. The Action (`actions.js`)

Ee function lo server-side logic untundi. Ikkada manam form data ni theeskuni, validation chesi, result ni return chestham.

```javascript
// actions.js

export async function signupAction(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // Simple validation
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }

  if (!email.includes('@')) {
    return { error: 'Please enter a valid email.' };
  }

  // Antha correct ga unte...
  // (Ikkada database lo save chese logic untundi)
  console.log('Signing up with:', email, password);

  // Success state return cheddam
  return { success: true, message: 'Welcome! Your account has been created.' };
}
```

### 2. The Component (`SignupForm.jsx`)

Ikkada manam `useActionState` ni use chesi, state ni UI lo chupistam.

```jsx
// SignupForm.jsx
import { useActionState } from 'react';
import { signupAction } from './actions.js';

function SignupForm() {
  // Initial state lo error and success rendu null/false
  const initialState = { error: null, success: false, message: null };
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  return (
    <form action={formAction}>
      <h2>Create an Account</h2>
      <input type="email" name="email" placeholder="Email" />
      <br />
      <input type="password" name="password" placeholder="Password" />
      <br />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing up...' : 'Sign Up'}
      </button>

      {/* ERROR MESSAGE DISPLAY */}
      {state.error && (
        <p style={{ color: 'red' }}>Error: {state.error}</p>
      )}

      {/* SUCCESS MESSAGE DISPLAY */}
      {state.success && (
        <p style={{ color: 'green' }}>{state.message}</p>
      )}
    </form>
  );
}
```

Chusava entha clean ga undo?
*   Mana component chala "dumb" ga undi. Daaniki validation logic em teliyadu. Adi kevalam `state` object lo unna `error` or `success` message ni chupisthundi.
*   Antha logic `signupAction` lo undi. Idi Separation of Concerns ki manchi example.

And with that, you now know how to build a complete form flow with `useActionState`: handling pending states and showing success/error messages! You're a form master now! ოს

Ee hook gurinchi manam theory antha cover chesam. Ippudu ee concepts ni life loki athiskodaniki konni full, runnable code examples create cheddam. Ready to build? 💻🔥