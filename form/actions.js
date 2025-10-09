// This directive at the top of the file marks ALL exported functions
// in this file as Server Actions. They will only run on the server.
'use server';

/**
 * This is our Server Action. It receives the form data automatically.
 * @param {FormData} formData The data from the form that called this action.
 */
export async function submitForm(formData) {
  // We can extract the data from the formData object using the `name` attribute of the inputs.
  const name = formData.get('name');
  const email = formData.get('email');
  const wantsSpam = formData.get('spam') === 'on'; // Checkbox value is 'on' when checked

  console.log('--- SERVER ACTION ---');
  console.log(`Received submission:`);
  console.log(`  Name: ${name}`);
  console.log(`  Email: ${email}`);
  console.log(`  Wants Spam: ${wantsSpam}`);
  console.log('---------------------');

  // Simulate a 2-second delay to mimic a database call or other async work.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('Action complete. Form will now reset.');

  // In a real app, you might revalidate data or redirect the user here.
  // For now, we'll just return a success message.
  return { success: true, message: `Thanks for signing up, ${name}!` };
}