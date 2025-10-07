import React from 'react';

/*
  Hey! Idi mana "slow" tab component.
  Deeni pani okkate: render avvadaniki konchem time theeskovadam.

  Ee slowness ni simulate cheyyadaniki, manam prathi list item
  render avvadaniki konchem time theeskuntunattu act cheddam.
*/

function SlowPost({ index }) {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1ms to simulate a slow render for each item
  }

  return <li className="item">Post #{index + 1}</li>;
}


export default function SlowTab() {
  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
}