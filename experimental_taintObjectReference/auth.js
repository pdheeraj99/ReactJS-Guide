import { experimental_taintObjectReference } from 'react';

/**
 * NOTE: Ee file server environment lo run avuthundi anukundam.
 * Idi database tho matladi, user data ni fetch chesthundi.
 */

// This is our mock user object from the database.
// Notice it contains sensitive information.
const mockUserFromDb = {
  id: 123,
  name: 'React Mawa',
  email: 'mawa@react.dev',
  // 😱 This is the kind of data we must NOT send to the client.
  passwordHash: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6',
};

/**
 * Ee function user data ni teeskuni, daanini "taint" chesthundi.
 *
 * @param {number} id The user ID to fetch.
 * @returns {Promise<object>} The user object, now marked as tainted.
 */
export async function getTaintedUser(id) {
  console.log(`Fetching user ${id} from the database...`);
  const user = { ...mockUserFromDb, id }; // Simulate fetching

  // ✅ THE SECURITY GUARD
  // Manam ee object ni "taint" chestunnam.
  // Ippudu ee specific `user` object reference ni Client Component ki
  // prop ga pass cheste, React oka error throw chesthundi.
  experimental_taintObjectReference(
    'Do not pass the entire user object to the client! ' +
      'Instead, pick only the properties the client needs, like `name` or `email`.',
    user
  );

  console.log(`User object for ${id} has been TAINTED. 🛡️`);

  return user;
}