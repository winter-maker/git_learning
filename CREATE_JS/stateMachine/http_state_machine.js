// 第一种封装方式
const ChunkBodyParser = require("./chunkBodyParse.js");

//第二种封装思路
// generate

const response = {
  httpVersion: "",
  statusCode: "",
  statusText: "",
  headers: {},
  body: "",
};
let currentHeadKey = "";
let currentHeadValue = "";
module.exports = function parse(source) {
    const EOF = Symbol('EOF')
    console.log(source)
    let state = start;
    
    for (let c of source.split('')) {
        //console.log(state.name, c);
        state = state(c);
    }
    console.log('---response---', response)
}
  const EOF = Symbol("EOF");
  console.log(source);
  // 十六进制
  let state = start;

  for (let c of source.split("")) {
    //console.log(state.name, c);
    state = state(c);
  }
  console.log("---response---", response);
};
// getStatusCode(char) reconsume

// 得到http版本信息，状态机入口
function start(char) {
    //console.log('---start---', char)
    if(char === ' ') return getStatusCode;
    response.httpVersion += char;
    return start; // continue the cycle
}
function success() {
  return success;
}
// 走到第一个空格，取后面的http状态码
function getStatusCode(char) {
    if(char === ' ') {
        return getStatusText;
    } else {
        response.statusCode += char; //写时的副作用
        //console.log('---getStatusCode---', char) //console.log 本身就是副作用
        return getStatusCode; // continue the cycle
    }
}
// 走到第二个空格，取后面的http状态文本
function getStatusText(char) {
    if(char === '\r') {
        return clearlineN; //遇到\r字符，消灭后面的\n
    } else {
        response.statusText += char;
        //console.log('--getStatusText--', char)//console.log 本身就是副作用
        return getStatusText // continue the cycle
    }
    
}
function clearlineN(char) {
  if (char === "\n") return getHeadersKey;
  return error;
}
// 取httpHeaders的信息
function getHeadersKey(char) {
    if(char === ':') return afterHeadersValue;
    currentHeadKey += char;
    return getHeadersKey; // continue the cycle 
}
// 取httpHeaders中key的信息
function afterHeadersValue(char) {
  if (char !== "") return getHeadersValue;
  return afterHeadersValue;
}
// 取httpHeaders中value的信息
function getHeadersValue(char) {
    if(char === '\r') {// 读取完一行的httpHeaders，拼接上key/value对，继续下一行
        response.headers[currentHeadKey] = currentHeadValue;
        currentHeadKey = '';
        currentHeadValue = '';
        return clearlineN;
    }
    currentHeadValue += char;
    return getHeadersValue; // conitue the cycle
}
function beforeBody(char) {
  if (char === "\n") {
    response.body = new ChunkBodyParser(char);
    return body;
  }
  return beforeBody;
}
function body(char) {
  response.body.write(char);
  return body;
}
function error() {
  return error;
}
/**
 * Transfer-Encodeing: chunked ，十六进制写入body
 */
/**
 * 思考：状态函数是不是纯函数
 * 结论：状态函数不是纯函数。状态函数是可以有副作用的，副作用必须是写时的副作用，不能从外面读东西，
 * 只能从参数里读信息，比如 start 函数依赖外面的变量那就不是状态函数了，可以依赖产量。状态函数确定输入一定会
 * 导致确定的状态迁移。这是状态机的关键
 * 纯函数：没有副作用的函数
 */
