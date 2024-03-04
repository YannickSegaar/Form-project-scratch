declare module 'postcss-nesting';


// YRS: Deze file is gecreerd omdat ik na het toevoegen van nested structures in mijn app.css file problemen kreeg
// met het compileren van de CSS. Ik heb daarna via npm install postcss-nesting --save-dev en het aanpassen van mijn
// postcss.config.js file geprobeerd het probleem op te lossen, maar dat werkte niet. Co Pilot gaf aan dat ik dit
// wellicht kon oplossen door deze file aan te maken:

// YRS Co Pilot Suggestion:

// The error message you're seeing is because TypeScript is trying to find type definitions for the postcss-nesting module, but it can't find any. This is common with JavaScript libraries that don't include TypeScript type definitions.

// You can try to install the type definitions for postcss-nesting by running npm i --save-dev @types/postcss-nesting as suggested by the error message. However, not all libraries have type definitions available in the @types namespace.

// If the type definitions are not available, you can create a declaration file to tell TypeScript to treat postcss-nesting as a module of type any. Here's how you can do it:

// Create a new file in your project root directory named declarations.d.ts.

// Add the following line to the file:

// Save the file and restart your development server.
// This will tell TypeScript to treat postcss-nesting as a module of type any, which should resolve the error.