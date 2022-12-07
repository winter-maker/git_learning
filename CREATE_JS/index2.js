const str = "abc";
const reg = /a(b)c/;
//console.log(str.match(reg));
const str1 = "I love antzone, this is anmimate";
const reg1 = /an/g;
reg1.lastIndex = 8;
//console.log(reg1.exec(str1), reg1.lastIndex);
let str2 = "我的手机号13522222222,他的手机号13288888888,她的手机13699999999";
let reg2 = /13(\d)(\d{8})/g;
// str2 = "222aaaa333Bbb666ccc9ZZ";
// reg2 = /(\d([a-z]+))(\d+[A-Z])/;
reg2.lastIndex = 0;

let arr2;
// while ((arr2 = reg2.exec(str2))) {
//   console.log(reg2.lastIndex);
//   console.log(arr2);
// }
// // let arr2 = reg2.exec(str2);
// console.log(arr2);
// for (let i = 0; i < arr2.length; i++) {
//   console.log(arr2[i]);
// }
// console.log("abc123,def123,jhi123,gkl123,mno123,pqr123,stu123".match(/\,/g));
// while (arr2 = "abc123,def123,jhi123,gkl123,mno123,pqr123,stu123".search(/\,/)) {
//     console.log(arr2)
// }
let str3 = "";

for (let i = 0; i <= 255; i++) {
  str3 += String.fromCharCode(i);
}
let c = "",
  re,
  m;
// ascii 65-90 分别对应A-Z
for (let i = 65; i <= 90; i++) {
  c = String.fromCharCode(i);
  re = RegExp("\\c" + c);
  m = re.exec(str3);
  console.log(m);
  if (m) {
    console.log(i, re, escape(m[0]));
  }
}
