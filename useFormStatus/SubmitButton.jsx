'use client';

// IMPORTANT: `useFormStatus` hook ni `react-dom` nunchi import cheyyali, `react` nunchi kadu.
import { useFormStatus } from 'react-dom';

/**
 * Idi mana "smart" submit button.
 *
 * Ee component ki daani parent form gurinchi emi teliyadu. Manam deeniki
 * elanti props (`isSubmitting` etc.) pass cheyyatledu.
 *
 * Kani, `useFormStatus` hook valla, deeniki automatic ga aa form
 * submission lo unda leda ane status telustundi.
 */
export default function SubmitButton() {
  // 1. Call the hook. It returns an object with the status.
  const { pending } = useFormStatus();

  // 2. Use the `pending` boolean to change the UI.
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}