const acorn = require("acorn");
const walk = require("walk");
class Module {
  constructor(props) {
    const { code } = props || {};
    this.code = code;
    this.ast = acorn.parse(this.code, {
      locations: true,
      ranges: true,
      sourceType: "module",
      ecmaVersion: 7,
    });
    this.analyse();
  }
  expandAllStatement() {
    const allStatements = [];
    this.ast.body.forEach((node) => {
      if (
        node.type === "ImportDeclaration" ||
        node.type === "VariableDeclaration"
      )
        return;
      const statements = this.expandStatement(node);
      allStatements.push(...statements);
    });
    return allStatements;
  }
  // 语句扩展：声明 + 调用
  expandStatement(statement) {
    const result = [];
    const _dependsOn = statement._dependsOn;
    Object.keys(_dependsOn).forEach((key) => {
      console.log(_dependsOn[key]);
      result.push(this.define(key));
    });
    return result;
  }
  /**
   * 查找变量声明
   *
   */
  define(name) {
    if (false) {
      // import 声明,来自于其他模块
    } else {
      return this.definitions[name];
    }
  }
  analyse() {
    this.imports = {};
    this.exports = {};
    this.definitions = {};
    this.ast.body.forEach((node) => {
      walk(node, {
        enter(node) {
          switch (node.type) {
            case "ImportDeclaration":
              node.specifiers.forEach((specifier) => {
                const loaclName = specifier?.local.name;
                const source = node.source.value;
                const importedName = specifier?.imported?.name || "";
                this.imports[loaclName] = {
                  localName: loaclName,
                  name: importedName,
                  source,
                };
              });
              break;
            case "ExportNamedDeclaration":
              node.declaration.declarations.forEach((declaration) => {
                const name = declaration.id.name;
                this.exports[name] = {
                  localName: name,
                  node: node,
                  expression: node.declaration,
                };
              });
              break;
            case "VariableDeclaration":
              node.declarations.forEach((declaration) => {
                const name = declaration.id.name;
                this.definitions[name] = node;
              });
              break;
            default:
              break;
          }
        },
      });
    });
  }
}
module.exports = Module;
