import React, { useMemo } from 'react';
import { filterTodos } from './utils.js';

/*
  Hey! Idi mana main `TodoList` component.
  Ikkada manam `useMemo` ni use chesi, anavasaramaina slow calculations
  ni aapestham.
*/
export default function TodoList({ todos, theme, tab }) {
  // --- The Magic Part ✨ ---
  // Manam `filterTodos` aney expensive calculation ni `useMemo` lo wrap chesthunnam.
  //
  // How it works:
  // - `useMemo` lopaala unna function (`() => filterTodos(...)`)
  //   kevalam dependencies (`todos` or `tab`) maarithe ne run avuthundi.
  // - `theme` maarithe, ee component re-render avuthundi, kani `useMemo`
  //   dependencies maaraledu kabatti, adi lopaala unna function ni
  //   malli run cheyyakunda, cache lo unna pata `visibleTodos` array ne
  //   return chesthundi.
  //
  // Result: The UI is fast even when the theme changes!
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );

  const listStyle = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#333' : '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '10px'
  };

  return (
    <div style={listStyle}>
      <p><b>Note: <code>filterTodos</code> is artificially slowed down to 500ms!</b></p>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
}