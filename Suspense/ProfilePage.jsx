import { Suspense } from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileTimeline from './ProfileTimeline';
import LoadingSpinner from './LoadingSpinner';

/**
 * Ee component `ProfileDetails` and `ProfileTimeline` ni render chesthundi.
 * Ee rendu components ni okate `<Suspense>` boundary lo wrap chesam.
 *
 * Deeni valla, ee rendu components data tho ready ayye varaku,
 * React `LoadingSpinner` ni chupisthundi. Rendu ready avvagane,
 * okate sari screen meeda kanipistayi.
 *
 * Idi "loading waterfall" ni avoid chesi, smooth user experience isthundi.
 */
export default function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="profile-page">
        <ProfileDetails resource={resource} />
        <hr />
        <h3>Posts</h3>
        <ProfileTimeline resource={resource} />
      </div>
    </Suspense>
  );
}