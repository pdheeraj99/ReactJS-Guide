import React, { memo } from 'react';

/**
 * Idi inka "smarter" component.
 * Deeniki manam `memo` tho paatu, oka custom comparison function kuda isthunnam.
 */
function CustomMemoizedChild({ user }) {
  console.log(
    `CUSTOM MEMO: Rendering for ${user.name}... (This should happen only when user.id changes)`
  );

  return (
    <div className="child custom-memo-child">
      <h3>Custom Memoized Child</h3>
      <p>Name: {user.name}</p>
      <p>
        This component has custom logic. It will ONLY re-render if the{' '}
        <b>user.id</b> changes, even if the name changes!
      </p>
    </div>
  );
}

/**
 * Idi mana custom comparison function.
 * React deeniki pata props ni, kottha props ni isthundi.
 *
 * Manam ikkada, "user.id maaraledu ante, props maaraledu" ani chepthunnam.
 * So, `user.name` marigina, `user.id` maaraledu kabatti, ee function
 * `true` return chesthundi, and component re-render avvadu.
 *
 * @param {{ user: { id: number, name: string } }} prevProps
 * @param {{ user: { id: number, name: string } }} nextProps
 * @returns {boolean} `true` if props are considered equal, otherwise `false`.
 */
function areUsersEqual(prevProps, nextProps) {
  console.log('CUSTOM MEMO: Comparing props...');
  console.log(`- Previous ID: ${prevProps.user.id}`);
  console.log(`- Next ID: ${nextProps.user.id}`);
  const isEqual = prevProps.user.id === nextProps.user.id;
  console.log(`- Are IDs equal? ${isEqual}. So, props are equal.`);
  return isEqual;
}

// Wrap the component with memo and pass our custom function as the second argument
export default memo(CustomMemoizedChild, areUsersEqual);