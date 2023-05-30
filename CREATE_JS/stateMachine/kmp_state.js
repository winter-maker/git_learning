/**
 * abcde的状态机
 * 
*/

export const check = (source)=> {
    let state = start;
    for (let c of source.slice('')) {
        //console.log(state.name, c);
        state = state(c);
    }
    if (state === success) {
        return true;
    }
    return false;
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
    if(char === 'c') return afterC;
    return start(char);
}
function afterC(char) {
    if(char === 'd') return afterD;
    return start(char);
}
function afterD(char) {
    if(char === 'e') return success;
    return start(char);
}
function success() {
    return success;
}
function fail() {
    return fail;
}

