import React, { useReducer, useState } from 'react';

/*
  Hey! Idi mana `useReducer` example.
  Ikkada manam oka full To-Do list app ni build cheddam.
*/

// --- The Reducer Function ---
// Idi mana component bayata untundi.
// Idi state ni ela update cheyyalo aney logic antha contain chesthundi.
// It takes the current state and an action, and returns the next state.
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      // ✅ Returns a NEW array
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    }
    case 'changed': {
      // ✅ Returns a NEW array
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      // ✅ Returns a NEW array
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

// --- The Main Component ---
let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Build a project', completed: false },
  { id: 2, text: 'Deploy it', completed: false },
];

export default function TodoList() {
  // 1. Call useReducer instead of multiple useStates
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [newTaskText, setNewTaskText] = useState('');

  function handleAddTask() {
    if (newTaskText.trim() === '') return;
    // 2. Dispatch an "action object" to update state
    dispatch({
      type: 'added',
      id: nextId++,
      text: newTaskText,
    });
    setNewTaskText('');
  }

  function handleChangeTask(task) {
    // 2. Dispatch an action
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    // 2. Dispatch an action
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <div className="app-container">
      <h1>useReducer To-Do List</h1>
      <p>
        All the logic for adding, changing, and deleting tasks is handled
        inside the `tasksReducer` function, keeping our component clean.
      </p>
      <hr />
      <input
        placeholder="Add new task"
        value={newTaskText}
        onChange={e => setNewTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                handleChangeTask({ ...task, completed: !task.completed });
              }}
            />
            {task.text}
            <button onClick={() => handleDeleteTask(task.id)} style={{marginLeft: '10px'}}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}