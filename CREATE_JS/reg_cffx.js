
let reg = /[a-z]{3}[0-9]/
// 十进制数字
let decimalReg1 = /^0|-{0,1}[1-9][0-9]{0,}$/
// 12
// 1
// 0
// console.log(decimalReg1.test(12))
// console.log(decimalReg1.test(1))
// console.log(decimalReg1.test(0))
// 后面只有点
let decimalReg2 = /^0\.{0,}$|^-{0,1}[1-9][0-9]{0,}\.{0,}$/
// 12.
// 1.
// 0.
// console.log(decimalReg1.test(12.))
// console.log(decimalReg2.test(1.2))
// console.log(decimalReg2.test(0.))
// 点在中间
let decimalReg3 = /^(0\.{0,}[0-9]{0,})|(-{0,1}[1-9]{1,2}\.{0,1}[0-9]{0,})$/

// 12.12
// 1.9
// 0.0
console.log(decimalReg3.test(-1233.13332))
console.log(decimalReg3.test(134.943))
console.log(decimalReg3.test(0.00))
// 点在前面 .2
let decimalReg4 = /^\.{0,}0|-{0,1}[1-9]\.{0,}[0-9]{0,}$/
// console.log(decimalReg4.test(-.12))
// console.log(decimalReg4.test(.9))
// console.log(decimalReg4.test(.044))

let decimalReg12 = /^0\.{0,}$|^-{0,1}[1-9][0-9]{0,}\.{0,}$/

// decimalReg2 = /^0\.{0,}$|^-{0,1}[1-9][0-9]{0,}\.{0,}$/
// decimalReg3 = /^0\.{0,}[0-9]{0,}|-{0,1}[1-9]\.{0,}[0-9]{0,}$/

let decimalReg23 = /^0\.{0,}[0-9]{0,}|-{0,1}[1-9]\.{0,}[0-9]{0,}$/

/**
 * ASCII码 127
 * unicode
 * unicode字符集是将字符对应数字编码，UTF8编码是这些字符集如何使用二进制进行存储 
*/

const str = 'abc'
const re = /[a-z]*/g
const re1 = /[a]([a-z])([c])/g
//console.log(str.match(re1))
let i = 3
const str1 = 'abcadc'
let str2 = str1.replace(re1, (str, $1, $2)=>{
    //console.log(str, $1, $2)
    return $1+i++
})
//console.log(str2)
// exec 可多次执行
const str3 = '1234567'
const re3 = /\d/g

let r
while(r = re3.exec(str3)) {
    //console.log(r)
}

