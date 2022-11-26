describe("AST Walk函数", () => {
  test("单个节点", () => {
    const ast = {
      a: "1",
    };
    const mockEnter = jest.fn();
    const mockLeave = jest.fn();

    const walk = require("../walk");
    //expect(walk(ast)).toBe('2');
    walk(ast, null, mockEnter, mockLeave)
    let calls = mockEnter.mock.calls;
    //console.log(calls)
    expect(calls.length).toBe(1); //断言 enter 被调用了几次
    expect(calls[0][0]).toEqual({ a: "1" }); // 调用参数是节点本身
    calls = mockLeave.mock.calls;

    expect(calls.length).toBe(1); //断言 leave 被调用了几次
    expect(calls[0][0]).toEqual({ a: "1" });
  });

  test("数组节点", () => {
    const ast = {
      a: [{ b: "3" }],
    };
    const mockEnter = jest.fn();
    const mockLeave = jest.fn();

    const walk = require("../walk");

    walk(ast, null, mockEnter, mockLeave)
    let calls = mockEnter.mock.calls;
    console.log(calls)
    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ a: [{ b: "2" }] });
    expect(calls[1][0]).toEqual([{ b: "2" }]);
    expect(calls[2][0]).toEqual({ b: "2" });

    calls = mockLeave.mock.calls;

    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ b: "2" });
    expect(calls[1][0]).toEqual([{ b: "2" }]);
    expect(calls[2][0]).toEqual({ a: [{ b: "2" }] });
  });
});
