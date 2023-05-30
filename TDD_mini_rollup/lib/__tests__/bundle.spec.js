const Bundle = require("../bundle");
const fs = require("fs");
jest.mock("fs");
describe("test bundle", () => {
  describe("fetchModule", () => {
    it("constructor", () => {
      const bundle = new Bundle({ entry: "./a.js" });
      fs.readFileSync.mockReturnValueOnce(`const a = 2;`);

      const { calls } = fs.readFileSync.mock;
      const module = bundle.fetchModule("index.js");

      expect(calls[0][0]).toBe("index.js");
      expect(module.code.toString()).toBe(`const a = 2;`);
    });

    it("build", () => {
      const bundle = new Bundle({ entry: "./a.js" });
      fs.readFileSync.mockReturnValueOnce(`console.log(1);`);

      bundle.build("bundle.js");
      // fs.writeFileSync("bundle.js", `const a = 1;`);

      const { calls } = fs.writeFileSync.mock;
      expect(calls[0][0]).toBe("bundle.js");
      expect(calls[0][1]).toBe("console.log(1);");
    });
    it("many statement", () => {
      const bundle = new Bundle({ entry: "index.js" });
      jest.mock("fs");
      const code = `const a = () => 1;
const b = () => 2;
a();`;
      fs.readFileSync.mockReturnValue(code);
      fs.writeFileSync.mock.calls = [];
      bundle.build("bundle.js");
      const { calls } = fs.writeFileSync.mock;
      expect(calls[0][0]).toBe("bundle.js");
      expect(calls[0][1]).toBe(`const a = () => 1;
a();`);
    });
    test("多模块", () => {
      const bundle = new Bundle({ entry: "index.js" });
      fs.readFileSync
        .mockReturnValueOnce(
          `import { a } from './a';
a();`
        )
        .mockReturnValueOnce("export const a = () => 1;");

      fs.writeFileSync.mock.calls = [];
      bundle.build("bundle.js");
      const { calls } = fs.writeFileSync.mock;
      expect(calls[0][0]).toBe("bundle.js");
      expect(calls[0][1]).toEqual(`const a = () => 1;
a();`);
    });
  });
});
