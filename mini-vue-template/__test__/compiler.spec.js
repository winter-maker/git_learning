import { parse } from "../src/compiler/parse";
/**
 * compiler
 * 1、解析 template -> ast
 * 2、转换 ast -> ast *
 * 3、代码生成 ast -> js function
 *
 */
describe("compiler", () => {
  it("parse element", () => {
    const template = "<div></div>";
    // parse 解析抽象语法树
    //接收html字符串，返回js对象能够表达这个html结构
    const ast = parse(template);
    expect(ast[0]).toEqual({
      tag: "div",
      type: "Element",
      props: [],
      children: [],
      isUnary: false, // 是否是自闭和标签
    });
  });
  it("parse plain text", () => {
    const template = "<div>some text</div>";
    const ast = parse(template);
    expect(ast[0]).toEqual({
      tag: "div",
      type: "Element",
      props: [],
      children: [
        {
          type: "Text",
          content: "some text",
        },
      ],
      isUnary: false,
    });
  });
  it("parse props and directive", () => {
    const template = '<div id="foo" v-show="isShow"></div>';
    const ast = parse(template);
    expect(ast[0]).toEqual({
      tag: "div",
      type: "Element",
      props: [
        {
          type: "Attribute",
          name: "id",
          value: "foo",
        },
        {
          type: "Attribute",
          name: "v-show",
          value: "isShow",
        },
      ],
      children: [],
      isUnary: false,
    });
  });
  it("parse interpolation", () => {
    const template = "<div>{{foo}}</div>";
    const ast = parse(template);
    expect(ast[0]).toEqual({
      tag: "div",
      type: "Element",
      props: [],
      children: [
        {
          type: "Interpolation",
          content: {
            type: "Expression",
            content: "foo",
          },
        },
      ],
      isUnary: false,
    });
  });
});
