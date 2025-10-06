/*
  Hey! Idi mana helper file.
  Ikkada manam konchem sample data and oka "slow" function ni create cheddam.
*/

// A big list of sample todos
export const initialTodos = new Array(5000).fill(0).map((_, index) => ({
  id: index,
  text: `Todo #${index + 1}`,
  completed: Math.random() > 0.5,
}));

// Our "expensive" function
export function filterTodos(todos, tab) {
  console.log(`[ARTIFICIALLY SLOW] Filtering ${todos.length} todos for "${tab}" tab.`);

  // Add an artificial delay to simulate a slow calculation
  const startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500ms to simulate a slow calculation
  }

  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
    return false;
  });
}