import React from 'react';
import { preload } from 'react-dom';

/*
  NOTE: To see the effect of these hints, you would use the "Network" tab
  in your browser's developer tools. You would see the browser downloading
  these resources with a high priority.

  The URLs used here are placeholders. In a real app, they would point
  to actual resources.
*/

// --- Example 1: Preloading a critical stylesheet ---
function CriticalCssComponent() {
  // We know this component needs 'critical-styles.css' to render correctly.
  // We give a high-priority hint to the browser to download it ASAP.
  preload('/css/critical-styles.css', { as: 'style' });

  return (
    <div>
      <link rel="stylesheet" href="/css/critical-styles.css" />
      <p>This component's critical CSS was preloaded.</p>
    </div>
  );
}

// --- Example 2: Preloading a script that will be needed soon ---
function InteractiveComponent() {
  // This component will eventually need 'interactive-widget.js'.
  // We can preload it so it's ready in the cache when we decide to use it.
  // Note: preload only DOWNLOADS it. It does NOT execute it.
  preload('/js/interactive-widget.js', { as: 'script' });

  return (
    <div>
      <p>This component preloads a script for a widget that might be used later.</p>
      {/* Some user action would later cause this script to be executed */}
    </div>
  );
}

// --- Example 3: Preloading a font ---
function StyledText() {
  // Fonts are a perfect use case for preload, as they can block rendering.
  // For fonts, you almost always need to provide the `crossOrigin` option.
  preload('/fonts/my-custom-font.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  });

  return (
    <div>
      <p>The custom font used by this component was preloaded for faster rendering.</p>
    </div>
  );
}

export default function PreloadExamples() {
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
      <h1>`preload` Examples</h1>
      <p>Check your browser's Network tab to see these hints in action.</p>

      <div style={exampleBoxStyles}>
        <h3>Usage: Preloading a Stylesheet ✅</h3>
        <CriticalCssComponent />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Preloading a Script ✅</h3>
        <InteractiveComponent />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Preloading a Font ✅</h3>
        <StyledText />
      </div>
    </div>
  );
}