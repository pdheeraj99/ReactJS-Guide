'use client';

// This hook must be imported from `react-dom`.
import { useFormStatus } from 'react-dom';

/**
 * This is our "smart" submit button.
 * It doesn't need any props to know if the form is submitting.
 * It uses the `useFormStatus` hook to get the `pending` state
 * from the parent <form> it is rendered in.
 */
export default function SubmitButton() {
  // The `pending` boolean is true only when the form is being submitted.
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}