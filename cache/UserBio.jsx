import { fetchUser } from './api';

/**
 * Idi kuda oka Server Component anukundam.
 * Idi user bio ni chupinchadaniki `fetchUser` ni call chesthundi.
 *
 * IMPORTANT: UserAvatar component ee function ni already call chesindi.
 * `cache` valla, ee call malli database ki velladu.
 * Already cache lo unna data ni instantly teeskuntundi.
 *
 * So, "EXECUTING DATABASE QUERY..." ane log console lo malli kanipinchadu!
 */
export default async function UserBio({ userId }) {
  console.log('UserBio component is rendering, calling fetchUser...');

  const user = await fetchUser(userId);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h3>About {user.name}</h3>
      <p>{user.bio}</p>
    </div>
  );
}