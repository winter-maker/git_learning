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
  //console.log("node-", node, parent, enter, leave);
  // if (!node || typeof node !== "object") {
  //   return;
  // }
  // enter && enter(node, parent);
  // const children = Array.isArray(node) ? node : Object.values(node);
  // children.forEach((c) => {
  //   visit(c, node, enter, leave);
  // });
  // leave && leave(node, parent);
  // return;
  if (!node) return;
  if (enter) {
    enter.call(null, node, parent);
  }
  // 过滤需要遍历的对象
  const childKeys = Object.keys(node).filter(
    (key) => typeof node[key] === "object"
  );

  childKeys.forEach((childKey) => {
    const value = node[childKey];
    visit(value, parent, enter, leave);
  });

  if (leave) {
    leave(node, parent);
  }
}

module.exports = walk;
