describe("AST Walk函数", () => {
  test("单个节点", () => {
    const ast = { a: "1" };
    const mockEnter = jest.fn();
    const mockLeave = jest.fn();
    const walk = require("../walk");
    walk(ast, {
      enter: mockEnter,
      leave: mockLeave,
    });
    let calls = mockEnter.mock.calls;
    expect(calls.length).toBe(1); //断言 enter 被调用了几次
    expect(calls[0][0]).toEqual({ a: "1" }); // 调用参数是节点本身
    calls = mockLeave.mock.calls;
    expect(calls.length).toBe(1); //断言 leave 被调用了几次
    expect(calls[0][0]).toEqual({ a: "1" });
  });
  test("数组节点", () => {
    const ast = {
      a: [{ b: "2" }],
      b: "b",
      c: { c: "c" },
      d: [{ d: "d" }, { e: "e" }],
    };
    const mockEnter = jest.fn();
    const mockLeave = jest.fn();
    const walk = require("../walk");
    walk(ast, {
      enter: mockEnter,
      leave: mockLeave,
    });
    let calls = mockEnter.mock.calls;

    expect(calls.length).toBe(7);
    expect(calls[0][0]).toEqual({
      a: [{ b: "2" }],
      b: "b",
      c: { c: "c" },
      d: [{ d: "d" }, { e: "e" }],
    });
    expect(calls[1][0]).toEqual([{ b: "2" }]);
    expect(calls[2][0]).toEqual({ b: "2" });
    expect(calls[3][0]).toEqual({ c: "c" });
    expect(calls[4][0]).toEqual([{ d: "d" }, { e: "e" }]);
    expect(calls[5][0]).toEqual({ d: "d" });
    expect(calls[6][0]).toEqual({ e: "e" });
    calls = mockLeave.mock.calls;
    expect(calls.length).toBe(7);
    expect(calls[0][0]).toEqual({ b: "2" });
    expect(calls[1][0]).toEqual([{ b: "2" }]);
    expect(calls[2][0]).toEqual({ c: "c" });
    expect(calls[3][0]).toEqual({ d: "d" });
    expect(calls[4][0]).toEqual({ e: "e" });
    expect(calls[5][0]).toEqual([{ d: "d" }, { e: "e" }]);
    expect(calls[6][0]).toEqual({
      a: [{ b: "2" }],
      b: "b",
      c: { c: "c" },
      d: [{ d: "d" }, { e: "e" }],
    });
  });
});
