import { globSync } from 'glob';
import { basename, parse } from 'path';
import { cwd } from 'process';

export default function matcher({
  targetDirs,
  ignorePatterns,
  testDir,
}: {
  targetDirs: string[];
  ignorePatterns: string[];
  testDir: string;
}) {
  const targetFiles: string[] = [];
  // Listing up files under the target dirs.
  targetDirs.forEach((dir) =>
    globSync(`${cwd()}/${dir}/**/*.{js,ts,jsx,tsx}`, {
      ignore: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/tests/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
        '**/node_modules/**',
        '**/dist/**',
        ...ignorePatterns,
      ],
    }).map((path) => targetFiles.push(basename(path)))
  );

  // Listing up test files under the target test dir.
  const testFiles = globSync(`${cwd()}/${testDir}/**/*.test.{js,ts,jsx,tsx}`).map((path) => basename(path));

  const found: string[] = [];
  const notFound: string[] = [];

  targetFiles.forEach((target) => {
    testFiles.find((testFile) => target.split('.')[0] === testFile.split('.')[0])
      ? found.push(target)
      : notFound.push(target);
  });

  return { found, notFound, targetFiles, testFiles };
}
