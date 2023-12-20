## Description

This packages aims to list up test target files and those corresponding test files.

You can confirm that which test files are prepared and not.

## Usage

- Install

```bash
npm i --save-dev @i2i3i/test-pair-checker

yarn add -D @i2i3i/test-pair-checker

pnpm add -D @i2i3i/test-pair-checker
```

- Execution

Prepare a config file `test-pair-checker.config.{js,cjs}` under your root directory.

```javascript
// js
const config = {
  // Place all directories where your target files exist.
  targetDirs: [],

  // Set ignore patterns from the above.
  ignorePatterns: [],

  // Place the directory that your test files exist.
  testDir: "",
};

export default config;

// Or cjs
module.exports = {
  targetDirs: [],
  ignorePatterns: [],
  testDir: "",
};
```

```bash
npm pair-check

yarn pair-check

pnpm pair-check
```

## Example

If you have a project like the following, the setting goes like..

```bash
.
├── src
│   ├── components
│       ├── custom-button.tsx
│       ├── custom-input.tsx
│   ├── wrapper
│       ├── custom-provider.tsx
│   ├── tests
│       ├── components
│           ├── custom-button.test.tsx
```

```javascript
const config = {
  targetDirs: ["src"],
  ignorePatterns: ["**/wrapper/**"],
  testDir: "tests",
};

export default config;
```

Execution results in the below.

```bash
$ npm pair-check

------------------------------------------------------
The number of test target files 2
The number of test files 2
The number of matched test files 1
------------------------------------------------------
You must implement corresponding test files for the following files.
 custom-input.tsx
```

## Contributing

Any PRs are welcome.
