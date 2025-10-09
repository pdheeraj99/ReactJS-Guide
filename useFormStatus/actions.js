'use server';

/**
 * Idi oka "Server Action". Ee function server meeda run avuthundi.
 * Manam form `action` prop ki deenini pass chestam.
 *
 * Deenilo manam 2-second delay ni simulate chestunnam, so manaki
 * `useFormStatus` loni `pending` state clear ga kanipisthundi.
 *
 * @param {FormData} formData The data from the form.
 */
export async function submitForm(formData) {
  const name = formData.get('name');
  console.log(`Form submitted on server for name: ${name}`);

  // Simulate a network or database delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Server action complete.');

  // In a real app, you might return some result.
  return { success: true };
}