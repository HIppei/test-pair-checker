import { findConfigFile, output } from "../src/utils";
import * as glob from "glob";

describe(findConfigFile.name, () => {
  test("searching a config in the root directory", () => {
    const mockGlob = jest.spyOn(glob, "globSync").mockReturnValue(["file"]);
    findConfigFile();
    expect(mockGlob).toHaveBeenCalledWith(
      `${process.cwd()}/test-pair-checker.config.{js,cjs}`,
    );
  });

  test("searching the default config file beneath the src directory", () => {
    // Without mocking, this returns the file under the src dir, since no a config file under the root dir.
    const result = findConfigFile();
    expect(result).toEqual(`${process.cwd()}/src/test-pair-checker.config.js`);
  });
});

describe(output.name, () => {
  test("output when found all files", () => {
    const mockLog = jest.spyOn(console, "log");
    output({
      targetFiles: ["a"],
      testFiles: ["b"],
      found: ["c"],
      notFound: [],
    });
    expect(mockLog).toHaveBeenLastCalledWith("Great!!");
  });

  test("output when not found files existing", () => {
    output({
      targetFiles: ["a"],
      testFiles: ["b"],
      found: ["c"],
      notFound: ["d"],
    });
    expect(console.log).toHaveBeenLastCalledWith("\x1b[33m", "d");
  });
});
