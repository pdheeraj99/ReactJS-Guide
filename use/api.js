/**
 * Idi oka simple mock API.
 * Idi oka Promise ni return chesthundi, adi 2 seconds tarvata
 * resolve avuthundi.
 *
 * Manam ee promise ni `use` hook tho "unwrap" chestam.
 */
export function fetchMessage() {
  console.log('Message fetch started...');
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log('Message fetch resolved!');
      resolve('Hello from a Promise! 👋');
    }, 2000)
  );
}