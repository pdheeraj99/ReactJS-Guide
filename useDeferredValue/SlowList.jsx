import React, { memo } from 'react';

/*
  Hey! Idi mana "slow" component.
  Real world lo, idi oka pedda data grid, oka complex chart,
  or thousands of items unna list avvochu.

  Ee slowness ni simulate cheyyadaniki, manam prathi list item
  render avvadaniki konchem time theeskuntunattu act cheddam.
*/

const SlowList = memo(function SlowList({ text }) {
  // 250 items tho oka pedda list ni create cheddam.
  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(
      <ListItem key={i} text={text}>
        Item #{i}
      </ListItem>
    );
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0, transition: 'opacity 0.5s' }}>
      {items}
    </ul>
  );
});

function ListItem({ text, children }) {
  // Artificial delay to simulate a slow render
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1ms to simulate a slow render
  }

  // Filter logic: `text` unte, item text lo aa text undaali ani check cheddam
  if (text && !children.includes(text)) {
    return null;
  }

  return <li>{children}</li>;
}

export default SlowList;