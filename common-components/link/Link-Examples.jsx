import React from 'react';

/*
  NOTE: Ee examples lo unna CSS files actual ga exist avvavu.
  Ee code kevalam <link> component ni ela use cheyalo chupinchadaniki matrame.
  A real app would have these CSS files in its public folder.
*/

// Example 1: Linking a stylesheet for a specific component
function ThemedButton() {
  return (
    <>
      {/*
        React ee link tag ni automatic ga document <head> loki move chesthundi.
        'precedence' prop ivvadam mandatory for stylesheets.
        Same precedence unna styles group avuthayi.
      */}
      <link
        rel="stylesheet"
        href="/css/themed-button.css"
        precedence="medium"
      />
      <button className="themed-button">Click Me!</button>
    </>
  );
}

// Example 2: Linking a favicon for the page
function PageWithFavicon() {
  return (
    <>
      {/*
        Favicons lanti non-stylesheet links ki 'precedence' avasaram ledu.
        React veetini kuda <head> loki hoist chesthundi.
      */}
      <link rel="icon" href="/favicon.ico" />
      <h2>Page with a Favicon</h2>
      <p>Check the browser tab to see the icon!</p>
    </>
  );
}

// Example 3: Preloading resources for better performance
function PreloadingComponent() {
  return (
    <>
      {/*
        'preload' manaki future lo avasaram ayye resource ni mundhe fetch cheyadaniki help chesthundi.
        'as' prop tho manam aa resource type ento chepthunnam.
      */}
      <link rel="preload" href="/fonts/my-custom-font.woff2" as="font" />
      <link rel="preload" href="/images/important-banner.jpg" as="image" />
      <h2>Preloading Resources</h2>
      <p>This component tells the browser to start downloading a font and an image that will be needed soon.</p>
    </>
  );
}

// Example 4: Demonstrating stylesheet deduplication
function DuplicateStyleComponent() {
  return (
    <>
      {/*
        React is smart! Ee link tag ni manam rendu sarlu render chesina,
        final HTML <head> lo idi oke sari kanipisthundi.
      */}
      <link rel="stylesheet" href="/css/shared-styles.css" precedence="default" />
      <p>First instance of the component.</p>
    </>
  );
}


export default function LinkExamples() {
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
      <h1>&lt;link&gt; Component Examples</h1>

      <div style={exampleBoxStyles}>
        <h3>Usage: Linking a Component-Specific Stylesheet ✅</h3>
        <ThemedButton />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Linking a Favicon ✅</h3>
        <PageWithFavicon />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Preloading Resources for Performance ✅</h3>
        <PreloadingComponent />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Feature: Stylesheet Deduplication ✅</h3>
        <p>Even though we render `DuplicateStyleComponent` twice, the "shared-styles.css" link is only added to the head once.</p>
        <DuplicateStyleComponent />
        <DuplicateStyleComponent />
      </div>
    </div>
  );
}