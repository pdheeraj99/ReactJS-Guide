import React, { useState, useEffect } from 'react';

/*
  NOTE: To see the effect of these components, check your browser's tab title.
  React will update the document's title dynamically.
*/

// Example 1: A component that sets a static document title.
function AboutPage() {
  return (
    <div>
      {/*
        This is a static title. React hoists this to the <head>.
        If multiple components render a <title>, the last one rendered "wins".
      */}
      <title>About Our Awesome Site</title>
      <h2>About Us</h2>
      <p>We are a company that explains React in a fun way.</p>
    </div>
  );
}

// Example 2: A component that sets a dynamic document title based on state.
function NotificationsPage() {
  const [notificationCount, setNotificationCount] = useState(3);

  // A helper to simulate receiving a new notification every 3 seconds.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNotificationCount(currentCount => currentCount + 1);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/*
        CORRECT WAY: The title is dynamic! It uses a template literal to create a single string.
        This is the correct way to include variables in a title.
      */}
      <title>{`(${notificationCount}) New Notifications`}</title>
      <h2>Notifications</h2>
      <p>You have {notificationCount} unread notifications.</p>
    </div>
  );
}

// Example 3: Demonstrating the "wrong way" to set a title.
function WrongWayTitle() {
  const name = "Guest";
  // The following line would cause a runtime error in React because the children
  // are not a single string. It's an array: ['Welcome, ', 'Guest'].
  //
  // 🔴 <title>Welcome, {name}</title>
  //
  // To fix it, you must use a template literal: <title>{`Welcome, ${name}`}</title>

  return (
    <p style={{ color: 'red', fontWeight: 'bold' }}>
      The code for the "wrong way" is commented out in the source to prevent a crash. It would look like: <code>&lt;title&gt;Welcome, {"{name}"}&lt;/title&gt;</code>. This is wrong because it passes an array of children ('Welcome, ' and the variable `name`), not a single string.
    </p>
  );
}


export default function TitleExamples() {
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

  // We'll use state to switch between examples to make the title change obvious.
  const [activePage, setActivePage] = useState('notifications');

  return (
    <div style={containerStyles}>
      <h1>&lt;title&gt; Component Examples</h1>
      <p>Check your browser tab's title to see the changes!</p>

      <div style={{ marginBottom: '10px' }}>
        <strong>View Page:</strong>
        <button onClick={() => setActivePage('about')} style={{ marginLeft: '10px' }}>About Page</button>
        <button onClick={() => setActivePage('notifications')} style={{ marginLeft: '10px' }}>Notifications Page</button>
      </div>

      {activePage === 'about' && (
        <div style={exampleBoxStyles}>
          <h3>Usage: Static Title ✅</h3>
          <AboutPage />
          <p>This component sets the title to "About Our Awesome Site".</p>
        </div>
      )}

      {activePage === 'notifications' && (
        <div style={exampleBoxStyles}>
          <h3>Usage: Dynamic Title with Variables ✅</h3>
          <NotificationsPage />
          <p>This component sets a dynamic title that updates every few seconds. Check your browser tab!</p>
        </div>
      )}

      <div style={exampleBoxStyles}>
        <h3 style={{color: 'red'}}>Troubleshooting: The "Wrong Way" ❌</h3>
        <WrongWayTitle />
      </div>
    </div>
  );
}