const walk = require("./walk");
const Scope = require("./scope");

/**
 * 分析函数
 * @param {*} ast
 * @param {*} magicString
 * @param {*} module
 */
module.exports = function analyse(ast, magicString, module) {
  // 全局作用域
  let scope = new Scope();

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
      // 收集函数体里面有多少变量
      _defines: { value: {} },
      // 依赖（声明、使用）哪些变量
      _dependsOn: { value: {} },
      _included: { value: false, writable: true },
      _source: { value: magicString.snip(statement.start, statement.end) },
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
          case "VariableDeclaration":
            node.declarations.forEach(addToScope);
            break;
          default:
            break;
        }

        if (newScope) {
          Object.defineProperties(node, {
            // 函数作用域
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
  // 全局作用域
  ast._scope = scope;

  ast.body.forEach((statement) => {
    walk(statement, {
      enter(node) {
        if (node.type === "Identifier") {
          statement._dependsOn[node.name] = true;
        }
      },
    });
  });
};
