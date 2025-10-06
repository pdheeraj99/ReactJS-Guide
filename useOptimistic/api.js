/*
  Hey! Idi mana fake API file.
  Idi oka message ni server ki pampinattu simulate chesthundi.
*/

export async function sendMessage(message) {
  console.log(`📡 Sending message to server: "${message}"`);

  // Simulate a network delay of 1 to 2 seconds
  const delay = 1000 + Math.random() * 1000;
  await new Promise(resolve => setTimeout(resolve, delay));

  const shouldFail = Math.random() < 0.3; // 30% chance of failure

  if (shouldFail) {
    console.log(`❌ Message failed to send: "${message}"`);
    throw new Error('Failed to send message. Please try again.');
  }

  console.log(`✅ Message sent successfully: "${message}"`);
  // In a real API, this might return the saved message object from the database
  return { text: message };
}