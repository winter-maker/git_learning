import { generate } from "../src/compiler/generate";
describe("generate", () => {
  it("generate element with text", () => {
    const ast = [
      {
        type: "Element",
        tag: "div",
        props: [],
        isUnary: false,
        children: [{ type: "Text", content: "foo" }],
      },
    ];
    const code = generate(ast);
    expect(code).toMatch(`return this._c('div',null,'foo')`);
  });
  it("generate element with expression", () => {
    const ast = [
      {
        type: "Element",
        tag: "div",
        props: [],
        isUnary: false,
        children: [
          {
            type: "Interpolation",
            content: { type: "Expression", content: "foo" },
          },
        ],
      },
    ];
    const code = generate(ast);
    expect(code).toMatch(`return this._c('div',null,this.foo)`);
  });
  it("generate element with muti children", () => {
    const ast = [
      {
        type: "Element",
        tag: "div",
        props: [],
        isUnary: false,
        children: [
          { type: "Text", content: "foo" },
          {
            type: "Element",
            tag: "span",
            props: [],
            isUnary: false,
            children: [{ type: "Text", content: "bar" }],
          },
        ],
      },
    ];
    const code = generate(ast);
    expect(code).toMatch(
      `return this._c('div',null,[this._v('foo'),this._c('span',null,'bar')])`
    );
  });
});
