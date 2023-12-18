import matcher from "../src/matcher";

describe(matcher.name, () => {
  test("pattern 1", () => {
    const result = matcher({
      targetDirs: ["1/src"],
      ignorePatterns: [],
      testDir: "1/src/tests",
    });

    expect(result).toEqual({
      found: ["b.ts", "a.tsx"],
      notFound: [],
      targetFiles: ["b.ts", "a.tsx"],
      testFiles: ["b.test.ts", "a.test.tsx"],
    });
  });

  test("pattern 2", () => {
    const result = matcher({
      targetDirs: ["2/src"],
      ignorePatterns: ["**/2/src/utils/**"],
      testDir: "2",
    });
    expect(result).toEqual({
      found: ["a.ts"],
      notFound: [],
      targetFiles: ["a.ts"],
      testFiles: ["a.test.ts"],
    });
  });
});
