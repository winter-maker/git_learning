let reg = /[a-z]{3}[0-9]/;
// 十进制数字
let decimalReg1 = /^0|-{0,1}[1-9][0-9]{0,}$/;
// 12
// 1
// 0

// 后面只有点
let decimalReg2 = /^0\.{0,}$|^-{0,1}[1-9][0-9]{0,}\.{0,}$/;
// 12.
// 1.
// 0.
// console.log(decimalReg1.test(12.))
// console.log(decimalReg2.test(1.2))
// console.log(decimalReg2.test(0.))
// 点在中间
let decimalReg3 = /^(0\.{0,}[0-9]{0,})|(-{0,1}[1-9]{1,2}\.{0,1}[0-9]{0,})$/;

// 12.12
// 1.9
// 0.0
//console.log(decimalReg3.test(-1233.13332))
//console.log(decimalReg3.test(134.943))
//console.log(decimalReg3.test(0.00))
// 点在前面 .2
let decimalReg4 = /^\.{0,}0|-{0,1}[1-9]\.{0,}[0-9]{0,}$/;
// console.log(decimalReg4.test(-.12))
// console.log(decimalReg4.test(.9))
// console.log(decimalReg4.test(.044))

let decimalReg12 = /^0\.{0,}$|^-{0,1}[1-9][0-9]{0,}\.{0,}$/;

// decimalReg2 = /^0\.{0,}$|^-{0,1}[1-9][0-9]{0,}\.{0,}$/
// decimalReg3 = /^0\.{0,}[0-9]{0,}|-{0,1}[1-9]\.{0,}[0-9]{0,}$/

let decimalReg23 = /^0\.{0,}[0-9]{0,}|-{0,1}[1-9]\.{0,}[0-9]{0,}$/;

/**
 * ASCII码 127
 * unicode
 * unicode字符集是将字符对应数字编码，UTF8编码是这些字符集如何使用二进制进行存储
 */

//const str = "abc";
const re = /[a-z]*/g;
const re1 = /[a][a-z]/g;
//console.log(str.match(re1))
let i = 3;
const str1 = "abcdadcde";
let str2 = str1.replace(re1, (str, $1, $2, $3, $4, $5, $6) => {
  //console.log(str, $1, $2, $3, $4, $5, $6);
  return $1;
});
//console.log(str2);
// 正则表达式括号内容是从左到右，从外到内来计算$1,$2,$3,$4的
(function () {
  let str = "222aaaa333Bbb666ccc9ZZ";
  let reg = /((\d([a-z]+))(\d+[A-Z]))/g;
  let arr = str.match(reg);

  //console.log(arr); // ['2aaaa333B', '6ccc9Z']
  let str2 = str.replace(reg, function (match, p1, p2, p3, p4, p5, p6, p7) {
    //console.log("match", match); // 2aaaa333B  // 6ccc9Z
    //console.log("p1", p1); // 2aaaa333B  // 6ccc9Z
    //console.log("p2", p2); // 2aaaa  // 6ccc
    //console.log("p3", p3); // aaaa // ccc
    //console.log("p4", p4); // 333B // 9Z
    //console.log("p5", p5); // 2  // 15
    //console.log("p6", p6); // 222aaaa333Bbb666ccc9ZZ // 222aaaa333Bbb666ccc9ZZ
    //console.log("p7", p7); // undefined  // undefined
    return "***"; // 把匹配到的字符串替换为对应的字符串
  });
  //console.log("str2", str2); // 22***bb66***Z
})();

let str4 = "hello world hello";
let reg4 = /(he(ll)o)/g;
let r1;
//console.log(reg4.exec(str4));
while ((r1 = reg4.exec(str4))) {
  console.log(r1);
}

// exec 可多次执行

// [ '1', index: 0, input: '1234567', groups: undefined ]

const keywordReg =
  /(const|let|var|while)|(\w|\n|\t)|([a-zA-Z_$]+[0-9]*)|(\(\)\{\}\=\;)|(^"|\.)/g;
const str5 = `const str3 = "1234567";
let r;
while ((r = reg3.exec(str3))) {
  console.log(r);
}
`;
let val = null;
let currentIndex = 0;
// while ((val = keywordReg.exec(str5))) {
//   let { 0: key, index, input } = val;
//   if (currentIndex === index) {
//     console.log("---没跳格--");
//   } else {
//     console.log("---跳了---", JSON.stringify(key));
//   }
//   currentIndex = index + key.length;
// }
