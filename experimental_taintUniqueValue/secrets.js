import { experimental_taintUniqueValue } from 'react';
import 'server-only'; // This package ensures this module can only be imported on the server.

// 1. We get a secret value from the server's environment variables.
const superSecretApiKey = process.env.SUPER_SECRET_API_KEY || 'default-secret-key-for-demo';

// 2. ✅ We immediately "taint" this value.
// We are telling React: "This specific string value is highly sensitive.
// If anyone ever tries to pass this exact value to a Client Component,
// throw an error."
experimental_taintUniqueValue(
  'You are trying to leak the Super Secret API Key to the client. This is forbidden!',
  process, // The "lifetime" of the taint is the entire server process.
  superSecretApiKey
);

console.log('Super Secret API Key has been TAINTED. 🛡️');

/**
 * A simple function to export our tainted secret.
 * @returns {string} The tainted secret key.
 */
export function getSecretApiKey() {
  return superSecretApiKey;
}