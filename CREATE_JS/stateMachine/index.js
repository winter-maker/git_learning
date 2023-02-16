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
 * 在一个字符串里找另一个字符串
 * */
// source pattern，假设pattern 所有字符完全不相同
function find(source, pattern) {
  let strArr = source.split("");
  for (let index = 0; index < strArr.length; index++) {
    if (source.slice(index, index + pattern.length) === pattern) {
      return index;
    }
  }
  return -1;
}
// 0(m+n)
function find2(source, pattern) {
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

function find3(source, pattern) {
  const len = source.length;
  const len2 = pattern.length;
  const next = [0, 0, 0, 1, 5];
  let i = 0,
    j = 0;
  for (; i < len; i++) {
    if (j === len2) return i - len2;
    if (source[i] === pattern[j]) {
      j++;
      continue;
    } else if (source[i] !== pattern[j]) {
      j = next[j];
    }
  }
  return -1;
}
console.log("-find-", find3("abababc", "ababc"));
// 假设pattern字符没有重复，写个算法让他做到 m+n

/**
 * abababc
 *     ababc
 *     ^
 */
