// 引入文件系统
const fs = require("fs");
// 引入编译器
const acorn = require("acorn");
// 引入操作字符串的库
const MagicString = require("magic-string");
const walk = require("./walk");
// 读取文件代码字符串
const code = fs.readFileSync("./source.js").toString();
// 代码字符串转换成 ast 树
let ast = acorn.parse(code, {
  locations: true,
  ranges: true,
  sourceType: "module",
  ecmaVersion: 7,
});
//console.log("ast", ast);

const m = new MagicString(code);
//console.log("m", m.toString());
ast.body.forEach((node, i) => {
  //console.log(`${i} :${m.snip(node.start, node.end).toString()}`);
});

// 用户声明
// let declarations = {};
// ast.body
//   .filter((node) => node.type === "VariableDeclaration")
//   .map((node) => (declarations[node.declarations[0].id.name] = node));
// console.log("用户声明", declarations);

// 用户调用
// let statements = [];
// ast.body
//   .filter((node) => node.type !== "VariableDeclaration")
//   .map((node, i) => {
//     statements.push(declarations[node.expression.callee.name]);
//     statements.push(node);
//     return { node, i };
//   });
//console.log("用户调用", statements);

// output
// statements.forEach((node, i) => {
//   //console.log(`${i}: ${m.snip(node.start, node.end).toString()}`);
// });

// 使用walk遍历器打印函数作用域
let ident = 0;
ast.body.forEach((statement) => {
  walk(statement, {
    enter(node) {
      if (node.type === "FunctionDeclaration") {
        console.log("%sfunction: %s", " ".repeat(ident * 4), node.id.name);
        ident++;
      }
      if (node.type === "VariableDeclarator") {
        console.log("%svariable: %s", " ".repeat(ident * 4), node.id.name);
      }
    },
    leave(node) {
      if (node.type === "FunctionDeclaration") {
        ident--;
      }
    },
  });
});
