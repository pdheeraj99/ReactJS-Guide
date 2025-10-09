import React from 'react';
import { preconnect } from 'react-dom';

/*
  NOTE: To see the effect of these hints, you would use the "Network" tab
  in your browser's developer tools. You would see the browser initiating a
  connection to the specified domain before any resources are actually requested from it.
*/

// --- Example 1: Preconnecting when rendering ---
function GoogleFontsComponent() {
  // We know this component will need fonts from 'fonts.googleapis.com' and 'fonts.gstatic.com'.
  // By calling preconnect here during render, we tell the browser to start
  // establishing a connection immediately, which will make the font download faster.
  preconnect('https://fonts.googleapis.com');
  preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' }); // Often needed for fonts

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
      <p style={{ fontFamily: '"Roboto", sans-serif' }}>
        This text is styled with the Roboto font. The connection to Google Fonts was initiated early.
      </p>
    </div>
  );
}

// --- Example 2: Preconnecting in an event handler ---
function WizardLauncher() {
  const handleStartWizard = () => {
    // Imagine the wizard needs to fetch data from an API.
    // By calling preconnect in the click handler, we start warming up the
    // connection *before* the wizard component even starts to render.
    // This is a great optimization!
    preconnect('https://api.my-wizard.com');

    // In a real app, you would now navigate to the wizard page or set state to show it.
    alert('Preconnecting to "https://api.my-wizard.com"... Now the wizard would start loading.');
  };

  return (
    <div>
      <p>Click the button to start a wizard. We will preconnect to the wizard's API on click.</p>
      <button onClick={handleStartWizard}>Start Wizard</button>
    </div>
  );
}


export default function PreconnectExamples() {
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
      <h1>`preconnect` Examples</h1>
      <p>Check your browser's Network tab to see these hints in action.</p>

      <div style={exampleBoxStyles}>
        <h3>Usage: Preconnecting During Render ✅</h3>
        <GoogleFontsComponent />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Preconnecting in an Event Handler ✅</h3>
        <WizardLauncher />
      </div>
    </div>
  );
}