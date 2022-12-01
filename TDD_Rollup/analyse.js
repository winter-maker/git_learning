const Scope = require("./scope");
const Walk = require("./walk");
/**
 *分析函数
 *@param {*} ast
 *@param {*} magicString
 */
function analyse(ast, magicString) {
  const root = new Scope();
  ast._scope = root;
  const currentScope = root;
  ast.body.forEach((statement) => {
    Walk(statement, {
      enter(node) {
        switch (node.type) {
          case "FunctionDeclaration":
            let child = new Scope({
              parent: currentScope,
            });
            currentScope.add(node.id.name);
            currentScope = parent;
            // currentScope.add(node.id.name);
            // node_scope = root;
            break;
          case "VariableDeclaration":
            // let child = new Scope({
            //   parent: root,
            // });
            // child.add(node.id.name);
            // node._scope = child;
            currentScope.add(node.id.name);
            break;
        }
      },
      leave() {},
    });
  });
}

module.exports = analyse;
