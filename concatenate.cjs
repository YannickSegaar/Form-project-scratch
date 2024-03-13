const fs = require('fs');
const path = require('path');

// Define the directory containing your files.
const directoryPath = path.join(__dirname, 'src/routes/combined');

// Define the individual files you want to include.
const individualFiles = [
  path.join(__dirname, 'package.json'),
  path.join(__dirname, 'svelte.config.js'),
  path.join(__dirname, 'playwright.config.ts'),
  path.join(__dirname, 'postcss.config.cjs'),
  path.join(__dirname, 'tailwind.config.js'),
  path.join(__dirname, 'tsconfig.json'),
  path.join(__dirname, '.svelte-kit/tsconfig.json'),
  path.join(__dirname, 'components.json'),
  path.join(__dirname, 'vite.config.ts'),
  path.join(__dirname, 'README.md'),
  path.join(__dirname, 'src/app.postcss'),
  path.join(__dirname, 'src/app.html'),
  path.join(__dirname, 'src/routes/+layout.svelte'),
  path.join(__dirname, 'tailwind.config.ts'),
  path.join(__dirname, 'my-custom-theme.ts'),
  // Add other files as needed...
];

// Define the files and directories you want to ignore.
const ignoreList = [
  path.join(directoryPath, 'src/routes/combined/TESTroofsizeDrawing.ts'),
  // Add other files or directories as needed...
];

// Create a write stream for the output file.
const writeStream = fs.createWriteStream('RomAIx - Pre-Skeleton Forms.txt');

// Function to write file data to the output file.
const writeFileToOutput = (filePath) => {
  if (ignoreList.includes(filePath)) {
    return;
  }

  const data = fs.readFileSync(filePath, 'utf8');
  writeStream.write(`\n--- File: ${filePath} ---\n\n`);
  writeStream.write(data + '\n');
};

// Function to recursively traverse the directory structure.
const traverseDirectory = (dirPath) => {
  if (ignoreList.includes(dirPath)) {
    return;
  }

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);

      if (fs.lstatSync(fullPath).isDirectory()) {
        // If the file is a directory, write the directory name to the output file and traverse it.
        writeStream.write(`\n--- Directory: ${fullPath} ---\n`);
        traverseDirectory(fullPath);
      } else {
        // If the file is not a directory, write its contents to the output file.
        writeFileToOutput(fullPath);
      }
    });
  });
};

// Start the directory traversal.
traverseDirectory(directoryPath);

// For each individual file...
individualFiles.forEach((file) => {
  writeFileToOutput(file);
});

// Close the write stream after a delay to ensure all asynchronous operations have completed.
setTimeout(() => writeStream.end(), 5000);