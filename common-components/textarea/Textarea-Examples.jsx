import React, { useState } from 'react';

// Example 1: A standard, controlled textarea.
function ControlledTextareaExample() {
  const [text, setText] = useState(
    'Hello, friend! This is a controlled textarea. Its value is managed by React state.'
  );

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <h3>Usage: Controlled Textarea ✅</h3>
      <p>
        The textarea's content is set by the `value` prop and updated via `onChange`.
      </p>
      <textarea
        value={text}
        onChange={handleChange}
        rows={5}
        cols={50}
        style={{ padding: '5px', border: '1px solid #999' }}
      />
      <div style={{ marginTop: '10px' }}>
        <h4>Live Preview:</h4>
        <p style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '10px', minHeight: '50px' }}>
          {text}
        </p>
      </div>
    </div>
  );
}

// Example 2: Demonstrating the "wrong way"
function WrongWayTextareaExample() {
  return (
    <div style={{ border: '1px solid #ffcccc', padding: '10px', borderRadius: '5px', backgroundColor: '#fff0f0' }}>
      <h3>Troubleshooting: The "Wrong Way" ❌</h3>
      <p>
        In HTML, you put content between `&lt;textarea&gt;` tags. In React, this is not allowed and will be ignored.
      </p>
      <label>
        This textarea won't show the initial text:
        <textarea rows={4} cols={50} style={{ padding: '5px', border: '1px solid #999' }}>
          This text is a child. React will ignore it! You won't see this.
        </textarea>
      </label>
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
        To set an initial value for an <strong>uncontrolled</strong> textarea, use <code>defaultValue="Your text here"</code>. To control it, use the <code>value</code> prop as shown in the correct example above.
      </p>
    </div>
  );
}


export default function TextareaExamples() {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={containerStyles}>
      <h1>&lt;textarea&gt; Component Examples</h1>
      <ControlledTextareaExample />
      <WrongWayTextareaExample />
    </div>
  );
}