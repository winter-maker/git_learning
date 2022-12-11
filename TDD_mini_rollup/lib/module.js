const MagicString = require("magic-string");
const path = require("path");
const { parse } = require("acorn");
const analyse = require("./analyse");
const SYSTEM_VARIABLES = ["console", "log"];

function has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
// 分析模块
class Module {
  constructor({ code, path, bundle }) {
    this.code = new MagicString(code, { filename: path });
    this.path = path;
    this.bundle = bundle;

    // Parse 阶段
    this.ast = parse(code, {
      ecmaVersion: 7,
      sourceType: "module",
    });
    // 分析模块导入导出
    this.analyse();
  }
  analyse() {
    // 导入语句
    this.imports = {};
    // 导出语句
    this.exports = {};
    this.ast.body.forEach((node) => {
      if (node.type === "ImportDeclaration") {
        let source = node.source.value;
        let specifiers = node.specifiers;
        specifiers.forEach((specifier) => {
          const name = specifier?.imported?.name || "";
          const localName = specifier?.local?.name || "";
          this.imports[localName] = { name, localName, source };
        });
      } else if (/^Export/.test(node.type)) {
        let declaration = node.declaration;
        if (declaration.type === "VariableDeclaration") {
          if (!declaration.declarations) return;
          let name = declaration.declarations[0].id.name;
          this.exports[name] = {
            node,
            localName: name,
            expression: declaration,
          };
        }
      }
    });

    // 调用分析模块
    analyse(this.ast, this.code, this);
    this.definitions = {};
    this.ast.body.forEach((statement) => {
      Object.keys(statement._defines).forEach((key) => {
        this.definitions[key] = statement;
      });
    });
  }
  // 将声明附加到定义上
  expandAllStatement() {
    const allStatements = [];
    this.ast.body.forEach((statement) => {
      // 忽略所有import 语句
      if (statement.type === "ImportDeclaration") return;
      if (statement.type === "VariableDeclaration") return;
      // 查找变量声明
      let statements = this.expandStatement(statement);
      allStatements.push(...statements);
    });
    return allStatements;
  }
  // 查找变量声明
  expandStatement(statement) {
    statement._included = true;
    let result = [];
    // 遍历所有依赖变量
    const dependcies = Object.keys(statement._dependsOn);
    dependcies.forEach((name) => {
      const definition = this.define(name);
      result.push(...definition);
    });
    // 添加自己
    result.push(statement);
    return result;
  }
  define(name) {
    if (has(this.imports, name)) {
      // 加载模块
      // import项的声明部分
      const importDeclaration = this.imports[name];
      // 获取msg模块 exports imports
      // 读取声明模块
      const module = this.bundle.fetchModule(
        importDeclaration.source,
        this.path
      );
      // this.exports['age'] =
      const exportData = module.exports[importDeclaration.name];

      // 低啊用msg模块的define 目的返回
      console.log("exportData-", exportData);
      return module.define(exportData.localName);
    } else {
      //获取当前的模块内定义的变量，以及定义语句
      let statement = this.definitions[name];
      // 此变量存在且没有被添加过
      if (statement) {
        //如果有定义，
        if (statement._included) {
          // 此变量在 analyse 函数中定义
          // _included: { value: false, writable: true }, //此语句是已经包含到输出语句里了
          //是否包含过了，如果包含过了，直接返回空数组
          return [];
        } else {
          return this.expandStatement(statement);
          //展开返回的结果
          // return [statement]
        }
      } else if (SYSTEM_VARIABLES.includes(name)) {
        //是系统变量
        return [];
      } else {
        throw new Error(
          `变量${name}既没有从外部导入，也没有在当前的模块内声明`
        );
      }
    }
  }
}
module.exports = Module;
