const keywordReg =
  /(const|let|var|while)|(\s+)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([\{|\}|\;|\=|\(|\)])|(("[^"]*")|('[^']*'))/g;
const str5 = `const str3 = "1234 567";
let val = null;
while (val = reg3.exec(str3)) {
  console.log(val);
}`;
let val2 = null;
let currentIndex = 0;
//console.log(keywordReg.lastIndex);
//keywordReg.lastIndex = 0;

while ((val2 = keywordReg.exec(str5))) {
  let {
    0: keyworlds,
    1: whitespace,
    2: identifier,
    3: punctuator,
    4: stringLiteral,
    index,
    input,
  } = val2;
  //console.log(val2);
  // console.log(keywordReg.lastIndex);
  // console.log("---keyworld---", keyworlds);
  // console.log("---whitespace---", JSON.stringify(whitespace));
  // console.log("---identifier---", identifier);
  // console.log("---punctuator---", punctuator);
  // console.log("---stringLiteral---", stringLiteral);
  if (currentIndex === index) {
  } else {
    //console.log("---跳了---", input);
  }
  currentIndex = index + keyworlds.length;
}

const target = `cosnt str3 = '123456';
let val = null;
while(val = reg8.exec(str3)){
  console.log(val)
}`;
let val = null;
let currentIndex2 = 0;
let keywordReg2 =
  /(const|let|var|while|null)|(\s|\n|\t)|([A-Za-z_$][A-Za-z0-9_$]*)|(\{|\}|\(|\)|\;|\=|\.)|(("[^"]*")|('[^']*'))/g;
console.log("===============================");
while ((val = keywordReg2.exec(target))) {
  let {
    index,
    1: keyworlds,
    2: whitespace,
    3: identifier,
    4: punctuator,
    5: stringLiteral,
  } = val;

  /**
   * keyworlds 关键字
   * whitespace 空格
   * identifier 标识符
   * punctuator 标点符号
   * stringLiteral 字符串
   */
  //console.log("-val---", val, JSON.stringify(keyworlds), currentIndex2);
  if (keyworlds) {
    console.log("-keyworlds---", JSON.stringify(keyworlds), val);
  }
  if (whitespace) {
    console.log("-whitespace---", whitespace, val);
  }
  if (identifier) {
    console.log("-identifier---", JSON.stringify(identifier), val);
  }
  if (punctuator) {
    console.log("-punctuator---", punctuator, val);
  }
  if (stringLiteral) {
    console.log("-stringLiteral---", stringLiteral, val);
  }

  if (currentIndex2 === index) {
    // let keyworlds = val[0];
    // let whitespace = val[1];
    // let identifier = val[2];
    // let punctuator = val[3];
    // let stringLiteral = val[4];
    // console.log(
    //   keyworlds || whitespace || identifier || punctuator || stringLiteral
    // );
    //console.log("没跳格");
  } else {
    //console.log("跳格了", val);
  }
  //currentIndex2 = index + keyworlds.length;
}
