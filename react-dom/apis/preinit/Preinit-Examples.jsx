import React from 'react';
import { preinit } from 'react-dom';

/*
  NOTE: To see the effect of these hints, you would use the "Network" tab
  and "Elements" tab (to inspect the <head>) in your browser's developer tools.

  The URLs used here are placeholders. In a real app, they would point
  to actual resources.
*/

// --- Example 1: Preiniting a critical script ---
function CriticalScriptLoader() {
  // We are telling the browser to download AND execute 'analytics.js'
  // at the earliest possible moment.
  // We do NOT need to render a separate <script> tag for this.
  // `preinit` handles both downloading and execution.
  preinit('/js/analytics.js', { as: 'script' });

  return (
    <div>
      <p>A critical analytics script has been preinitialized. It will be downloaded and executed by the browser as soon as possible.</p>
    </div>
  );
}

// --- Example 2: Preiniting a critical stylesheet ---
function CriticalStyleLoader() {
  // We are telling the browser to download AND APPLY 'reset.css'
  // at the earliest possible moment.
  // We do NOT need to render a separate <link> tag for this.
  // `preinit` handles both downloading and inserting it into the document.
  preinit('/css/reset.css', { as: 'style' });

  return (
    <div>
      <p>A critical reset stylesheet has been preinitialized. It will be downloaded and applied by the browser as soon as possible.</p>
    </div>
  );
}


export default function PreinitExamples() {
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
      <h1>`preinit` Examples</h1>
      <p>Check your browser's dev tools to see these hints in action. Notice that we don't render separate `&lt;script&gt;` or `&lt;link&gt;` tags for these resources.</p>

      <div style={exampleBoxStyles}>
        <h3>Usage: Preiniting a Critical Script ✅</h3>
        <CriticalScriptLoader />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Preiniting a Critical Stylesheet ✅</h3>
        <CriticalStyleLoader />
      </div>
    </div>
  );
}