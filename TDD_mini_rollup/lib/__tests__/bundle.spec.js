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
  });
});
