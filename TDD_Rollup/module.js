const acorn = require("acorn");
const analyse = require("./analyse");
const MagicString = require("magic-string");

function has(obj, prop) {
  return Object.prototype.hasOwnProperty(obj, prop);
}
const SYSTEM_VAR = ["console", "log"];
class Module {
  constructor(props) {
    const { code } = props || {};
    this.code = new MagicString(code);
    this.ast = acorn.parse(code, {
      locations: true,
      ranges: true,
      sourceType: "module",
      ecmaVersion: 7,
    });
    analyse(this.ast, this.code, this);
    this.analyse();
  }
  expandAllStatement() {
    const allStatements = [];
    this.ast.body.forEach((node) => {
      if (node.type === "ImportDeclaration") return;
      if (node.type === "VariableDeclaration") return;
      //console.log("node-", node, node._dependsOn);
      const statements = this.expandStatement(node);
      allStatements.push(...statements);
    });
    //console.log("-allStatements---", allStatements);
    return allStatements;
  }
  // 语句扩展：声明 + 调用
  expandStatement(statement) {
    // 此语句已被引用
    statement._included = true;
    const result = [];
    const _dependsOn = statement._dependsOn;
    Object.keys(_dependsOn).forEach((key) => {
      //console.log("-key--", key);
      result.push(...this.define(key));
    });
    result.push(statement);
    return result;
  }
  /**
   * 查找变量声明
   *
   */
  define(name) {
    if (has(this.imports, name)) {
      // import 声明,来自于其他模块,加载模块
    } else {
      const statement = this.definitions[name];
      if (statement) {
        if (statement._included) {
          return [];
        } else {
          // 递归
          return this.expandStatement(statement);
        }
      } else if (SYSTEM_VAR.includes(name)) {
        return [];
      } else {
        throw new Error(`没有此变量${name}`);
      }
    }
  }
  analyse() {
    this.imports = {};
    this.exports = {};
    this.definitions = {};

    this.ast.body.forEach((node) => {
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
          // node.declarations.forEach((declaration) => {
          //   const name = declaration.id.name;
          //   this.definitions[name] = node;
          // });
          let _defines = node._defines;
          for (let k in _defines) {
            if (_defines[k]) {
              this.definitions[k] = node;
            }
          }
          break;
        default:
          break;
      }
    });
  }
}
module.exports = Module;
