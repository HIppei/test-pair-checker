import { globSync } from 'glob';
import { cwd } from 'process';

/**
 * This attempts to find 'test-pair-checker.config' file from the current working dir.
 * If no config file found, search the directries down, typically it finds default config file beside this package.
 * @returns Found config file
 */
export function findConfigFile() {
  const configFile = 'test-pair-checker.config';
  const cwdConfig = globSync(`${process.cwd()}/${configFile}.{js,cjs}`);
  if (cwdConfig.length > 0) return cwdConfig[0];

  // default config
  const defaultConfig = globSync(`**/${configFile}.{js,cjs}`);
  return `${cwd()}/${defaultConfig[0]}`;
}

export function output({
  targetFiles,
  testFiles,
  found,
  notFound,
}: {
  targetFiles: string[];
  testFiles: string[];
  found: string[];
  notFound: string[];
}) {
  console.log('------------------------------------------------------');
  console.log('The number of test target files', targetFiles.length);
  console.log('The number of test files', testFiles.length);
  console.log('The number of matched test files', found.length);
  console.log('------------------------------------------------------');

  if (notFound.length >= 1) {
    console.log('You must implement corresponding test files for the following files.');
    notFound.forEach((file) => console.log('\x1b[33m', file));
  } else {
    console.log('Great!!');
  }
}
