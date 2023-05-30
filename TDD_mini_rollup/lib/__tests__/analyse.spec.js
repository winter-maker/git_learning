const analyse = require("../analyse");
const MagicString = require("magic-string");
const { parse } = require("acorn");

function getCode(code) {
  let ast = parse(code, {
      locations: true,
      ranges: true,
      ecmaVersion: 7,
      sourceType: "module",
    }),
    magicString = new MagicString(code);
  return {
    ast,
    magicString,
  };
}

describe("test analyse", () => {
  it("empty ast", () => {
    const ast = {
      body: [],
    };
    analyse(ast);
  });
  describe("scope analyse", () => {
    it("single variable", () => {
      const { ast, magicString } = getCode(`const a= ()=> 'a'`);
      analyse(ast, magicString);
      expect(ast._scope.contains("a")).toBe(true);
      expect(ast._scope.findDefiningScope("a")).toEqual(ast._scope);
      expect(ast.body[0]._defines).toEqual({ a: true });
    });
    it("many variable", () => {
      const { ast, magicString } = getCode(`const a=()=> 'a';
          const b=()=> 'b';
          const c=()=> 'c';`);
      analyse(ast, magicString);
      expect(ast._scope.contains("a")).toBe(true);
      expect(ast._scope.findDefiningScope("a")).toEqual(ast._scope);
      expect(ast._scope.contains("b")).toBe(true);
      expect(ast._scope.findDefiningScope("b")).toEqual(ast._scope);
      expect(ast._scope.contains("c")).toBe(true);
      expect(ast._scope.findDefiningScope("c")).toEqual(ast._scope);
      expect(ast.body[0]._defines).toEqual({ a: true });
      expect(ast.body[1]._defines).toEqual({ b: true });
      expect(ast.body[2]._defines).toEqual({ c: true });
    });
    it("nest variable", () => {
      const { ast, magicString } = getCode(`const a =()=> 'a';
          if(true) {
            const b=()=> 'b'
          }`);
      analyse(ast, magicString);
      expect(ast._scope.contains("a")).toBe(true);
      expect(ast._scope.findDefiningScope("a")).toEqual(ast._scope);
      expect(ast._scope.contains("b")).toBe(true);
      expect(ast._scope.findDefiningScope("b")).toEqual(ast._scope);
      expect(ast.body[0]._defines).toEqual({ a: true });
      expect(ast.body[1]._defines).toEqual({ b: true });
    });
    it("nest variable2", () => {
      const { ast, magicString } = getCode(`const a=()=> 'a';
          function f(){
            const b=()=> 'b';
          }`);
      analyse(ast, magicString);
      expect(ast._scope.contains("a")).toBe(true);
      expect(ast._scope.findDefiningScope("a")).toEqual(ast._scope);
      expect(ast._scope.contains("f")).toBe(true);
      expect(ast._scope.findDefiningScope("f")).toEqual(ast._scope);

      expect(ast.body[1]._scope.contains("b")).toBe(true);
      expect(ast.body[1]._scope.findDefiningScope("f")).toEqual(ast._scope);
      expect(ast.body[1]._scope.findDefiningScope("b")).toEqual(
        ast.body[1]._scope
      );
      expect(ast.body[0]._defines).toEqual({ a: true });
      expect(ast.body[1]._defines).toEqual({ f: true });
    });
    describe("variable depend analyse", () => {
      it("not depend", () => {
        const { ast, magicString } = getCode(`const a=()=> 'a';
                a();`);
        analyse(ast, magicString);
        expect(ast.body[0]._dependsOn).toEqual({ a: true });
        expect(ast.body[1]._dependsOn).toEqual({ a: true });
      });
      it("have depend", () => {
        const { ast, magicString } = getCode(`const a=()=> 'a';
              a();
              b();`);
        analyse(ast, magicString);
        expect(ast.body[0]._dependsOn).toEqual({ a: true });
        expect(ast.body[1]._dependsOn).toEqual({ a: true });
        expect(ast.body[2]._dependsOn).toEqual({ b: true });
      });
      it("fun scope depend", () => {
        const { ast, magicString } = getCode(`const a=()=> 'a';
              a();
              function f(){
                b();
                a();
              }`);
        analyse(ast, magicString);
        expect(ast.body[0]._dependsOn).toEqual({ a: true });
        expect(ast.body[1]._dependsOn).toEqual({ a: true });
        expect(ast.body[2]._dependsOn).toEqual({ b: true, f: true, a: true });
      });
    });
  });
});
