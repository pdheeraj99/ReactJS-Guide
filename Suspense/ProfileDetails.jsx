/**
 * Ee component user details ni chupisthundi.
 * Idi `resource.details.read()` call chesinappudu, data inka ready ga lekapothe
 * `api.js` lo unna `wrapPromise` oka Promise ni throw chesthundi.
 * Aa Promise ni deggara unna `<Suspense>` boundary pattukuntundi.
 */
export default function ProfileDetails({ resource }) {
  // Try to read user details from the resource
  const user = resource.details.read();

  return (
    <div className="profile-details">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}