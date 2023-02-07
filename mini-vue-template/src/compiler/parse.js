export function parse(template) {
  // 上下文,
  const context = {
    source: template,
    advance(length) {
      this.source = this.source.slice(length);
    },
    advanceSpace() {
      const match = /^[\t\r\n\f ]+/.exec(context.source);
      if (match) {
        context.advance(match[0].length);
      }
    },
  };
  return parseChildren(context, []);
  // return [
  //   {
  //     tag: "div",
  //     type: "Element",
  //     children: [],
  //     isUnary: false, // 是否是自闭和标签
  //   },
  // ];
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
function parseText(context) {
  let endIndex = context.source.length;
  // 查找<
  const ltIndex = context.source.indexOf("<");
  // 查找{{
  const delimiterIndex = context.source.indexOf("{{");
  if (ltIndex > -1 && ltIndex < endIndex) {
    endIndex = ltIndex;
  }
  if (delimiterIndex > -1 && delimiterIndex < endIndex) {
    endIndex = delimiterIndex;
  }
  // 截取并消费
  const content = context.source.slice(0, endIndex);

  //创建文本ast
  context.advance(content.length);
  return {
    type: "Text",
    content,
  };
}
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
  // 处理剩余字符串的空格、制表符等
  context.advanceSpace();
  //属性处理props
  const props = parseAttrs(context);
  //自闭和标签判断，看看是否以 /> 开头
  const isUnary = context.source.startsWith("/>");
  context.advance(isUnary ? 2 : 1);
  return {
    tag,
    type: "Element",
    children: [],
    props,
    isUnary, // 是否是自闭和标签
  };
}
function parseAttrs(context) {
  //const { advance, advanceSpace } = context;
  const props = [];

  //只要不遇到结束符 /> 或 >,就不断的循环消费模板内容
  while (!context.source.startsWith(">") && !context.source.startsWith("/>")) {
    const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source);
    //1、获取属性名称
    const name = match[0];
    //2、消费属性名
    context.advance(name.length + 1);
    context.advanceSpace();
    //3、获取属性值
    let value = "";
    //4、获取首字符
    const quote = context.source[0];
    //5、判断是否是引号
    const isQuot = quote === "'" || quote === '"';
    if (isQuot) {
      //消费头一个引号
      context.advance(1);
      //获取下一个引号
      const index = context.source.indexOf(quote);
      //截取中间部分
      if (index > -1) {
        value = context.source.slice(0, index);
        // 消费属性值和后面的引号
        context.advance(value.length + 1);
      } else {
        console.error("缺少引号");
      }
    } else {
      const match = /^[^\t\r\n\f >]+/.exec(context.source);
      value = match[0];
      context.advance(value.length);
    }

    //消费属性之间的空格
    context.advanceSpace();
    // 存入结果数组
    props.push({
      type: "Attribute",
      name: name,
      value: value,
    });
  }
  return props;
}

function parseInterpolation(context) {
  //消费{{
  context.advance(2);
  //找结束 }}
  const delimiterIndex = context.source.indexOf("}}");
  // 截取表达式
  const content = context.source.slice(0, delimiterIndex);
  //消费内容
  context.advance(content.length);
  //消费}}
  context.advance(2);
  //构造节点
  return {
    type: "Interpolation",
    content: {
      type: "Expression",
      content,
    },
  };
}
