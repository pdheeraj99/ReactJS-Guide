import UserAvatar from './UserAvatar';
import UserBio from './UserBio';
import { Suspense } from 'react';

/**
 * Idi parent Server Component.
 * Idi `UserAvatar` and `UserBio` ni render chesthundi.
 *
 * Rendu child components oke `fetchUser(userId)` ni call chestayi,
 * kani `cache` valla database query okkasare run avuthundi.
 *
 * Manam ikkada `Suspense` kuda vadutunnam, endukante Server Components lo
 * `await` chesinappudu, data vache varaku React render ni pause chesthundi.
 * Aa time lo fallback chupinchadaniki `Suspense` kavali.
 *
 * NOTE: In a real Next.js app, the `loading.js` file convention
 * would handle this automatically. This is for demonstration.
 */
export default function UserProfile({ userId }) {
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <p>
        Check your server console. You will see "EXECUTING DATABASE QUERY"
        logged only ONCE, even though two components are calling the same
        data-fetching function. This is the power of `React.cache`!
      </p>
      <Suspense fallback={<p>Loading user data...</p>}>
        {/*
          In a real Server Component environment, you can await async components.
          Since we can't run that here, we are showing the conceptual structure.
        */}
        <UserAvatar userId={userId} />
        <hr />
        <UserBio userId={userId} />
      </Suspense>
    </div>
  );
}