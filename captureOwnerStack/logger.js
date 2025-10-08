import * as React from 'react';

/**
 * Idi oka simple logger utility. Library authors ilanti
 * functions ni create chesi, helpful warnings chupincharu.
 *
 * @param {string} message The warning message to display.
 */
export function logWarning(message) {
  // Rule #1: Ee function kevalam development lo matrame pani cheyyali.
  if (process.env.NODE_ENV !== 'production') {
    // Rule #2: Call captureOwnerStack inside a React context (like a component render or effect).
    // It returns the component call stack as a formatted string.
    const ownerStack = React.captureOwnerStack();

    // Ippudu manam aa message ni and stack ni kalipi, console lo chupistham.
    console.warn(
      `[MyAwesomeLibrary] Warning: ${message}\n\nComponent Stack:\n${ownerStack}`
    );
  }
}