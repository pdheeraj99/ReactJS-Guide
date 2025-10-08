/**
 * Ee component "impure" endukante, idi render avuthunnappude
 * daaniki vachina `stories` prop ni direct ga modify (mutate) chesthundi.
 * Idi oka side effect.
 *
 * StrictMode lo, ee component rendu sarlu render avuthundi.
 * Appudu `stories.push()` kuda rendu sarlu run avuthundi.
 * Result: "Create Story" list lo rendu sarlu kanipisthundi.
 *
 * Idi StrictMode manaki bug ni ela pattukovadaniki help chesthundaniki
 * oka perfect example.
 */
export default function ComponentWithSideEffects({ stories }) {
  // ❌ DON'T DO THIS IN REAL CODE!
  // We are directly mutating the prop array. This is a side effect.
  stories.push({ id: 'create', label: 'Create Story' });

  // StrictMode lo ee log rendu sarlu kanipisthundi.
  console.log('ComponentWithSideEffects rendered. Stories count:', stories.length);

  return (
    <ul>
      {stories.map((story, index) => (
        // Using index as key here because IDs might duplicate due to the bug
        <li key={`${story.id}-${index}`}>{story.label}</li>
      ))}
    </ul>
  );
}