const reg = /(pa|gu)/g;
const bstr = "gugugupagugugupagugugupa";
//const str = "gugugupagugugupagugugupa";
//const str = "pagugupagugu";
let r;
let list = [];
while ((r = reg.exec(bstr))) {
  list.push({ type: r[0] });
  //console.log(r);
}
list.push({
  type: "EOF",
});
blist(list);
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
// case4 <abc> ::= <a>+ | <b>+ | <a>+<b>+ | <a>*<c><b>*
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
function abc(list) {
  if (list[0].type === "gu") {
    blist[list];
  }
  if (list[0].type === "pa") {
    // 看前四个符号决定 reduce
    // c
    if (list[1].type === "EOF") {
      c(list);
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "pa"
    ) {
      //ac
      const symbol = {
        type: "ac",
        children: [],
      };
      alist(list);
      symbol.children.push(list.shift());
      c(list);
      symbol.children.push(list.shift());
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "gu"
    ) {
      //cb
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "gu"
    ) {
      // ab
    }
  }
}
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
