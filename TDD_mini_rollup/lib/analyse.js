const Scope = require("./scope");
const walk = require("./walk");
/**
 * @title 模块分析函数
 * @attribute {_scope} 函数作用域
 * @attribute {_defines} 局部变量定义
 * @attribute {_dependsOn} 变量依赖外部模块
 * @attribute {_included} 此语句是否被占用
 * @attribute {_source} 语句内容
 */
function analyse(ast, magicString, module) {
  // 创建全局作用域
  let scope = new Scope();
  // 遍历当前语法树
  ast.body.forEach((statement) => {
    //给作用域添加变量
    function addToScope(declaration) {
      let name = declaration.id.name;
      scope.add(name);
      if (!scope.parent) {
        //如果当前是全局作用域
        statement._defines[name] = true;
      }
    }

    Object.defineProperties(statement, {
      _module: { value: module },

      // 变量定义
      _defines: { value: {} },
      // 依赖外部变量
      _dependsOn: { value: {} },
      // 此语句是已经包含到输出语句里了
      _included: { value: false, writable: true },
      // 变量语句
      _source: { value: magicString.snip(statement.start, statement.end) },
    });

    // 作用域遍历，分析变量定义，构造作用域
    walk(statement, {
      enter(node) {
        let newScope;
        //防止空节点和空数组
        if (node === null || node.length === 0) return;
        switch (node.type) {
          //方法声明
          case "FunctionDeclaration":
            addToScope(node);
            const params = node.params.map((v) => v.name);
            // 新作用域
            newScope = new Scope({
              parent: scope,
              params,
            });
            break;
          // 变量声明
          case "VariableDeclaration":
            node.declarations.forEach(addToScope);
            break;
          default:
            break;
        }
        if (newScope) {
          // 当前节点声明的新作用域
          Object.defineProperties(node, { _scope: { value: newScope } });
          scope = newScope;
        }
      },
      leave(node) {
        if (node._scope) {
          // 如果此节点离开退出父作用域
          scope = scope.parent;
        }
      },
    });
  });
  ast._scope = scope;
  // 找出哪些变量需要外依赖
  ast.body.forEach((statement) => {
    walk(statement, {
      enter(node) {
        if (node._scope) {
          scope = node._scope;
        }
        // 遇到变量节点
        if (node.type === "Identifier") {
          statement._dependsOn[node.name] = true;
        }
      },
      leave(node) {
        if (node._scope) scope = scope.parent;
      },
    });
  });
}
module.exports = analyse;
