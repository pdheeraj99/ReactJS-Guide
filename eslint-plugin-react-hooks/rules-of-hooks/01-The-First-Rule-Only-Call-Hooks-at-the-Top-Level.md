# The First Rule: Hooks ni Top-Level lo ne Call Cheyyali! ☝️

Hey mawa! Ee `eslint-plugin-react-hooks` loni first and most important rule entante:
> **Don’t call Hooks inside loops, conditions, or nested functions.**

Ante, Hooks eppudu mee component function lopaala, at the very top, elanti `if`, `for`, or `function` lopaala lekunda undali.

Kani... **enduku? Why this strange rule?**

The answer is simple: **React relies on the call order of Hooks to keep track of state.**

### How React Remembers State

React lopaala, prathi component ki oka internal memory cell array laantidi untundi. Meeru `useState` or `useEffect` ni call chesinappudu, React aa memory cell lo aa hook యొక్క state ni store chesthundi.

**Analogy: The School Attendance Register 👨‍🏫**
Imagine, mee component oka classroom.
*   **Hooks (`useState`, `useEffect`)**: Students.
*   **React's internal memory**: The attendance register.

Teacher (React) prathi roju (prathi render) attendance theeskuntadu.
*   First, `useState` (student A) ni call chesthe, register lo first slot lo student A peru rastadu.
*   Second, `useEffect` (student B) ni call chesthe, second slot lo student B peru rastadu.
*   And so on...

React prathi render lo, **hooks anni oke order lo call avuthayi** ani expect chesthundi. Ee consistent order valla, adi correct student ki correct state ni match cheyyagalugutundi.

### What Happens When You Break the Rule?

Ippudu, manam oka hook ni `if` condition lopaala pettam anukondi.

```jsx
// ❌ WRONG - Hook inside a condition!
function MyComponent({ showBio }) {
  const [name, setName] = useState('Jules'); // Call #1

  if (showBio) {
    const [bio, setBio] = useState('I am a dev'); // Call #2 (conditional)
  }

  const [counter, setCounter] = useState(0); // Call #3?
}
```

*   **First Render (`showBio` is `true`):**
    1.  `useState('Jules')` -> Slot 1
    2.  `useState('I am a dev')` -> Slot 2
    3.  `useState(0)` -> Slot 3
*   **Second Render (`showBio` is `false`):**
    1.  `useState('Jules')` -> Slot 1
    2.  `if` condition is false, so the second hook is **skipped!**
    3.  `useState(0)` -> **Slot 2**

Problem chusara? Second render lo, `counter` state anedi `bio` state యొక్క slot loki vellipoindi. React antha confuse aipothundi. The attendance register is messed up! Ee mismatch valla chala unpredictable bugs vasthayi.

```mermaid
graph TD
    subgraph "Render 1 (showBio=true)"
        A[useState(name)] --> B[useState(bio)];
        B --> C[useState(counter)];
    end

    subgraph "Render 2 (showBio=false)"
        D[useState(name)] --> E{Hook call is skipped!};
        E --> F[useState(counter)];
    end

    subgraph "React's Memory"
        Slot1 --> Slot2 --> Slot3;
    end

    A --> Slot1;
    B --> Slot2;
    C --> Slot3;

    D --> Slot1;
    F --> Slot2;

    linkStyle 4,5,6 stroke-width:2px,stroke:green;
    linkStyle 7,8 stroke-width:2px,stroke:red;
```

Anduke, ee rule chala strict. Hooks eppudu top-level lo, oke order lo undali. Okavela meeku conditional logic kavali anukunte, adi hook *lopaala* pettandi, hook ni `if` lopaala kadu.

Next, manam second rule gurinchi chuddam: "Hooks ni ekkada nunchi call cheyyali?" anedi. Let's go! ➡️