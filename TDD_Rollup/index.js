// 打造原型
// 文件系统
const fs = require("fs");
const path = require("path");
// 编译器
const acorn = require("acorn");
const MagicString = require("magic-string");
//读取文件
const code = fs.readFileSync("./source.js", "utf-8").toString();
//切割字符
const m = new MagicString(code);
const sm = m.snip(0, 19).toString(); //console.log('--sm--', sm)
//生成ast语法树
const ast = acorn.parse(code, {
  //locations: true,
  //ranges: true,
  sourceType: "module",
  ecmaVersion: 7,
});
const declaraticons = {};
const statements = [];
// 分析部分 如果是变量声明，把变量当作key, 表达式当作value 重组数据
// ast.body.forEach((node) => {
//   if (node.type === "VariableDeclaration") {
//     declaraticons[node.declarations[0].id.name] = node;
//   }
// });
// 展开部分, 把调用的方法提取出来达到treeShaking 效果
// ast.body
//   .filter((node) => node.type !== "VariableDeclaration")
//   .forEach((node) => {
//     statements.push(declaraticons[node.expression.callee.name]);
//     statements.push(node);
//   });
//console.log(statements);
// 导出 output 部分
// let str = "";
// statements.forEach((node) => {
//   str += m.snip(node.start, node.end).toString() + "\n";
// });
//console.log(str);
// walk 函数应用：树状结构展示作用域
const walk = require("./walk");
let indent = 0;
walk(ast, {
  enter(node) {
    //console.log(node);
    //console.log("-------------------");
    if (node.type === "VariableDeclarator") {
      console.log("Var:", " ".repeat(indent * 4), node.id.name);
    }
    if (node.type === "FunctionDeclaration") {
      console.log("Fun:", " ".repeat(indent * 4), node.id.name);
      indent++;
    }
  },
  leave(node) {
    if (node.type === "FunctionDeclaration") {
      indent--;
    }
  },
});
