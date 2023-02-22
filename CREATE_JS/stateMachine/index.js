/***
 * 状态机
 * 利用状态机思路，不用正则处理浮点数
 * 解释：每个状态都是一个机器，每个state都是一个状态机包含输入、输出、转移关系
 * 有限状态机，状态机是有限的。
 * 分为
 * mealy 状态机，以下就是。return 的东西和输入相关。
 * moore 状态机，可以在if里面做一下其他处理，return 的只有一个.
 *
 */
const str = "12345678.9";
const EOF = Symbol("EOF");
//console.log("result", check(str));
function check(str) {
  let state = start;
  for (let c of str.split("").concat(EOF)) {
    //console.log(state.name, c);
    state = state(c);
  }
  if (state === success) {
    return true;
  }
  return false;
}

// 只处理一个字符[-.a]
function start(char) {
  if (char === "-") {
    return afterMinus;
  } else if (char === "0") {
    return afterZero;
  } else if (
    "0".charCodeAt(0) < char.charCodeAt(0) &&
    char.charCodeAt(0) <= "9".charCodeAt(0)
  ) {
    return afterNumber;
  } else if (char === ".") {
    return afterDot;
  } else {
    return fail;
  }
}
// 假如前面是负号[0-9.]
function afterMinus(char) {
  if (char === EOF) {
    return fail;
  } else if (char === "0") {
    return afterZero;
  } else if (
    "0".charCodeAt(0) < char.charCodeAt(0) &&
    char.charCodeAt(0) <= "9".charCodeAt(0)
  ) {
    return afterNumber;
  } else if (char === ".") {
    return afterDot;
  } else {
    return fail;
  }
}
// 数字后面
function afterNumber(char) {
  if (char === EOF) {
    return success;
  } else if (
    "0".charCodeAt(0) <= char.charCodeAt(0) &&
    char.charCodeAt(0) <= "9".charCodeAt(0)
  ) {
    return afterNumber;
  } else if (char === ".") {
    return afterDot;
  } else {
    return fail;
  }
}
// .后面
function afterDot(char) {
  if (char === EOF) {
    return success;
  } else if (
    "0".charCodeAt(0) <= char.charCodeAt(0) &&
    char.charCodeAt(0) <= "9".charCodeAt(0)
  ) {
    return afterDot;
  } else {
    return fail;
  }
}
// 第一个位是0
function afterZero(char) {
  if (char === EOF) {
    return success;
  } else if (char === ".") {
    return afterDot;
  } else {
    return fail;
  }
}
function success(char) {
  throw new Error("invoke error");
}
function fail(char) {
  return fail;
}
/**
 * KMP 算法：
 * 在一个字符串里找另一个字符串，字符串处理的算法
 * */
// source pattern，假设pattern 所有字符完全不相同
// o(m*n)， 暴力匹配
function blKmp(source, pattern) {
  let strArr = source.split("");
  for (let index = 0; index < strArr.length; index++) {
    if (source.slice(index, index + pattern.length) === pattern) {
      return index;
    }
  }
  return -1;
}
// o(m+n)算法，无重复pattern的搜索
function patNorepetKmp(source, pattern) {
  let currentP = 0;
  for (let i = 0; i < source.length; i++) {
    if (source[i] === pattern[currentP]) {
      if (currentP === pattern.length - 1) return i - currentP;
      currentP++;
    } else {
      currentP = 0;
    }
  }
  return -1;
}
/**
 * ababc
 *   ababc
 *    ^
 * 00012
 */

// 无重复字符的匹配算法，匹配不到回到0
export const writeNextKmp = (source, pattern) => {
  const len = source.length;
  const len2 = pattern.length;
  let i = 0,
    j = 0;
  while (i < len) {
    if (source[i] === pattern[j]) {
      i++;
      j++;
    } else {
      if (j === 0) {
        i++;
      } else {
        j = 0;
      }
    }
    if (j === len2) {
      return i - len2;
    }
  }
  return -1;
}

/**
 * 不重复字符的匹配算法，匹配不到回到next位
 * next走位：
 * 00012
 * abababc
 *   ababc
 *     ^
 * 
 * ABCDABD
 *     ABCDABD
 * 0000120
*/
function getPMT(pat) {
  const next = Array(pat.length).fill(-1);
  let i = 0;
  let j = -1;
  // next[0] = -1, next[1] = 0 为固定值；真正的计算从 i = 2 开始；
  while (i < pat.length) {
    if (j === -1 || pat[i] === pat[j]) {
      ++i;
      ++j;
      next[i] = j;
    } else {
      j = next[j];
    }
  }
  return next;
}
function kmpSearch(txt, pat) {
  let i = 0;
  let j = 0;
  const next = getPMT(pat);
  while (i < txt.length && j < pat.length) {
    if (j == -1 || txt[i] === pat[j]) {
      i++;
      j++;
    } else {
      j = next[j];
    }
  }
  if (j === pat.length) {
    return i - j;
  }
  return -1;
}
/*
* 获取部分匹配值：前缀和后缀的最长共有元素的长度。
* 以 ABCDABD 为例：
* A的前缀和后缀都为空集，共有元素的长度为 0
* AB的前缀为[A], 后缀为[B],共有元素的长度为 0
* ABC的前缀为[A,AB],后缀为[BC,C],共有元素的长度为 0
* ABCD的前缀为[A,AB,ABC],后缀为[BCD,CD,D],共有元素的长度为 0
* ABCDA的前缀为[A,AB,ABC,ABCD],后缀为[BCDA,CDA,DA,A],共有元素为A,长度为 1
* ABCDAB的前缀为[A,AB,ABC,ABCD,ABCDA],后缀为[BCDAB,CDAB,DAB,AB,B],共有元素为AB,长度为 2
* ABCDABD的前缀为[A,AB,ABC,ABCD,ABCDA,ABCDAB],后缀为[BCDABD,CDABD,DABD,ABD,BD,D],共有元素长度为 0
* 部分匹配值为 [0,0,0,0,1,2,0]
*/
function generateNext(pattern) {
  let next = []
  for(let i=0; i<pattern.length; i++) {
    if(i === 0){
      next[i] = 0;
    } else {
      let str = pattern.substring(0, i+1); // 取比较的字段
      for(let j=0; j<i; j++) {  
        let before = str.substring(0, j+1); // 获取前缀
        let after = str.substring(str.length - (j+1));
        if(before === after){
          next[i] = before.length;
        }
        if(!next[i]) {
          next[i] = 0;
        }
      }
    }
  }
  return next;
}
export const generateNextKmp = (source, pattern) => {
  const next = generateNext(pattern);
  let i = 0, j = 0;
  let n = source.length, m = pattern.length;
  while(i <= n-m){
    let x = 0;
    for(j=0; j < m; j++) {
      if(pattern[j] === source[i]) {
        x++;
        i++;
        if(x === m) {
          return [i - m, i]
        }
      } else {
        // 移动位数 = 以匹配的字符数 - 对象的部分匹配值
        // 至少移动一位
        i += x - next[j - 1] || 1;
        break;
      }
    }
  }
}

