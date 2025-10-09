# `<script>`: Mana App lo JavaScript ni Load Cheyyadam 📜

Hey friend! Mana React app lo, manam third-party libraries (e.g., a payment gateway library like Stripe, or an analytics service like Google Analytics) ni use cheyyalsi vastundi. Ee libraries ni manam vaalla external servers nunchi load cheskovali.

Ee external JavaScript files ni mana document lo include cheyadaniki, or chinna chinna inline script snippets ni run cheyadaniki, manam `<script>` component ni vadatham.

### React lo `<script>` ni ela vadatam?

React manaki `<script>` component tho pani cheyyadaniki rendu primary ways isthundi:
1.  **External Scripts:** Vere server lo host chesina `.js` file ni load cheyyadaniki. Deeniki manam `src` prop vadatham.
    ```jsx
    <script src="https://js.stripe.com/v3/" />
    ```
2.  **Inline Scripts:** Chinna JavaScript code ni direct ga mana component lo ne rayadaniki. Deeniki manam script code ni children ga pass chestham.
    ```jsx
    <script>
      console.log('This is an inline script!');
    </script>
    ```

### React's Special Handling for Scripts

`<link>` and `<meta>` laage, React `<script>` component ki kuda konni special powers isthundi, kani **konni conditions apply avuthayi.**

React can move scripts to the `<head>` and deduplicate them, but only if you follow one specific rule:
> **The script must be an external script (`src` prop) and it MUST have the `async={true}` prop.**

`async={true}` ante, aa script page rendering ni block cheyyakunda, background lo load avuthundi.

**Important Note:** Ee special magic (`<head>` placement and deduplication) **inline scripts ki apply avvadu**. Inline scripts meeru ekkada render cheste, akkade DOM lo place avuthayi.

Asalu ee external and inline scripts madhya unna theda enti? React enduku vaatini veru veru ga treat chesthundi? Ee details anni next chapter lo chuddam. Let's get into the specifics! 🕵️‍♂️➡️