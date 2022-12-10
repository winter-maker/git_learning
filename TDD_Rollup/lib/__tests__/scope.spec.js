const Scope = require("../scope");
describe("Test scope", () => {
  test("基础功能", () => {
    //const a = 1;
    // function f() {
    //     const b = 2;
    //  function ff() {
    //      const c =3
    //  }
    // }
    const root = new Scope();
    root.add("a");

    const child = new Scope({
      parent: root,
    });
    child.add("b");

    expect(child.contains("a")).toBe(true);
    expect(child.contains("b")).toBe(true);
    expect(child.findDefiningScope("a")).toBe(root);
    expect(child.findDefiningScope("b")).toBe(child);
  });
  test("跨层级访问", () => {
    //const a = 1;
    // function f() {
    //     const b = 2;
    // }
    const root = new Scope();
    root.add("a");

    const child = new Scope({
      parent: root,
    });
    child.add("b");

    const prandchild = new Scope({ parent: child });
    prandchild.add("c");

    expect(prandchild.contains("a")).toBe(true);
    expect(prandchild.contains("b")).toBe(true);
    expect(prandchild.contains("c")).toBe(true);
    expect(prandchild.findDefiningScope("a")).toBe(root);
    expect(prandchild.findDefiningScope("b")).toBe(child);
    expect(prandchild.findDefiningScope("c")).toBe(prandchild);
  });
});
