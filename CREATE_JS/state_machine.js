// LL语法分析
// 外星语言
const reg = /(pa|gu)/g;
const bstr = "gugugupagugugupagugugupa";
const str = "gugugupagugugupagugugupa";
const acstr = "pagugupa";
const acbstr = "pagugupagugugupa";
const abstr = "pagugugugugupa";
const cbstr = "pagugugupa";
const astr = "pagugupagugupagugupagugupagugupagugu";
let r;
let list = [];
while ((r = reg.exec(abstr))) {
  list.push({ type: r[0] });
  //console.log(r);
}
list.push({
  type: "EOF",
});
abc(list);
console.log(JSON.stringify(list, null, 2));
// case1 <a> ::= "pa" "gu" "gu"
function a(list) {
  if (list[1].type === "gu" && list[2].type === "gu") {
    const symbol = {
      type: "a",
    };
    symbol.children = list.splice(0, 3, symbol);
  }
}
// case2 <b> ::= "gu" "gu" "gu" "pa"
function b(list) {
  if (list[1].type === "gu" && list[2].type === "gu" && list[3].type === "pa") {
    const symbol = {
      type: "b",
    };
    symbol.children = list.splice(0, 4, symbol);
  }
}
// case3 <c> ::= "pa"
function c(list) {
  const symbol = { type: "c" };
  symbol.children = list.splice(0, 1, symbol);
}

// <blist> ::= <b> | <b><blist>
function blist(list) {
  // 第一个是b
  if (list[0].type === "gu") {
    b(list);
    blist(list);
  } else if (list[0].type === "b") {
    // 只有一个b
    if (list[1].type === "EOF") {
      const symbol = {
        type: "blist",
      };
      symbol.children = list.splice(0, 1, symbol);
      // 有多个b
    } else if (list[1].type === "gu") {
      const word = list.shift();
      blist(list);
      const symbol = {
        type: "blist",
      };
      symbol.children = [word, ...list.splice(0, 1)];
      list.unshift(symbol);
    }
  }
}
{
  /* <a> ::= "pa" "gu" "gu"
<b> ::= "gu" "gu" "gu" "pa"
<c> ::= "pa"
<abc> ::= <a>+ | <b>+ | <a>+<b>+ | <a>*<c><b>*
<blist> ::= <b> | <b><blist> */
}
// case4 <abc> ::= <a>+ | <b>+ | <a>+<b>+ | <a>*<c><b>*
function abc(list) {
  // 第2个分支
  if (list[0].type === "gu") {
    blist[list];
  }
  // 第1，3，4个分支
  if (list[0].type === "pa") {
    // 看前四个符号决定 reduce
    // c
    if (list[1].type === "EOF") {
      c(list);

      //ac
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "pa"
    ) {
      const symbol = {
        type: "ac",
        children: [],
      };
      alist(list);
      symbol.children.push(list.shift());
      c(list);
      symbol.children.push(list.shift());
      list.unshift(symbol);
      //cb
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "gu" &&
      list[4].type === "pa"
    ) {
      const symbol = {
        type: "cb",
        children: [],
      };
      c(list);
      symbol.children.push(list.shift());
      blist(list);
      symbol.children.push(list.shift());
      list.unshift(symbol);

      // ab
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "gu" &&
      list[4].type === "gu" &&
      list[5].type === "gu" &&
      list[6].type === ""
    ) {
      const symbol = {
        type: "ab",
        children: [],
      };
      alist(list);
      symbol.children.push(list.shift());
      blist(list);
      symbol.children.push(list.shift());
      list.unshift(symbol);
    }
  }
}
// a是多个设置alist
function alist(list) {
  // 第一个是b
  if (list[0].type === "pa") {
    a(list);
    alist(list);
  } else if (list[0].type === "a") {
    // 去除 acb
    if (
      list[1].type === "EOF" ||
      (list[1].type === "pa" && list[2].type === "EOF")
    ) {
      const symbol = {
        type: "alist",
      };
      symbol.children = list.splice(0, 1, symbol);
    } else if (list[1].type === "pa") {
      //第二个pagugu的第一个pa
      const word = list.shift();
      alist(list);
      const symbol = {
        type: "alist",
      };
      symbol.children = [word, ...list.splice(0, 1)];
      list.unshift(symbol);
    }
  }
}
