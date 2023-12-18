import { globSync } from 'glob';
import matcher from './matcher';
import { cwd } from 'process';

/**
 * It runs a core process from CLI
 */
async function run() {
  const config: { targetDirs: string[]; ignorePatterns: string[]; testDir: string } = (await import(findConfigFile()))
    .default;
  const result = matcher(config);

  console.log('found', result.found);
  console.log('notFound', result.notFound);

  console.log('------------------------------------------------------');
  console.log('The number of test target files', result.targetFiles.length);
  console.log('The number of corresponding test files', result.testFiles.length);
  console.log('------------------------------------------------------');

  if (result.notFound.length >= 1) {
    console.log('You must implement corresponding test files for the following files.');
    result.notFound.forEach((file) => console.log('\x1b[33m', file));
  } else {
    console.log('Great!!');
  }
}

/**
 * This attempts to find 'test-pair-checker.config' file from the current working dir.
 * If no config file found, search the directries down, typically it finds default config file beside this package.
 * @returns Found config file
 */
function findConfigFile() {
  const configFile = 'test-pair-checker.config';
  const cwdConfig = globSync(`${process.cwd()}/${configFile}.{js,cjs}`);
  if (cwdConfig.length > 0) return cwdConfig[0];

  // default config
  const defaultConfig = globSync(`**/${configFile}.{js,cjs}`);
  return `${cwd()}/${defaultConfig[0]}`;
}

run()
  .then(() => {})
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
