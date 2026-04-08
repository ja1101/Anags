# Anags - Anagram Generator

A TypeScript application for finding anagrams in a word list.

## Project Structure

```
anags/
├── src/              # Source code
│   ├── anagramGenerator.ts  # Core anagram generation logic
│   ├── fileHandler.ts       # File I/O operations
│   ├── index.ts             # Main entry point
│   └── types.ts             # TypeScript interfaces
├── tests/            # Unit tests
├── dist/             # Compiled JavaScript output
├── data/             # Data files
│   ├── wordlist.txt         # Input word list
│   └── anags.txt            # Output anagram groups
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
└── jest.config.js    # Jest test configuration
```

## Features

- Efficient anagram grouping algorithm
- Modular, well-typed TypeScript code
- Comprehensive error handling
- Unit tests with Jest
- CLI interface with customizable input/output paths

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

This compiles TypeScript files from `src/` to JavaScript in `dist/`.

## Running

```bash
npm start
```

Or with custom input/output paths:

```bash
npm start -- ./custom-wordlist.txt ./custom-output.txt
```

## Development

Run without compiling:

```bash
npm run dev
```

## Testing

```bash
npm test
```

This runs the Jest test suite and generates coverage reports.

## How It Works

The application reads a list of words from a text file, groups them into anagrams, and writes the results to another file. Words are considered anagrams if they contain the same letters in the same frequency, ignoring case.

For example: "listen", "silent", and "enlist" are anagrams of each other.