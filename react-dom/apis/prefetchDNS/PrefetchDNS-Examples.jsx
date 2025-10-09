import React from 'react';
import { prefetchDNS } from 'react-dom';

/*
  NOTE: To see the effect of these hints, you would use the "Network" tab
  in your browser's developer tools. Some browsers might show this as a
  DNS lookup being initiated early. The effect is more subtle than preconnect.
*/

// --- Example: Prefetching DNS for multiple third-party services ---
function AppFooter() {
  // This component knows that the app might load resources from various third-party domains.
  // Instead of opening full connections with `preconnect` (which can be expensive),
  // we give the browser a cheaper hint to just look up their IP addresses.
  prefetchDNS('https://www.google-analytics.com');
  prefetchDNS('https://cdn.customer-chat-widget.com');
  prefetchDNS('https://api.ab-testing-service.com');

  return (
    <div style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}>
      <p>&copy; 2024 My Awesome App</p>
      <p>
        (DNS hints have been sent for our analytics, chat, and A/B testing services)
      </p>
    </div>
  );
}


export default function PrefetchDNSExamples() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif',
  };
  const exampleBoxStyles = {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyles}>
      <h1>`prefetchDNS` Examples</h1>
      <p>Check your browser's Network tab to see these hints in action (behavior may vary by browser).</p>

      <div style={exampleBoxStyles}>
        <h3>Usage: Prefetching DNS for Lower-Priority Domains ✅</h3>
        <p>This is the footer of our app. It's a good place to put DNS prefetch hints for services that might be used on any page.</p>
        <hr />
        <AppFooter />
      </div>
    </div>
  );
}