import React from 'react';

// 1. Basic Progress Bar
// Ekkada manam simple ga oka progress bar create chestunnam.
// Default `max` value 1 untundi, so `value={0.5}` ante 50% progress chupistundi.
function BasicProgressBar() {
  return (
    <div>
      <p>Basic Progress (50%):</p>
      <progress value={0.5} />
    </div>
  );
}

// 2. Progress Bar with a `max` attribute
// Ekkada manam `max` attribute ni 100 ga set chesam.
// So, `value` ni 0 nunchi 100 madhya lo ivvachu.
function CustomMaxProgressBar() {
  return (
    <div>
      <p>Progress with max=100 (75%):</p>
      <progress value={75} max={100} />
    </div>
  );
}

// 3. Indeterminate Progress Bar
// Okavela task entha time padutundo teliyakapothe, `value` ni `null` ga isthe,
// browser progress bar ni "indeterminate" (loading) state lo chupistundi.
function IndeterminateProgressBar() {
  return (
    <div>
      <p>Indeterminate Progress (task running...):</p>
      <progress value={null} />
    </div>
  );
}

// 4. Wrong Way: Value greater than max
// `value` prop eppudu `max` kanna takkuva undali.
// Ekkada manam `value` ni `max` kanna ekkuva isthunnam, so browser daani `max` value laage treat chestundi (i.e., 100%).
function WrongWayProgressBar() {
  return (
    <div>
      <p>Wrong Way: value (150) &gt; max (100):</p>
      <progress value={150} max={100} />
    </div>
  );
}

// Main component to render all examples
export default function ProgressExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'sans-serif' }}>
      <h2><code>&lt;progress&gt;</code> Component Examples</h2>
      <BasicProgressBar />
      <hr />
      <CustomMaxProgressBar />
      <hr />
      <IndeterminateProgressBar />
      <hr />
      <WrongWayProgressBar />
      <hr />
      <h3>All states at once:</h3>
      <progress value={0} />
      <progress value={0.5} />
      <progress value={0.7} />
      <progress value={75} max={100} />
      <progress value={1} />
      <progress value={null} />
    </div>
  );
}