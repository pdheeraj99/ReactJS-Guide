# The Problem: Too Many State Updates! 🤯

Hey friend! Welcome to the `useReducer` chapter. Manam ippati varaku state kosam `useState` ni use chesam. Simple state ki adi perfect. Kani, mana component lo state logic complex avuthunnappudu, `useState` tho pani cheyyadam konchem kashtam avuthundi.

## The Messy To-Do List Scenario

Imagine chesko, manam oka simple To-Do list app build chesthunnam. Ee app lo manam em cheyyali?
1.  Kotha to-do ni add cheyyali.
2.  Unna to-do ni delete cheyyali.
3.  Unna to-do ni "completed" ga mark cheyyali.

Ee logic antha `useState` tho implement cheste, mana component ila untundi:

```jsx
function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTask, setNewTask] = useState('');

  function handleAddTask() {
    const newTodo = { id: Date.now(), text: newTask, completed: false };
    setTodos([...todos, newTodo]);
    setNewTask('');
  }

  function handleDeleteTask(taskId) {
    setTodos(todos.filter(t => t.id !== taskId));
  }

  function handleToggleTask(taskId) {
    setTodos(
      todos.map(t => {
        if (t.id === taskId) {
          return { ...t, completed: !t.completed };
        }
        return t;
      })
    );
  }

  return (
    <div>
      {/* ... JSX to show todos and buttons ... */}
      <input value={newTask} onChange={e => setNewTask(e.target.value)} />
      <button onClick={handleAddTask}>Add</button>
      {/* ... buttons for delete and toggle inside the list ... */}
    </div>
  );
}
```

**The Problem:**
Ee code pani chesthundi, kani chudu... mana **state update logic antha** (`handleAddTask`, `handleDeleteTask`, `handleToggleTask`) mana component lopaale undi.

*   Component peddaga ayye koddi, ee event handlers inka peruguthayi.
*   Prathi state update logic component lopaale undadam valla, code chala "busy" ga and "messy" ga kanipisthundi.
*   Testing cheyyadam kuda konchem kashtam. Manam ee logic ni test cheyyali ante, full component ni render cheyyali.

Simple ga cheppalante, **mana component ki state ni *ela* update cheyyalo aney responsibility ekkuva aipoyindi.** Daani pani kevalam UI ni chupinchadam matrame undali.

```mermaid
graph TD
    A[Component] --> B{UI Logic (JSX)};
    A --> C{State Update Logic};

    subgraph "Component's Responsibilities"
        B
        C
    end

    style C fill:#ffcccc
```

Ee state update logic ni component nunchi bayataki theesi, code ni inka clean ga and organized ga cheyyadanike, React manaki `useReducer` aney hook ni ichindi.

Next, manam `useReducer` ee problem ni ela solve chesthundo, state logic ni component nunchi ela separate chesthundo chuddam. Ready to clean up our code? Let's go! 🧹➡️