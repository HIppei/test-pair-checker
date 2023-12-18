import matcher from "./matcher";
import { findConfigFile, output } from "./utils";

/**
 * It runs a core process from CLI
 */
async function run() {
  const configFile = findConfigFile();
  const config: {
    targetDirs: string[];
    ignorePatterns: string[];
    testDir: string;
  } = (await import(configFile)).default;
  const result = matcher(config);

  output(result);
}
run()
  .then(() => {})
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
