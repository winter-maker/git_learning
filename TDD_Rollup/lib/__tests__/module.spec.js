const Module = require("../module");

describe("test module", () => {
  describe("imports", () => {
    it("import", () => {
      const code = "import a from '../module'";
      const module = new Module({
        code,
      });
      expect(module.imports).toEqual({
        a: {
          localName: "a",
          name: "",
          source: "../module",
        },
      });
    });
    it("import a as b", () => {
      const code = "import {a as b} from '../module'";
      const module = new Module({
        code,
      });
      expect(module.imports).toEqual({
        b: {
          localName: "b",
          name: "a",
          source: "../module",
        },
      });
    });
  });
  describe("exports", () => {
    it("export", () => {
      const code = `export var a = 1`;
      const module = new Module({ code, path: "", bundle: null });
      expect(module.exports["a"].localName).toBe("a");
      expect(module.exports["a"].node).toBe(module.ast.body[0]);
      expect(module.exports["a"].expression).toBe(
        module.ast.body[0].declaration
      );
    });

    // it('default', () => {
    //     // TODO
    //     const code = `export default home`
    // })

    // it('export default home', () => {
    //     // TODO
    //     const code = `export default home`
    // })
  });

  describe("定义变量 definitions", () => {
    it("export", () => {
      const code = `const a = 1;
            const b = 2;
            `;
      const module = new Module({ code, path: "", bundle: null });
      expect(module.definitions).toEqual({
        a: module.ast.body[0],
        b: module.ast.body[1],
      });
    });
  });
  describe("ExpandAllStatement", () => {
    it("基础", () => {
      const code = `const a = () =>  1;
  const b = () => 2;
  a();
  a();
  console.log(1)`;
      const module = new Module({ code });
      const statements = module.expandAllStatement();
      expect(statements.length).toBe(4);
      expect(
        module.code.snip(statements[0].start, statements[0].end).toString()
      ).toEqual(`const a = () =>  1;`);
      expect(
        module.code.snip(statements[1].start, statements[1].end).toString()
      ).toEqual(`a();`);
      expect(
        module.code.snip(statements[2].start, statements[2].end).toString()
      ).toEqual(`a();`);
      expect(
        module.code.snip(statements[3].start, statements[3].end).toString()
      ).toEqual(`console.log(1)`);
    });
  });
});
