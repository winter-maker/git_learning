/**
 * AST语法树遍历
 */
function walk(ast, { enter, leave }) {
  visit(ast, null, enter, leave);
}

/**
 * 访问者
 * @param {*} node
 * @param {*} parent
 * @param {*} enter
 * @param {*} leave
 * @returns
 */
function visit(node, parent, enter, leave) {
  // 实现部分

  if (typeof node !== "object") {
    return;
  }
  enter && enter(node, parent);
  const children = Array.isArray(node) ? node : Object.values(node);
  children.forEach((c) => {
    visit(c, node, enter, leave);
  });
  leave && leave(node, parent);
  return;
}

module.exports = walk;
