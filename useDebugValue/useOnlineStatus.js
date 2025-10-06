import { useSyncExternalStore, useDebugValue } from 'react';

/*
  Hey! Idi mana custom hook: `useOnlineStatus`.
  Deeni pani simple: browser online lo unda, offline lo unda ani cheppadam.

  (Don't worry about `useSyncExternalStore` for now. Adi external
  browser APIs lanti non-React sources ki subscribe cheyyadaniki
  use ayye inko advanced hook. Manam daani gurinchi tarvata nerchukuntam.)
*/

// Helper function to subscribe to browser events
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function useOnlineStatus() {
  // `useSyncExternalStore` manaki `isOnline` aney boolean isthundi.
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // On the client, get the value from the browser
    () => true // On the server, assume it's online
  );

  // --- THE MAGIC PART ---
  // Manam `useDebugValue` ni ikkada call chesthunnam.
  // `isOnline` true aithe, DevTools lo "Online" ani chupisthundi.
  // False aithe, "Offline" ani chupisthundi.
  // Idi `true`/`false` kanna chala more readable.
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}