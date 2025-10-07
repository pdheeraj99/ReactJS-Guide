import React, { Fragment } from 'react';

/*
  Hey! Idi ee chapter ki main App component.
  Ikkada manam `div` ki and `Fragment` ki madhyalo unna theda ni
  DOM lo chuddam.
*/

const glossaryItems = [
  {
    id: 1,
    term: 'State',
    description: 'A memory of a component.'
  },
  {
    id: 2,
    term: 'Component',
    description: 'A reusable piece of UI.'
  }
];

// --- ❌ The WRONG Way (with an extra div) ---
// Ee component `<dl>` (description list) lopaala render avvali,
// so adi kevalam `<dt>` and `<dd>` elements ni matrame return cheyyali.
// Kani, manam `<div>` tho wrap cheyyadam valla, invalid HTML create avuthundi.
function GlossaryWrong() {
  return (
    <div>
      <dt>Component</dt>
      <dd>A reusable piece of UI.</dd>

      <dt>State</dt>
      <dd>A memory of a component.</dd>
    </div>
  );
}


// --- ✅ The RIGHT Way (with Fragment) ---
// `<>` (or `<Fragment>`) anedi DOM lo extra node ni create cheyyadu.
// So, `<dt>` and `<dd>` direct ga `<dl>` lopaala correct ga place avuthayi.
function GlossaryRight() {
  return (
    <>
      <dt>Component</dt>
      <dd>A reusable piece of UI.</dd>

      <dt>State</dt>
      <dd>A memory of a component.</dd>
    </>
  );
}

// --- Example with `key` prop ---
// List render chesetappudu, key prop ivvali. So, manam
// `<Fragment>` ni explicitly import chesi vadali.
function GlossaryWithKey() {
  return glossaryItems.map(item => (
    <Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  ));
}


export default function App() {
  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <h1>Fragment Demo</h1>
      <p>
        Inspect the two lists below with your browser's developer tools.
      </p>
      <hr />

      <h3>❌ Wrong Way (with `&lt;div&gt;` wrapper)</h3>
      <p>Notice the extra `div` inside the `dl` tag, which is invalid HTML.</p>
      <dl>
        <GlossaryWrong />
      </dl>

      <hr />

      <h3>✅ Right Way (with `&lt;&gt;` Fragment)</h3>
      <p>Notice there is no extra wrapper. The `dt` and `dd` are direct children of `dl`.</p>
      <dl>
        <GlossaryRight />
      </dl>

      <hr />

      <h3>✅ Right Way for Lists (with `&lt;Fragment key=...&gt;`)</h3>
      <p>When mapping an array, you must use the full Fragment syntax to provide a key.</p>
      <dl>
        <GlossaryWithKey />
      </dl>
    </div>
  );
}