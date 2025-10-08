import { cache } from 'react';

/**
 * NOTE: Ee file server environment lo run avuthundi anukundam.
 * `db` anedi mana database ki connection anukundam.
 */
const db = {
  users: {
    find: async (id) => {
      // Simulate a slow database query
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (id === 123) {
        return {
          id: 123,
          name: 'React Mawa',
          avatarUrl: 'https://picsum.photos/id/10/200',
          bio: 'I love learning about React performance!',
        };
      }
      return null;
    },
  },
};

/**
 * Idi mana original data fetching function.
 * Ee function ni `cache` tho wrap cheyyakunda vadithe,
 * adi call chesinanni sarlu DB query run chesthundi.
 */
async function _fetchUser(id) {
  console.log(
    `EXECUTING DATABASE QUERY for user ${id}... This should only appear ONCE per request.`
  );
  try {
    const user = await db.users.find(id);
    return user;
  } catch (error) {
    console.error('Database query failed:', error);
    return null;
  }
}

/**
 * ✅ THE SMART CHEF!
 * Manam original function ni `cache` tho wrap chesam.
 * Ippudu, ee `fetchUser` function ni oke render pass lo
 * multiple components (ade `id` tho) call chesina,
 * lopalina unna `_fetchUser` function okkasare run avuthundi.
 */
export const fetchUser = cache(_fetchUser);