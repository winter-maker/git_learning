const { visitors } = require("@babel/traverse");

function walk(ast, { enter, leave }) {
  visit(ast, null, enter, leave);
}

/**
 * @title 节点遍历器
 */
function visit(node, parent, enter, leave) {
  if (!node) return;
  if (enter) {
    enter.call(null, node, parent);
  }
  let childKeys = Object.keys(node).filter(
    (key) => typeof node[key] === "object"
  );
  childKeys.forEach((childKey) => {
    const value = node[childKey];
    visit(value, node, enter, leave);
  });
  if (leave) {
    leave(node, parent);
  }
}
module.exports = walk;
