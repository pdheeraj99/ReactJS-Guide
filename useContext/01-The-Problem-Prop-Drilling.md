# The Problem: "Prop Drilling" aney Thala Noppi! 🤕

Hey friend! Welcome to the `useContext` chapter. Ee hook chala useful, kani deeni value teliyali ante, manam mundu idi solve chese oka common problem gurinchi telusukovali. Aa problem pere **Prop Drilling**.

## Asalu Enti ee Prop Drilling?

Imagine chesko, nuvvu oka pedda office building lo top floor lo unnav. Nuvvu ground floor lo unna security guard ki oka message pass cheyyali. Kani, nuvvu direct ga velli cheppalevu.

So, nuvvu nee kindha floor lo unna manager ki chepthav. Aa manager daani kindha floor manager ki... ala message antha kindhaki velle sariki, chala mandhi madyalo untaru. Ee madyalo unna managers ki aa message tho em pani ledu, వాళ్లు just daanini kindhaki pass chesthunnaru anthe.

Ee process ne React lo **Prop Drilling** antaru.

**React lo cheppalante:** Oka top-level parent component nunchi chala deep ga unna child component ki data (props) ni pass cheyyadaniki, manam aa data ni madyalo unna anni components gunda pass cheyyalsi vasthundi, aa madyalo unna components ki aa data tho em avasaram lekapoyina.

Ee process chala tedious and code ni maintain cheyyadaniki chala kashtam chesthundi.

## Let's see a code example of the problem:

Imagine manaki ila component tree undi anukundam: `App -> Section -> Panel -> Button`.

Manam `App` component lo unna `theme` ('dark' or 'light') aney data ni `Button` component ki pampali.

```jsx
// App.jsx
function App() {
  const theme = 'dark';
  return <Section theme={theme} />; // Step 1: Pass to Section
}

// Section.jsx
function Section({ theme }) {
  return <Panel theme={theme} />; // Step 2: Pass to Panel (Section ki theme tho pani ledu!)
}

// Panel.jsx
function Panel({ theme }) {
  return <Button theme={theme} />; // Step 3: Pass to Button (Panel ki kuda theme tho pani ledu!)
}

// Button.jsx
function Button({ theme }) {
  // Finally! Ikkada manaki theme avasaram.
  return <button className={theme}>Click Me</button>;
}
```

Chusava? `Button` ki `theme` ivvadaniki, manam daanini anavasaranga `Section` and `Panel` gunda pass chesam. Ee rendu components ki `theme` prop tho em pani ledu. They are just acting like messengers. Idi chinnaga unna app lo okay, kani pedda application lo idi oka nightmare aipothundi.  nightmares. 😨

```mermaid
graph TD
    A[App (has theme)] -- "theme" prop --> B(Section);
    B -- "theme" prop --> C(Panel);
    C -- "theme" prop --> D[Button (needs theme)];

    subgraph "Prop Drilling Path 😫"
        direction LR
        A --> B --> C --> D;
    end

    style B fill:#ffb3b3,stroke:#333,stroke-width:2px
    style C fill:#ffb3b3,stroke:#333,stroke-width:2px
```

Ee "prop drilling" aney thala noppi ni thagginchadanike, React manaki oka powerful solution ichindi. Ade **Context**.

Next, manam Context ee problem ni ela solve chesthundo, data ni direct ga avasaram unna component ki ela "teleport" chesthundo chuddam. Ready for the magic? ✨➡️