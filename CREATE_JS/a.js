function c(list) {
  const symbol = {
    type: "c",
  };
  symbol.children = list.splice(0, 1, symbol);
  list.unshift(symbol);
}
let list = [];
let str = "pa";
let reg = /(pa|gu)/g;
let r;
while ((r = reg.exec(str))) {
  list.push({ type: r[0] });
}
list.push({ type: "EOF" });
function abc(list) {
  if (list[0].type === "pa") {
    if (list[1].type === "EOF") {
      c(list);
    }
  }
}
abc(list);
console.log(JSON.stringify(list, null, 2));
