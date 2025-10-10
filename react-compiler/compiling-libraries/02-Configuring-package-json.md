# `package.json`: The "Conditional Switch" for Libraries 📦

Hey mawa! Manam mundu chapter lo chusina problem ki solution, mana `package.json` file lo ne undi.

**The Problem:** Manam mana library ni pre-compile chestunnam. Kani, React 19 ki oka rakamaina compiled code kavali (built-in runtime tho), and React 18 ki inko rakamaina compiled code kavali (`react-compiler-runtime` package tho). Manam ee rendu versions ni support cheyyali.

How can we tell the user's bundler (like Webpack or Vite), "Hey, ee user React 19 vaduthunnadu, so `dist/react19/index.js` file ni load cheyyi. Oh wait, ee user React 18 vaduthunnadu, so `dist/react18/index.js` file ni load cheyyi" ani?

Ee "conditional loading" ni enable cheyadanike, manam `package.json` loni **`"exports"`** field ni vadatham.

### What is the `"exports"` field?

`"exports"` field anedi modern Node.js feature. Idi manaki, oka package lopaala nunchi a a files bayataki expose avvalo, and a a conditions lo a a file expose avvalo, chala detailed ga control cheyadaniki help chesthundi.

React Compiler kosam, manam `react-compiler` ane oka special condition ni vadatham.

### How to Use It for Libraries

1.  **Build Two Versions:** Munduga, manam mana library ni rendu sarlu build cheyyali.
    *   Okasari `target: '19'` tho.
    *   Inkosari `target: '18'` tho.
    Ee rendu outputs ni separate folders lo (`dist/react19`, `dist/react18`) petti undali.

2.  **Configure `package.json`:** Ippudu, manam `"exports"` field lo magic chestham.

    ```json
    {
      "name": "my-awesome-library",
      "version": "1.0.0",
      "exports": {
        // The special condition for React Compiler
        "react-compiler": {
          // If the user's app is on React 19, use this file.
          "19": "./dist/react19/index.js",
          // If the user's app is on React 18, use this file.
          "18": "./dist/react18/index.js"
        },
        // A fallback for users who don't have the compiler
        "default": "./dist/uncompiled/index.js"
      }
    }
    ```

### How it Works

User's app (consumer app) lo React Compiler enable aypoyi unte, adi mana library యొక్క `package.json` ni chusi, `"react-compiler"` condition ni kanukkuntundi. Tarvata, adi consumer app యొక్క React version (`18` or `19`) ni chusi, a a correct compiled file ni theeskuntundi.

Okavela consumer app lo compiler lekapothe, adi simple ga `"default"` entry ni theeskuni, mana uncompiled code ni vaduthundi.

Ee setup valla, mana library andari users ki, vaalla environment tho sambandham lekunda, best possible version ni serve chesthundi. It's a win-win for everyone!

Ippudu, ee `package.json` setup ni inka clear ga, oka full example tho chuddam. Let's go! 📄➡️