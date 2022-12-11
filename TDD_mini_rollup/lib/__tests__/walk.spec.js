const walk = require("../walk");
describe("test walk", () => {
  it("single node", () => {
    const ast = { a: 1 };
    const enter = jest.fn();
    const leave = jest.fn();

    walk(ast, { enter, leave });
    let calls = enter.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual({ a: 1 });

    calls = leave.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual({ a: 1 });
  });
  it("many node", () => {
    const ast = {
      a: {
        b: 1,
      },
      c: {
        d: 2,
      },
    };
    const enter = jest.fn();
    const leave = jest.fn();

    walk(ast, { enter, leave });
    let calls = enter.mock.calls;
    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ a: { b: 1 }, c: { d: 2 } });
    expect(calls[1][0]).toEqual({ b: 1 });
    expect(calls[2][0]).toEqual({ d: 2 });

    calls = leave.mock.calls;
    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ b: 1 });
    expect(calls[1][0]).toEqual({ d: 2 });
    expect(calls[2][0]).toEqual({ a: { b: 1 }, c: { d: 2 } });
  });
  it("array node", () => {
    const ast = {
      a: [
        {
          b: 2,
        },
      ],
    };

    const enter = jest.fn();
    const leave = jest.fn();

    walk(ast, { enter, leave });
    let calls = enter.mock.calls;
    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ a: [{ b: 2 }] });
    expect(calls[1][0]).toEqual([{ b: 2 }]);
    expect(calls[2][0]).toEqual({ b: 2 });

    calls = leave.mock.calls;
    expect(calls.length).toBe(3);
    expect(calls[0][0]).toEqual({ b: 2 });
    expect(calls[1][0]).toEqual([{ b: 2 }]);
    expect(calls[2][0]).toEqual({ a: [{ b: 2 }] });
  });
});
