/*
  Hey! Idi mana simple external store.
  Idi React ki bayata unna oka plain JavaScript object.
  Real-world lo, idi Redux, Zustand, or even the browser's `history` object
  lantiది avvochu.
*/

let nextId = 0;
let todos = [{ id: nextId++, text: 'Initial todo' }];
let listeners = []; // The list of callback functions to call on change

export const todosStore = {
  // 1. A method to add a new todo
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'New todo ' + nextId }];
    // When data changes, call all the listeners!
    emitChange();
  },

  // 2. A method to subscribe to changes
  subscribe(listener) {
    listeners = [...listeners, listener];
    console.log('A component subscribed. Listeners:', listeners.length);

    // The subscribe function must return an unsubscribe function
    return () => {
      listeners = listeners.filter(l => l !== listener);
      console.log('A component unsubscribed. Listeners:', listeners.length);
    };
  },

  // 3. A method to get the current data (a "snapshot")
  getSnapshot() {
    return todos;
  }
};

// A helper function to notify all subscribed components
function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}