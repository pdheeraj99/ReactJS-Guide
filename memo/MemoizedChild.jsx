import React, { memo } from 'react';

/**
 * Idi mana "smart" child component.
 * Manam deenini `React.memo` tho wrap chesam.
 *
 * Ippudu, parent re-render ayinappudu, React ee component props ni
 * compare chesthundi. Props marakapothe, React ee component ni
 * re-render cheyyadu!
 *
 * Deeni valla, console lo "Rendering MemoizedChild..." ane message
 * kevalam props (e.g., user name) marinappudu matrame kanipisthundi,
 * parent counter marinanduku kadu.
 */
function MemoizedChild({ user }) {
  console.log(`✅ Rendering MemoizedChild for ${user.name}... (This should be rare!)`);

  return (
    <div className="child memo-child">
      <h3>Memoized Child</h3>
      <p>Name: {user.name}</p>
      <p>This component will ONLY re-render if its `user` prop changes.</p>
    </div>
  );
}

// Wrap the component in memo before exporting
export default memo(MemoizedChild);