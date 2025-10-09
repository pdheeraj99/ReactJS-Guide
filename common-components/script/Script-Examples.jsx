import React from 'react';

/*
  NOTE: Ee examples lo unna external scripts actual ga exist avvavu.
  Ee code kevalam <script> component ni ela use cheyalo chupinchadaniki matrame.
  A real app would have these scripts available at the specified URLs.

  To see the effect of these components, you need to use your browser's
  "View Page Source" or "Inspect Element" tool to check the <head> and <body>.
*/

// Example 1: Loading an external third-party library
function MapComponent() {
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);

  return (
    <>
      {/*
        This is an external script. Since it has `async={true}`, React will
        move it to the <head> and deduplicate it.
        The `onLoad` event is useful to know when the library is ready to be used.
      */}
      <script
        src="https://maps.example.com/api.js"
        async={true}
        onLoad={() => setIsScriptLoaded(true)}
      />
      <div id="map">
        {isScriptLoaded ? 'Map API has loaded!' : 'Loading Map API...'}
      </div>
    </>
  );
}

// Example 2: Adding an inline script for tracking
function LikeButton() {
  const handleClick = () => {
    console.log('Like button was clicked!');
    // In a real app, you might have an inline script here that sends this
    // event to an analytics service.
  };

  return (
    <>
      <button onClick={handleClick}>Like 👍</button>
      {/*
        This is an inline script. React will render it exactly where it appears
        in the component tree. It will NOT be moved to the <head>.
        It will also NOT be deduplicated if this component is used multiple times.
      */}
      <script>
        {`console.log("LikeButton component has rendered.");`}
      </script>
    </>
  );
}

// Example 3: Demonstrating script deduplication
function DuplicateScriptComponent() {
  return (
    <>
      {/*
        Even though we render this component twice below, React will only
        add "shared-library.js" to the <head> one time because the `src`
        is identical and `async` is true.
      */}
      <script src="/js/shared-library.js" async={true} />
      <p>This component depends on shared-library.js</p>
    </>
  );
}

export default function ScriptExamples() {
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
      <h1>&lt;script&gt; Component Examples</h1>

      <div style={exampleBoxStyles}>
        <h3>Usage: Loading an External Script ✅</h3>
        <p>This component loads a fake Map API. The `onLoad` prop updates the state.</p>
        <MapComponent />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Usage: Adding an Inline Script ✅</h3>
        <p>This button has an inline script that logs a message to the console when it renders. Check the browser console.</p>
        <LikeButton />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Feature: External Script Deduplication ✅</h3>
        <p>We render `DuplicateScriptComponent` twice, but "shared-library.js" is only added to the head once. (Check with "View Source")</p>
        <DuplicateScriptComponent />
        <DuplicateScriptComponent />
      </div>
    </div>
  );
}