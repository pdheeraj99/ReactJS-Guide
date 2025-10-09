import React from 'react';

/*
  NOTE: To see the effect of these components, you need to use your browser's
  "View Page Source" or "Inspect Element" tool to check the <head> and <body>.
*/

// Example 1: A basic inline style component.
function BasicInlineStyle() {
  return (
    <div className="basic-style-container">
      {/*
        Ee <style> tag ki `href` and `precedence` levu.
        So, React deeniki special treatment ivvadu.
        Idi DOM lo ikkade, ee div lopaala render avuthundi.
        It will NOT be moved to the <head>.
      */}
      <style>
        {`
          .basic-style-container p {
            color: purple;
            font-weight: bold;
          }
        `}
      </style>
      <p>This paragraph is styled by a local, non-hoisted style tag.</p>
    </div>
  );
}

// Example 2: An advanced component that generates dynamic, hoisted styles.
function DynamicStyledBox({ color }) {
  const css = `
    .dynamic-box.box-${color} {
      border: 2px solid ${color};
      background-color: ${color}20; /* Add some transparency */
      color: ${color};
    }
  `;

  return (
    <>
      {/*
        MANAM IKKADA `href` AND `precedence` ISTHUNNAM!
        - `href`: Ee style block ki idi oka unique ID. React deeni chusi, ide color tho
          inko box render aithe, ee style tag ni malli add cheyyadu (deduplication).
        - `precedence`: Ee style ni vere stylesheets tho paatu order cheyadaniki.

        Because of these props, React will move this <style> tag to the <head>.
      */}
      <style href={`/css/dynamic-box-${color}`} precedence="medium">
        {css}
      </style>
      <div className={`dynamic-box box-${color}`} style={{ padding: '10px', borderRadius: '5px' }}>
        This box is dynamically styled with the color "{color}".
      </div>
    </>
  );
}

export default function StyleExamples() {
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
      <h1>&lt;style&gt; Component Examples</h1>

      <div style={exampleBoxStyles}>
        <h3>Usage: Basic Inline (Non-Hoisted) Style ✅</h3>
        <p>This style tag is rendered directly inside the component's div. (Check with "Inspect Element")</p>
        <BasicInlineStyle />
      </div>

      <div style={exampleBoxStyles}>
        <h3>Advanced: Dynamic and Hoisted Styles ✅</h3>
        <p>These style tags are moved to the document head and deduplicated. Even though we render two "blue" boxes, the style tag for blue is only added once.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <DynamicStyledBox color="blue" />
          <DynamicStyledBox color="green" />
          <DynamicStyledBox color="blue" />
        </div>
      </div>
    </div>
  );
}