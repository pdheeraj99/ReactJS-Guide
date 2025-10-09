# External vs. Inline: React's Different Rules 📜

Hey friend! `<script>` component ni use chesetappudu, manam oka vishayam clear ga ardham cheskovali: React **external scripts** ni and **inline scripts** ni chala different ga handle chesthundi.

### 1. External Scripts (`src` prop)

External script ante, `src` attribute tho manam oka URL nunchi load chese JavaScript file.

```jsx
<script src="https://example.com/library.js" async={true} />
```

**React's Rules for External Scripts:**
*   **Magic Condition:** Ee script ki `async={true}` prop unte, React deeniki special treatment isthundi.
*   **Moves to `<head>`:** React ee script tag ni automatic ga document `<head>` loki move chesthundi, no matter where you render it.
*   **Deduplication:** Meeru ide `src` unna script ni multiple components lo render chesina, React daanini final HTML lo oke sari matrame add chesthundi. This prevents loading the same library multiple times.

Ee behavior valla, app-wide libraries (like a map API or a payment SDK) ni manage cheyyadam chala easy.

### 2. Inline Scripts (children)

Inline script ante, manam script code ni direct ga `<script>` tags madhyalo rasedi.

```jsx
<script>
  ga('send', 'pageview', { 'page': '/my-page' });
</script>
```

**React's Rules for Inline Scripts:**
*   **No Magic Here:** Inline scripts ki elanti special treatment undadu.
*   **Renders In-Place:** Meeru ee script ni ekkada render cheste, adi final DOM lo akkade untundi. Adi `<head>` loki move avvadu.
*   **No Deduplication:** Meeru ide inline script ni multiple times render cheste, adi anni sarlu DOM lo add avuthundi.

Ee behavior chinna chinna, component-specific tasks ki useful. For example, oka particular button click ni track cheyyadaniki analytics event pampali anukunte, aa component lone oka inline script pettukovacchu.

### Visualizing the Difference

```mermaid
graph TD
    subgraph "Your React Code"
        A(Page Component) --> B(Renders `<script src='lib.js' async={true}>`);
        A --> C(Renders `<h1>`);
        A --> D(Renders `<script>console.log('inline')</script>`);
    end

    subgraph "Final HTML DOM"
        HEAD["<head>"] --> SCRIPT_HEAD["<script src='lib.js' async>"];
        BODY["<body>"] --> H1["<h1>"];
        BODY --> SCRIPT_BODY["<script>console.log('inline')</script>"];
    end

    B -- Moves to head & deduplicates --> SCRIPT_HEAD;
    C -- Renders in place --> H1;
    D -- Renders in place --> SCRIPT_BODY;

    style SCRIPT_HEAD fill:#d4edda
    style SCRIPT_BODY fill:#e6f7ff

```

Ee theda telusukovadam chala important. App-wide scripts kosam `src` + `async`, and chala specific, one-time scripts kosam inline code vadali.

Ippudu, ee rendu approaches ni code examples lo chuddam! Let's go! 🚀💻