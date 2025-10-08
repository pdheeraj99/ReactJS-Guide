import { useState, useTransition, startTransition } from 'react';
import SlowList from './SlowList';
import './styles.css';

export default function App() {
  // --- Example 1: The Laggy Input ---
  const [laggyQuery, setLaggyQuery] = useState('');

  // --- Example 2: The Responsive Input using useTransition ---
  const [responsiveQuery, setResponsiveQuery] = useState('');
  const [isPending, startTransitionHook] = useTransition();

  const handleResponsiveChange = (e) => {
    // We wrap the slow state update in the transition function from the hook
    startTransitionHook(() => {
      setResponsiveQuery(e.target.value);
    });
  };

  // --- Example 3: The Responsive Input using standalone startTransition ---
  const [standaloneQuery, setStandaloneQuery] = useState('');
  const handleStandaloneChange = (e) => {
    // This achieves the same non-blocking update, but we don't get an `isPending` state.
    startTransition(() => {
      setStandaloneQuery(e.target.value);
    });
  };

  return (
    <div className="app-container">
      <h1>`startTransition` Demo 🚀</h1>
      <p>
        Type quickly in the input fields below to see the difference between a
        regular state update and a transition.
      </p>
      <div className="demo-grid">
        {/* --- The Laggy Example --- */}
        <div className="demo-box">
          <h3>1. Laggy Input (No Transition)</h3>
          <p>
            Ee input lo fast ga type cheste, UI freeze avvadam meeru
            gamanistharu, endukante prathi keystroke slow list ni block
            chesthundi.
          </p>
          <input
            type="text"
            value={laggyQuery}
            onChange={(e) => setLaggyQuery(e.target.value)}
            placeholder="Type here... it will lag"
          />
          <SlowList query={laggyQuery} />
        </div>

        {/* --- The Responsive Example --- */}
        <div className="demo-box">
          <h3>2. Responsive Input (with `useTransition`)</h3>
          <p>
            Ee input chala responsive ga untundi. `isPending` state valla manam
            loading indicator kuda chupinchocchu.
          </p>
          <input
            type="text"
            value={responsiveQuery}
            onChange={handleResponsiveChange}
            placeholder="Type here... it will be smooth"
          />
           <div className="pending-indicator">
            {isPending && '⏳ Calculating...'}
          </div>
          <SlowList query={responsiveQuery} />
        </div>

        {/* --- The Standalone Example --- */}
        <div className="demo-box">
          <h3>3. Responsive Input (with standalone `startTransition`)</h3>
           <p>
            Idi kuda responsive ga untundi, kani manaki `isPending` state undadu.
            Component bayata vadalsi vachinappudu idi useful.
          </p>
          <input
            type="text"
            value={standaloneQuery}
            onChange={handleStandaloneChange}
            placeholder="Type here... also smooth"
          />
          <SlowList query={standaloneQuery} />
        </div>
      </div>
    </div>
  );
}