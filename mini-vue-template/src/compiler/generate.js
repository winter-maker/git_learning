export function generate(ast) {
  // 递归遍历ast，为每个节点生成对应代码
  const code = genNode(ast[0]);
  return `return ${code}`;
}

function genNode(ast) {
  // 判断节点类型执行不同生成逻辑
  if (ast.type === "Element") {
    // 节点
    return genElement(ast);
  } else if (ast.type === "Text") {
    // 文本
    return genText(ast);
  } else if (ast.type === "Interpolation") {
    // 插值
    return genText(ast.content);
  }
  return "";
}

function genElement(el) {
  const tag = `'${el.tag}'`;
  // 递归子元素
  const children = genChildren(el);

  // 属性
  const props = genProps(el);

  // _c(tag,props,children)
  const code = `this._c(${tag},${props}${children ? `,${children}` : ""})`;
  return code;
}

function genChildren(el) {
  const children = el.children;

  if (children.length > 0) {
    // 如果只有一个类型为Text的子元素，则处理为字符串形式：_c('div',null,'text')
    if (
      children.length === 1 &&
      (children[0].type === "Text" || children[0].type === "Interpolation")
    ) {
      return children[0].type === "Text"
        ? `'${children[0].content}'`
        : `this.${children[0].content.content}`;
    }
    // 其他情况处理为数组形式：_c('div',null,[_c('span',null,'text')])
    return `[${children.map((c) => genNode(c)).join(",")}]`;
  }
}

function genProps(el) {
  if (el.props.length > 0) {
    // 遍历el.props，返回{key:val}
    const result = {};
    for (const prop of el.props) {
      result[prop.name] = prop.value;
    }
    return JSON.stringify(result);
  }
  return null;
}

function genText(text) {
  const content =
    text.type === "Expression" ? `this.${text.content}` : `'${text.content}'`;
  return `this._v(${content})`;
}
