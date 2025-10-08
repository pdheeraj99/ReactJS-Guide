/**
 * Ee component user timeline posts ni chupisthundi.
 * `ProfileDetails` laage, idi kuda `resource.timeline.read()` call chesinappudu
 * suspend avuthundi.
 */
export default function ProfileTimeline({ resource }) {
  // Try to read timeline posts from the resource
  const posts = resource.timeline.read();

  return (
    <ul className="timeline">
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}