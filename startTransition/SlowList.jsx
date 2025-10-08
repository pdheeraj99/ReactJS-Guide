import { memo } from 'react';

/**
 * Idi oka "expensive" component.
 * Manam deenini intentionally slow ga chesam, so that
 * `startTransition` yokka power manaki clear ga kanipisthundi.
 *
 * Ee component, `query` prop maarina prathi sari, 250 list items ni
 * re-calculate chesi, re-render chesthundi. Idi UI freeze ni
 * simulate cheyadaniki help chesthundi.
 *
 * Manam deenini `memo` tho wrap chesam, so that query maarakapothe
 * anavasaramga re-render avvadu.
 */
function SlowList({ query }) {
  // Generate a large list of items.
  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(
      <ListItem key={i} query={query}>
        Item #{i + 1}
      </ListItem>
    );
  }

  return (
    <div className="slow-list">
      <h4>Slow List Results:</h4>
      <ul>{items}</ul>
    </div>
  );
}

function ListItem({ query, children }) {
  let startTime = performance.now();
  // Intentionally slow down the rendering by doing some work
  while (performance.now() - startTime < 1) {
    // Do nothing for 1ms to simulate a slow render
  }

  // Highlight the matching part of the text
  const index = children.toLowerCase().indexOf(query.toLowerCase());
  if (query && index !== -1) {
    const start = children.slice(0, index);
    const match = children.slice(index, index + query.length);
    const end = children.slice(index + query.length);
    return (
      <li>
        {start}
        <span className="highlight">{match}</span>
        {end}
      </li>
    );
  }

  return <li>{children}</li>;
}

export default memo(SlowList);