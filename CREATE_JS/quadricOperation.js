// 四则运算 加、减、乘、除
// 数字 和 符号当作非终结符（nonterminalSymbol）

/***
 * BNF 产生式,巴克斯诺尔范式
 * <additive> ::= '+'
 * <reduce> ::= '-'
 * <ride> ::= '*'
 * <except> ::= '/'
 * <symbol> ::= <additive> | <reduce> | <ride> | <except>
 * <number> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
 * <expression> ::= <number> <symbol> <expression>
 * <language> ::= <expression>+
 */

/**
 *
 * 自增 i++, ++i
 * <Increase> ::= <Number>"++" | "++"<Number>
 * 增加括号,优先级最高
 * <Primary> ::= "(" <Expression> ")" | <Number>
 *
 * +，-单目运算
 * <Unary> ::= <Primary> | "+"<Primary> | '-'<Primary>
 *
 * + - * /
 * 乘除
 * <MultiplicationExpression> ::= <Unary> | <MultiplicationExpression> '/' <Unary> | <MultiplicationExpression> '*' <Unary>
 * 加减
 * <AdditiveExpression> ::= <MultiplicationExpression> | <AdditiveExpression> '+' <MultiplicationExpression> | <AdditiveExpression> '-' <MultiplicationExpression>
 * <Expression> ::= <AdditiveExpression>
 *
 *
 * 增加 ||或 &&与 逻辑运算，优先于是最低的，比加减还要低，与比或高
 * LogicAndExpression ::= <AdditiveExpression> | <LogicAndExpression> '&&' <AdditiveExpression>
 * LogicOrExpression ::= <LogicAndExpression> | <LogicOrExpression> '||' <LogicAndExpression>
 *
 * = 是右结合, a = b = 1 相等于 a = (b = 1)
 * <Assignment> ::= <LogicOrExpression> | <LogicOrExpression>"="<Assignment>
 *
 * ** 幂运算也是右结合运算符
 *
 * 逗号，优先级最低
 * <ExpressionGroup> ::= <LogicOrExpression> | <ExpressionGroup>","<LogicOrExpression>
 *
 * IF
 * <IFExpression> ::= <ExpressionGroup> | "if""("<ExpressionGroup>")"<ExpressionGroup>
 *
 * 分号
 * <SplitExpression> ::= <ExpressionGroup> | <SplitExpression>";"<ExpressionGroup>
 *
 *
 * 乘除
 * <MultiplicationExpression> ::= <Primary> |
 * <MultiplicationExpression> '/' <Primary> |
 * <MultiplicationExpression> '*' <Primary>
 *
 * <AdditiveExpression> 的 closure（包含集,首相展开的集合），把每个可能都展开
 *
 * <AdditiveExpression> ::=
 * <AdditiveExpression> '+' <MultiplicationExpression> | addi
 * <AdditiveExpression> '-' <MultiplicationExpression> | addi
 * <MultiplicationExpression> | addi
 * <MultiplicationExpression> '/' <Primary> | mult
 * <MultiplicationExpression> '*' <Primary> | mult
 * <Primary> | mult
 * "(" <Expression> ")" | primary
 * <Number> primary
 *
 * **/

let reg = /([1-9][0-9]{0,}(\.[0-9]+){0,1}|0\.[0-9]{1,}|0)|(\+)|(\-)|(\*)|(\/)/g;
let str = "1*2/3*4";
let r = null,
  list = [];
const operatorMap = {};
while ((r = reg.exec(str))) {
  list.push({
    value: r[1],
    type: r[1] ? "number" : r[0],
  });
}

list.push({
  type: "EOF",
});
additive(list);
console.log(JSON.stringify(list, null, 4));

// function pick(obj) {
//   if (["+", "-", "*", "/"].includes(obj.type)) return obj.type;
//   if (obj.value) return obj.value;
//   return obj.children.map(pick).join(" ");
// }
// console.log("origin", pick(list[0]));

// let list2 = [];
// pick(list[0]);
// function pick(obj) {
//   console.log(obj);
//   obj.children.forEach((ele) => {
//     if (["+", "-", "*", "/"].includes(ele.type)) {
//       list2.push({
//         type: ele.type,
//       });
//     } else {
//       if (ele.children) {
//         pick(ele.children);
//       } else {
//         if (ele.type === "number") {
//           list2.push({
//             type: ele.type,
//             value: ele.value,
//           });
//         }
//       }
//     }
//   });
// }
//console.log(JSON.stringify(list2, null, 4));

// 加减法
function additive(list) {
  if (list[0].type === "number") {
    multiplicative(list);
    additive(list);
  } else if (list[0].type === "multiplicative") {
    let additiveSymbol = {
      children: [...list.slice(0, 1)],
      type: "additive",
    };
    list.splice(0, 1, additiveSymbol);
    additive(list);
  } else if (list[0].type === "additive") {
    if (list[1].type === "EOF") {
      return;
    } else {
      // 三合一
      let children = list.splice(0, 2); //拿出前两个
      multiplicative(list); //执行完的第3个就出来了
      children.push(list.shift());
      let addSymbol = {
        children,
        type: "additive",
      };
      //list.splice(0, 1, addSymbol);
      list.unshift(addSymbol);
      additive(list);
    }
  }
}

// 乘除法
function multiplicative(list) {
  if (list[0].type === "number") {
    let mulSymbol = {
      children: [...list.slice(0, 1)],
      type: "multiplicative",
    };
    list.splice(0, 1, mulSymbol);
    multiplicative(list);
  } else if (list[0].type === "multiplicative") {
    if (
      list[1].type === "+" ||
      list[1].type === "-" ||
      list[1].type === "EOF"
    ) {
      return;
    } else {
      let mulSymbol = {
        children: [...list.slice(0, 3)],
        type: "multiplicative",
      };
      list.splice(0, 3, mulSymbol);
      multiplicative(list);
    }
  }
}

/* 乘除
 * <MultiplicationExpression> ::= <Number> | <MultiplicationExpression> '/' <Number> | <MultiplicationExpression> '*' <Number>
 * 加减
 * <AdditiveExpression> ::=
 * <MultiplicationExpression> |
 * <AdditiveExpression> '+' <MultiplicationExpression> |
 * <AdditiveExpression> '-' <MultiplicationExpression> |
 * <Primary> |
 * <MultiplicationExpression> '/' <Primary> |
 * <MultiplicationExpression> '*' <Primary> |
 * "(" <Expression> ")" |
 * <Number>
 * */
function expressionParser(list) {
  if (list[0].type === "number" || list[0].type === "bracket") {
    bracketExpressionParser(list);
    expressionParser(list);
  } else if (list[0].type === "+") {
    if (list[1].type === "") {
    }
  }
}
