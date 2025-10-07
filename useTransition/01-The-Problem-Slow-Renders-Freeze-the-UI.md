# The Problem: Slow Renders Freeze the UI! 🥶

Hey friend! Welcome to the `useTransition` chapter. Ee hook `useDeferredValue` ki chala similar ga untundi, kani idi veru situation lo use avuthundi.

Deenini ardham cheskodaniki, manam oka tabbed interface example theeskundam.

## The Slow Tab Scenario

Imagine chesko, manam oka website lo unnam. Daanilo moodu tabs unnayi: "About", "Posts", and "Contact".
*   "About" and "Contact" tabs chala fast ga load avuthayi.
*   Kani, "Posts" tab lo chala data undi. Maybe thousands of posts. So, adi render avvadaniki konchem slow ga untundi (e.g., 1-2 seconds).

Normal ga, ee tab switching logic ni `useState` tho handle chesthe emavuthundi?

```jsx
function App() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    setTab(nextTab);
  }

  return (
    <>
      <TabButton onClick={() => selectTab('about')}>About</TabButton>
      <TabButton onClick={() => selectTab('posts')}>Posts (Slow)</TabButton>
      <TabButton onClick={() => selectTab('contact')}>Contact</TabButton>

      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <SlowPostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  );
}
```

**The Problem:**
1.  User "Posts (Slow)" tab meeda click chestadu.
2.  `selectTab('posts')` call avuthundi, adi `setTab('posts')` ni call chesthundi.
3.  Ee state update valla, React component ni re-render cheyyadam start chesthundi.
4.  React ippudu `<SlowPostsTab />` ni render cheyyali. Kani, adi chala slow!
5.  Aa 1-2 seconds paatu, `SlowPostsTab` render avuthunnappudu, **the entire UI is frozen.** User inko tab click cheyyaledu, text select cheyyaledu, em cheyyaledu. The browser is unresponsive.

The UI update is **"blocking"**. User click chesadu, kani UI ventane respond avvaledu. Ee experience chala bad ga untundi.

```mermaid
graph TD
    A[User clicks "Slow Tab"] --> B{`setTab('posts')`};
    B --> C{React starts re-rendering};

    subgraph "UI is BLOCKED for 2 seconds 🧊"
        C --> D[Rendering `<SlowPostsTab />`];
    end

    D --> E[Finally, UI updates];
```

The user should be able to click on a tab and see an immediate response. Maybe the "Posts" tab button should look "active" right away, even if the content takes a second to load.

Ee "blocking" UI problem ni solve cheyyadanike, React manaki `useTransition` aney hook ni ichindi.

Next, manam `useTransition` ee problem ni ela solve chesthundo, slow updates ni background lo ela chesthundo chuddam. Ready to make your UI super responsive? Let's go! 🚀➡️