/*
  This file shows conceptual examples of how you might configure the
  React Compiler in your project's `babel.config.js` or equivalent file.
*/

// --- Example 1: Default Configuration (Recommended for most React 19+ apps) ---
// For most new projects, you just need to add the plugin. No options needed.
module.exports = {
  plugins: [
    'babel-plugin-react-compiler'
  ],
};


// --- Example 2: Configuration for Incremental Adoption ---
// This is useful for large, existing codebases where you want to
// introduce the compiler slowly.
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        // Only compile components that are explicitly opted-in with the "use memo" directive.
        compilationMode: 'annotation',
      },
    ],
  ],
};


// --- Example 3: Configuration for Production ---
// In production, you might want to prevent build failures if the compiler
// finds code it can't optimize.
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        // If the compiler encounters an error in a component, it will skip
        // that component instead of throwing an error and failing the build.
        panicThreshold: 'none',
      },
    ],
  ],
};


// --- Example 4: Advanced Configuration with a Logger ---
// This is for debugging purposes to see what the compiler is doing.
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        logger: {
          logEvent(filename, event) {
            // Log every event from the compiler to the console.
            // This can be very verbose!
            console.log(`[React Compiler] Event for ${filename}:`, event);
          },
        },
      },
    ],
  ],
};