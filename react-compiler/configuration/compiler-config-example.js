/*
  This file shows conceptual examples of how you might configure the
  React Compiler in your project's `babel.config.js` or equivalent file.
  Each example is tailored for a specific scenario to explain the "why"
  behind the configuration.
*/

// --- Scenario 1: A New React 19 Project (The Default) ---
// WHY: For most new projects using React 19, you don't need any configuration.
// The compiler is designed to work out-of-the-box with sensible defaults.
module.exports = {
  plugins: [
    'babel-plugin-react-compiler'
  ],
};


// --- Scenario 2: Gradually Adopting in a Huge, Old Project ---
// WHY: You have a massive, existing codebase and you want to enable the
// compiler safely, one component at a time, without risking breaking anything.
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        // 'annotation' mode tells the compiler: "Don't touch anything,
        // unless I explicitly tell you to by adding the 'use memo'; directive."
        // This gives you maximum control for a slow, safe rollout.
        compilationMode: 'annotation',
      },
    ],
  ],
};


// --- Scenario 3: A Production Build Where Stability is Everything ---
// WHY: You want the benefits of the compiler, but your top priority is that
// your production build should NEVER fail, even if a developer checks in
// code that the compiler doesn't understand.
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        // 'none' tells the compiler: "If you get confused or find an error,
        // don't 'panic' and fail the build. Just silently skip that one
        // component and continue optimizing the rest."
        // This is the recommended setting for all production environments.
        panicThreshold: 'none',
      },
    ],
  ],
};


// --- Scenario 4: A Robust Setup for a Team (Development vs. Production) ---
// WHY: You want the best of both worlds: strict checks during development to
// catch errors early, and maximum safety in production.
const isDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        // In development, we want to know about every single error.
        // In production, we prioritize a successful build over perfect compilation.
        panicThreshold: isDevelopment ? 'all_errors' : 'none',
      },
    ],
  ],
};

// --- Scenario 5: Using the Compiler with an older React 18 Project ---
// WHY: React 18 does not have the compiler's "runtime" built-in. You must
// tell the compiler to generate code that is compatible with React 18 and
// uses the separate `react-compiler-runtime` package you installed.
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        // This is mandatory for React 17 or 18 projects.
        target: '18',
      },
    ],
  ],
};