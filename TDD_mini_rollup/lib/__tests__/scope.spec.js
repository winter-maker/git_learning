const Scope = require("../scope");
describe("test scope", () => {
  it("single scope", () => {
    /**
     * 参考代码
     * const a = 1;
     * function(){
     *  const b = 2;
     * }
     */
    const root = new Scope({});
    root.add("a");
    const child = new Scope({
      parent: root,
    });
    child.add("b");
    expect(child.findDefiningScope("a")).toBe(root);
    expect(child.contains("a")).toEqual(true);
    expect(child.findDefiningScope("b")).toBe(child);
    expect(child.contains("b")).toEqual(true);
  });
});
