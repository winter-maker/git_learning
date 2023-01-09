export function parse(template) {
  // 上下文
  const context = {
    source: template,
    advance(length) {
      this.source = this.source.slice(length);
    },
    advanceSpace() {},
  };
  return parseChildren(context, []);
  //   return [
  //     {
  //       tag: "div",
  //       type: "Element",
  //       children: [],
  //       isUnary: false, // 是否是自闭和标签
  //     },
  //   ];
}

/**
 * @title 解析子节点
 * @context 上下文
 * @stack 调用栈
 */
function parseChildren(context, stack) {
  // 储存解析获得的所有ast节点
  const nodes = [];
  // 开启状态机，只有满足条件就一直解析
  while (!isEnd(context, stack)) {
    //单次解析的结果
    let node = null;
    // 1、标签
    if (context.source[0] === "<") {
      if (context.source[1] === "/") {
        console.error("无效标签");
        continue;
      } else if (/[a-z]/i.test(context.source[1])) {
        // 开始标签
        node = parseElement(context, stack);
      }
    }
    // 2、插值
    else if (context.source.startsWith("{{")) {
      node = parseInterpolation(context);
    }
    // 如果代码走到这里还没有node,那么这里是文本
    // 3、文本
    if (!node) {
      node = parseText(context);
    }
    nodes.push(node);
  }
  return nodes;
}
function isEnd(context, stack) {
  // 模板解析完毕
  if (!context.source) {
    return true;
  }
  //遇到结束标签，且stack中存在同名开始标签
  const parent = stack[stack.length - 1];
  if (parent && context.source.startsWith(`</${parent.tag}`)) {
    return true;
  }
}
// 创建对象
function parseElement(context, stack) {
  //1、ele 就是解析结果ast
  const ele = parseTag(context);
  //2、入栈
  stack.push(ele);
  //3、递归处理children
  ele.children = parseChildren(context, stack);
  //4、出栈
  stack.pop();
  //5、解析结束标签
  if (context.source.startsWith(`</${ele.tag}`)) {
    parseTag(context, "end");
  } else {
    console.error("缺少闭合标签");
  }
  return ele;
}
function parseText(context) {}
function parseTag(context, type = "start") {
  // 处理开始、结束标签的正则不同
  const pattern =
    type === "start"
      ? /^<([a-z][^\t\r\n\f />]*)/i
      : /^<\/([a-z][^\t\r\n\f />]*)/i;
  // 匹配source,成功则第一个分组是标签名
  const match = pattern.exec(context.source);
  const tag = match[1];
  // 消费匹配部分
  context.advance(match[0].length);
  //属性处理props
  // 处理剩余字符串的空格、制表符等
  context.advanceSpace();
  const props = parseAttrs(context.source);
  //自闭和标签判断，看看是否以 /> 开头
  const isUnary = context.source.startsWith("/>");
  context.advance(isUnary ? 2 : 1);
  return {
    tag,
    type: "Element",
    children: [],
    //props: []
    isUnary, // 是否是自闭和标签
  };
}
