import { cacheSignal } from 'react';
import { fetchCancellableData } from './api';
import { Suspense } from 'react';

/**
 * Idi oka Server Component anukundam.
 *
 * Ee component `cacheSignal()` ni call chesi, aa signal ni
 * `fetchCancellableData` function ki pass chesthundi.
 *
 * **The Scenario to Imagine:**
 * 1. Ee component render avvadam start avuthundi.
 * 2. `fetchCancellableData` call valla 4-second network request start avuthundi.
 * 3. User antha sepu wait cheyakunda, vere page ki navigate aipothadu.
 * 4. React ee render ni abandon chesthundi.
 * 5. React `cacheSignal` ni abort chesthundi.
 * 6. `fetch` API aa signal ni chusi, network request ni cancel chesthundi.
 * 7. Server console lo "FETCH ABORTED..." ane message kanipisthundi.
 *
 * Ee code ni manam direct ga run chesi chudalemu, endukante deeniki
 * Server Components environment and a way to simulate quick navigation kavali.
 * Kani, idi `cacheSignal` ni ela use cheyalo chupinche correct pattern.
 */
async function UserData({ userId }) {
  // 1. Get the signal from React
  const signal = cacheSignal();

  // 2. Pass it to the data fetching function
  const data = await fetchCancellableData(userId, { signal });

  if (!data?.success) {
    return <p>Could not load user data. It might have been cancelled.</p>;
  }

  return <h3>{data.message}</h3>;
}

export default function UserProfile({ userId }) {
  return (
    <div className="profile-container">
      <h1>User Profile with Cancellable Fetch</h1>
      <p>
        This component demonstrates how to use `cacheSignal` to cancel a slow
        network request if the user navigates away.
      </p>
      <Suspense fallback={<p>🌀 Fetching data... (This is a slow query)</p>}>
        {/* @ts-ignore */}
        <UserData userId={userId} />
      </Suspense>
    </div>
  );
}