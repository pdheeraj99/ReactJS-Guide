import { StrictMode, useState } from 'react';
import ComponentWithSideEffects from './ComponentWithSideEffects';
import ComponentWithLegacyAPI from './ComponentWithLegacyAPI';

// Initial data for our stories
const initialStories = [
  { id: 'a', label: 'Story 1' },
  { id: 'b', label: 'Story 2' },
];

export default function App() {
  const [showLegacy, setShowLegacy] = useState(false);

  console.log('App component rendered');

  return (
    <>
      <h1>Welcome to the StrictMode Demo! 🕵️‍♂️</h1>
      <p>
        Open your browser's developer console (F12) to see the warnings and logs
        from StrictMode.
      </p>
      <hr />

      {/* Example 1: Demonstrating how StrictMode finds impure rendering */}
      <h2>Example 1: Finding Impure Rendering</h2>
      <p>
        Ee component props lo vachina array ni direct ga modify (mutate)
        chesthundi. StrictMode lenidhe ee bug kanipinchadu, kani StrictMode valla
        component rendu sarlu render avvadam tho, "Create Story" list lo rendu
        sarlu kanipisthundi. Appudu manaki bug ekkada undho aerdham avuthundi.
      </p>
      <div className="container">
        <div className="box">
          <h3>Without StrictMode</h3>
          <p>Bug kanipinchadu. "Create Story" okasare kanipisthundi.</p>
          {/* We are passing a copy to avoid mutation from one component affecting the other */}
          <ComponentWithSideEffects stories={[...initialStories]} />
        </div>
        <div className="box">
          <h3>With StrictMode</h3>
          <p>Bug bayatapaduthundi! "Create Story" rendu sarlu kanipisthundi.</p>
          <StrictMode>
            <ComponentWithSideEffects stories={[...initialStories]} />
          </StrictMode>
        </div>
      </div>
      <hr />

      {/* Example 2: Demonstrating warnings for Legacy APIs */}
      <h2>Example 2: Finding Legacy API Usage</h2>
      <p>
        Ee kindi component lo `UNSAFE_componentWillMount` ane oka deprecated
        (pata) lifecycle method ni use chesamu. StrictMode valla console lo
        warning kanipisthundi.
      </p>
      <button onClick={() => setShowLegacy(!showLegacy)}>
        {showLegacy ? 'Hide' : 'Show'} Legacy Component
      </button>

      {showLegacy && (
        <StrictMode>
          <ComponentWithLegacyAPI />
        </StrictMode>
      )}
    </>
  );
}