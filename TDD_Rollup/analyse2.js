const Scope = require("./scope");
const walk = require("./walk");
/**
 * 模块分析函数
 * @param {*} ast
 * @param {*} magicString
 */
function analyse(ast, magicString) {
  //全局作用域
  let scope = new Scope();
  ast._scope = scope;
  // 分析 AST 语法树
  ast.body.forEach((statement) => {
    /**
     * 给作用域添加变量
     * @param {*} declaration 声明节点
     */
    function addToScope(declaration) {
      const name = declaration.id.name;
      scope.add(name);
      if (!scope.parent) {
        statement._defines[name] = true;
      }
    }
    Object.defineProperties(statement, {
      _defines: { value: {} },
      _dependsOn: { value: {} },
    });
    walk(statement, {
      enter(node) {
        let newScope;
        switch (node.type) {
          // 函数声明
          case "FunctionDeclaration":
            // 加入到作用域
            addToScope(node);

            const params = node.params.map((v) => v.name);

            // 创建新的作用域
            newScope = new Scope({
              parent: scope,
              params,
            });
            break;
          // 变量声明
          case "VariableDeclaration":
            node.declarations.forEach(addToScope);
            break;
        }
        if (newScope) {
          Object.defineProperties(node, {
            _scope: { value: newScope },
          });
          scope = newScope;
        }
      },
      leave(node) {
        if (node._scope) {
          scope = scope.parent;
        }
      },
    });
  });
  ast.body.forEach((statement) => {
    walk(statement, {
      enter(node) {
        if (node.type === "Identifier") {
          statement._dependsOn[node.name] = true;
        }
      },
    });
  });
}

module.exports = analyse;
