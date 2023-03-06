const response = {
    httpVersion: '',
    statusCode: '',
    statusText: '',
    headers: {},
    body: `<h1>Hello World</h1>`
}
let currentHeadKey = '';
let currentHeadValue = '';
module.exports = function parse(source) {
    const EOF = Symbol('EOF')
    console.log(source)
    let state = start;
    
    for (let c of source.split('').concat(EOF)) {
        //console.log(state.name, c);
        state = state(c);
    }
    console.log('---response---', response)
}
// getStatusCode(char) reconsume

function start(char) {
    //console.log('---start---', char)
    if(char === ' ') return getStatusCode;
    response.httpVersion += char;
    return start;
}
function success() {
    return success;
}
function getStatusCode(char) {
    if(char === ' ') {
        return getStatusText;
    } else {
        response.statusCode += char; //写时的副作用
        //console.log('---getStatusCode---', char) //console.log 本身就是副作用
        return getStatusCode;
    }
}
function getStatusText(char) {
    if(char === '\r') {
        return clearlineN;
    } else {
        response.statusText += char;
        //console.log('--getStatusText--', char)//console.log 本身就是副作用
        return getStatusText
    }
    
}
function clearlineN(char) {
    if(char === '\n') return getHeadersKey
    return error;
}
function getHeadersKey(char) {
    if(char === ':') return afterHeadersValue;
    currentHeadKey += char;
    return getHeadersKey;
}
function afterHeadersValue(char) {
    if(char !== '') return getHeadersValue;
    return afterHeadersValue;
}
function getHeadersValue(char) {
    if(char === '\r') {
        response.headers[currentHeadKey] = currentHeadValue;
        currentHeadKey = '';
        currentHeadValue = '';
        return clearlineN;
    }
    currentHeadValue += char;
    return getHeadersValue;
}

function error(){ return error };

/**
 * 思考：状态函数是不是纯函数
 * 结论：状态函数不是纯函数。状态函数是可以有副作用的，副作用必须是写时的副作用，不能从外面读东西，
 * 只能从参数里读信息，比如 start 函数依赖外面的变量那就不是状态函数了，可以依赖产量。状态函数确定输入一定会
 * 导致确定的状态迁移。这是状态机的关键
 * 纯函数：没有副作用的函数
*/