const response = {
    statusCode: '',
    statusText: '',
    headers: {
        ContentType: 'text/html'
    },
    body: `<h1>Hello World</h1>`
}
module.exports = function parse(source) {
    console.log(source)
    let state = start;
    const EOF = Symbol('EOF')
    for (let c of source.split('').concat(EOF)) {
        //console.log(state.name, c);
        state = state(c);
    }
    console.log('---response---', response)
    // if (state === success) {
    //     return true;
    // }
    // return false;
}
// afterHttp(char) reconsume

function start(char) {
    console.log('---start---', char)
    if(char === ' ') return afterHttp;
    return start;
}
function success() {
    return success;
}
function afterHttp(char) {
    if(char === ' ') {
        return afterStatusCode;
    } else {
        response.statusCode += char; //写时的副作用
        //console.log('---afterHttp---', char) //console.log 本身就是副作用
        return afterHttp;
    }
}
function afterStatusCode(char) {
    if(char === '\r') {
        
        return afterStatusText
    } else {
        response.statusText += char;
        //console.log('--afterStatusCode--', char)//console.log 本身就是副作用
        return afterStatusCode
    }
    
}
function afterStatusText(char) {
    //console.log('--afterStatusText--',char)
    return afterStatusText
}
/**
 * 思考：状态函数是不是纯函数
 * 结论：状态函数不是纯函数。状态函数是可以有副作用的，副作用必须是写时的副作用，不能从外面读东西，
 * 只能从参数里读信息，比如 start 函数依赖外面的变量那就不是状态函数了，可以依赖产量。状态函数确定输入一定会
 * 导致确定的状态迁移。这是状态机的关键
 * 纯函数：没有副作用的函数
*/