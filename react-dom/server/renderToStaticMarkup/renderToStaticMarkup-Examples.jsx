import React from 'react';

/*
  This file is a conceptual example of how `renderToStaticMarkup` is used on a server.
  This code itself is not runnable as-is because it simulates a server environment.
*/

// --- 1. The React Component for an Email ---
// We use React to build the structure of our email, which is just static HTML.
function WelcomeEmail({ name }) {
  const emailStyles = {
    fontFamily: 'sans-serif',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '5px',
    maxWidth: '600px'
  };

  return (
    <div style={emailStyles}>
      <h1 style={{ color: '#333' }}>Welcome, {name}!</h1>
      <p>Thanks for joining our platform. We're excited to have you.</p>
      <a href="https://example.com" style={{ color: 'blue', textDecoration: 'none' }}>
        Get Started
      </a>
    </div>
  );
}


// --- 2. Conceptual Server-Side Code ---
// This would be your server logic that generates and perhaps emails the HTML.
function ServerCode() {
  // On the server, you would import the function and your component.
  // import { renderToStaticMarkup } from 'react-dom/server';
  // import WelcomeEmail from './WelcomeEmail.js';

  // You call renderToStaticMarkup to get pure, non-interactive HTML.
  // const emailHtml = renderToStaticMarkup(<WelcomeEmail name="Mawa" />);

  // This is what the output string looks like.
  const emailHtml = '<div style="font-family:sans-serif;padding:20px;border:1px solid #eee;border-radius:5px;max-width:600px"><h1 style="color:#333">Welcome, Mawa!</h1><p>Thanks for joining our platform. We&#x27;re excited to have you.</p><a href="https://example.com" style="color:blue;text-decoration:none">Get Started</a></div>';

  const renderToStringOutput = '<div style="font-family:sans-serif;padding:20px;border:1px solid #eee;border-radius:5px;max-width:600px" data-reactroot=""><h1 style="color:#333">Welcome, Mawa!</h1><p>Thanks for joining our platform. We&#x27;re excited to have you.</p><a href="https://example.com" style="color:blue;text-decoration:none">Get Started</a></div>';


  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
      <h3>Conceptual Server Logic for Generating an Email</h3>

      <h4>1. Using `renderToStaticMarkup` ✅</h4>
      <p>This generates clean HTML with no React-specific attributes. Perfect for emails or static content.</p>
      <pre style={{ backgroundColor: '#f0fff0', padding: '10px', whiteSpace: 'pre-wrap', border: '1px solid green' }}>
        <code>{emailHtml}</code>
      </pre>

      <h4>2. For Comparison: `renderToString` Output ⚠️</h4>
      <p>If we used `renderToString`, it would add `data-reactroot`, which is unnecessary for a static email.</p>
      <pre style={{ backgroundColor: '#fff0f0', padding: '10px', whiteSpace: 'pre-wrap', border: '1px solid red' }}>
        <code>{renderToStringOutput}</code>
      </pre>

      <p style={{fontWeight: 'bold', color: 'red', marginTop: '15px'}}>
        CRITICAL: The output of `renderToStaticMarkup` cannot be hydrated on the client. It is for static content only.
      </p>
    </div>
  );
}


export default function RenderToStaticMarkupExample() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={containerStyles}>
      <h1>`renderToStaticMarkup` Example</h1>
      <p>This API is used to generate non-interactive, static HTML from React components.</p>
      <ServerCode />
    </div>
  );
}