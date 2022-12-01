const analyse = require("../analyse");
const acorn = require("acorn");
const MagicString = require("magic-string");

function getCode(code) {
  return {
    ast: acorn.parse(code, {
      locations: true,
      ranges: true,
      sourceType: "module",
      ecmaVersion: 7,
    }),
    magicString: new MagicString(code),
  };
}
describe("Test analyse", () => {
  test("基础功能", () => {
    const { ast, magicString } = getCode(`const a = 1
    const b =2`);

    analyse(ast, magicString);
    expect(ast._scope.contains("a")).toBe(true);
    expect(ast._scope.findDefiningScope("a")).toEqual(ast._scope);
    expect(ast._scope.contains("b")).toBe(ast._scope);
    expect(ast._scope.findDefiningScope("b")).toEqual(ast._scope);
  });
});
