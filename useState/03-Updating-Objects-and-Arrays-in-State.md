# Updating Objects & Arrays: The Immutability Rule! 🧊

Hey! Manam ippati varaku simple state (numbers, strings) ni update cheyyadam chusam. Adi easy. `setCount(count + 1)`.

Kani, mana state lo objects or arrays unte, vishayam konchem maaruthundi. Ikkada manam oka chala important rule ni follow avvali: **The Rule of Immutability**.

"Immutability" ante "maarpu chendani" ani ardham.

**The Golden Rule:** Never, ever directly mutate objects or arrays in React state. Always create a new one.

## Why Can't I Just Change It?

React performance kosam, state maarindo ledo telusukodaniki, adi pata state ni kotha state tho compare chesthundi.
*   Simple values (numbers, strings) ki, adi `5 === 6` lanti comparison chesthundi. Easy.
*   Kani objects and arrays ki, adi vaati lopaala unna content ni check cheyyadu. Adi kevalam vaati **memory reference** ni compare chesthundi.

Nuvvu oka object ni mutate cheste (e.g., `myObject.name = 'Jules'`), nuvvu daani lopaala unna data ni marchavu, kani aa object memory lo ade chota untundi. Daani reference maaradu.

So, React chusthundi, "Pata reference, kotha reference oke laaga unnayi. State em maaraledu." and **it will not re-render your component!** Nee UI update avvadu.

```mermaid
graph TD
    subgraph "❌ The WRONG Way (Mutation)"
        A[Original State <br> `obj1` at memory location @123] --> B{`obj1.name = 'new'`};
        B --> C[Mutated State <br> Still `obj1` at memory location @123];
        C --> D{React compares: `@123 === @123`};
        D --> E[Result: No difference found! <br> NO RE-RENDER 😭];
    end

    subgraph "✅ The RIGHT Way (Immutability)"
        F[Original State <br> `obj1` at memory location @123] --> G{`const obj2 = { ...obj1, name: 'new' }`};
        G --> H[New State <br> `obj2` at new memory location @456];
        H --> I{React compares: `@123 !== @456`};
        I --> J[Result: Difference found! <br> TRIGGERS RE-RENDER 🎉];
    end
```

## How to Update Objects Correctly

Eppudu kotha object ni create cheyyali. Spread syntax (`...`) manaki ee vishayam lo chala help chesthundi.

```jsx
const [user, setUser] = useState({ name: 'Jules', age: 30 });

function handleUpdateAge() {
  // ❌ WRONG: Mutating the object
  // user.age = 31;
  // setUser(user); // This won't work!

  // ✅ RIGHT: Creating a new object
  setUser({
    ...user, // Copy all properties from the old user object
    age: 31  // Override the property you want to change
  });
}
```

## How to Update Arrays Correctly

Arrays ki kuda ide rule. `push`, `pop`, `splice` lanti methods original array ni mutate chesthayi. So, వాటిని vadakudadu.

Instead, manam `map`, `filter`, `concat`, or spread syntax lanti methods vadali, endukante eevi eppudu **kotha array ni return** chesthayi.

```jsx
const [tasks, setTasks] = useState([]);

function handleAddTask(text) {
  // ❌ WRONG: `push` mutates the array
  // tasks.push({ id: 3, text: text });
  // setTasks(tasks); // This won't work!

  // ✅ RIGHT: Creating a new array with the new item
  setTasks([
    ...tasks, // Copy all old tasks
    { id: 3, text: text } // Add the new one
  ]);
}

function handleDeleteTask(taskId) {
  // ✅ RIGHT: `filter` returns a new array
  setTasks(
    tasks.filter(t => t.id !== taskId)
  );
}
```

Ee immutability rule anedi React lo atni kante important concepts lo okati. Deenini correct ga follow aithe, chala bugs ni avoid cheyyochu.

Okay, ippudu manaki state ni ela update cheyyalo telisindi. Kani, `setState` call cheyagane, state ventane maaripothunda? Or konchem time paduthunda? Ee tricky question ki answer manam next chuddam, when we talk about "State as a Snapshot". 🤔➡️