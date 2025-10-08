import React from 'react';

/**
 * Idi oka simple, "dumb" child component.
 * Deeniki `memo` lanti superpowers em levu.
 *
 * Parent component re-render ayinappudalla, idi kuda
 * anavasaramga re-render avuthundi, even if its props
 * haven't changed.
 *
 * Manam console lo "Rendering RegularChild..." ane message ni
 * chustu, deenini confirm cheskovachu.
 */
function RegularChild({ user }) {
  console.log(`❌ Rendering RegularChild for ${user.name}...`);

  return (
    <div className="child regular-child">
      <h3>Regular Child</h3>
      <p>Name: {user.name}</p>
      <p>This component will re-render every time the parent's counter changes.</p>
    </div>
  );
}

export default RegularChild;