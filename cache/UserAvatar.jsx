import { fetchUser } from './api';

/**
 * Idi oka Server Component anukundam.
 * Idi user avatar ni chupinchadaniki `fetchUser` ni call chesthundi.
 *
 * Ee component render ayinappudu, `fetchUser(123)` call valla
 * database query (the first time) trigger avuthundi.
 */
export default async function UserAvatar({ userId }) {
  console.log('UserAvatar component is rendering, calling fetchUser...');

  const user = await fetchUser(userId);

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <img
        src={user.avatarUrl}
        alt={`${user.name}'s avatar`}
        style={{ borderRadius: '50%', width: '80px', height: '80px' }}
      />
      <h2>{user.name}</h2>
    </div>
  );
}