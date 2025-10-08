import { Suspense } from 'react';

/**
 * Ee component data ni fetch chesthundi.
 * Manam deenini `<Activity mode="hidden">` lo render cheste,
 * idi background lo data ni fetch cheskuntundi.
 *
 * User ee component ni chudalani anukunnappudu, data already
 * ready ga untundi, so adi instantly kanipisthundi.
 */
function Content({ resource }) {
  // Try to read the data. If it's not ready, this will suspend.
  const data = resource.read();
  return <p>{data}</p>;
}

export default function PrerenderedContent({ resource }) {
  return (
    <div className="tab-content">
      <h3>Prerendered Tab</h3>
      <p>
        Ee content app load ayinappude background lo load avvadam start aindi.
        Anduke meeru ee tab ni click cheyagane, loading spinner lekunda
        instantly kanipinchindi!
      </p>
      <Suspense fallback={<h4>🌀 Loading prerendered content...</h4>}>
        <Content resource={resource} />
      </Suspense>
    </div>
  );
}