import { globSync } from 'glob';
import matcher from './matcher';
import { cwd } from 'process';

async function run() {
  const config: { targetDirs: string[]; ignorePatterns: string[]; testDir: string } = (await import(findConfigFile()))
    .default;
  const result = matcher(config);

  console.log('Test file found:', result.found);
  console.log('Test file not found:', result.notFound);
}

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
