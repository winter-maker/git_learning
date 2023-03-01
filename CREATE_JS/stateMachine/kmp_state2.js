/**
 * abababc的状态机
*/

function getNext(next, pattern) {
    let j = 0;
    next[0] = 0;
    for (let i = 1; i < pattern.length; i++) {
        while (j > 0 && pattern[i] != pattern[j]) { // j要保证大于0，因为下面有取j-1作为数组下标的操作
            j = next[j - 1]; // 注意这里，是要找前一位的对应的回退位置了
        }
        if (pattern[i] == pattern[j]) {
            j++;
        }
        next[i] = j;
    }
}

const strStr = (source, pattern) => {
    if (pattern.length == 0) {
        return 0;
    }
    let next = [];
    getNext(next, pattern);
    let j = 0;
    for (let i = 0; i < source.length; i++) {
        while (j > 0 && source[i] != pattern[j]) {
            j = next[j - 1];
        }
        if (source[i] == pattern[j]) {
            j++;
        }
        if (j == pattern.length) {
            return (i - pattern.length + 1);
        }
    }
    return -1;
}


export const check = (source, pattern)=> {
    let state = start;
    for (let c of pattern.slice('')) {
        //console.log(state.name, c);
        state = state(c);
    }
    if (state === success) {
        return strStr(source, pattern);
    }
    return -1;
}
function start(char) {
    if(char === 'a') return afterA;
    return start;
}
function afterA(char) {
    if(char === 'b') return afterB;
    return start(char);
}
function afterB(char) {
    if(char === 'a') return afterA2;
    return start(char);
}
function afterA2(char) {
    if(char === 'b') return afterB2;
    return afterA(char);
}
function afterB2(char) {
    if(char === 'c') return success;
    return afterB(char);
}
function success() {
    return success;
}

