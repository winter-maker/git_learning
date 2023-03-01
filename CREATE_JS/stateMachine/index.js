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
const str = "0.123456789";
const EOF = Symbol("EOF");
console.log("result", check(str));
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


