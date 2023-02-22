/*
 * 基于正则的词法分析
 *
 * 使用正则的exec方法匹配:
 * keywords 关键字
 * whitespace 空格，不可见字符
 * identifier 标识符
 * punctuator 符号
 * stringLitearal 字符串
 */
const reg =
  /(?<keywords>(const|let|var|while|exec|null))|(?<whitespace>(\r|\n|\s))|(?<identifier>([a-zA-Z_$][a-zA-Z0-9_$]*))|(?<punctuator>([\.\=\;\(\)\{\}]))|(?<stringLitearal>("[^"]*"))/g;
let str = `
const str = "1234567";
let r = null;
while ((r = reg9.exec(str3))) {
  console.log(r);
}`;
let r = null;
let initIndex = 0;
while ((r = reg.exec(str))) {
  let { 0: value, index } = r;
  let { keywords, whitespace, identifier, punctuator, stringLitearal } =
    r.groups;

  if (initIndex === index) {
    keywords ? console.log("关键字", keywords) : "";
    whitespace ? console.log("空白", JSON.stringify(whitespace)) : "";
    identifier ? console.log("标识符", identifier) : "";
    punctuator ? console.log("符号", punctuator) : "";
    stringLitearal ? console.log("字符串", stringLitearal) : "";
  } else {
    console.log("--跳格了", r);
  }
  initIndex = index + value.length;
  console.log(r.groups);
}
