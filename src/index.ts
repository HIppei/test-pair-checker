import matcher from "./matcher";
import { findConfigFile, output } from "./utils";

/**
 * It runs a core process from CLI
 */
async function run() {
  // Get a config file
  const configFile = findConfigFile();
  const config: {
    targetDirs: string[];
    ignorePatterns: string[];
    testDir: string;
  } = (await import(configFile)).default;

  // Generate lists according to the config
  const result = matcher(config);

  // Output the lists
  output(result);
}
run()
  .then(() => {})
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
