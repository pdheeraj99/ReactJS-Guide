/*
  Hey! Idi mana action file.
  Real-world applications lo, ikkada unna logic server lo run avuthundi
  (e.g., using a Server Action).

  Kani ee example kosam, manam ikkade client-side lo simulate cheddam.
  Ee function oka form submission ni handle chesthundi.
*/
export async function signupAction(previousState, formData) {
  // formData object nunchi values theeskundam
  const email = formData.get('email');
  const password = formData.get('password');

  console.log('Server received:', email, password);

  // --- Simple Validation Logic ---

  // Pending state chudadaniki 2 seconds delay add cheddam
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (password.length < 8) {
    // Validation fail aithe, error tho kotha state ni return cheddam
    return {
      error: 'Password must be at least 8 characters long.',
      success: false,
      message: null,
    };
  }

  if (!email.includes('@')) {
    return {
      error: 'Please enter a valid email address.',
      success: false,
      message: null,
    };
  }

  // Antha correct ga unte, success tho kotha state ni return cheddam
  return {
    error: null,
    success: true,
    message: `Welcome, ${email}! Your account is created.`,
  };
}