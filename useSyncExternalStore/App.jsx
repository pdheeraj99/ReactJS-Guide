import React, { useSyncExternalStore } from 'react';
import { todosStore } from './externalStore.js';

/*
  Hey! Idi ee example ki main App component.
  Ikkada manam `useSyncExternalStore` ni use chesi, mana custom store ki
  connect avudam.
*/
export default function App() {
  // --- The Magic Part ✨ ---
  // Manam hook ki a rendu functions pass chesthunnam:
  // 1. `todosStore.subscribe`: Store lo changes ni ela listen cheyyalo chepthundi.
  // 2. `todosStore.getSnapshot`: Store nunchi current data ni ela theeskovalo chepthundi.
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot
  );

  const appStyle = {
    fontFamily: 'sans-serif',
    padding: '20px',
  };

  function handleAddTodo() {
    // Manam direct ga store method ni call chesthunnam.
    // Ee change valla, store lopaala unna `emitChange` call ayyi,
    // mana component re-render avuthundi.
    todosStore.addTodo();
  }

  return (
    <div style={appStyle}>
      <h1>useSyncExternalStore Demo</h1>
      <p>
        This component subscribes to an external, non-React data store. Click
        the button to update the store, and see how the component re-renders
        with the new data.
      </p>
      <hr />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}