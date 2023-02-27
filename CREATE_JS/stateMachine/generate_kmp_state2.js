/**
 * abababc的状态机
*/
import {stateFun} from './generate_state.js'
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
var afterB2 = stateFun('c', success, afterB);
var afterA2 = stateFun('b', afterB2, afterA);
var afterB = stateFun('a', afterA2, start);
var afterA = stateFun('b', afterB, start);
const states = [start]
// function afterA(char) {
//     if(char === 'b') return afterB;
//     return start(char);
// }

// function afterB(char) {
//     if(char === 'a') return afterA2;
//     return start(char);
// }
// function afterA2(char) {
//     if(char === 'b') return afterB2;
//     return afterA(char);
// }
// function afterB2(char) {
//     if(char === 'c') return success;
//     return afterB(char);
// }
function success() {
    return success;
}
function fail() {
    return fail;
}

