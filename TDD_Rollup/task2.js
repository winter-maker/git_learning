const walk = require("../walk");
let str = '', intent = ' ', count = 0, c = 0;

function entryFn (node, parent) {
  const { type, id } = node;
  if (type === 'VariableDeclarator') {
    str += `${count}${' '.repeat(intent)}variable: ${id.name}\n`;
    count++;
  } else if (type === 'FunctionDeclaration') {
    str += `${count}${' '.repeat(intent)}function: ${id.name}\n`;
    count++;
  } else if (type === 'BlockStatement') {
    intent = ' '+=4;
  }
}

function leaveFn(node, parent) {
  const { type, id } = node;
  if (type === 'FunctionDeclaration') {
    intent = intent - 4
  }
}

walk(ast, {}, entryFn, leaveFn); 
