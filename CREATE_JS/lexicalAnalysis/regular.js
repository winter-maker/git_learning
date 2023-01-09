/**
 * 基于正则的语法分析
 * **/
//{
/*
 * 知识点：
 * - 的作用：指定 unicode码范围
 * unicode码的范围是 0-127
 * 'abc'.charCodeAt(0) 返回字符串中第0个位置的 unicode 编码
 * String.fromCharCode(127) 返回 unicode 码对应的字符
 * String match的方法,括号分组的作用(?:),嵌套的括号找出来的顺序是按左括号出现的顺序
 * String replacce的方法，第二个参数可以是字符串和函数，函数参数
 * Regular exec的方法
 */
//}

//case1: 十进制整数：由0-9十个数字构成，到十就向前进一位。英文:decimal
let reg1 = /^0$|^[-]{0,1}[1-9][0-9]{0,}$/;

//case2: 十进制小数
//1. 点后面无值
let reg2 = /^0\.$|^[-]{0,1}[1-9][0-9]{0,}\.$/;
//1.2 点前和后都可有值
let reg3 = /^0\.[0-9]{1,}$|^[-]{0,1}[1-9][0-9]{0,}\.[0-9]{1,}$/;
// .1 点前面有且只能有负号
let reg4 = /^[-]{0,1}\.[0-9]{0,}$/;

// 无脑或在一起，兼容以上所有情况
let reg5 =
  /^0$|^[-]{0,1}[1-9][0-9]{0,}$|^0\.$|^[-]{0,1}[1-9][0-9]{0,}\.$|^0\.[0-9]{1,}$|^[-]{0,1}\.[1-9][0-9]{0,}$|^0\.[0-9]{1,}$|^[-]{0,1}[1-9][0-9]{0,}\.[0-9]{1,}$/;

// 增加括号合并 1，2
let reg12 = /^(0|[-]{0,1}[1-9][0-9]{0,})\.{0,1}$/;

// 增加括号合并 2 + 3
let reg23 = /^(0|[-]{0,1}[1-9][0-9]{0,})\.[0-9]{0,}$/;

// 增加括号合并 4 + 3
let reg43 = /^[-]{0,1}([1-9][0-9]{0,}){0,}\.[0-9]{1,}$/;
// 123
let reg123 = /^(0|[-]{0,1}[1-9][0-9]{0,})(\.[0-9]{0,}){0,1}$/;
let reg1234 =
  /^(0|[-]{0,1}[1-9][0-9]{0,})(\.[0-9]{0,}){0,1}$|^[-]{0,1}\.[0-9]{0,}$/;

let str = "abc";
let reg6 = /[a-z]*/;
let reg7 = /a(?:[a-z])(c)/g;
let reg8 = /a([a-z])(c)/g;
///console.log(str.match(reg7));

let str2 = "abcadc";
let i = 1;
//const res = str2.replace(reg7, "xyz"); --xyzxyz
// const res = str2.replace(reg7, () => {
//   return i++;
// });
// console.log(res); // 12

// replace 的参数
// const res = str2.replace(reg8, (str, $1, $2) => {
//   console.log(str, $1, $2); // abc b c , abc d c
//   return $1 + i++;
// });
// console.log(res); // b1d2

//exec
let reg9 = /\d/g;
let str3 = "1234567";
//let res = reg9.exec(str3);
for (let i = 0; i < str3.length + 1; i++) {
  //console.log(reg9.exec(str3));
  /*
  [ '1', index: 0, input: '1234567', groups: undefined ]
  [ '2', index: 1, input: '1234567', groups: undefined ]
  [ '3', index: 2, input: '1234567', groups: undefined ]
  [ '4', index: 3, input: '1234567', groups: undefined ]
  [ '5', index: 4, input: '1234567', groups: undefined ]
  [ '6', index: 5, input: '1234567', groups: undefined ]
  [ '7', index: 6, input: '1234567', groups: undefined ]
  null
  */
}
// 匹配正则所有的匹配项
let r = null;
while ((r = reg9.exec(str3))) {
  //console.log(r);
  /*
  [ '1', index: 0, input: '1234567', groups: undefined ]
  [ '2', index: 1, input: '1234567', groups: undefined ]
  [ '3', index: 2, input: '1234567', groups: undefined ]
  [ '4', index: 3, input: '1234567', groups: undefined ]
  [ '5', index: 4, input: '1234567', groups: undefined ]
  [ '6', index: 5, input: '1234567', groups: undefined ]
  [ '7', index: 6, input: '1234567', groups: undefined ]
  */
}
