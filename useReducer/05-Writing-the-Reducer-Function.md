# Writing the Reducer Function: The Golden Rules! ✍️

Manam `useReducer` gurinchi chala matladukunnam. Ippudu asalu hero, the **reducer function**, ni ela rayalo chuddam. Idi `useReducer` pattern ki brain lantiది.

## The Reducer's Signature

A reducer function is a simple, pure JavaScript function. Adi eppudu rendu arguments theeskuntundi and oka value ni return chesthundi.

`function myReducer(state, action) { ... return nextState; }`

1.  **`state`:** The current state value.
2.  **`action`:** The action object that was dispatched.
3.  **`nextState`:** The new state value that the reducer calculates and returns.

## The `switch` Statement Pattern

Reducer lopaala, manam vachina `action.type` ni batti veru veru logic ni run cheyyali. Deeniki `if/else` statements vadacchu, kani atni kante common and readable pattern **`switch` statement** ni use cheyyadam.

```javascript
function todosReducer(todos, action) {
  switch (action.type) {
    case 'added': {
      // Logic for adding a todo...
      return nextState;
    }
    case 'deleted': {
      // Logic for deleting a todo...
      return nextState;
    }
    case 'changed': {
      // Logic for changing a todo...
      return nextState;
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}
```
`default` case lo error throw cheyyadam manchi practice. Oka vela manam teliyani action type ni dispatch cheste, adi manaki bug ni ventane chupisthundi.

## The Most Important Rule: State is Read-Only!  immutable!

Idi atni kante, atni kante important rule. Nuvvu deenini eppudu marchipokudadu.

**NEVER, EVER mutate the `state` argument inside a reducer.**

"Mutate" ante direct ga change cheyyadam. For example, `state.age = 43` or `state.push(...)`.

React performance kosam, state object or array యొక్క memory location maarithe thappa, adi re-render cheyyadu. Nuvvu `state` ni direct ga mutate cheste, daani memory location maaradu. So, React ki state maarindi ani teliyadu, and **your UI will not update!**

Eppudu, kotha state kosam, oka **kotha object or kotha array** ni create chesi, daanini return cheyyali.

### Example: Updating an array

Manam to-do list lo oka kotha to-do ni add cheddam.

#### ❌ The WRONG Way (Mutation)
```javascript
case 'added': {
  // WRONG! `push` mutates the original `todos` array.
  todos.push({ id: action.id, text: action.text, done: false });
  return todos; // Returning the same mutated array. UI won't update!
}
```

#### ✅ The RIGHT Way (Creating a new array)
```javascript
case 'added': {
  // CORRECT! Creating a new array with the new item.
  return [
    ...todos, // Copy all old todos
    { id: action.id, text: action.text, done: false } // Add the new one
  ];
}
```
Ikkada manam spread syntax (`...todos`) tho pata items anni kotha array loki copy chesi, daaniki kotha item ni add chesthunnam.

### Example: Updating an object
```javascript
// WRONG! Mutating the state object.
state.age = state.age + 1;
return state;

// RIGHT! Creating a new object.
return {
  ...state, // Copy all old properties
  age: state.age + 1 // Override the property you want to change
};
```

Ee immutability rule ni follow avvadam `useReducer` (and React in general) lo atni kante mukhyam.

And that's it! You now know how to write a clean, robust, and correct reducer function.

Next, manam ee concepts anni kalipi, a full To-Do list app example ni code lo chuddam! Ready to build? 💻🚀➡️