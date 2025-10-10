# Example: A Library's `package.json`

Hey mawa! Manam `package.json` lo `"exports"` field gurinchi matladukunnam. Ippudu, adi oka real-world library lo ela kanipisthundo, oka full example tho chuddam.

Imagine, manam `my-ui-library` ane oka package ni publish chestunnam. Ee library React 18 and 19 ni rendu support cheyyali.

### Build Process

Munduga, manam mana build script ni set cheskuni, **three versions** of our library ni generate cheyyali:
1.  **Uncompiled:** Plain source code.
2.  **React 18 Compiled:** `target: '18'` tho compile chesindi.
3.  **React 19 Compiled:** `target: '19'` tho compile chesindi.

Ee outputs anni `dist/` folder lo ilanti structure lo untayi:
```
dist/
├── uncompiled/
│   └── index.js
├── react18/
│   └── index.js
└── react19/
    └── index.js
```

### The `package.json` Configuration

Ippudu, manam `package.json` lo ee different versions ni bundler ki ela cheppalo chuddam.

```json
{
  "name": "my-ui-library",
  "version": "1.2.3",
  "type": "module",
  "main": "./dist/uncompiled/index.js",
  "files": [
    "dist"
  ],
  "dependencies": {
    // React 18/17 lo compiler ki ee runtime avasaram.
    // So, manam daanini dependency ga add cheyyali.
    "react-compiler-runtime": "^0.1.0-rc"
  },
  "peerDependencies": {
    // Mana library ki React 18 or 19 kavali ani chepthunnam.
    "react": "^18.0.0 || ^19.0.0"
  },
  "exports": {
    // The "react-compiler" condition is the special key.
    // Bundlers with React Compiler enabled will look here first.
    "react-compiler": {
      // If the user's app is on React 19, use this compiled file.
      "19": "./dist/react19/index.js",
      // If the user's app is on React 18, use this compiled file.
      "18": "./dist/react18/index.js"
    },
    // This is the fallback for anyone NOT using the React Compiler.
    // They will get the regular, un-optimized code.
    "default": "./dist/uncompiled/index.js"
  }
}
```

### Breakdown of Key Fields

*   **`"dependencies"`**: Manam `react-compiler-runtime` ni ikkada add cheyyali. Endukante, mana React 18 users ki ee package *runtime* lo avasaram. `devDependencies` lo pedithe, adi user ki install avvadu.
*   **`"exports"`**: Idi asalu magic chese chota.
    *   `"react-compiler"`: This is a special, conventional key that the React Compiler's bundler integration looks for.
    *   `"19"` and `"18"`: Ee keys tho, manam a a React version ki a a file ivvalo chepthunnam.
    *   `"default"`: This is the fallback. If a user's bundler doesn't understand the `"react-compiler"` condition (maybe they are on an older build tool, or have the compiler disabled), it will use this path. This ensures your library works for everyone, even if they don't get the optimized version.

Ee setup tho, mee library chala professional ga and robust ga untundi. It provides the best performance to users who can take advantage of it, while still working perfectly for everyone else. ✨