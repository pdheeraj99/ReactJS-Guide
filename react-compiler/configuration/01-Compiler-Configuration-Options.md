# Compiler Configuration: The Rule Book rules

Hey mawa! React Compiler anedi chala powerful, kani manam daanini mana project ki thaggattu konchem tune cheyyochu. Ee "tuning" antha manam mana build tool loni configuration file (e.g., `babel.config.js`) lo chestham.

Most of the time, default settings saripothayi. Kani, konni specific situations lo, ee options manaki chala help chesthayi.

### How to Configure?

Manam Babel plugin ni add chesetappudu, second argument ga oka options object ni pass chestham.

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        // ...compiler options go here...
      },
    ],
  ],
};
```

### Main Configuration Options

1.  **`compilationMode`**:
    *   **What it does:** Compiler ye components ni optimize cheyyalo decide chesthundi.
    *   **Values:**
        *   `'infer'` (default): Compiler chala smart. Adi a a component ki optimization avasaramo, a a component ki vadalo, ade "infer" (oohinchi) chesthundi.
        *   `'annotation'`: Ee mode lo, compiler kevalam `"use memo";` ane directive unna components ni matrame compile chesthundi. Idi pedda codebase lo compiler ni slow ga adopt cheyadaniki useful.
        *   `'all'`: Anni components ni compile cheyyadaniki try chesthundi.

2.  **`panicThreshold`**:
    *   **What it does:** Compiler ki mana code ardham kakapothe (e.g., manam Rules of React ni break chesthe), em cheyyalo chepthundi.
    *   **Values:**
        *   `'error'` (default): Build ni fail chesthundi. Development ki idi manchidi.
        *   `'none'`: Build ni fail cheyyadu. Aa problematic component ni skip chesi, migatha code ni compile chesthundi. Production builds ki idi recommended.

3.  **`logger`**:
    *   **What it does:** Compiler em chesthundo log cheyadaniki use avuthundi. Debugging kosam.
    *   **Example:**
        ```javascript
        logger: {
          logEvent(filename, event) {
            console.log(`Compiler event for ${filename}:`, event);
          }
        }
        ```

4.  **`gating`**:
    *   **What it does:** Idi chala advanced. Ee option tho, manam compiler optimization ni oka feature flag వెనకాల pettukovacchu. Ante, manam A/B testing cheyyochu or new optimizations ni slow ga roll out cheyyochu.

Ee options tho, manam React Compiler behavior ni mana project needs ki anugunanga marchukovacchu.

Ippudu, ee options anni kalipi oka sample configuration file lo ela kanipisthayo chuddam! ➡️📄