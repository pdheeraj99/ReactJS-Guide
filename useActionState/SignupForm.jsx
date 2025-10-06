import React, { useActionState } from 'react';
import { signupAction } from './actions.js';

/*
  Hey! Idi mana main form component.
  Ikkada manam useActionState hook ni use chesi,
  mana form యొక్క state ni manage chestham.
*/
function SignupForm() {
  // 1. Define the initial state for our form.
  //    Modata, error em ledu, success kuda em ledu.
  const initialState = {
    error: null,
    success: false,
    message: null,
  };

  // 2. Call useActionState!
  //    Manam mana action function (`signupAction`) ni and `initialState` ni pass chesthunnam.
  //    Idi manaki moodu vishayalu isthundi: `state`, `formAction`, and `isPending`.
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto' }}>
      {/* 3. The <form> tag gets the `formAction` returned by the hook. */}
      <form action={formAction}>
        <h2>Create an Account</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={{ width: '95%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={{ width: '95%', padding: '8px' }}
          />
        </div>

        {/* 4. Use `isPending` to give user feedback. */}
        <button type="submit" disabled={isPending} style={{ padding: '10px 20px' }}>
          {isPending ? 'Signing Up...' : 'Sign Up'}
        </button>

        {/* 5. Use the `state` object to show dynamic messages. */}
        {state.error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            <strong>Error:</strong> {state.error}
          </p>
        )}

        {state.success && (
          <p style={{ color: 'green', marginTop: '10px' }}>
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default SignupForm;