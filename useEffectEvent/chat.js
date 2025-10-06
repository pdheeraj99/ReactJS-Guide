/*
  Hey! Idi mana fake chat API.
  Idi real-world lo oka third-party library (like Socket.io)
  నుంచి vachina code laantidi.
  Manam deenini mana React component nunchi control cheyyali.
*/
let connections = 0;

export function createConnection(roomId) {
  let onConnectedCallback = null;
  let timeoutId;

  return {
    // 1. Event listener ni register cheskodaniki oka method
    on(event, callback) {
      if (event !== 'connected') {
        return;
      }
      onConnectedCallback = callback;
    },
    // 2. Connection ni start chese method
    connect() {
      connections++;
      console.log(`✅ Connecting to "${roomId}" room... (Connections: ${connections})`);

      // Simulate a delay for connection
      timeoutId = setTimeout(() => {
        if (onConnectedCallback) {
          console.log('✅ Connection successful!');
          onConnectedCallback(); // Call the registered callback
        }
      }, 1000);
    },
    // 3. Disconnect chese method
    disconnect() {
      connections--;
      clearTimeout(timeoutId);
      console.log(`❌ Disconnected from "${roomId}" room. (Connections: ${connections})`);
    },
  };
}