const keywordReg =
  /(const|let|var|while)|( |\n|\t)|([a-zA-Z_$][a-zA-Z0-9_$]*)|(\{|\}|\;|\=|\(|\))|("[^"]"*"|'[^']'*'|\.)/g;
const str5 = `str3 = "1234 567";
let val = null;
while (val = reg3.exec(str3)) {
  console.log(val);
}`;
let val2 = null;
let currentIndex = 0;
//console.log(keywordReg.lastIndex);
keywordReg.lastIndex = 0;

while ((val2 = keywordReg.exec(str5))) {
  let {
    0: keyworlds,
    1: whitespace,
    2: identifier,
    3: punctuator,
    4: literal,
    index,
    input,
  } = val2;
  console.log(keywordReg.lastIndex);
  if (currentIndex === index) {
    // console.log("---keyworld---", keyworlds);
    // console.log("---whitespace---", JSON.stringify(whitespace));
    // console.log("---identifier---", identifier);
    // console.log("---punctuator---", punctuator);
    // console.log("---literal---", literal);
  } else {
    console.log("---跳了---", input);
  }
  currentIndex = index + keyworlds.length;
}
// while ((val = keywordReg.exec(str5))) {
//   let { 0: key, index, input } = val;
//   console.log(`-key---${key}, --index----${index}`);
//   //console.log(`-val---${val}`);
//     if (val[1]) {
//       console.log('-------', )
//   }
//   if (currentIndex === index) {
//     console.log("---没跳格--");
//   } else {
//     console.log("---跳了---", input);
//   }
//   currentIndex = index + key.length;
// }
