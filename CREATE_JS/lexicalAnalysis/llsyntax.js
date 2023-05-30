// 外星语言， LL语法分析
/**
 * a > pagugu
 * b > gugugupa
 * c > pa
*/
const reg = /(pa|gu)/g;
const str = 'pagugugugupa';
const astr = 'pagugu';
const aastr = 'pagugupagugu';
const aaastr = "pagugupagugupagugu";
const cstr = "pa";
const acstr = "pagugupa";
const abstr = "pagugugugugupa";
const bstr = "gugugupa";
const bbstr = "gugugupagugugupa";
const bbbstr = "gugugupagugugupagugugupa";
let r;
let list = [];
while ((r = reg.exec(abstr))) {
  list.push({ type: r[0] });
}
list.push({
  type: "EOF",
});
abc(list);
console.log(JSON.stringify(list, null, 4));

// 处理pagugu
function a(list) {
  if (list[1].type === "gu" && list[2].type === "gu") {
    const symbol = {
      type: "a",
    };
    symbol.children = list.splice(0, 3, symbol);
  }
}
// 处理gugugupa
function b(list) {
  if (list[1].type === "gu" && list[2].type === "gu" && list[3].type === "pa") {
    const symbol = {
      type: "b",
    };
    symbol.children = list.splice(0, 4, symbol);
  }
}
// 处理pa
function c(list) {
  const symbol = {
    type: "c",
  };
  symbol.children = list.splice(0, 1, symbol);
}
// a ::= 'pa''gu''gu'
// b ::= 'gu''gu''gu''pa'
// c ::= 'pa'
// abc ::= <a>+ | <b>+ | <a>+<b>+ | <a>*<c><b>*

//<abc> ::= <a>+ | <b>+ | <a><c><b> | <a>+<b>+
//<blist> ::= <b> | <b><blist>
//<alist> ::= <a> | <a><alist>
//<abc> ::= <alist> | <blist> | <a>*<c><b>* | <alist><blist>
function abc(list) {
  if (list[0].type === "gu") {
    // <blist> 分支
    blist(list);
  } else if (list[0].type === "pa") {
    // <alist>

    if (list[1].type === "EOF") {
      // <c>
      c(list);
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "pa"
    ) {
      // <a><c>
      const symbol = {
        type: "abc",
        children: [],
      };
      alist(list);
      symbol.children.push(list.shift());

      c(list);
      symbol.children.push(list.shift());
      list.unshift(symbol);
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "gu" &&
      list[4].type === "pa"
    ) {
      // <c><b>
      const symbol = {
        type: "abc",
        children: [],
      };
      c(list);
      symbol.children.push(list.shift());
      blist(list);
      symbol.children.push(list.shift());
      list.unshift(symbol);
    } else if (
      list[1].type === "gu" &&
      list[2].type === "gu" &&
      list[3].type === "gu" &&
      list[4].type === "gu"
    ) {
      // <a><b>
      const symbol = {
        type: "abc",
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
function alist(list) {
  if (list[0].type === "pa") {
    a(list);
    alist(list);
  } else if (list[0].type === "a") {
    if (
      list[1].type === "EOF" ||
      (list[1].type === "pa" && list[2].type === "EOF")
    ) {
      const symbol = {
        type: "alist",
      };
      symbol.children = list.splice(0, 1, symbol);
    } else if (list[1].type === "pa") {
      // 第二个pagugu的第一个pa
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
function blist(list) {
  //第一个是b
  if (list[0].type === "gu") {
    b(list);
    blist(list);
  } else if (list[0].type === "b") {
    // <blist>的第一个分支
    if (list[1].type === "EOF") {
      const symbol = {
        type: "blist",
      };
      symbol.children = list.splice(0, 1, symbol);
    } else if (list[1].type === "gu") {
      // <blist>第二个分支
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
